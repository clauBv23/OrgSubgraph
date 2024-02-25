import {
  MemberJoinedOrganization as MemberJoinedOrganizationEvent,
  MemberLeavedOrganization as MemberLeavedOrganizationEvent,
  VotingPowerSetToMember as VotingPowerSetToMemberEvent,
  MemberDelegatorAdded as MemberDelegatorAddedEvent,
  OrganizationJoinedAlliance as OrganizationJoinedAllianceEvent,
  OrganizationLeavedAlliance as OrganizationLeavedAllianceEvent,
  MemberCreated as MemberCreatedEvent,
  OrganizationCreated as OrganizationCreatedEvent,
  AllianceCreated as AllianceCreatedEvent
} from "../generated/OrgManager/OrgManager"
import {
  Member,
  Organization,
  MemberOrganization,
  Delegator, 
  Alliance
} from "../generated/schema"

import { store } from '@graphprotocol/graph-ts'

export function handleMemberCreated(event: MemberCreatedEvent): void {
  let member = new Member(event.params.memberId.toString())
  member.name = event.params.name
  member.adminAddr = event.params.adminAddr
  member.save()
}

export function handleOrganizationCreated(
  event: OrganizationCreatedEvent
): void {
  let organization = new Organization(event.params.orgId.toString())
  organization.name = event.params.name
  organization.owner = event.params.owner
  organization.save()
}

export function handleAllianceCreated(
  event: AllianceCreatedEvent
): void {
  let alliance = new Alliance(event.params.allianceNumber.toString())
  alliance.save()
}

export function handleMemberJoinedOrganization(
  event: MemberJoinedOrganizationEvent
): void {
  let memberOrg = new MemberOrganization([event.params.orgId.toString(),event.params.memberId.toString() ].join("-"))
  memberOrg.organization = event.params.orgId.toString()
  memberOrg.member = event.params.memberId.toString()
   memberOrg.save()
}

export function handleMemberLeavedOrganization(
  event: MemberLeavedOrganizationEvent
): void {
  let memberOrg = MemberOrganization.load([event.params.orgId.toString(),event.params.memberId.toString() ].join("-"))
    if (memberOrg != null) {
      store.remove("MemberOrganization", memberOrg.id)
    }
}

export function handleVotingPowerSetToMember(
  event: VotingPowerSetToMemberEvent
): void {
  let memberOrg =  MemberOrganization.load ([event.params.orgId.toString(),event.params.memberId.toString() ].join("-"))
  if (memberOrg != null) {
    memberOrg.votingPower = event.params.votingPower
    memberOrg.save()
  }
}

export function handleMemberDelegatorAdded(
  event: MemberDelegatorAddedEvent
): void {
  let delegator = new Delegator(event.params.memberId.toString())
  delegator.address = event.params.delegatorAddr
  let member = Member.load(event.params.memberId.toString())
  if (member != null) {
    delegator.member = member.id
    member.delegator = delegator.id
    member.save()
  }
  delegator.save()
}



export function handleOrganizationJoinedAlliance(
  event: OrganizationJoinedAllianceEvent
): void {
  let organization = Organization.load(event.params.orgId.toString())
  let alliance = Alliance.load(event.params.allianceNumber.toString())
  if (organization != null && alliance != null) {
    organization.alliance = alliance.id
    organization.save()
  }
}

export function handleOrganizationLeavedAlliance(
  event: OrganizationLeavedAllianceEvent
): void {
  let organization = Organization.load(event.params.orgId.toString())
  let alliance = Alliance.load(event.params.allianceNumber.toString())
  if (organization != null && alliance != null) {
    organization.alliance = null
    organization.save()
  }
}
