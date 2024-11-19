// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Storage} from "bundle/inheritance/storage/Storage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract withdrawTokens {
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
        // ロック期間が終了しているか判定。ロック期間の終了時点をどう参照するべきか。
        require(block.timestamp >= ロック期間終了時点, "Lock period has not ended");

        require(!state.usedProofs[proof], "Proof already used");

        /**
         受取人は、ロックされているトークンのうち選択したトークンだけ引き出すことができるようにするのか、それともロックされているトークンをすべて引き出すことになるのか。
         下記の記述は、initiateInheritance関数で受取人がapprovedTokensの一部をロックし、withdrawTokens関数でロックした一部を選んで引き出す場合。
         もし、initiateInheritanceでロックしたトークンはすべて受け取ることになるのであれば、initiateInheritance関数に引数として_tokensは与えずにロックされたトークンの配列に対して繰り返しを実行するか、下記の記述に加えて_tokensとロックされたトークンの配列の要素数を比較する記述を加える必要がある。
         */
        // Verify all tokens are approved
        for (uint256 i = 0; i < _tokens.length; i++) {
            bool isApproved = false;
            for (uint256 j = 0; j < ロックされたトークンの配列.length; j++) {
                if (_tokens[i] == ロックされたトークンの配列[j]) {
                    isApproved = true;
                    break;
                }
            }
            require(isApproved, "Token that did not lock was found.");
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
    }
}
