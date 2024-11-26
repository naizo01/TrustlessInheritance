// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {MCDevKit} from "@mc-devkit/Flattened.sol";
// Interface
import {InheritanceFacade} from "bundle/inheritance/interfaces/InheritanceFacade.sol";
// Functions
import {Initialize} from "bundle/inheritance/functions/initializer/Initialize.sol";
import {AddApprovedTokens} from "bundle/inheritance/functions/AddApprovedTokens.sol";
import {CancelInheritance} from "bundle/inheritance/functions/CancelInheritance.sol";
import {WithdrawTokens} from "bundle/inheritance/functions/WithdrawTokens.sol";
import {InitiateInheritance} from "bundle/inheritance/functions/InitiateInheritance.sol";
import {InheritanceStateViewer} from "bundle/inheritance/functions/InheritanceStateViewer.sol";

/**
 * @title InheritanceDeployer
 * @dev Library for deploying and initializing Inheritance contracts
 */
library InheritanceDeployer {
    string internal constant BUNDLE_NAME = "Inheritance";

    /**
     * @dev Deploys the Inheritance contract
     * @param mc MCDevKit storage reference
     * @return inheritance Address of the deployed Inheritance proxy contract
     */
    function deployDictionaryInheritance(MCDevKit storage mc) internal returns(address inheritance) {
        mc.init(BUNDLE_NAME);
        mc.use("Initialize", Initialize.initialize.selector, address(new Initialize()));
        mc.use("AddApprovedTokens", AddApprovedTokens.addApprovedTokens.selector, address(new AddApprovedTokens()));
        mc.use("CancelInheritance", CancelInheritance.cancelInheritance.selector, address(new CancelInheritance()));
        mc.use("WithdrawTokens", WithdrawTokens.withdrawTokens.selector, address(new WithdrawTokens()));
        mc.use("InitiateInheritance", InitiateInheritance.initiateInheritance.selector, address(new InitiateInheritance()));

        // InheritanceStateViewer functions
        InheritanceStateViewer viewer = new InheritanceStateViewer();
        mc.use("Owner", viewer.owner.selector, address(viewer));
        mc.use("Hash", viewer.hash.selector, address(viewer));
        mc.use("IsLocked", viewer.isLocked.selector, address(viewer));
        mc.use("IsKilled", viewer.isKilled.selector, address(viewer));
        mc.use("LockDuration", viewer.lockDuration.selector, address(viewer));
        mc.use("LockStartTime", viewer.lockStartTime.selector, address(viewer));
        mc.use("Nonce", viewer.nonce.selector, address(viewer));
        mc.use("ApprovedTokens", viewer.approvedTokens.selector, address(viewer));
        mc.use("UsedProofs", viewer.usedProofs.selector, address(viewer));

        mc.useFacade(address(new InheritanceFacade()));
        return mc.toDictionaryAddress();
    }
}