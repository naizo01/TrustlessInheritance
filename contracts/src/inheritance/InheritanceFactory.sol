// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Proxy} from "@ucs.mc/proxy/Proxy.sol";
import {Initialize} from "bundle/inheritance/functions/Initialize.sol";
import {IInheritanceFactory} from "bundle/inheritance/interfaces/IInheritanceFactory.sol";
import {IInheritanceContract} from "bundle/inheritance/interfaces/IInheritanceContract.sol";
import {Schema} from "bundle/inheritance/storage/Schema.sol";
import {Groth16Verifier} from "bundle/inheritance/zk/Groth16Verifier.sol";
import {Groth16VerifierPassword} from "bundle/inheritance/zk/Groth16VerifierPassword.sol";
import {IPushCommV2} from "bundle/test/IPushCommV2.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract InheritanceFactory is Groth16Verifier {
    // オーナーアドレス -> プロキシアドレスのマッピング
    mapping(address => address[]) public ownerToProxy;

    // プロキシアドレス -> proxyが存在するかのboolのマッピング
    mapping(address => bool) public isAllowed;

    // pubSignals -> プロキシアドレスのマッピング
    mapping(uint256 => address) public pubSignalToProxy;

    // ディクショナリアドレスを保持する変数
    address public dictionaryAddress;

    // 管理者アドレスを保持する変数
    address public admin;
    Groth16VerifierPassword public zk;

    address public PUSH_COMM_ADDRESS;
    address public CHANNEL_ADDRESS;
    IPushCommV2 public pushComm;

    // コンストラクタで初期管理者を設定
    constructor(
        address _zk,
        address _pushCommAddress,
        address _channelAddress
    ) {
        zk = Groth16VerifierPassword(_zk);
        admin = msg.sender;
        pushComm = IPushCommV2(_pushCommAddress);
        CHANNEL_ADDRESS = _channelAddress;
        PUSH_COMM_ADDRESS = _pushCommAddress;
    }

    // 管理者のみが実行できる関数に適用するmodifier
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    // 管理者を変更する関数
    function setAdmin(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }

    // ディクショナリアドレスを設定する関数
    function setDictionaryAddress(
        address newDictionaryAddress
    ) external onlyAdmin {
        dictionaryAddress = newDictionaryAddress;
    }

    // 各ユーザーのプロキシをデプロイし初期化を行う
    function createProxy(
        uint256 _lockTime,
        Schema.ZKProof calldata proof
    ) external returns (address) {
        require(
            zk.verifyProof(proof.pA, proof.pB, proof.pC, proof.pubSignals),
            "Proof verification failed"
        );
        uint _hash = proof.pubSignals[0];

        require(
            pubSignalToProxy[_hash] == address(0),
            "pubSignals already registered"
        );

        bytes memory initializerData = abi.encodeCall(
            Initialize.initialize,
            (_hash, _lockTime, msg.sender, address(this))
        );

        address proxyAddress = address(
            new Proxy(dictionaryAddress, initializerData)
        );

        ownerToProxy[msg.sender].push(proxyAddress);
        isAllowed[proxyAddress] = true;
        pubSignalToProxy[_hash] = proxyAddress;

        emit IInheritanceFactory.ProxyCreated(msg.sender, proxyAddress, _hash);
        return proxyAddress;
    }

    // プロキシ情報を取得する内部関数
    function _getProxyInfo(
        address proxyAddress
    ) internal view returns (IInheritanceFactory.ProxyInfo memory) {
        // プロキシコントラクトをインスタンス化
        IInheritanceContract proxy = IInheritanceContract(proxyAddress);

        // プロキシから情報を取得
        IInheritanceFactory.ProxyInfo memory info;
        info.proxyAddress = proxyAddress;
        info.owner = proxy.owner();
        info.hash = proxy.hash();
        info.lockDuration = proxy.lockDuration();
        info.lockStartTime = proxy.lockStartTime();
        info.isLocked = proxy.isLocked();
        info.isKilled = proxy.isKilled();
        info.isLockExpired = proxy.isLockExpired();
        info.isWithdrawComplete = proxy.isWithdrawComplete();

        // approvedTokensを取得
        address[] memory tokens = proxy.approvedTokens();
        uint256[] memory balances = new uint256[](tokens.length);

        // isLockedの状態を確認
        bool isLocked = proxy.isLocked();
        address balanceHolder = isLocked ? proxyAddress : proxy.owner();

        // 各トークンの残高を取得
        for (uint256 i = 0; i < tokens.length; i++) {
            IERC20 token = IERC20(tokens[i]);
            uint256 balance = token.balanceOf(balanceHolder);

            if (!isLocked) {
                // ownerの場合はallowanceも取得
                uint256 allowance = token.allowance(
                    balanceHolder,
                    proxyAddress
                );
                // balanceとallowanceの小さい方を選択
                balances[i] = balance < allowance ? balance : allowance;
            } else {
                balances[i] = balance;
            }
        }

        info.balances = balances;
        info.tokens = tokens;
        return info;
    }

    // ハッシュからプロキシ情報を取得する関数
    function getProxyInfoByHash(
        uint256 _hash
    ) external view returns (IInheritanceFactory.ProxyInfo memory) {
        address proxyAddress = pubSignalToProxy[_hash];
        require(proxyAddress != address(0), "Proxy not found");

        return _getProxyInfo(proxyAddress);
    }

    // プロキシアドレスからプロキシ情報を取得する関数
    function getProxyInfo(
        address _proxyAddress
    ) external view returns (IInheritanceFactory.ProxyInfo memory) {
        require(isAllowed[_proxyAddress], "Proxy not found");

        return _getProxyInfo(_proxyAddress);
    }

    function sendNotification(
        address recipient
    ) external onlyProxy returns (bool) {
        bytes memory identity = abi.encode(
            "3", // targeted type
            "Targeted Notification",
            "This is a targeted message",
            "0",
            "",
            ""
        );

        return pushComm.sendNotification(CHANNEL_ADDRESS, recipient, identity);
    }

    function getOwnerProxies(
        address ownerAddress
    ) external view returns (address[] memory) {
        return ownerToProxy[ownerAddress];
    }

    modifier onlyProxy() {
        require(isAllowed[msg.sender], "Only proxy");
        _;
    }
}
