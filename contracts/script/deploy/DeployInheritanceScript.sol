// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {MCScript, MCDevKit} from "@mc-devkit/Flattened.sol";
import {InheritanceDeployer} from "./InheritanceDeployer.sol";

contract DeployInheritanceScript is MCScript {
    function run() public startBroadcastWith("DEPLOYER_PRIV_KEY") {
        bytes32 hash = 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef; // 例としてのハッシュ値
        uint256 lockTime = 90 days; // 例としてのロック期間

        address _inheritance = InheritanceDeployer.deployInheritance(mc, hash, lockTime);
        _saveAddrToEnv(_inheritance, "INHERITANCE_PROXY_ADDR_");
    }
}