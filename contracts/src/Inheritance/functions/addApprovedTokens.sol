// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Storage} from "bundle/inheritance/storage/Storage.sol";

contract addApprovedTokens {
    /**
     * @notice Adds approved tokens for inheritance
     * @param _tokens The list of token addresses to approve
     */
    function addApprovedTokens(address[] calldata _tokens) external {
        Schema.InheritanceState storage state = Storage.InheritanceState();
        
        for (uint256 i = 0; i < _tokens.length; i++) {
            state.approvedTokens.push(_tokens[i]);
        }
    }
}
