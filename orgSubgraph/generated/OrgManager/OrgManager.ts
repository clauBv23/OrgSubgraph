// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";

export class AllianceCreated extends ethereum.Event {
  get params(): AllianceCreated__Params {
    return new AllianceCreated__Params(this);
  }
}

export class AllianceCreated__Params {
  _event: AllianceCreated;

  constructor(event: AllianceCreated) {
    this._event = event;
  }

  get allianceNumber(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class DelegatorCalled extends ethereum.Event {
  get params(): DelegatorCalled__Params {
    return new DelegatorCalled__Params(this);
  }
}

export class DelegatorCalled__Params {
  _event: DelegatorCalled;

  constructor(event: DelegatorCalled) {
    this._event = event;
  }

  get caller(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class DelegatorNameSet extends ethereum.Event {
  get params(): DelegatorNameSet__Params {
    return new DelegatorNameSet__Params(this);
  }
}

export class DelegatorNameSet__Params {
  _event: DelegatorNameSet;

  constructor(event: DelegatorNameSet) {
    this._event = event;
  }

  get delegatorId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get name(): string {
    return this._event.parameters[1].value.toString();
  }
}

export class MemberCreated extends ethereum.Event {
  get params(): MemberCreated__Params {
    return new MemberCreated__Params(this);
  }
}

export class MemberCreated__Params {
  _event: MemberCreated;

  constructor(event: MemberCreated) {
    this._event = event;
  }

  get memberId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get name(): string {
    return this._event.parameters[1].value.toString();
  }

  get adminAddr(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class MemberDelegatorAdded extends ethereum.Event {
  get params(): MemberDelegatorAdded__Params {
    return new MemberDelegatorAdded__Params(this);
  }
}

export class MemberDelegatorAdded__Params {
  _event: MemberDelegatorAdded;

  constructor(event: MemberDelegatorAdded) {
    this._event = event;
  }

  get memberId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get delegatorAddr(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class MemberJoinedOrganization extends ethereum.Event {
  get params(): MemberJoinedOrganization__Params {
    return new MemberJoinedOrganization__Params(this);
  }
}

export class MemberJoinedOrganization__Params {
  _event: MemberJoinedOrganization;

  constructor(event: MemberJoinedOrganization) {
    this._event = event;
  }

  get orgId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get memberId(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }
}

export class MemberLeavedOrganization extends ethereum.Event {
  get params(): MemberLeavedOrganization__Params {
    return new MemberLeavedOrganization__Params(this);
  }
}

export class MemberLeavedOrganization__Params {
  _event: MemberLeavedOrganization;

  constructor(event: MemberLeavedOrganization) {
    this._event = event;
  }

  get orgId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get memberId(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }
}

export class OrganizationCreated extends ethereum.Event {
  get params(): OrganizationCreated__Params {
    return new OrganizationCreated__Params(this);
  }
}

export class OrganizationCreated__Params {
  _event: OrganizationCreated;

  constructor(event: OrganizationCreated) {
    this._event = event;
  }

  get orgId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get name(): string {
    return this._event.parameters[1].value.toString();
  }

  get owner(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class ParticipantJoinedAlliance extends ethereum.Event {
  get params(): ParticipantJoinedAlliance__Params {
    return new ParticipantJoinedAlliance__Params(this);
  }
}

export class ParticipantJoinedAlliance__Params {
  _event: ParticipantJoinedAlliance;

  constructor(event: ParticipantJoinedAlliance) {
    this._event = event;
  }

  get allianceNumber(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get participantId(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }
}

export class ParticipantLeavedAlliance extends ethereum.Event {
  get params(): ParticipantLeavedAlliance__Params {
    return new ParticipantLeavedAlliance__Params(this);
  }
}

export class ParticipantLeavedAlliance__Params {
  _event: ParticipantLeavedAlliance;

  constructor(event: ParticipantLeavedAlliance) {
    this._event = event;
  }

  get allianceNumber(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get participantId(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }
}

export class VotingPowerSetToMember extends ethereum.Event {
  get params(): VotingPowerSetToMember__Params {
    return new VotingPowerSetToMember__Params(this);
  }
}

export class VotingPowerSetToMember__Params {
  _event: VotingPowerSetToMember;

  constructor(event: VotingPowerSetToMember) {
    this._event = event;
  }

  get orgId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get memberId(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get votingPower(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class OrgManager__membersResult {
  value0: Bytes;
  value1: string;
  value2: Address;
  value3: Address;

  constructor(value0: Bytes, value1: string, value2: Address, value3: Address) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromFixedBytes(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    map.set("value2", ethereum.Value.fromAddress(this.value2));
    map.set("value3", ethereum.Value.fromAddress(this.value3));
    return map;
  }

  getId(): Bytes {
    return this.value0;
  }

  getName(): string {
    return this.value1;
  }

  getAdminAddr(): Address {
    return this.value2;
  }

  getDelegatorAddr(): Address {
    return this.value3;
  }
}

export class OrgManager__organizationsResult {
  value0: Bytes;
  value1: string;
  value2: Address;

  constructor(value0: Bytes, value1: string, value2: Address) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromFixedBytes(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    map.set("value2", ethereum.Value.fromAddress(this.value2));
    return map;
  }

  getId(): Bytes {
    return this.value0;
  }

  getName(): string {
    return this.value1;
  }

  getOwner(): Address {
    return this.value2;
  }
}

export class OrgManager extends ethereum.SmartContract {
  static bind(address: Address): OrgManager {
    return new OrgManager("OrgManager", address);
  }

  alliances(allianceId: BigInt): boolean {
    let result = super.call("alliances", "alliances(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(allianceId),
    ]);

    return result[0].toBoolean();
  }

  try_alliances(allianceId: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall("alliances", "alliances(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(allianceId),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isMemberAdmin(_id: Bytes): boolean {
    let result = super.call("isMemberAdmin", "isMemberAdmin(bytes32):(bool)", [
      ethereum.Value.fromFixedBytes(_id),
    ]);

    return result[0].toBoolean();
  }

  try_isMemberAdmin(_id: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isMemberAdmin",
      "isMemberAdmin(bytes32):(bool)",
      [ethereum.Value.fromFixedBytes(_id)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isOrganizationOwner(_id: Bytes): boolean {
    let result = super.call(
      "isOrganizationOwner",
      "isOrganizationOwner(bytes32):(bool)",
      [ethereum.Value.fromFixedBytes(_id)],
    );

    return result[0].toBoolean();
  }

  try_isOrganizationOwner(_id: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isOrganizationOwner",
      "isOrganizationOwner(bytes32):(bool)",
      [ethereum.Value.fromFixedBytes(_id)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  memberExists(_id: Bytes): boolean {
    let result = super.call("memberExists", "memberExists(bytes32):(bool)", [
      ethereum.Value.fromFixedBytes(_id),
    ]);

    return result[0].toBoolean();
  }

  try_memberExists(_id: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall("memberExists", "memberExists(bytes32):(bool)", [
      ethereum.Value.fromFixedBytes(_id),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  members(memberId: Bytes): OrgManager__membersResult {
    let result = super.call(
      "members",
      "members(bytes32):(bytes32,string,address,address)",
      [ethereum.Value.fromFixedBytes(memberId)],
    );

    return new OrgManager__membersResult(
      result[0].toBytes(),
      result[1].toString(),
      result[2].toAddress(),
      result[3].toAddress(),
    );
  }

  try_members(memberId: Bytes): ethereum.CallResult<OrgManager__membersResult> {
    let result = super.tryCall(
      "members",
      "members(bytes32):(bytes32,string,address,address)",
      [ethereum.Value.fromFixedBytes(memberId)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new OrgManager__membersResult(
        value[0].toBytes(),
        value[1].toString(),
        value[2].toAddress(),
        value[3].toAddress(),
      ),
    );
  }

  organizationExists(_id: Bytes): boolean {
    let result = super.call(
      "organizationExists",
      "organizationExists(bytes32):(bool)",
      [ethereum.Value.fromFixedBytes(_id)],
    );

    return result[0].toBoolean();
  }

  try_organizationExists(_id: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "organizationExists",
      "organizationExists(bytes32):(bool)",
      [ethereum.Value.fromFixedBytes(_id)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  organizations(orgId: Bytes): OrgManager__organizationsResult {
    let result = super.call(
      "organizations",
      "organizations(bytes32):(bytes32,string,address)",
      [ethereum.Value.fromFixedBytes(orgId)],
    );

    return new OrgManager__organizationsResult(
      result[0].toBytes(),
      result[1].toString(),
      result[2].toAddress(),
    );
  }

  try_organizations(
    orgId: Bytes,
  ): ethereum.CallResult<OrgManager__organizationsResult> {
    let result = super.tryCall(
      "organizations",
      "organizations(bytes32):(bytes32,string,address)",
      [ethereum.Value.fromFixedBytes(orgId)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new OrgManager__organizationsResult(
        value[0].toBytes(),
        value[1].toString(),
        value[2].toAddress(),
      ),
    );
  }
}

export class AddMemberDelegatorCall extends ethereum.Call {
  get inputs(): AddMemberDelegatorCall__Inputs {
    return new AddMemberDelegatorCall__Inputs(this);
  }

  get outputs(): AddMemberDelegatorCall__Outputs {
    return new AddMemberDelegatorCall__Outputs(this);
  }
}

export class AddMemberDelegatorCall__Inputs {
  _call: AddMemberDelegatorCall;

  constructor(call: AddMemberDelegatorCall) {
    this._call = call;
  }

  get _memberId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class AddMemberDelegatorCall__Outputs {
  _call: AddMemberDelegatorCall;

  constructor(call: AddMemberDelegatorCall) {
    this._call = call;
  }
}

export class CreateAllianceCall extends ethereum.Call {
  get inputs(): CreateAllianceCall__Inputs {
    return new CreateAllianceCall__Inputs(this);
  }

  get outputs(): CreateAllianceCall__Outputs {
    return new CreateAllianceCall__Outputs(this);
  }
}

export class CreateAllianceCall__Inputs {
  _call: CreateAllianceCall;

  constructor(call: CreateAllianceCall) {
    this._call = call;
  }

  get _allianceNumber(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class CreateAllianceCall__Outputs {
  _call: CreateAllianceCall;

  constructor(call: CreateAllianceCall) {
    this._call = call;
  }
}

export class CreateMemberCall extends ethereum.Call {
  get inputs(): CreateMemberCall__Inputs {
    return new CreateMemberCall__Inputs(this);
  }

  get outputs(): CreateMemberCall__Outputs {
    return new CreateMemberCall__Outputs(this);
  }
}

export class CreateMemberCall__Inputs {
  _call: CreateMemberCall;

  constructor(call: CreateMemberCall) {
    this._call = call;
  }

  get _id(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _name(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class CreateMemberCall__Outputs {
  _call: CreateMemberCall;

  constructor(call: CreateMemberCall) {
    this._call = call;
  }
}

export class CreateOrganizationCall extends ethereum.Call {
  get inputs(): CreateOrganizationCall__Inputs {
    return new CreateOrganizationCall__Inputs(this);
  }

  get outputs(): CreateOrganizationCall__Outputs {
    return new CreateOrganizationCall__Outputs(this);
  }
}

export class CreateOrganizationCall__Inputs {
  _call: CreateOrganizationCall;

  constructor(call: CreateOrganizationCall) {
    this._call = call;
  }

  get _id(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _name(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class CreateOrganizationCall__Outputs {
  _call: CreateOrganizationCall;

  constructor(call: CreateOrganizationCall) {
    this._call = call;
  }
}

export class JoinAllianceCall extends ethereum.Call {
  get inputs(): JoinAllianceCall__Inputs {
    return new JoinAllianceCall__Inputs(this);
  }

  get outputs(): JoinAllianceCall__Outputs {
    return new JoinAllianceCall__Outputs(this);
  }
}

export class JoinAllianceCall__Inputs {
  _call: JoinAllianceCall;

  constructor(call: JoinAllianceCall) {
    this._call = call;
  }

  get _allianceNumber(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _participantId(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class JoinAllianceCall__Outputs {
  _call: JoinAllianceCall;

  constructor(call: JoinAllianceCall) {
    this._call = call;
  }
}

export class JoinOrganizationCall extends ethereum.Call {
  get inputs(): JoinOrganizationCall__Inputs {
    return new JoinOrganizationCall__Inputs(this);
  }

  get outputs(): JoinOrganizationCall__Outputs {
    return new JoinOrganizationCall__Outputs(this);
  }
}

export class JoinOrganizationCall__Inputs {
  _call: JoinOrganizationCall;

  constructor(call: JoinOrganizationCall) {
    this._call = call;
  }

  get _orgId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _memberId(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class JoinOrganizationCall__Outputs {
  _call: JoinOrganizationCall;

  constructor(call: JoinOrganizationCall) {
    this._call = call;
  }
}

export class LeaveAllianceCall extends ethereum.Call {
  get inputs(): LeaveAllianceCall__Inputs {
    return new LeaveAllianceCall__Inputs(this);
  }

  get outputs(): LeaveAllianceCall__Outputs {
    return new LeaveAllianceCall__Outputs(this);
  }
}

export class LeaveAllianceCall__Inputs {
  _call: LeaveAllianceCall;

  constructor(call: LeaveAllianceCall) {
    this._call = call;
  }

  get _allianceNumber(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _participantId(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class LeaveAllianceCall__Outputs {
  _call: LeaveAllianceCall;

  constructor(call: LeaveAllianceCall) {
    this._call = call;
  }
}

export class LeaveOrganizationCall extends ethereum.Call {
  get inputs(): LeaveOrganizationCall__Inputs {
    return new LeaveOrganizationCall__Inputs(this);
  }

  get outputs(): LeaveOrganizationCall__Outputs {
    return new LeaveOrganizationCall__Outputs(this);
  }
}

export class LeaveOrganizationCall__Inputs {
  _call: LeaveOrganizationCall;

  constructor(call: LeaveOrganizationCall) {
    this._call = call;
  }

  get _orgId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _memberId(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class LeaveOrganizationCall__Outputs {
  _call: LeaveOrganizationCall;

  constructor(call: LeaveOrganizationCall) {
    this._call = call;
  }
}

export class SetVotingPowerToMemberCall extends ethereum.Call {
  get inputs(): SetVotingPowerToMemberCall__Inputs {
    return new SetVotingPowerToMemberCall__Inputs(this);
  }

  get outputs(): SetVotingPowerToMemberCall__Outputs {
    return new SetVotingPowerToMemberCall__Outputs(this);
  }
}

export class SetVotingPowerToMemberCall__Inputs {
  _call: SetVotingPowerToMemberCall;

  constructor(call: SetVotingPowerToMemberCall) {
    this._call = call;
  }

  get _orgId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _memberId(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }

  get _votingPower(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SetVotingPowerToMemberCall__Outputs {
  _call: SetVotingPowerToMemberCall;

  constructor(call: SetVotingPowerToMemberCall) {
    this._call = call;
  }
}
