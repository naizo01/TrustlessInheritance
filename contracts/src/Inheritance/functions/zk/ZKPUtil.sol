// contracts/ZkpUtl.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Schema} from "bundle/inheritance/storage/Schema.sol";

library ZKPUtil {
    function hashZKProof(Schema.ZKProof memory proof) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(proof.pA, proof.pB, proof.pC, proof.pubSignals));
    }
}