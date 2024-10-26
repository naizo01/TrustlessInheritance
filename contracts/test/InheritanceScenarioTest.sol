// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {MCTest, MCDevKit, stdError} from "@mc-devkit/Flattened.sol";
import {InheritanceDeployer} from "../script/deploy/InheritanceDeployer.sol";
import {Storage} from "bundle/inheritance/storage/Storage.sol";
import {IInheritanceContract} from "bundle/inheritance/interfaces/IInheritanceContract.sol";

contract InheritanceScenarioTest is MCTest {
    using InheritanceDeployer for MCDevKit;
    IInheritanceContract public inheritanceContract;

    function setUp() public {
        inheritanceContract = IInheritanceContract(InheritanceDeployer.deployInheritance(mc, "0x123456", 90 days));
    }

    function test_success() public {

    }


}