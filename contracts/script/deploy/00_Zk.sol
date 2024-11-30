// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {MCScript, MCDevKit} from "@mc-devkit/Flattened.sol";
import {Groth16VerifierValidator} from "bundle/inheritance/zk/Groth16VerifierValidator.sol";

contract DeployZk is MCScript {
    function run() external  startBroadcastWith("PRIVATE_KEY") {
        // InheritanceFactoryコントラクトのデプロイ
        Groth16VerifierValidator zk = new Groth16VerifierValidator();

        _saveAddrToEnv(address(zk), "ZK_ADDR_");

    }
}