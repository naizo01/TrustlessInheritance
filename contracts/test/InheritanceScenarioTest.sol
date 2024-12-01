// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {MCTest, MCDevKit, stdError} from "@mc-devkit/Flattened.sol";
import {InheritanceDeployer} from "../script/deploy/InheritanceDeployer.sol";
import {Storage} from "bundle/inheritance/storage/Storage.sol";
import {IInheritanceContract} from "bundle/inheritance/interfaces/IInheritanceContract.sol";
import {InheritanceFactory} from "bundle/inheritance/InheritanceFactory.sol";
import {TestToken} from "bundle/test/TestToken.sol";
import {ProofData} from "./ProofData.sol";
import {Groth16VerifierPassword} from "bundle/inheritance/zk/Groth16VerifierPassword.sol";

contract InheritanceScenarioTest is MCTest {
    using InheritanceDeployer for MCDevKit;
    address public dictionaryAddress;
    Groth16VerifierPassword zk;
    InheritanceFactory factory;
    IInheritanceContract inheritanceContract;
    TestToken testToken1;
    TestToken testToken2;
    address alice = address(0x01);
    address bob = address(0x02);

    function setUp() public {
        zk = new Groth16VerifierPassword();
        factory = new InheritanceFactory(address(zk));

        dictionaryAddress = InheritanceDeployer.deployDictionaryInheritance(mc);
        factory.setDictionaryAddress(dictionaryAddress);

        vm.startPrank(alice);
        testToken1 = new TestToken(1e20);
        testToken2 = new TestToken(1e20);
        vm.stopPrank();
    }

    function test_success_withdrawTokens() public {
        vm.startPrank(alice);
        inheritanceContract = IInheritanceContract(
            factory.createProxy(90 days, ProofData.getProofValidator1())
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

        vm.startPrank(bob);
        inheritanceContract.initiateInheritance(ProofData.getProof1());

        vm.warp(vm.getBlockTimestamp() + 91 days);

        // 状態の確認
        assertTrue(
            inheritanceContract.isLockExpired(),
            "Lock should be expired"
        );
        assertTrue(inheritanceContract.isLocked(), "Contract should be locked");
        assertFalse(
            inheritanceContract.isKilled(),
            "Contract should not be killed"
        );

        inheritanceContract.withdrawTokens(
            tokens,
            amounts,
            ProofData.getProof2()
        );

        // 残高の確認
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

        // 引き出し完了の確認
        assertTrue(
            inheritanceContract.isWithdrawComplete(),
            "Withdraw should be complete"
        );

        vm.stopPrank();
    }

    function test_success_cancelInheritance() public {
        vm.startPrank(alice);
        inheritanceContract = IInheritanceContract(
            factory.createProxy(90 days, ProofData.getProofValidator1())
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

        assertFalse(
            inheritanceContract.isLocked(),
            "Contract should not be locked"
        );

        vm.startPrank(bob);
        inheritanceContract.initiateInheritance(ProofData.getProof1());
        vm.stopPrank();

        vm.startPrank(alice);
        inheritanceContract.cancelInheritance();

        // 状態の確認
        assertTrue(
            inheritanceContract.isLocked(),
            "Contract should be locked"
        );
        assertTrue(inheritanceContract.isKilled(), "Contract should be killed");

        // 残高の確認
        assertEq(
            testToken1.balanceOf(alice),
            1e20,
            "testToken1 balance is not 1e20"
        );
        assertEq(
            testToken2.balanceOf(alice),
            1e20,
            "testToken2 balance is not 1e20"
        );

        vm.stopPrank();
    }
}