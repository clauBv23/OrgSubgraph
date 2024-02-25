// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {OrgsManager} from "../src/OrgsManager.sol";
import {Organization, Member} from "../src/Structs.sol";
import {IOrgsManagerEvents} from "../src/interfaces/IOrgsManagerEvents.sol";

contract OrgsManagerTest is IOrgsManagerEvents, Test {
    OrgsManager public manager;

    uint256 allianceNumber = 1;

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

        // check event emission
        vm.expectEmit(address(manager));
        emit OrganizationCreated(bytes32(orgId), "Test Org", address(this));

        manager.createOrganization(bytes32(orgId), "Test Org");

        Organization memory org;
        (org.id, org.name, org.owner) = manager.organizations(bytes32(orgId));
        assertEq(org.id, bytes32(orgId));
    }

    function test_addMembers() public {
        uint256 memberId = 1010;

        // check event emission
        vm.expectEmit(address(manager));
        emit MemberCreated(bytes32(memberId), "Test Member", address(this));

        manager.createMember(bytes32(memberId), "Test Member");

        Member memory member;
        (
            member.id,
            member.name,
            member.adminAddr,
            member.delegatorAddr
        ) = manager.members(bytes32(memberId));
        assertEq(member.id, bytes32(memberId));
    }

    function test_joinOrganization() public {
        // alice owner of the org
        vm.startPrank(alice);
        manager.createOrganization(bytes32(aliceOrgId), "Alice's Org");
        vm.stopPrank();

        // add bob and join alice's org
        vm.startPrank(bob);
        manager.createMember(bytes32(bobId), "Bob");

        // check event emission
        vm.expectEmit(address(manager));
        emit MemberJoinedOrganization(bytes32(aliceOrgId), bytes32(bobId));

        manager.joinOrganization(bytes32(aliceOrgId), bytes32(bobId));
        vm.stopPrank();
    }

    function test_setVotingPowerToMember() public {
        // alice owner of the org
        vm.startPrank(alice);
        manager.createOrganization(bytes32(aliceOrgId), "Alice's Org");
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

        // check event emission
        vm.expectEmit(address(manager));
        emit VotingPowerSetToMember(bytes32(aliceOrgId), bytes32(bobId), 10);

        manager.setVotingPowerToMember(bytes32(aliceOrgId), bytes32(bobId), 10);

        vm.expectEmit(address(manager));
        emit VotingPowerSetToMember(
            bytes32(aliceOrgId),
            bytes32(charlieId),
            20
        );

        manager.setVotingPowerToMember(
            bytes32(aliceOrgId),
            bytes32(charlieId),
            20
        );
        vm.stopPrank();
    }

    function test_leaveOrganization() public {
        // alice owner of the org
        vm.startPrank(alice);
        manager.createOrganization(bytes32(aliceOrgId), "Alice's Org");
        vm.stopPrank();

        // add bob
        vm.startPrank(bob);
        manager.createMember(bytes32(bobId), "Bob");
        manager.joinOrganization(bytes32(aliceOrgId), bytes32(bobId));

        // check event emission
        vm.expectEmit(address(manager));
        emit MemberLeavedOrganization(bytes32(aliceOrgId), bytes32(bobId));

        manager.leaveOrganization(bytes32(aliceOrgId), bytes32(bobId));
        vm.stopPrank();
    }

    function test_createAlliance() public {
        // check event emission
        vm.expectEmit(address(manager));
        emit AllianceCreated(allianceNumber);

        manager.createAlliance(allianceNumber);
    }

    function test_joinAlliance() public {
        // create alliance
        manager.createAlliance(allianceNumber);

        // create alice's org and join created alliance
        vm.startPrank(alice);
        manager.createOrganization(bytes32(aliceOrgId), "Alice's Org");

        // check event emission
        vm.expectEmit(address(manager));
        emit OrganizationJoinedAlliance(allianceNumber, bytes32(aliceOrgId));

        manager.joinAlliance(allianceNumber, bytes32(aliceOrgId));
        vm.stopPrank();
    }

    function test_leaveAlliance() public {
        // create alliance
        manager.createAlliance(allianceNumber);

        // create alice's org and join created alliance
        vm.startPrank(alice);
        manager.createOrganization(bytes32(aliceOrgId), "Alice's Org");
        manager.joinAlliance(allianceNumber, bytes32(aliceOrgId));

        // leave alliance
        // check event emission
        vm.expectEmit(address(manager));
        emit OrganizationLeavedAlliance(allianceNumber, bytes32(aliceOrgId));

        manager.leaveAlliance(allianceNumber, bytes32(aliceOrgId));
        vm.stopPrank();
    }

    function test_addMemberDelegator() public {
        // add alice
        vm.startPrank(alice);
        manager.createMember(bytes32(aliceId), "Alice");
        vm.stopPrank();

        // add bob
        vm.startPrank(bob);
        manager.createMember(bytes32(bobId), "Bob");

        // check event emission
        vm.expectEmit(address(manager));
        emit MemberDelegatorAdded(bytes32(bobId), alice);

        manager.addMemberDelegator(bytes32(bobId), alice);
        vm.stopPrank();
    }
}
