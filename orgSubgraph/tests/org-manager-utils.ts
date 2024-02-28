import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, BigInt , Address} from "@graphprotocol/graph-ts"
import {
  MemberJoinedOrganization,
  MemberLeavedOrganization,
  VotingPowerSetToMember,
  MemberDelegatorAdded,
  ParticipantJoinedAlliance,
  ParticipantLeavedAlliance,
  MemberCreated,
  OrganizationCreated,
  AllianceCreated,
} from "../generated/OrgManager/OrgManager"

import {
  DelegatorNameSet,
  DelegatorCalled
} from "../generated/templates/Delegator/MemberDelegator"

export function createAllianceCreatedEvent(
  allianceNumber: BigInt,
): AllianceCreated {
  let allianceCreated = changetype<AllianceCreated>(newMockEvent())

  allianceCreated.parameters = new Array()
  allianceCreated.parameters.push(
    new ethereum.EventParam("allianceNumber", ethereum.Value.fromUnsignedBigInt(allianceNumber))
  )
  return allianceCreated
}

export function createMemberCreatedEvent(
  memberId: Bytes,
  name: string,
  adminAddr: string
): MemberCreated {
  let memberCreated = changetype<MemberCreated>(
    newMockEvent()
  )

  memberCreated.parameters = new Array()
  memberCreated.parameters.push(
    new ethereum.EventParam("memberId", ethereum.Value.fromFixedBytes(memberId))
  )
  memberCreated.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  memberCreated.parameters.push(
    new ethereum.EventParam("adminAddr", ethereum.Value.fromAddress(Address.fromString(adminAddr)))
  )
  return memberCreated
}

export function createOrganizationCreatedEvent(
  orgId: Bytes,
  name: string,
  owner: string
): OrganizationCreated {
  let organizationCreatedEvent = changetype<OrganizationCreated>(newMockEvent())

  organizationCreatedEvent.parameters = new Array()
  organizationCreatedEvent.parameters.push(
    new ethereum.EventParam("orgId", ethereum.Value.fromFixedBytes(orgId))
  )
  organizationCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  organizationCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(Address.fromString(owner)))
  )

  return organizationCreatedEvent
}

export function createMemberDelegatorAddedEvent(
  memberId: Bytes,
  delegatorAddr: string
): MemberDelegatorAdded {
  let memberDelegatorAddedEvent = changetype<MemberDelegatorAdded>(newMockEvent())

  memberDelegatorAddedEvent.parameters = new Array()
  memberDelegatorAddedEvent.parameters.push(
    new ethereum.EventParam("memberId", ethereum.Value.fromFixedBytes(memberId))
  )
  memberDelegatorAddedEvent.parameters.push(
    new ethereum.EventParam("delegatorAddr", ethereum.Value.fromAddress(Address.fromString(delegatorAddr)))
  )

  return memberDelegatorAddedEvent
}

export function createVotingPowerSetToMemberAddedEvent(
  orgId: Bytes,
  memberId: Bytes,
  votingPower: BigInt
): VotingPowerSetToMember {
  let votingPowerSetEvent = changetype<VotingPowerSetToMember>(newMockEvent())

  votingPowerSetEvent.parameters = new Array()
  votingPowerSetEvent.parameters.push(
    new ethereum.EventParam("orgId", ethereum.Value.fromFixedBytes(orgId))
  )
  votingPowerSetEvent.parameters.push(
    new ethereum.EventParam("memberId", ethereum.Value.fromFixedBytes(memberId))
  )
  votingPowerSetEvent.parameters.push(
    new ethereum.EventParam("votingPower", ethereum.Value.fromUnsignedBigInt(votingPower))
  )

  return votingPowerSetEvent
}

export function createMemberJoinedOrganizationAddedEvent(
  orgId: Bytes,
  memberId: Bytes
): MemberJoinedOrganization {
  let memberJoinedEvent = changetype<MemberJoinedOrganization>(newMockEvent())

  memberJoinedEvent.parameters = new Array()
  memberJoinedEvent.parameters.push(
    new ethereum.EventParam("orgId", ethereum.Value.fromFixedBytes(orgId))
  )
  memberJoinedEvent.parameters.push(
    new ethereum.EventParam("memberId", ethereum.Value.fromFixedBytes(memberId))
  )
  

  return memberJoinedEvent
}

export function createMemberLeavedOrganizationEvent(
  orgId: Bytes,
  memberId: Bytes
): MemberLeavedOrganization {
  let memberLeavedEvent = changetype<MemberLeavedOrganization>(newMockEvent())

  memberLeavedEvent.parameters = new Array()
  memberLeavedEvent.parameters.push(
    new ethereum.EventParam("orgId", ethereum.Value.fromFixedBytes(orgId))
  )
  memberLeavedEvent.parameters.push(
    new ethereum.EventParam("memberId", ethereum.Value.fromFixedBytes(memberId))
  )

  return memberLeavedEvent
}

export function createParticipantJoinedAllianceEvent(
  allianceNumber: BigInt,
  participantId: Bytes
): ParticipantJoinedAlliance {
  let participantJoinedEvent = changetype<ParticipantJoinedAlliance>(newMockEvent())

  participantJoinedEvent.parameters = new Array()
  participantJoinedEvent.parameters.push(
    new ethereum.EventParam("allianceNumber", ethereum.Value.fromUnsignedBigInt(allianceNumber))
  )
  participantJoinedEvent.parameters.push(
    new ethereum.EventParam("participantId", ethereum.Value.fromFixedBytes(participantId))
  )

  return participantJoinedEvent
}


export function createParticipantLeavedAllianceEvent(
  allianceNumber: BigInt,
  participantId: Bytes
): ParticipantLeavedAlliance {
  let participantLeavedEvent = changetype<ParticipantLeavedAlliance>(newMockEvent())

  participantLeavedEvent.parameters = new Array()
  participantLeavedEvent.parameters.push(
    new ethereum.EventParam("allianceNumber", ethereum.Value.fromUnsignedBigInt(allianceNumber))
  )
  participantLeavedEvent.parameters.push(
    new ethereum.EventParam("participantId", ethereum.Value.fromFixedBytes(participantId))
  )
  
  return participantLeavedEvent
}

export function createDelegatorNameSetEvent(
  delegatorId: Bytes,
  name: string,
): DelegatorNameSet {
  let delegatorNameSet = changetype<DelegatorNameSet>(newMockEvent())

  delegatorNameSet.parameters = new Array()
  delegatorNameSet.parameters.push(
    new ethereum.EventParam("delegatorId", ethereum.Value.fromFixedBytes(delegatorId))
  )
  delegatorNameSet.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  
  return delegatorNameSet
}

export function createDelegatorCalledEvent(
  delegatorId: Bytes,
  caller: string,
): DelegatorCalled {
  let delegatorCalled = changetype<DelegatorCalled>(newMockEvent())

  delegatorCalled.parameters = new Array()
  delegatorCalled.parameters.push(
    new ethereum.EventParam("delegatorId", ethereum.Value.fromFixedBytes(delegatorId))
  )
  delegatorCalled.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(Address.fromString(caller)))
  )
  
  return delegatorCalled
}