// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Member} from "./Member.sol";
import {Alliance} from "./Alliance.sol";
import {Organization} from "./Organization.sol";

import {IOrgsManagerEvents} from "./interfaces/IOrgsManagerEvents.sol";

contract OrgsManager is IOrgsManagerEvents, Organization, Member, Alliance {
    error NonExistentOrganization(bytes32 orgId);
    error NonExistentMember(bytes32 memberId);
    error NonExistentAlliance(uint256 allianceNumber);
    error PermissionDenied(address caller);
    error NonExistentParticipant(bytes32 participantId);

    function joinOrganization(bytes32 _orgId, bytes32 _memberId)
        external
        existentOrganization(_orgId)
        existentMember(_memberId)
        onlyMemberAdmin(_memberId)
    {
        emit MemberJoinedOrganization(_orgId, _memberId);
    }

    function leaveOrganization(bytes32 _orgId, bytes32 _memberId)
        external
        existentOrganization(_orgId)
        existentMember(_memberId)
        onlyMemberAdmin(_memberId)
    {
        emit MemberLeavedOrganization(_orgId, _memberId);
    }

    function setVotingPowerToMember(bytes32 _orgId, bytes32 _memberId, uint256 _votingPower)
        external
        existentOrganization(_orgId)
        existentMember(_memberId)
        onlyOrganizationOwner(_orgId)
    {
        emit VotingPowerSetToMember(_orgId, _memberId, _votingPower);
    }

    function joinAlliance(uint256 _allianceNumber, bytes32 _participantId) external existentAlliance(_allianceNumber) {
        if (!organizationExists(_participantId) && !memberExists(_participantId)) {
            revert NonExistentParticipant(_participantId);
        }
        emit ParticipantJoinedAlliance(_allianceNumber, _participantId);
    }

    function leaveAlliance(uint256 _allianceNumber, bytes32 _participantId)
        external
        existentAlliance(_allianceNumber)
    {
        if (!organizationExists(_participantId) && !memberExists(_participantId)) {
            revert NonExistentParticipant(_participantId);
        }
        emit ParticipantLeavedAlliance(_allianceNumber, _participantId);
    }

    function addMemberDelegator(bytes32 _memberId) external existentMember(_memberId) onlyMemberAdmin(_memberId) {
        _addDelegatorToMember(_memberId);
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
        _checkIsOrganizationOwner(_orgId);
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

// todo
// add a factory in the contract to use templates
