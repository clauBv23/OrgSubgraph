// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {MemberStruct} from "./Structs.sol";

contract Member {
    mapping(bytes32 memberId => MemberStruct member) s_members;

    function createMember(bytes32 _id, string memory _name) external {
        s_members[_id] = MemberStruct(_id, _name, msg.sender);
    }
}
