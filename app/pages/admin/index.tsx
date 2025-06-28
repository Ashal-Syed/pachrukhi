import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

export default function AdminPage() {
  return <div className="p-4">Welcome to the Admin Portal</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return { props: { session } };
};
