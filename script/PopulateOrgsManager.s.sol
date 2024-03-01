// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script, console2, console} from "forge-std/Script.sol";

import {OrgsManager} from "../src/OrgsManager.sol";
import {MemberDelegator} from "../src/MemberDelegator.sol";

contract PopulateOrgsManager is Script {
    OrgsManager manager;

    uint256 alliance1Number = 1;
    uint256 alliance2Number = 2;

    uint256 alice = vm.envUint("PRIVATE_KEY1");
    uint256 bob = vm.envUint("PRIVATE_KEY2");
    uint256 charlie = vm.envUint("PRIVATE_KEY3");

    uint256 aliceId = 1;
    uint256 bobId = 2;
    uint256 charlieId = 3;

    uint256 aliceOrgId = 10;
    uint256 bobOrgId = 20;
    uint256 charlieOrgId = 30;

    function run(address _managerAddr) public {
        manager = OrgsManager(_managerAddr);

        // create Alice, Bob, and Charlie members and their organizations
        _createMembersAndOrgs();

        // join members to organizations
        _joinMembersToOrgs();

        // set voting power to members
        _setMembersVotingPower();

        // create alliances and join organizations
        _createAllianceAndJoinOrganizations();

        // join members to alliances
        _joinMembersToAlliances();

        // define delegator to members
        _defineDelegatorToMember();

        // set delegator names and make calls
        _setDelegatorNamesAndMakeCalls();
    }

    function _createMembersAndOrgs() internal {
        vm.startBroadcast(alice);
        manager.createMember(bytes32(aliceId), "Alice");
        manager.createOrganization(bytes32(aliceOrgId), "Alice's Org");
        vm.stopBroadcast();

        vm.startBroadcast(bob);
        manager.createMember(bytes32(bobId), "Bob");
        manager.createOrganization(bytes32(bobOrgId), "Bob's Org");
        vm.stopBroadcast();

        vm.startBroadcast(charlie);
        manager.createMember(bytes32(charlieId), "Charlie");
        manager.createOrganization(bytes32(charlieOrgId), "Charlie's Org");
        vm.stopBroadcast();
    }

    function _joinMembersToOrgs() internal {
        // join Alice to Charlie and Bob's orgs
        vm.startBroadcast(alice);
        manager.joinOrganization(bytes32(bobOrgId), bytes32(aliceId));
        manager.joinOrganization(bytes32(charlieOrgId), bytes32(aliceId));
        vm.stopBroadcast();

        // join Bob to Alice and Charlie's orgs
        vm.startBroadcast(bob);
        manager.joinOrganization(bytes32(aliceOrgId), bytes32(bobId));
        manager.joinOrganization(bytes32(charlieOrgId), bytes32(bobId));
        vm.stopBroadcast();

        // join Charlie to Alice and Bob's orgs
        vm.startBroadcast(charlie);
        manager.joinOrganization(bytes32(aliceOrgId), bytes32(charlieId));
        manager.joinOrganization(bytes32(bobOrgId), bytes32(charlieId));
        vm.stopBroadcast();
    }

    function _setMembersVotingPower() internal {
        // set voting power to Bob, and Charlie in Alice's org
        vm.startBroadcast(alice);
        manager.setVotingPowerToMember(bytes32(aliceOrgId), bytes32(bobId), 200);
        manager.setVotingPowerToMember(bytes32(aliceOrgId), bytes32(charlieId), 300);
        vm.stopBroadcast();

        // set voting power to Alice, and Charlie in Bob's org
        vm.startBroadcast(bob);
        manager.setVotingPowerToMember(bytes32(bobOrgId), bytes32(aliceId), 100);
        manager.setVotingPowerToMember(bytes32(bobOrgId), bytes32(charlieId), 300);
        vm.stopBroadcast();

        // set voting power to Alice, and Bob in Charlie's org
        vm.startBroadcast(charlie);
        manager.setVotingPowerToMember(bytes32(charlieOrgId), bytes32(aliceId), 100);
        manager.setVotingPowerToMember(bytes32(charlieOrgId), bytes32(bobId), 200);
        vm.stopBroadcast();
    }

    function _createAllianceAndJoinOrganizations() internal {
        // set voting power to Bob, and Charlie in Alice's org
        vm.startBroadcast();
        manager.createAlliance(alliance1Number);
        manager.createAlliance(alliance2Number);
        vm.stopBroadcast();

        // join alice's and bob's org to alliance1
        vm.startBroadcast(alice);
        manager.joinAlliance(alliance1Number, bytes32(aliceOrgId));
        vm.stopBroadcast();

        // set voting power to Alice, and Charlie in Bob's org
        vm.startBroadcast(bob);
        manager.joinAlliance(alliance1Number, bytes32(bobOrgId));
        vm.stopBroadcast();

        // join charlie's org to alliance2
        vm.startBroadcast(charlie);
        manager.joinAlliance(alliance2Number, bytes32(charlieOrgId));
        vm.stopBroadcast();
    }

    function _joinMembersToAlliances() internal {
        // join bob and alice to alliance2
        vm.startBroadcast(bob);
        manager.joinAlliance(alliance2Number, bytes32(bobId));
        vm.stopBroadcast();

        vm.startBroadcast(alice);
        manager.joinAlliance(alliance2Number, bytes32(aliceId));
        vm.stopBroadcast();

        // join charlie to alliance1
        vm.startBroadcast(charlie);
        manager.joinAlliance(alliance1Number, bytes32(charlieId));
        vm.stopBroadcast();
    }

    function _defineDelegatorToMember() internal {
        // define the script address as alice bob and charlie's delegator
        vm.startBroadcast(alice);
        manager.addMemberDelegator(bytes32(aliceId));
        vm.stopBroadcast();

        vm.startBroadcast(bob);
        manager.addMemberDelegator(bytes32(bobId));
        vm.stopBroadcast();

        vm.startBroadcast(charlie);
        manager.addMemberDelegator(bytes32(charlieId));
        vm.stopBroadcast();
    }

    function _setDelegatorNamesAndMakeCalls() internal {
        // get delegator addresses
        (,,, address aliceDelegator) = manager.members(bytes32(aliceId));
        (,,, address bobDelegator) = manager.members(bytes32(bobId));
        (,,, address charlieDelegator) = manager.members(bytes32(charlieId));

        // set names to the delegator
        MemberDelegator(aliceDelegator).setDelegatorName("Alice's Delegator");
        MemberDelegator(bobDelegator).setDelegatorName("Bob's Delegator");
        MemberDelegator(charlieDelegator).setDelegatorName("Charlie's Delegator");

        // alice call bob's delegator
        vm.startBroadcast(alice);
        MemberDelegator(bobDelegator).callDelegator();
        vm.stopBroadcast();

        // bob call charlie's delegator
        vm.startBroadcast(bob);
        MemberDelegator(aliceDelegator).callDelegator();
        vm.stopBroadcast();

        // charlie call alice's delegator
        vm.startBroadcast(charlie);
        MemberDelegator(charlieDelegator).callDelegator();
        vm.stopBroadcast();
    }

    function leave(address _managerAddr) external {
        manager = OrgsManager(_managerAddr);

        vm.startBroadcast(charlie);
        // make charlie leave alice's org
        manager.leaveOrganization(bytes32(aliceOrgId), bytes32(charlieId));
        vm.stopBroadcast();

        vm.startBroadcast(alice);
        // make alice's org leave alliance1
        manager.leaveAlliance(alliance1Number, bytes32(aliceOrgId));
        vm.stopBroadcast();

        vm.startBroadcast(bob);
        // make bob leave alliance2
        manager.leaveAlliance(alliance2Number, bytes32(bobId));
        vm.stopBroadcast();
    }
}
