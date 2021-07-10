import { gql } from "@apollo/client";

export const GetEmployeeByID = (id: string | string[] | undefined) => gql`
{
  employee(id: "${id}") {
    id
    avatar
    firstName
    lastName
    jobTitle
    gender
    address
    rate
  }
}
`;
