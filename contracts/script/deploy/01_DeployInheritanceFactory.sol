// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {MCScript, MCDevKit} from "@mc-devkit/Flattened.sol";
import "bundle/inheritance/InheritanceFactory.sol";

contract DeployInheritanceFactory is MCScript {
    function run() external  startBroadcastWith("PRIVATE_KEY") {
        address zk = vm.envAddress("ZK_ADDR_84532");

        // InheritanceFactoryコントラクトのデプロイ
        InheritanceFactory factory = new InheritanceFactory(zk);

        _saveAddrToEnv(address(factory), "INHERITANCE_DACTORY_ADDR_");

    }
}