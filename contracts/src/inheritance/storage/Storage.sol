// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Schema} from "./Schema.sol";

/**
 * @title Inheritance Storage Library v0.1.0
 */
library Storage {
    function InheritanceState() internal pure returns(Schema.InheritanceState storage ref) {
        assembly { ref.slot := 0x3b60124079255925a9b0c57f1ed870358d719ce06c4ae9645b74322357c0b401 }
    }
}