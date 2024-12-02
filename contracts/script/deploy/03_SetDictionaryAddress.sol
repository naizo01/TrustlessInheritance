// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {MCScript, MCDevKit} from "@mc-devkit/Flattened.sol";
import {InheritanceFactory} from "bundle/inheritance/InheritanceFactory.sol";

contract SetDictionaryAddress is MCScript {
    function run() external startBroadcastWith("PRIVATE_KEY") {
        // 環境変数からCHAIN_IDを取得
        uint256 chainId = vm.envUint("CHAIN_ID");

        // 環境変数名を動的に生成
        string memory factoryEnvVar = string(
            abi.encodePacked("INHERITANCE_FACTORY_ADDR_", vm.toString(chainId))
        );
        string memory dictionaryEnvVar = string(
            abi.encodePacked("INHERITANCE_DICTIONARY_ADDR_", vm.toString(chainId))
        );

        // 環境変数からアドレスを取得
        address factoryAddress = vm.envAddress(factoryEnvVar);
        address dictionaryAddress = vm.envAddress(dictionaryEnvVar);

        // InheritanceFactoryコントラクトのインスタンスを作成
        InheritanceFactory factory = InheritanceFactory(factoryAddress);

        // setDictionaryAddress関数を呼び出し
        factory.setDictionaryAddress(dictionaryAddress);

    }
}