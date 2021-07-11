import { gql } from "@apollo/client";
import Client from "../apollo";
import { EmployeeQueryModel, EmployeesQueryModel } from "../models/queries";

export const GetEmployeeByID = async (id: string | string[] | undefined) =>
  await Client.query<EmployeeQueryModel>({
    query: gql`
{
  employee(id: "${id}") {
    id
    avatar
    firstName
    lastName
    jobTitle
    phone
    gender
    address
    company {
      name
    }
    rate
  }
}
`,
  });

export const GetEmployees = async () =>
  await Client.query<EmployeesQueryModel>({
    query: gql`
      {
        employees {
          id
          avatar
          firstName
          lastName
          jobTitle
          gender
          phone
          age
          address
          rate
          company {
            name
          }
        }
      }
    `,
  });
