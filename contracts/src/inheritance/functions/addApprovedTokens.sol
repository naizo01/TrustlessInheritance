// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Storage} from "bundle/inheritance/storage/Storage.sol";
import {Schema} from "bundle/inheritance/storage/Schema.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AddApprovedTokens {
    /**
     * @notice Adds approved tokens for inheritance
     * @param _tokens The list of token addresses to approve
     */
    function addApprovedTokens(address[] calldata _tokens) external {
        Schema.InheritanceState storage state = Storage.InheritanceState();

        for (uint256 i = 0; i < _tokens.length; i++) {
            address tokenAddress = _tokens[i];
            if (tokenAddress == address(0)) {
                continue; // address(0)の場合はスキップ
            }
            IERC20 token = IERC20(tokenAddress);
            uint256 allowance = token.allowance(msg.sender, address(this));
            require(allowance > 0, "Token allowance is zero");

            state.approvedTokens.push(tokenAddress);
        }
    }
}
