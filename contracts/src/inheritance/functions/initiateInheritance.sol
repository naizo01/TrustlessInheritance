// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Storage} from "bundle/inheritance/storage/Storage.sol";
import {Schema} from "bundle/inheritance/storage/Schema.sol";
import {IInheritanceContract} from "bundle/inheritance/interfaces/IInheritanceContract.sol";
import {IInheritanceFactory} from "bundle/inheritance/interfaces/IInheritanceFactory.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import {ZKPUtil} from "bundle/inheritance/zk/ZKPUtil.sol";

contract InitiateInheritance {
    /**
     * @notice Initiates the inheritance process using ZK proof
     * @param proof The ZK proof for verification
     */
    function initiateInheritance(Schema.ZKProof calldata proof) external {
        Schema.InheritanceState storage state = Storage.InheritanceState();
        bytes32 proofHash = ZKPUtil.hashZKProof(proof);

        require(!state.isLocked, "Inheritance process already initiated");
        require(!state.isKilled, "Inheritance contract is killed");
        require(!state.usedProofs[proofHash], "Proof already used");
        require(proof.pubSignals[0] == state.hash, "Invalid proof: hash mismatch");

        // Verify ZK proof
        require(
            IInheritanceFactory(state.factory).verifyProof(
                proof.pA,
                proof.pB,
                proof.pC,
                proof.pubSignals
            ),
            "Invalid ZK proof"
        );
        // Mark proof as used
        state.usedProofs[proofHash] = true;

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

        require(IInheritanceFactory(state.factory).sendNotification(state.owner), "Push sendNotification failed");

        // Update state
        state.lockStartTime = block.timestamp;
        state.isLocked = true;

        emit IInheritanceContract.InheritanceInitiated(state.owner, proofHash, state.lockStartTime);
    }
}
