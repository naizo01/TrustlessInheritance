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
        Schema.ZKProof calldata proof
    ) external override {}

    function withdrawTokens(
        address[] calldata _tokens,
        uint256[] calldata _amounts,
        Schema.ZKProof calldata proof
    ) external override {}
    function owner() external view returns (address){}

    function hash() external view returns (uint){}

    function isLocked() external view returns (bool){}

    function isKilled() external view returns (bool){}

    function lockDuration() external view returns (uint256){}

    function lockStartTime() external view returns (uint256){}

    function nonce() external view returns (uint256){}

    function approvedTokens() external view returns (address[] memory){}

    function usedProofs(bytes32 proofHash) external view returns (bool){}
}
