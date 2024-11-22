// contracts/VerifyZkproof.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Storage} from "bundle/inheritance/storage/Storage.sol";
import "./verifier.sol";

contract VerifyZkproof {
    Groth16Verifier public verifier;

    constructor(address _verifierAddress) {
        verifier = Groth16Verifier(_verifierAddress);
    }

    // ZKP検証用の構造体
    struct ZKProof {
        uint[2] pA;
        uint[2][2] pB;
        uint[2] pC;
        uint[2] pubSignals;
    }

    /**
     * @notice ZK proofをデコードして検証する関数
     * @param proof エンコードされたZK proof
     * @return 検証結果
     */
    function verifyZKProof(bytes calldata proof) external view returns (bool) {
        // bytesからZKProofにデコード
        ZKProof memory zkProof = abi.decode(proof, (ZKProof));

        // 保存されているハッシュと照合
        Schema.InheritanceState storage state = Storage.InheritanceState();
        require(state.secretHash == zkProof.pubSignals[0], "Hash mismatch");

        // Groth16 Verifierを使用して検証
        return verifier.verifyProof(
            zkProof.pA,
            zkProof.pB,
            zkProof.pC,
            zkProof.pubSignals
        );
    }
}