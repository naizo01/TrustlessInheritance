// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {MCTest, MCDevKit, stdError} from "@mc-devkit/Flattened.sol";
import {InheritanceDeployer} from "../script/deploy/InheritanceDeployer.sol";
import {Storage} from "bundle/inheritance/storage/Storage.sol";
import {IInheritanceContract} from "bundle/inheritance/interfaces/IInheritanceContract.sol";
import {InheritanceFactory} from "bundle/InheritanceFactory.sol";
import {TestToken} from "bundle/test/TestToken.sol";

contract InheritanceScenarioTest is MCTest {
    using InheritanceDeployer for MCDevKit;
    address public dictionaryAddress;
    InheritanceFactory factory;
    IInheritanceContract inheritanceContract;
    TestToken testToken1;
    TestToken testToken2;
    address alice = address(0x01);
    address bob = address(0x02);

    function setUp() public {
        factory = new InheritanceFactory();

        dictionaryAddress = InheritanceDeployer.deployDictionaryInheritance(mc);
        factory.setDictionaryAddress(dictionaryAddress);

        vm.startPrank(alice);
        testToken1 = new TestToken(1e20);
        testToken2 = new TestToken(1e20);
        vm.stopPrank();
    }

    function test_success() public {
        uint hash = uint(1);
        vm.startPrank(alice);
        inheritanceContract = IInheritanceContract(
            factory.createProxy(hash, 90 days)
        );
        testToken1.approve(address(inheritanceContract), type(uint256).max);
        testToken2.approve(address(inheritanceContract), type(uint256).max);
        address[] memory tokens = new address[](2);
        tokens[0] = address(testToken1);
        tokens[1] = address(testToken2);
        inheritanceContract.addApprovedTokens(tokens);
        vm.stopPrank();

        uint256[] memory amounts = new uint256[](2);
        amounts[0] = 1e20;
        amounts[1] = 1e20;
        bytes memory byteData1 = abi.encodePacked(uint256(1));
        bytes memory byteData2 = abi.encodePacked(uint256(2));

        vm.startPrank(bob);
        inheritanceContract.initiateInheritance(byteData1);

        vm.warp(vm.getBlockTimestamp() + 90 days);

        inheritanceContract.withdrawTokens(tokens, amounts, byteData2);
        assertEq(
            testToken1.balanceOf(bob),
            1e20,
            "testToken1 balance is not 1e20"
        );
        assertEq(
            testToken2.balanceOf(bob),
            1e20,
            "testToken2 balance is not 1e20"
        );
        vm.stopPrank();
    }

    receive() external payable {}
}
