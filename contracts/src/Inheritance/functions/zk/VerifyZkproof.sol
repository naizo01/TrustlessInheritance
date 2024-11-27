// contracts/VerifyZkproof.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Storage} from "bundle/inheritance/storage/Storage.sol";
import {Schema} from "bundle/inheritance/storage/Schema.sol";
import {IInheritanceContract} from "bundle/inheritance/interfaces/IInheritanceContract.sol";
import "./Groth16Verifier.sol";

contract VerifyZkproof is Groth16Verifier {


    /**
     * @notice ZK proofをデコードして検証する関数
     * @param proof エンコードされたZK proof
     * @return 検証結果
     */
    function verifyZKProof(Schema.ZKProof calldata proof) internal view returns (bool) {
        // bytesからZKProofにデコード

        // 保存されているハッシュと照合
        Schema.InheritanceState storage state = Storage.InheritanceState();
        require(state.hash == proof.pubSignals[1], "Hash mismatch");

        // Groth16 Verifierを使用して検証
        return verifyProof(
            proof.pA,
            proof.pB,
            proof.pC,
            proof.pubSignals
        );
    }

    function hashZKProof(Schema.ZKProof memory proof) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(proof.pA, proof.pB, proof.pC, proof.pubSignals));
    }
}