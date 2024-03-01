// fetches the data from the subgraph using graphclient
const graphClient = require('../.graphclient/index.js');
const { AllDelegators } = require('./queries/members.gql');
const { membersQuery, delegatorQuery } = require('./queries/queries.js');

// the .graphclientrc.yml file is used to configure the graphclient
// also `yarn build` will be needed

async function getQueryData() {
  //getting member data
  const membersResult = await graphClient.execute(AllDelegators, {});
  console.log(membersResult.data.members);
  //getting token data
  const delegatorResult = await graphClient.execute(delegatorQuery, {});
  console.log(delegatorResult.data.delegators);
}

getQueryData();
