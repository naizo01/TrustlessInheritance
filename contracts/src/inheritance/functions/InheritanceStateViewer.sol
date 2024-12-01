// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Storage} from "bundle/inheritance/storage/Storage.sol";
import {Schema} from "bundle/inheritance/storage/Schema.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

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

    function isLockExpired() external view returns (bool) {
        uint256 lockEndTime = Storage.InheritanceState().lockStartTime +
            Storage.InheritanceState().lockDuration;
        return block.timestamp > lockEndTime;
    }

    function isWithdrawComplete() external view returns (bool) {
        address[] memory tokens = Storage.InheritanceState().approvedTokens;
        for (uint256 i = 0; i < tokens.length; i++) {

            IERC20 token = IERC20(tokens[i]);
            uint256 balance = token.balanceOf(address(this));
            if (balance > 0) {
                return false; // 残高が残っているトークンがある場合
            }
        }
        return true; // すべてのトークンの残高が0の場合
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
