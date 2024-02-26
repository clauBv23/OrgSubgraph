// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

struct MemberData {
    bytes32 id;
    string name;
    address adminAddr;
    address delegatorAddr;
}

struct OrganizationData {
    bytes32 id;
    string name;
    address owner;
}
