// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Storage} from "bundle/inheritance/storage/Storage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract initiateInheritance {
    /**
     * @notice Initiates the inheritance process using ZK proof
     * @param _tokens The list of token addresses involved in the inheritance
     * @param proof The ZK proof for verification
     */
    function initiateInheritance(address[] calldata _tokens, bytes calldata proof) external {
        Schema.InheritanceState storage state = Storage.InheritanceState();

        require(!state.isLocked, "Inheritance process already initiated");
        require(!state.isKilled, "Inheritance contract is killed");
        require(!state.usedProofs[proof], "Proof already used");

        /**
        受取人は、トークンを選んでロックすることができるようにするのか、それとも、継承元がapproveしたトークンはすべて受け取ることになるのか。
        下記の記述では、受取人がトークンを選んでロックすることができる。
        もし、資産相続元がapproveしたトークンはすべて受け取ることになるのであれば、initiateInheritance関数に引数として_tokensは与えずにstate.approvedTokensに対して繰り返しを実行するか、下記の記述に加えて_tokensとapprovedTokensの要素数を比較する記述を加える必要がある。
         */
        // Verify all tokens are approved
        for (uint256 i = 0; i < _tokens.length; i++) {
            bool isApproved = false;
            for (uint256 j = 0; j < state.approvedTokens.length; j++) {
                if (_tokens[i] == state.approvedTokens[j]) {
                    isApproved = true;
                    break;
                }
            }
            require(isApproved, "Unapproved token found");
        }

        // Verify ZK proof
        require(verifyZKProof(proof), "Invalid ZK proof");

        // Mark proof as used
        state.usedProofs[proof] = true;

        // Lock tokens
        for (uint i = 0; i < _tokens.length; i++) {
            IERC20 token = IERC20(_tokens[i]);
            uint256 balance = token.balanceOf(state.owner);
            require(token.transferFrom(state.owner, address(this), balance), "Token transfer failed");
        }

         // Update state
        state.isLocked = true;

        // ロックした日時、もしくは、ロックが解除される日時を状態変数に登録しておく必要はあるか。
    }
}
