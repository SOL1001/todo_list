import gql from "graphql-tag";

export const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
      id
      name
      todos {
        id
        title
        user_id
      }
    }
  }
`;


// here we are exporting the a varibale called GET_USERS_QUERY, but we can export object or function