// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {MCScript, MCDevKit} from "@mc-devkit/Flattened.sol";
import {InheritanceDeployer} from "./InheritanceDeployer.sol";

contract DeployInheritanceScript is MCScript {
    function run() public startBroadcastWith("DEPLOYER_PRIV_KEY") {
        address dictionaryAddress = InheritanceDeployer.deployDictionaryInheritance(mc);
        _saveAddrToEnv(dictionaryAddress, "INHERITANCE_DICTIONARY_ADDR_");
    }
}