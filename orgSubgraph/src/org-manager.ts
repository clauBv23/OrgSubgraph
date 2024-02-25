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
  let memberOrg =  MemberOrganization.load ([event.params.orgId.toString(),event.params.memberId.toString() ].join("-"))
  if (memberOrg != null) {
    memberOrg.votingPower = event.params.votingPower
    memberOrg.save()
  }
}

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
