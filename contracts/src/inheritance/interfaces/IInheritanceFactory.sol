// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Schema} from "bundle/inheritance/storage/Schema.sol";

/**
 * @title InheritanceFactory Interface
 */
interface IInheritanceFactory {
    // イベント
    event ProxyCreated(
        address indexed owner,
        address proxyAddress,
        uint keyHash
    );

    // 関数
    function setAdmin(address newAdmin) external;

    function setDictionaryAddress(address newDictionaryAddress) external;

    function createProxy(
        uint256 _lockTime,
        Schema.ZKProof calldata proof
    ) external returns (address);

    function ownerToProxy(address owner) external view returns (address);

    function dictionaryAddress() external view returns (address);

    function admin() external view returns (address);

    function verifyProof(
        uint[2] memory _pA,
        uint[2][2] memory _pB,
        uint[2] memory _pC,
        uint[1] memory _pubSignals
    ) external view returns (bool);

    function sendNotification(address recipient) external returns (bool);
}
