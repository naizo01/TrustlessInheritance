// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import {MockERC20} from "./MockERC20.sol";

contract MockToken is MockERC20 {
    constructor(
        string memory _name,
        string memory _symbol
    ) MockERC20(_name, _symbol, 18) {}
}

contract MockTokenScript is Script {

    function run() public {
        vm.startBroadcast();
        address etherAddress = address(new MockToken("Ether", "ETH"));
        writeDeployedAddress(etherAddress, "Ether");

        address tetherAddress = address(new MockToken("Tether USD", "USDT"));
        writeDeployedAddress(tetherAddress, "TetherUSD");

        address usdcAddress = address(new MockToken("USD Coin", "USDC"));
        writeDeployedAddress(usdcAddress, "USD_Coin");

        address daiAddress = address(new MockToken("Dai Stablecoin", "DAI"));
        writeDeployedAddress(daiAddress, "Dai");

        address wbtcAddress = address(new MockToken("Wrapped Bitcoin", "WBTC"));
        writeDeployedAddress(wbtcAddress, "WrappedBitcoin");

        address linkAddress = address(new MockToken("Chainlink", "LINK"));
        writeDeployedAddress(linkAddress, "Chainlink");

        address uniAddress = address(new MockToken("Uniswap", "UNI"));
        writeDeployedAddress(uniAddress, "Uniswap");

        address aaveAddress = address(new MockToken("Aave", "AAVE"));
        writeDeployedAddress(aaveAddress, "Aave");

        address compAddress = address(new MockToken("Compound", "COMP"));
        writeDeployedAddress(compAddress, "Compound");

        address mkrAddress = address(new MockToken("Maker", "MKR"));
        writeDeployedAddress(mkrAddress, "Maker");

        vm.stopBroadcast();
    }

    string constant directory = "./deployments/";

    function writeDeployedAddress(
        address proxyAddress,
        string memory fileName
    ) internal {
        // ファイルにデプロイしたアドレスを書き出す
        string memory path = string(abi.encodePacked(directory, "/", fileName));
        vm.writeFile(path, vm.toString(proxyAddress));

        // コンソールにアドレスとファイルパスを出力
        // console.log("Deployed address:", proxyAddress);
        // console.log("Written to file:", path);
    }
}
