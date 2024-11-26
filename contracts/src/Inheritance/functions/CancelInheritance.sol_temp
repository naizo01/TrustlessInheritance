// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Storage} from "bundle/inheritance/storage/Storage.sol";
import {Schema} from "bundle/inheritance/storage/Schema.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CancelInheritance {
    /**
     * @notice Cancels the inheritance process
     */
    function cancelInheritance() external {
        Schema.InheritanceState storage state = Storage.InheritanceState();
        
        require(msg.sender == state.owner, "Only the owner can cancel inheritance");
        require(state.approvedTokens.length > 0, "No approved tokens");
        require(!state.isKilled, "Contract is already killed");

        for (uint256 i = 0; i < state.approvedTokens.length; i++) {
            IERC20 token = IERC20(state.approvedTokens[i]);
            uint256 balance = token.balanceOf(address(this));
            if (balance > 0) {
                require(token.transfer(state.owner, balance), "Token transfer failed");
            }
        }
        state.isKilled = true;
        emit InheritanceCancelled(state.owner, state.approvedTokens);
    }
}
