// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {OrgsManager} from "../src/OrgsManager.sol";
import {Org, MemberStruct} from "../src/Structs.sol";

contract OrgsManagerTest is Test {
    OrgsManager public manager;

    function setUp() public {
        manager = new OrgsManager();
    }

    function test_addOrganization() public {
        uint256 orgId = 1010;
        manager.createOrg(bytes32(orgId), "Test Org");

        Org memory org = manager.getOrg(bytes32(orgId));
        assertEq(org.id, bytes32(orgId));
    }

    function test_addMembers() public {
        uint256 memberId = 1010;
        manager.createMember(bytes32(memberId), "Test Member");

        MemberStruct memory member = manager.getMember(bytes32(memberId));
        assertEq(member.id, bytes32(memberId));
    }

    function test_addMembersToOrganization() public {
        uint256 aliceOrgId = 11;
        uint256 aliceId = 1;
        uint256 bobId = 2;
        uint256 charlieId = 3;

        address alice = address(0x1);
        address bob = address(0x2);
        address charlie = address(0x3);

        // alice owner of the org
        vm.startPrank(alice);
        manager.createOrg(bytes32(aliceOrgId), "Alice's Org");
        manager.createMember(bytes32(aliceId), "Alice");
        vm.stopPrank();

        // add bob
        vm.startPrank(bob);
        manager.createMember(bytes32(bobId), "Bob");
        vm.stopPrank();

        // add charlie
        vm.startPrank(charlie);
        manager.createMember(bytes32(charlieId), "Charlie");
        vm.stopPrank();

        // add bob to alice's org
        vm.startPrank(alice);
        manager.addMemberToOrganization(bytes32(aliceOrgId), bytes32(bobId));

        // add charlie to alice's org
        manager.addMemberToOrganization(
            bytes32(aliceOrgId),
            bytes32(charlieId)
        );
        vm.stopPrank();

        Org memory org = manager.getOrg(bytes32(aliceOrgId));
        assertEq(org.members.length, 2);
        assertEq(org.members[0], bytes32(bobId));
        assertEq(org.members[1], bytes32(charlieId));
    }
}
