// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

struct MemberStruct {
    bytes32 id;
    string name;
    address memberAddr;
}

struct Org {
    bytes32 id;
    string name;
    address owner;
    bytes32[] members;
}
