// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Member} from "./Structs.sol";
import {IOrgsManagerEvents} from "./interfaces/IOrgsManagerEvents.sol";

contract MemberCtr is IOrgsManagerEvents {
    mapping(bytes32 memberId => Member member) public members;

    function createMember(bytes32 _id, string calldata _name) external {
        members[_id] = Member(_id, _name, msg.sender, address(0));
        emit MemberCreated(_id, _name, msg.sender);
    }

    function memberExists(bytes32 _id) public view returns (bool) {
        return members[_id].adminAddr != address(0);
    }

    function _addDelegatorToMember(
        bytes32 _id,
        address _delegatorAddr
    ) internal {
        // check permissions and existence before calling this function
        members[_id].delegatorAddr = _delegatorAddr;
        emit MemberDelegatorAdded(_id, _delegatorAddr);
    }

    function isMemberAdmin(bytes32 _id) public view returns (bool) {
        return members[_id].adminAddr == msg.sender;
    }
}
