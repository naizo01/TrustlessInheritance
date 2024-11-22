// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {MCDevKit} from "@mc-devkit/Flattened.sol";
// Interface
import {InheritanceFacade} from "bundle/inheritance/interfaces/InheritanceFacade.sol";
// Functions
import {Initialize} from "bundle/inheritance/functions/initializer/Initialize.sol";
import {addApprovedTokens} from "bundle/inheritance/functions/addApprovedTokens.sol";
import {cancelInheritance} from "bundle/inheritance/functions/cancelInheritance.sol";
import {withdrawTokens} from "bundle/inheritance/functions/withdrawTokens.sol";
import {initiateInheritance} from "bundle/inheritance/functions/initiateInheritance.sol";

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
        mc.use("AddApprovedTokens", addApprovedTokens.addApprovedTokens.selector, address(new addApprovedTokens()));
        mc.use("CancelInheritance", cancelInheritance.cancelInheritance.selector, address(new cancelInheritance()));
        mc.use("WithdrawTokens", withdrawTokens.withdrawTokens.selector, address(new withdrawTokens()));
        mc.use("InitiateInheritance", initiateInheritance.initiateInheritance.selector, address(new initiateInheritance()));
        mc.useFacade(address(new InheritanceFacade()));
        return mc.toDictionaryAddress();
    }
}