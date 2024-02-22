import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes } from "@graphprotocol/graph-ts"
import { MemberAddedToOrganization } from "../generated/schema"
import { MemberAddedToOrganization as MemberAddedToOrganizationEvent } from "../generated/OrgManager/OrgManager"
import { handleMemberAddedToOrganization } from "../src/org-manager"
import { createMemberAddedToOrganizationEvent } from "./org-manager-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let orgId = Bytes.fromI32(1234567890)
    let memberId = Bytes.fromI32(1234567890)
    let newMemberAddedToOrganizationEvent =
      createMemberAddedToOrganizationEvent(orgId, memberId)
    handleMemberAddedToOrganization(newMemberAddedToOrganizationEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("MemberAddedToOrganization created and stored", () => {
    assert.entityCount("MemberAddedToOrganization", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "MemberAddedToOrganization",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "orgId",
      "1234567890"
    )
    assert.fieldEquals(
      "MemberAddedToOrganization",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "memberId",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
