// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Storage} from "bundle/inheritance/storage/Storage.sol";
import {Schema} from "bundle/inheritance/storage/Schema.sol";

/**
 * @title InheritanceStateViewer with Getters
 */
contract InheritanceStateViewer {
    using Storage for Schema.InheritanceState;

    function owner() external view returns (address) {
        return Storage.InheritanceState().owner;
    }

    function hash() external view returns (uint) {
        return Storage.InheritanceState().hash;
    }

    function isLocked() external view returns (bool) {
        return Storage.InheritanceState().isLocked;
    }

    function isKilled() external view returns (bool) {
        return Storage.InheritanceState().isKilled;
    }

    function lockDuration() external view returns (uint256) {
        return Storage.InheritanceState().lockDuration;
    }

    function lockStartTime() external view returns (uint256) {
        return Storage.InheritanceState().lockStartTime;
    }

    function nonce() external view returns (uint256) {
        return Storage.InheritanceState().nonce;
    }

    function approvedTokens() external view returns (address[] memory) {
        return Storage.InheritanceState().approvedTokens;
    }

    function usedProofs(bytes32 proofHash) external view returns (bool) {
        return Storage.InheritanceState().usedProofs[proofHash];
    }
}