import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Client from "../../apollo";
import EmployeeProfile from "../../components/employee-profile";
import MainContainer from "../../components/main-container";
import { EmployeeModel } from "../../models/employee";
import { EmployeeQueryModel } from "../../models/queries";
import { GetEmployeeByID } from "../../queries/employee";
import { initializeStore } from "../../store";
import { useStoreState } from "../../store/model";

interface IUserProfilePageProps {
  params: any;
  // employee: EmployeeModel;
}

const UserProfile: NextPage<IUserProfilePageProps> = (props) => {
  const { data } = useStoreState((store) => store.Employees);

  const { params } = props;

  const employee = data && data.find((d) => d.id === params.id);

  return (
    <div>
      <Head>
        <title>RATE`LY</title>
        <meta name='description' content={employee ? employee.firstName + " " + employee.lastName : "Kullanıcı bulunamadı"} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MainContainer>
        {employee ? (
          <div className='animate-fadeIn duration-75'>
            <EmployeeProfile employee={employee} />
          </div>
        ) : (
          <div>Not found</div>
        )}
      </MainContainer>

      <footer></footer>
    </div>
  );
};

export default UserProfile;

export const getServerSideProps: GetServerSideProps<IUserProfilePageProps> = async (context) => {
  // const result = await Client.query<EmployeeQueryModel>({
  //   query: GetEmployeeByID(context?.params?.id),
  // });

  const store = initializeStore({ App: { variables: { loading: false } } });

  return {
    props: {
      params: context.params,
      // employee: result.data.employee,
      ssrStoreState: store.getState(),
    }, // will be passed to the page component as props
  };
};
