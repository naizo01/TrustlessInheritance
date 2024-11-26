// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

/**
 * @title InheritanceContract Interface v0.1.0
 * @custom:version schema:0.1.0
 * @custom:version functions:0.1.0
 * @custom:version errors:0.1.0
 * @custom:version events:0.1.0
 */
interface IInheritanceContract {
    // Errors

    // Events
    event InheritanceCancelled(address indexed owner, address[] approvedTokens);
    event InheritanceInitiated(address indexed owner, bytes proof, uint256 lockStartTime);
    event TokensWithdrawn(address indexed beneficiary, address[] tokens, uint256[] amounts);

    // Functions
    function initialize(bytes32 _hash, uint256 _lockTime) external;

    function addApprovedTokens(address[] calldata _tokens) external;

    function cancelInheritance(address[] calldata _tokens) external;

    function initiateInheritance(
        address[] calldata _tokens,
        bytes32 proof
    ) external;

    function withdrawTokens(
        address[] calldata _tokens,
        uint256[] calldata _amounts,
        bytes32 proof
    ) external;
}
