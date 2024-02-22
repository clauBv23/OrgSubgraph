// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {MemberStruct} from "./Structs.sol";

contract Member {
    mapping(bytes32 memberId => MemberStruct member) s_members;

    event MemberCreated(bytes32 memberId, string name);

    function createMember(bytes32 _id, string memory _name) external {
        s_members[_id] = MemberStruct(_id, _name, msg.sender);

        emit MemberCreated(_id, _name);
    }

    function getMember(
        bytes32 _id
    ) external view returns (MemberStruct memory) {
        return s_members[_id];
    }
}
