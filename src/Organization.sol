// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {OrganizationData} from "./Structs.sol";
import {IOrgsManagerEvents} from "./interfaces/IOrgsManagerEvents.sol";

contract Organization is IOrgsManagerEvents {
    mapping(bytes32 orgId => OrganizationData organization) public organizations;

    function createOrganization(bytes32 _id, string calldata _name) external {
        organizations[_id] = OrganizationData(_id, _name, msg.sender);
        emit OrganizationCreated(_id, _name, msg.sender);
    }

    function organizationExists(bytes32 _id) public view returns (bool) {
        return organizations[_id].owner != address(0);
    }

    function isOrganizationOwner(bytes32 _id) public view returns (bool) {
        return organizations[_id].owner == msg.sender;
    }
}
