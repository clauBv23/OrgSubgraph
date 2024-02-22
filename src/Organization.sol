// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Org} from "./Structs.sol";

contract Organization {
    mapping(bytes32 orgId => Org organization) s_organizations;

    function createOrg(bytes32 _id, string memory _name) external {
        bytes32[] memory members;
        s_organizations[_id] = Org(_id, _name, msg.sender, members);
    }
}
