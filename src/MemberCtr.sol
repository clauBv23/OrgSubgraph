// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Member} from "./Structs.sol";

contract MemberCtr {
    mapping(bytes32 memberId => Member member) public members;

    event MemberCreated(bytes32 memberId, string name, address adminAddr);

    function createMember(bytes32 _id, string memory _name) external {
        members[_id] = Member(_id, _name, msg.sender);
        emit MemberCreated(_id, _name, msg.sender);
    }

    function memberExists(bytes32 _id) public view returns (bool) {
        return members[_id].adminAddr != address(0);
    }

    function isMemberAdmin(bytes32 _id) public view returns (bool) {
        return members[_id].adminAddr == msg.sender;
    }
}
