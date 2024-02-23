// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {OrganizationCtr} from "./OrganizationCtr.sol";
import {MemberCtr} from "./MemberCtr.sol";

import {Organization, Member} from "./Structs.sol";

contract OrgsManager is OrganizationCtr, MemberCtr {
    // ? should the events have indexes?
    event MemberJoinedOrganization(bytes32 orgId, bytes32 memberId);
    event MemberLeavedOrganization(bytes32 orgId, bytes32 memberId);
    event VotingPowerSetToMember(
        bytes32 orgId,
        bytes32 memberId,
        uint256 votingPower
    );

    error NonExistentOrganization(bytes32 orgId);
    error NonExistentMember(bytes32 memberId);
    error PermissionDenied(address caller);

    function joinOrganization(
        bytes32 _orgId,
        bytes32 _memberId
    )
        external
        existentOrganization(_orgId)
        existentMember(_memberId)
        onlyMemberAdmin(_memberId)
    {
        emit MemberJoinedOrganization(_orgId, _memberId);
    }

    function leaveOrganization(
        bytes32 _orgId,
        bytes32 _memberId
    )
        external
        existentOrganization(_orgId)
        existentMember(_memberId)
        onlyMemberAdmin(_memberId)
    {
        emit MemberLeavedOrganization(_orgId, _memberId);
    }

    function setVotingPowerToMember(
        bytes32 _orgId,
        bytes32 _memberId,
        uint256 _votingPower
    )
        external
        existentOrganization(_orgId)
        existentMember(_memberId)
        onlyOrganizationOwner(_orgId)
    {
        emit VotingPowerSetToMember(_orgId, _memberId, _votingPower);
    }

    modifier existentMember(bytes32 _memberId) {
        _checkMemberExists(_memberId);
        _;
    }

    modifier existentOrganization(bytes32 _orgId) {
        _checkOrganizationExists(_orgId);
        _;
    }

    modifier onlyMemberAdmin(bytes32 _memberId) {
        _checkIsMemberAdmin(_memberId);
        _;
    }

    modifier onlyOrganizationOwner(bytes32 _orgId) {
        _checkOrganizationExists(_orgId);
        _;
    }

    function _checkMemberExists(bytes32 _memberId) internal view {
        if (!memberExists(_memberId)) {
            revert NonExistentMember(_memberId);
        }
    }

    function _checkOrganizationExists(bytes32 _orgId) internal view {
        if (!organizationExists(_orgId)) {
            revert NonExistentOrganization(_orgId);
        }
    }

    function _checkIsMemberAdmin(bytes32 _memberId) internal view {
        if (!isMemberAdmin(_memberId)) {
            revert PermissionDenied(msg.sender);
        }
    }

    function _checkIsOrganizationOwner(bytes32 _orgId) internal view {
        if (!isOrganizationOwner(_orgId)) {
            revert PermissionDenied(msg.sender);
        }
    }
}

// todo add 3 types of relationships
// 1 to 1
// 1 to many
// many to many => already achieved with organization <=> members
// todo a subgraph for a dynamically created subgraph
// todo a call handlers
