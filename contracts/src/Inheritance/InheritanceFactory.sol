// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Proxy} from "@ucs.mc/proxy/Proxy.sol";
import {Initialize} from "bundle/inheritance/functions/Initialize.sol";
import {IInheritanceFactory} from "bundle/inheritance/interfaces/IInheritanceFactory.sol";
import {Schema} from "bundle/inheritance/storage/Schema.sol";
import {Groth16Verifier} from "bundle/inheritance/zk/Groth16Verifier.sol";
import {Groth16VerifierValidator} from "bundle/inheritance/zk/Groth16VerifierValidator.sol";

contract InheritanceFactory is Groth16Verifier {
    // オーナーアドレス -> プロキシアドレスのマッピング
    mapping(address => address) public ownerToProxy;

    // ディクショナリアドレスを保持する変数
    address public dictionaryAddress;

    // 管理者アドレスを保持する変数
    address public admin;
    Groth16VerifierValidator public zk;

    // コンストラクタで初期管理者を設定
    constructor(address _zk) {
        zk = Groth16VerifierValidator(_zk);
        admin = msg.sender;
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
        uint _hash,
        uint256 _lockTime,
        Schema.ZKProof calldata proof
    ) external returns (address) {
        zk.verifyProof(proof.pA, proof.pB, proof.pC, proof.pubSignals);

        bytes memory initializerData = abi.encodeCall(
            Initialize.initialize,
            (_hash, _lockTime, msg.sender, address(this))
        );

        address proxyAddress = address(
            new Proxy(dictionaryAddress, initializerData)
        );

        ownerToProxy[msg.sender] = proxyAddress;

        emit IInheritanceFactory.ProxyCreated(msg.sender, proxyAddress, _hash);
        return proxyAddress;
    }
}
