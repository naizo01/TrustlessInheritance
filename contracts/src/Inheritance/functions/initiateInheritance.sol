// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Storage} from "bundle/inheritance/storage/Storage.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract initiateInheritance {
    /**
     * @notice Initiates the inheritance process using ZK proof
     * @param proof The ZK proof for verification
     */
    function initiateInheritance(bytes calldata proof) external {
        Schema.InheritanceState storage state = Storage.InheritanceState();

        require(!state.isLocked, "Inheritance process already initiated");
        require(!state.isKilled, "Inheritance contract is killed");
        require(!state.usedProofs[proof], "Proof already used");

        // Verify ZK proof
        require(verifyZKProof(proof), "Invalid ZK proof");

        // Mark proof as used
        state.usedProofs[proof] = true;

        // Lock tokens
        for (uint i = 0; i < state.approvedTokens.length; i++) {
            IERC20 token = IERC20(state.approvedTokens[i]);
            uint256 allowance = token.allowance(state.owner, address(this));
            
            if (allowance == 0) {
                // Remove token from approvedTokens if allowance is 0
                state.approvedTokens[i] = state.approvedTokens[state.approvedTokens.length - 1];
                state.approvedTokens.pop();
                i--;
            } else {
                uint256 balance = token.balanceOf(state.owner);
                uint256 transferAmount = Math.min(allowance, balance);
                
                require(token.transferFrom(state.owner, address(this), transferAmount), "Token transfer failed");
            }
        }

        // Update state
        state.lockStartTime = block.timestamp;
        state.isLocked = true;
    }
}
