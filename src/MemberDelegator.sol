// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IOrgsManagerEvents} from "./interfaces/IOrgsManagerEvents.sol";

contract MemberDelegator is IOrgsManagerEvents {
    bytes32 public memberId;
    string public name;

    constructor(bytes32 _memberId) {
        memberId = _memberId;
    }

    function setDelegatorName(string calldata _name) external {
        name = _name;
        emit DelegatorNameSet(memberId, _name);
    }

    function callDelegator() external {
        emit DelegatorCalled(memberId, msg.sender);
    }
}
