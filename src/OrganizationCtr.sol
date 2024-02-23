// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Organization} from "./Structs.sol";

contract OrganizationCtr {
    mapping(bytes32 orgId => Organization organization) public organizations;

    event OrganizationCreated(bytes32 orgId, string name, address owner);

    function createOrganization(bytes32 _id, string calldata _name) external {
        organizations[_id] = Organization(_id, _name, msg.sender);
        emit OrganizationCreated(_id, _name, msg.sender);
    }

    function organizationExists(bytes32 _id) public view returns (bool) {
        return organizations[_id].owner != address(0);
    }

    function isOrganizationOwner(bytes32 _id) public view returns (bool) {
        return organizations[_id].owner == msg.sender;
    }
}
