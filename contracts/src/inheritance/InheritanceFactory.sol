// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Proxy} from "@ucs.mc/proxy/Proxy.sol";
import {Initialize} from "bundle/inheritance/functions/Initialize.sol";
import {IInheritanceFactory} from "bundle/inheritance/interfaces/IInheritanceFactory.sol";
import {Schema} from "bundle/inheritance/storage/Schema.sol";
import {Groth16Verifier} from "bundle/inheritance/zk/Groth16Verifier.sol";
import {Groth16VerifierPassword} from "bundle/inheritance/zk/Groth16VerifierPassword.sol";
import {IPushCommV2} from "bundle/test/IPushCommV2.sol";

contract InheritanceFactory is Groth16Verifier {
    // オーナーアドレス -> プロキシアドレスのマッピング
    mapping(address => address) public ownerToProxy;
    mapping(address => bool) public isAllowed;

    // ディクショナリアドレスを保持する変数
    address public dictionaryAddress;

    // 管理者アドレスを保持する変数
    address public admin;
    Groth16VerifierPassword public zk;

    address public PUSH_COMM_ADDRESS;
    address public CHANNEL_ADDRESS;
    IPushCommV2 public pushComm;

    // コンストラクタで初期管理者を設定
    constructor(address _zk, address _pushCommAddress, address _channelAddress) {
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
        zk.verifyProof(proof.pA, proof.pB, proof.pC, proof.pubSignals);
        uint _hash = proof.pubSignals[0];

        bytes memory initializerData = abi.encodeCall(
            Initialize.initialize,
            (_hash, _lockTime, msg.sender, address(this))
        );

        address proxyAddress = address(
            new Proxy(dictionaryAddress, initializerData)
        );

        ownerToProxy[msg.sender] = proxyAddress;
        isAllowed[proxyAddress] = true;

        emit IInheritanceFactory.ProxyCreated(msg.sender, proxyAddress, _hash);
        return proxyAddress;
    }

    function sendNotification(address recipient) external onlyProxy returns (bool){
        bytes memory identity = abi.encode(
            "3", // targeted type
            "Targeted Notification",
            "This is a targeted message",
            "0",
            "",
            ""
        );

        return pushComm.sendNotification(
            CHANNEL_ADDRESS,
            recipient,
            identity
        );
    }

    modifier onlyProxy() {
        require(isAllowed[msg.sender], "Only proxy");
        _;
    }
}
