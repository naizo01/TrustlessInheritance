// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Schema} from "./Schema.sol";
import {Storage} from "./Storage.sol";

/**
 * @title InheritanceStateViewer with Getters
 */
contract InheritanceStateViewer {
    using Storage for Schema.InheritanceState;

    function owner() external view returns (address) {
        return Storage.InheritanceState().owner;
    }

    function hash() external view returns (bytes32) {
        return Storage.InheritanceState().hash;
    }

    function isLocked() external view returns (bool) {
        return Storage.InheritanceState().isLocked;
    }

    function isKilled() external view returns (bool) {
        return Storage.InheritanceState().isKilled;
    }

    function lockTime() external view returns (uint256) {
        return Storage.InheritanceState().lockTime;
    }

    function nonce() external view returns (uint256) {
        return Storage.InheritanceState().nonce;
    }

    function approvedTokens() external view returns (address[] memory) {
        return Storage.InheritanceState().approvedTokens;
    }

    function usedProofs(bytes memory proof) external view returns (bool) {
        return Storage.InheritanceState().usedProofs[proof];
    }
}