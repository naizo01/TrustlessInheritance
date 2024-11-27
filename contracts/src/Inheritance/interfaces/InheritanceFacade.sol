// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "./IInheritanceContract.sol";

/**
 * @title Inheritance Facade v0.1.0
 * @custom:version IInheritanceContract:0.1.0
 */
contract InheritanceFacade is IInheritanceContract {
    function initialize(uint _hash, uint256 _lockTime, address _owner) external override {}

    function addApprovedTokens(address[] calldata _tokens) external override {}

    function cancelInheritance(address[] calldata _tokens) external override {}

    function initiateInheritance(
        bytes calldata proof
    ) external override {}

    function withdrawTokens(
        address[] calldata _tokens,
        uint256[] calldata _amounts,
        bytes calldata proof
    ) external override {}

}
