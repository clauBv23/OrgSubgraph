// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {OrgsManager} from "../src/OrgsManager.sol";
import {Organization, Member} from "../src/Structs.sol";

contract OrgsManagerTest is Test {
    OrgsManager public manager;

    uint256 aliceOrgId = 11;
    uint256 aliceId = 1;
    uint256 bobId = 2;
    uint256 charlieId = 3;

    address alice = address(0x1);
    address bob = address(0x2);
    address charlie = address(0x3);

    function setUp() public {
        manager = new OrgsManager();
    }

    function test_addOrganization() public {
        uint256 orgId = 1010;
        manager.createOrg(bytes32(orgId), "Test Org");

        Organization memory org;
        (org.id, org.name, org.owner) = manager.organizations(bytes32(orgId));
        assertEq(org.id, bytes32(orgId));
    }

    function test_addMembers() public {
        uint256 memberId = 1010;
        manager.createMember(bytes32(memberId), "Test Member");

        Member memory member;
        (member.id, member.name, member.adminAddr) = manager.members(
            bytes32(memberId)
        );
        assertEq(member.id, bytes32(memberId));
    }

    function test_joinOrganization() public {
        // alice owner of the org
        vm.startPrank(alice);
        manager.createOrg(bytes32(aliceOrgId), "Alice's Org");
        vm.stopPrank();

        // add bob and join alice's org
        vm.startPrank(bob);
        manager.createMember(bytes32(bobId), "Bob");
        manager.joinOrganization(bytes32(aliceOrgId), bytes32(bobId));
        vm.stopPrank();

        // todo check events emission
    }

    function test_setVotingPowerToMember() public {
        // alice owner of the org
        vm.startPrank(alice);
        manager.createOrg(bytes32(aliceOrgId), "Alice's Org");
        vm.stopPrank();

        // add bob and join alice's org
        vm.startPrank(bob);
        manager.createMember(bytes32(bobId), "Bob");
        manager.joinOrganization(bytes32(aliceOrgId), bytes32(bobId));
        vm.stopPrank();

        // add charlie and join alice's org
        vm.startPrank(charlie);
        manager.createMember(bytes32(charlieId), "Charlie");
        manager.joinOrganization(bytes32(aliceOrgId), bytes32(charlieId));
        vm.stopPrank();

        // assign voting power to bob and charlie
        vm.startPrank(alice);
        manager.setVotingPowerToMember(bytes32(aliceOrgId), bytes32(bobId), 10);
        manager.setVotingPowerToMember(
            bytes32(aliceOrgId),
            bytes32(charlieId),
            20
        );
        vm.stopPrank();

        // todo check events emission
    }

    function test_leaveOrganization() public {
        // alice owner of the org
        vm.startPrank(alice);
        manager.createOrg(bytes32(aliceOrgId), "Alice's Org");
        vm.stopPrank();

        // add bob
        vm.startPrank(bob);
        manager.createMember(bytes32(bobId), "Bob");
        manager.joinOrganization(bytes32(aliceOrgId), bytes32(bobId));
        manager.leaveOrganization(bytes32(aliceOrgId), bytes32(bobId));
        vm.stopPrank();
    }
}
