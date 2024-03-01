// fetches the data from the subgraph using node-fetch
const fetch = require('node-fetch');
const { membersQuery, delegatorQuery } = require('./queries/queries.js');

// only this is needed
API_URL = 'https://api.studio.thegraph.com/query/66384/myfirstone/version/latest';

/*
 * Function to fetch a list of tokens from the number
 * Parameter:
 *     _number - Number of tokens required
 */
async function getMembers(query) {
  //set the query url
  var queryURL = API_URL;
  //define the query to fetch a list of ten tokens

  //set the request options
  var options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: query,
    }),
  };
  //get the response
  var response = await fetch(queryURL, options);
  //parsing the body text as JSON
  var queryResult = await response.json();
  //display the list of tokens tokens
  console.log(queryResult.data);
}

getMembers(membersQuery);
getMembers(delegatorQuery);
