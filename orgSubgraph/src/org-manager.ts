import {
  MemberJoinedOrganization as MemberJoinedOrganizationEvent,
  MemberLeavedOrganization as MemberLeavedOrganizationEvent,
  VotingPowerSetToMember as VotingPowerSetToMemberEvent,
  MemberCreated as MemberCreatedEvent,
  OrganizationCreated as OrganizationCreatedEvent
} from "../generated/OrgManager/OrgManager"
import {
  Member,
  Organization,
  MemberOrganization,
  VotingPower
} from "../generated/schema"

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
  let memberOrg = new MemberOrganization([event.params.orgId.toString(),event.params.memberId.toString() ].join("-"))
  memberOrg.organization = event.params.orgId.toString()
  memberOrg.member = event.params.memberId.toString()
   memberOrg.save()
}

export function handleVotingPowerSetToMember(
  event: VotingPowerSetToMemberEvent
): void {
  let votingPower = new VotingPower([event.params.orgId.toString(),event.params.memberId.toString() ].join("-"))
  votingPower.value = event.params.votingPower
  votingPower.member = event.params.memberId.toString()
  votingPower.organization = event.params.orgId.toString()
  votingPower.save()
}

export function handleMemberCreated(event: MemberCreatedEvent): void {
  let member = new Member(event.params.memberId.toString())
  member.name = event.params.name
  member.save()
}

export function handleOrganizationCreated(
  event: OrganizationCreatedEvent
): void {
  let organization = new Organization(event.params.orgId.toString())
  organization.name = event.params.name
  organization.save()
}
