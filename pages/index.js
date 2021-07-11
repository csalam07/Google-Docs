import Head from "next/head";
import Body from "../components/Body";
import Header from "../components/Header";
import Login from "../components/Login";
import { getSession, useSession } from "next-auth/client";

export default function Home() {
  const [session] = useSession();

  if (!session) return <Login />;

  return (
    <div className="sidescroll">
      <Head>
        <title>Google Docs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Body />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
