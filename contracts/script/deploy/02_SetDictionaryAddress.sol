// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {MCScript, MCDevKit} from "@mc-devkit/Flattened.sol";
import {InheritanceFactory} from "bundle/Inheritance/InheritanceFactory.sol";

contract SetDictionaryAddress is MCScript {
    function run() external startBroadcastWith("DEPLOYER_PRIV_KEY") {
        // 環境変数からアドレスを取得
        address factoryAddress = vm.envAddress("INHERITANCE_FACTORY_ADDR");
        address dictionaryAddress = vm.envAddress("INHERITANCE_DICTIONARY_ADDR");

        // InheritanceFactoryコントラクトのインスタンスを作成
        InheritanceFactory factory = InheritanceFactory(factoryAddress);

        // setDictionaryAddress関数を呼び出し
        factory.setDictionaryAddress(dictionaryAddress);

    }
}