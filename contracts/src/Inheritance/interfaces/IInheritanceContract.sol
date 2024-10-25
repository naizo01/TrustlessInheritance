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

    // Functions
    function initialize(bytes32 _hash, uint256 _lockTime) external;

    function addApprovedTokens(address[] calldata _tokens) external;

    function cancelInheritance(address[] calldata _tokens) external;

    function initiateInheritanceZk(
        address[] calldata _tokens,
        bytes calldata proof
    ) external;

    function withdrawTokensZk(
        address[] calldata _tokens,
        uint256[] calldata _amounts,
        bytes calldata proof
    ) external;

    function initiateInheritanceSig(
        address[] calldata _tokens,
        bytes32 signedHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    function withdrawTokensSig(
        address[] calldata _tokens,
        uint256[] calldata _amounts,
        bytes32 signedHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;
}
