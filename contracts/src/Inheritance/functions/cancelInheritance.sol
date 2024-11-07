// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Storage} from "bundle/inheritance/storage/Storage.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract cancelInheritance {
    event InheritanceCancelled(address indexed owner, address[] tokens);
    /**
     * @notice Cancels the inheritance process
     * @param _tokens The list of token addresses involved in the inheritance
     */
    function cancelInheritance(address[] calldata _tokens) external {
    // ↑の引数として"address[] calldata _tokens"は必要なのか。stateを参照して変数に格納して与えればよいのでは。
        Schema.InheritanceState storage state = Storage.InheritanceState();
        
        require(msg.sender == state.owner, "Only the owner can cancel inheritance");
        require(_tokens.length > 0, "Token list cannot be empty");
        require(!state.isKilled, "Contract is already killed");

        for (uint256 i = 0; i < _tokens.length; i++) {
            IERC20 token = IERC20(_tokens[i]);
            uint256 balance = token.balanceOf(address(this));
            if (balance > 0) {
                require(token.transfer(state.owner, balance), "Token transfer failed");
            }
        }
        state.isKilled = true;
        emit InheritanceCancelled(state.owner, _tokens);
    }
}
