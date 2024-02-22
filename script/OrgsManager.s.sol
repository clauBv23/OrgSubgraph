// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {OrgsManager} from "../src/OrgsManager.sol";

contract OrgsManageScript is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();
        new OrgsManager();
    }
}
