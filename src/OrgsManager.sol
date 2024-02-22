// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Organization} from "./Organization.sol";
import {Member} from "./Member.sol";

import {Org, MemberStruct} from "./Structs.sol";

contract OrgsManager is Organization, Member {
    event MemberAddedToOrganization(bytes32 orgId, bytes32 memberId);

    function addMemberToOrganization(
        bytes32 _orgId,
        bytes32 _memberId
    ) external {
        Org storage org = s_organizations[_orgId];
        MemberStruct storage member = s_members[_memberId];
        require(org.id != bytes32(0), "Org does not exist");
        require(org.owner == msg.sender, "Only the owner can add members");
        require(member.memberAddr != address(0), "Member does not exist");
        org.members.push(member.id);

        emit MemberAddedToOrganization(_orgId, _memberId);
    }
}
