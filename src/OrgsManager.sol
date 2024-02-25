// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Organization, Member} from "./Structs.sol";

import {MemberCtr} from "./MemberCtr.sol";
import {AllianceCtr} from "./AllianceCtr.sol";
import {OrganizationCtr} from "./OrganizationCtr.sol";

import {IOrgsManagerEvents} from "./interfaces/IOrgsManagerEvents.sol";

contract OrgsManager is
    IOrgsManagerEvents,
    OrganizationCtr,
    MemberCtr,
    AllianceCtr
{
    error NonExistentOrganization(bytes32 orgId);
    error NonExistentMember(bytes32 memberId);
    error NonExistentAlliance(uint256 allianceNumber);
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

    function joinAlliance(
        uint256 _allianceNumber,
        bytes32 _orgId
    )
        external
        existentAlliance(_allianceNumber)
        existentOrganization(_orgId)
        onlyOrganizationOwner(_orgId)
    {
        emit OrganizationJoinedAlliance(_allianceNumber, _orgId);
    }

    function leaveAlliance(
        uint256 _allianceNumber,
        bytes32 _orgId
    )
        external
        existentAlliance(_allianceNumber)
        existentOrganization(_orgId)
        onlyOrganizationOwner(_orgId)
    {
        emit OrganizationLeavedAlliance(_allianceNumber, _orgId);
    }

    function addMemberDelegator(
        bytes32 _memberId,
        address _delegatorAddr
    ) external existentMember(_memberId) onlyMemberAdmin(_memberId) {
        _addDelegatorToMember(_memberId, _delegatorAddr);
    }

    modifier existentAlliance(uint256 _allianceNumber) {
        _checkAllianceExists(_allianceNumber);
        _;
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

    function _checkAllianceExists(uint256 _allianceNumber) internal view {
        if (!alliances[_allianceNumber]) {
            revert NonExistentAlliance(_allianceNumber);
        }
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
