const membersQuery = `
query {
  members(first: 5){
    id
    name
    adminAddr
    }
}`;

const delegatorQuery = `
query {
  delegators(first: 5) {
    id
    address
    name
    member {
      id
    }
  }
}
`;

module.exports = {
  membersQuery,
  delegatorQuery,
};
