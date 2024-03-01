// fetches the data from the subgraph using graphclient
const graphClient = require('../.graphclient/index.js');
const {recursiveLog} = require('./helper.js');
const { 
  membersQuery, 
  delegatorQuery,
  organizationMembersQuery,
  memberDelegatorQuery,
  membersOrganizationsQuery,
  allianceQuery 
} = require('./queries/queries.js');

// the .graphclientrc.yml file is used to configure the graphclient
// also `yarn build` will be needed

async function queryList() {
  const membersResult = await graphClient.execute(membersQuery, {});
  console.log('---------------MEMBER--------------------');
  console.log(membersResult.data);
  const delegatorResult = await graphClient.execute(delegatorQuery, {});
  console.log('---------------DELEGATOR--------------------');
  console.log(delegatorResult.data);
}

async function queryOneToOneRelationship() {
  const membersResult = await graphClient.execute(memberDelegatorQuery, {});
  console.log('---------------ONE-TO-ONE--------------------');
  recursiveLog(membersResult.data.member);
}

async function queryOneToManyRelationship() {
  const membersResult = await graphClient.execute(organizationMembersQuery, {});
  console.log('---------------ONE-TO-MANY--------------------');
  recursiveLog(membersResult.data.organizations);
}

async function queryManyToManyRelationship() {
  const membersResult = await graphClient.execute(membersOrganizationsQuery, {});
  console.log('---------------MANY-TO-MANY--------------------');
  recursiveLog(membersResult.data.memberOrganizations);
}

async function queryInterface() {
  const membersResult = await graphClient.execute(allianceQuery, {});
  console.log('---------------INTERFACE--------------------');
  recursiveLog(membersResult.data.alliances);
}



queryList();
queryOneToOneRelationship();
queryOneToManyRelationship();
queryManyToManyRelationship();
queryInterface();
