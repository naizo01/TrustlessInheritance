// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Schema} from "bundle/inheritance/storage/Schema.sol";

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
    event InheritanceInitiated(address indexed owner, bytes32 proof, uint256 lockStartTime);
    event TokensWithdrawn(address indexed beneficiary, address[] tokens, uint256[] amounts);

    // Functions
    function initialize(uint _hash, uint256 _lockTime, address _owner) external;

    function addApprovedTokens(address[] calldata _tokens) external;

    function cancelInheritance() external;

    function initiateInheritance(
        Schema.ZKProof calldata proof
    ) external;

    function withdrawTokens(
        address[] calldata _tokens,
        uint256[] calldata _amounts,
        Schema.ZKProof calldata proof
    ) external;

    function owner() external view returns (address);

    function hash() external view returns (uint);

    function isLocked() external view returns (bool);

    function isKilled() external view returns (bool);

    function lockDuration() external view returns (uint256);

    function lockStartTime() external view returns (uint256);

    function nonce() external view returns (uint256);

    function approvedTokens() external view returns (address[] memory);

    function usedProofs(bytes32 proofHash) external view returns (bool);
}
