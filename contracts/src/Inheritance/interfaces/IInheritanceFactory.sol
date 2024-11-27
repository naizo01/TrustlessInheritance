// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

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
        uint _hash,
        uint256 _lockTime
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
}