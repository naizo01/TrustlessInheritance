// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {MCScript, MCDevKit} from "@mc-devkit/Flattened.sol";
import {MockPushCommV2} from "bundle/test/MockPushCommV2.sol";

contract DeployMockPushComm is MCScript {
    function run() external startBroadcastWith("PRIVATE_KEY") {
        // MockPushCommV2コントラクトのデプロイ
        MockPushCommV2 mockPushComm = new MockPushCommV2();

        // デプロイされたコントラクトのアドレスを保存
        _saveAddrToEnv(address(mockPushComm), "PUSH_COMM_ADDR_");
    }
}