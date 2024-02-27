import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  logStore, 
  log
} from "matchstick-as/assembly/index"
import { BigInt, Bytes } from "@graphprotocol/graph-ts"

import { 
  handleMemberCreated, 
  handleOrganizationCreated, 
  handleAllianceCreated, 
  handleMemberJoinedOrganization, 
  handleMemberLeavedOrganization, 
  handleVotingPowerSetToMember, 
  handleMemberDelegatorAdded, 
  handleParticipantJoinedAlliance, 
  handleParticipantLeavedAlliance 
} from "../src/org-manager"
import { 
  createAllianceCreatedEvent, 
  createMemberCreatedEvent, 
  createOrganizationCreatedEvent,
  createMemberDelegatorAddedEvent
} from "./org-manager-utils"


describe("Describe entity assertions", () => {

  afterAll(() => {
    clearStore()
  })

  test("Member created and stored", () => {
    let id = Bytes.fromI32(100)
    let name = "alice"
    let adminAddr = "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"

    let newMemberCreatedEvent = createMemberCreatedEvent(id, name, adminAddr)
    handleMemberCreated(newMemberCreatedEvent)

    assert.fieldEquals(
      "Member",
      id.toString(),
      "name",
      name
    )
    assert.fieldEquals(
      "Member",
      id.toString(),
      "adminAddr",
      adminAddr
    )
  })

  test("Organization created and stored", () => {
    let id = Bytes.fromI32(10)
    let name = "Alice's Org"
    let owner = "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"

    let newOrganizationCreatedEvent = createOrganizationCreatedEvent(id, name, owner)
    handleOrganizationCreated(newOrganizationCreatedEvent)

    assert.fieldEquals(
      "Organization",
      id.toString(),
      "name",
      name
    )
    assert.fieldEquals(
      "Organization",
      id.toString(),
      "owner",
      owner
    )
  })

  test("Alliance created and stored", () => {
    let allianceNumber = BigInt.fromI32(1)

    let newAllianceCreatedEvent = createAllianceCreatedEvent(allianceNumber)
    handleAllianceCreated(newAllianceCreatedEvent)

    assert.fieldEquals(
      "Alliance",
      allianceNumber.toString(),
      "id",
      allianceNumber.toString()
    )
  })

  test("Member Delegator created and stored and member modified", () => {
    let delegatorAddress = "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"
    let aliceId = Bytes.fromI32(100)

    let newMemberDelegatorAddedEvent = createMemberDelegatorAddedEvent(aliceId, delegatorAddress)
    handleMemberDelegatorAdded(newMemberDelegatorAddedEvent)

    assert.fieldEquals(
      "Delegator",
      aliceId.toString(),
      "id",
      aliceId.toString()
    )

    assert.fieldEquals(
      "Delegator",
      aliceId.toString(),
      "member",
      aliceId.toString()
    )
    assert.fieldEquals(
      "Delegator",
      aliceId.toString(),
      "address",
      delegatorAddress
    )

    // check delegator is added in the member
    assert.fieldEquals(
      "Member",
      aliceId.toString(),
      "delegator",
      aliceId.toString()
    )
  })
})
