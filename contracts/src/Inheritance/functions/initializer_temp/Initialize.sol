// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Initializable} from "@oz.mc/proxy/utils/Initializable.sol";
import {Storage} from "bundle/inheritance/storage/Storage.sol";

contract Initialize is Initializable {
    /**
     * @notice Initializes the inheritance contract with a hash and lock time
     * @param _hash The hash to be stored
     * @param _lockTime The lock time for the inheritance
     */
    function initialize(bytes32 _hash, uint256 _lockTime) external {
        // Function implementation goes here
    }
}
