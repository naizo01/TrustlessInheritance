// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {MCScript, MCDevKit} from "@mc-devkit/Flattened.sol";
import {Groth16VerifierPassword} from "bundle/inheritance/zk/Groth16VerifierPassword.sol";

contract DeployZk is MCScript {
    function run() external  startBroadcastWith("PRIVATE_KEY") {
        // InheritanceFactoryコントラクトのデプロイ
        Groth16VerifierPassword zk = new Groth16VerifierPassword();

        _saveAddrToEnv(address(zk), "ZK_ADDR_");

    }
}