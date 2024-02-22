// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Org} from "./Structs.sol";

contract Organization {
    mapping(bytes32 orgId => Org organization) s_organizations;

    event OrganizationCreated(bytes32 orgId, string name);

    function createOrg(bytes32 _id, string memory _name) external {
        bytes32[] memory members;
        s_organizations[_id] = Org(_id, _name, msg.sender, members);

        emit OrganizationCreated(_id, _name);
    }

    function getOrg(bytes32 _id) external view returns (Org memory) {
        return s_organizations[_id];
    }
}
