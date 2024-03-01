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

// one to may relationship
const organizationMembersQuery = `
query
{
  organizations {
    name
    member {
      member {
        name
      }
      votingPower
    }
  }
}
`

// one to one relationship
const memberDelegatorQuery = `
query
{
  members(first: 5) {
    id
    name
    delegator {
      name
      address
    }
  }
}
`

// many to many relationship
const membersOrganizationsQuery = `
query
{
  memberOrganizations {
    id
    member {
      organization {
        member {
          name
        }
        organization {
          name
        }
      }
    }
  }
}
`

// interface query
const allianceQuery = `
query
{
  alliances {
    id
    participant {
      __typename
      ... on Member {
        name
        adminAddr
      }
      ... on Organization{
        name
        owner
      }
    }
  }
}
`

module.exports = {
  membersQuery,
  delegatorQuery,
  organizationMembersQuery,
  memberDelegatorQuery,
  membersOrganizationsQuery,
  allianceQuery
};
