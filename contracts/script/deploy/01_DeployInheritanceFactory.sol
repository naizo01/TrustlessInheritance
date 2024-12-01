// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {MCScript, MCDevKit} from "@mc-devkit/Flattened.sol";
import "bundle/inheritance/InheritanceFactory.sol";

contract DeployInheritanceFactory is MCScript {
    function run() external startBroadcastWith("PRIVATE_KEY") {
        uint256 chainId = vm.envUint("CHAIN_ID");
        string memory zkEnvVar = string(
            abi.encodePacked("ZK_ADDR_", vm.toString(chainId))
        );
        address zk = vm.envAddress(zkEnvVar);
        address pushCommAddress = vm.envAddress("PUSH_COMM_ADDRESS");
        address channelAddress = vm.envAddress("CHANNEL_ADDRESS");

        // InheritanceFactoryコントラクトのデプロイ
        InheritanceFactory factory = new InheritanceFactory(zk, pushCommAddress, channelAddress);

        _saveAddrToEnv(address(factory), "INHERITANCE_DACTORY_ADDR_");
    }
}
