// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract IOrgsManagerEvents {
    event MemberCreated(bytes32 memberId, string name, address adminAddr);
    event VotingPowerSetToMember(bytes32 orgId, bytes32 memberId, uint256 votingPower);
    event MemberDelegatorAdded(bytes32 memberId, address delegatorAddr);
    event DelegatorNameSet(bytes32 delegatorId, string name);
    event DelegatorCalled(bytes32 delegatorId, address caller);

    event OrganizationCreated(bytes32 orgId, string name, address owner);
    event MemberJoinedOrganization(bytes32 orgId, bytes32 memberId);
    event MemberLeavedOrganization(bytes32 orgId, bytes32 memberId);

    event AllianceCreated(uint256 allianceNumber);
    event ParticipantJoinedAlliance(uint256 allianceNumber, bytes32 participantId);
    event ParticipantLeavedAlliance(uint256 allianceNumber, bytes32 participantId);
}
