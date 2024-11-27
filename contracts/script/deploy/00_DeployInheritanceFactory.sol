// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {MCScript, MCDevKit} from "@mc-devkit/Flattened.sol";
import "bundle/Inheritance/InheritanceFactory.sol";

contract DeployInheritanceFactory is MCScript {
    function run() external  startBroadcastWith("DEPLOYER_PRIV_KEY") {
        // InheritanceFactoryコントラクトのデプロイ
        InheritanceFactory factory = new InheritanceFactory();

        _saveAddrToEnv(address(factory), "INHERITANCE_DACTORY_ADDR_");

    }
}