import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes } from "@graphprotocol/graph-ts"
import {
  MemberAddedToOrganization,
  MemberCreated,
  OrganizationCreated
} from "../generated/OrgManager/OrgManager"

export function createMemberAddedToOrganizationEvent(
  orgId: Bytes,
  memberId: Bytes
): MemberAddedToOrganization {
  let memberAddedToOrganizationEvent = changetype<MemberAddedToOrganization>(
    newMockEvent()
  )

  memberAddedToOrganizationEvent.parameters = new Array()

  memberAddedToOrganizationEvent.parameters.push(
    new ethereum.EventParam("orgId", ethereum.Value.fromFixedBytes(orgId))
  )
  memberAddedToOrganizationEvent.parameters.push(
    new ethereum.EventParam("memberId", ethereum.Value.fromFixedBytes(memberId))
  )

  return memberAddedToOrganizationEvent
}

export function createMemberCreatedEvent(
  memberId: Bytes,
  name: string
): MemberCreated {
  let memberCreatedEvent = changetype<MemberCreated>(newMockEvent())

  memberCreatedEvent.parameters = new Array()

  memberCreatedEvent.parameters.push(
    new ethereum.EventParam("memberId", ethereum.Value.fromFixedBytes(memberId))
  )
  memberCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )

  return memberCreatedEvent
}

export function createOrganizationCreatedEvent(
  orgId: Bytes,
  name: string
): OrganizationCreated {
  let organizationCreatedEvent = changetype<OrganizationCreated>(newMockEvent())

  organizationCreatedEvent.parameters = new Array()

  organizationCreatedEvent.parameters.push(
    new ethereum.EventParam("orgId", ethereum.Value.fromFixedBytes(orgId))
  )
  organizationCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )

  return organizationCreatedEvent
}
