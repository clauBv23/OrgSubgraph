// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {MemberData} from "./Structs.sol";
import {MemberDelegator} from "./MemberDelegator.sol";
import {IOrgsManagerEvents} from "./interfaces/IOrgsManagerEvents.sol";

contract Member is IOrgsManagerEvents {
    mapping(bytes32 memberId => MemberData member) public members;

    function createMember(bytes32 _id, string calldata _name) external {
        members[_id] = MemberData(_id, _name, msg.sender, address(0));
        emit MemberCreated(_id, _name, msg.sender);
    }

    function memberExists(bytes32 _id) public view returns (bool) {
        return members[_id].adminAddr != address(0);
    }

    function _addDelegatorToMember(bytes32 _id) internal {
        // check permissions and existence before calling this function
        MemberDelegator _delegator = new MemberDelegator(_id);
        members[_id].delegatorAddr = address(_delegator);

        emit MemberDelegatorAdded(_id, address(_delegator));
    }

    function isMemberAdmin(bytes32 _id) public view returns (bool) {
        return members[_id].adminAddr == msg.sender;
    }
}
