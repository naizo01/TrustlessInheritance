// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "./IInheritanceContract.sol";

/**
 * @title Inheritance Facade v0.1.0
 * @custom:version IInheritanceContract:0.1.0
 */
contract InheritanceFacade is IInheritanceContract {
    function initialize(bytes32 _hash, uint256 _lockTime) external override {}

    function addApprovedTokens(address[] calldata _tokens) external override {}

    function cancelInheritance(address[] calldata _tokens) external override {}

    function initiateInheritanceZk(
        address[] calldata _tokens,
        bytes calldata proof
    ) external override {}

    function withdrawTokensZk(
        address[] calldata _tokens,
        uint256[] calldata _amounts,
        bytes calldata proof
    ) external override {}

    function initiateInheritanceSig(
        address[] calldata _tokens,
        bytes32 signedHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external override {}

    function withdrawTokensSig(
        address[] calldata _tokens,
        uint256[] calldata _amounts,
        bytes32 signedHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external override {}
}
