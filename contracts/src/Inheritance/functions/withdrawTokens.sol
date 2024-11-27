// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Storage} from "bundle/inheritance/storage/Storage.sol";
import {Schema} from "bundle/inheritance/storage/Schema.sol";
import {IInheritanceContract} from "bundle/inheritance/interfaces/IInheritanceContract.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {VerifyZkproof} from "bundle/inheritance/functions/zk/VerifyZkproof.sol";

contract WithdrawTokens is VerifyZkproof {
    /**
     * @notice Withdraws tokens after the lock period using ZK proof
     * @param _tokens The list of token addresses to withdraw
     * @param _amounts The amounts of each token to withdraw
     * @param proof The ZK proof for verification
     */
    function withdrawTokens(address[] calldata _tokens, uint256[] calldata _amounts, bytes calldata proof) external {
        require(_tokens.length == _amounts.length, "Tokens and amounts length mismatch");
        
        Schema.InheritanceState storage state = Storage.InheritanceState();

        require(state.isLocked && !state.isKilled, "Contract is not in locked state or is killed");
        require(block.timestamp >= state.lockStartTime + state.lockDuration, "Lock period has not ended");
        require(!state.usedProofs[proof], "Proof already used");
        
        /*
        approveされた額は0じゃないけど、このコントラクト内の残高は0のトークンをチェックする必要はあるか。
        */
        
        // Verify all tokens are approved
        for (uint256 i = 0; i < _tokens.length; i++) {
            bool isTokenHeld = false;
            for (uint256 j = 0; j < state.approvedTokens.length; j++) {
                if (_tokens[i] == state.approvedTokens[j]) {
                    isTokenHeld = true;
                    break;
                }
            }
            require(isTokenHeld, "Token that did not lock was found.");
        }

        // Verify ZK proof
        require(verifyZKProof(proof), "Invalid ZK proof");

        // Mark proof as used
        state.usedProofs[proof] = true;

        // Transfer tokens
        for (uint256 i = 0; i < _tokens.length; i++) {
            IERC20 token = IERC20(_tokens[i]);
            uint256 balance = token.balanceOf(address(this));
            uint256 amount = _amounts[i] > balance ? balance : _amounts[i];
            require(token.transfer(msg.sender, amount), "Token transfer failed");
        }
        emit IInheritanceContract.TokensWithdrawn(msg.sender, _tokens, _amounts);
    }
}
