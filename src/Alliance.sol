// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IOrgsManagerEvents} from "./interfaces/IOrgsManagerEvents.sol";

contract Alliance is IOrgsManagerEvents {
    mapping(uint256 allianceId => bool exists) public alliances;

    function createAlliance(uint256 _allianceNumber) external {
        alliances[_allianceNumber] = true;
        emit AllianceCreated(_allianceNumber);
    }
}
