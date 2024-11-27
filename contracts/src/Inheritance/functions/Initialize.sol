// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Initializable} from "@oz.mc/proxy/utils/Initializable.sol";
import {Storage} from "bundle/inheritance/storage/Storage.sol";
import {Schema} from "bundle/inheritance/storage/Schema.sol";

contract Initialize is Initializable {
    /**
     * @notice Initializes the inheritance contract with a hash and lock time
     * @param _hash The hash to be stored
     * @param _lockTime The lock time for the inheritance
     */
    function initialize(uint _hash, uint256 _lockTime, address _owner, address _factory) external {
        Schema.InheritanceState storage state = Storage.InheritanceState();
        state.hash = _hash;
        state.lockDuration = _lockTime;
        state.owner = _owner;
        state.factory = _factory;
    }
}
