import {
  MemberAddedToOrganization as MemberAddedToOrganizationEvent,
  MemberCreated as MemberCreatedEvent,
  OrganizationCreated as OrganizationCreatedEvent
} from "../generated/OrgManager/OrgManager"
import {
  MemberAddedToOrganization,
  MemberCreated,
  OrganizationCreated
} from "../generated/schema"

export function handleMemberAddedToOrganization(
  event: MemberAddedToOrganizationEvent
): void {
  let entity = new MemberAddedToOrganization(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.orgId = event.params.orgId
  entity.memberId = event.params.memberId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMemberCreated(event: MemberCreatedEvent): void {
  let entity = new MemberCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.memberId = event.params.memberId
  entity.name = event.params.name

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOrganizationCreated(
  event: OrganizationCreatedEvent
): void {
  let entity = new OrganizationCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.orgId = event.params.orgId
  entity.name = event.params.name

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
