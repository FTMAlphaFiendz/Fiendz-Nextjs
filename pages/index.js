import Head from "next/head";
import clientPromise from "../lib/mongodb";
import Navbar from "../components/Navbar";

export default function Home({ isConnected }) {
  return (
    <div className="h-screen w-screen">
      <Head>
        <title>Cole Miller - Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <div className="flex flex-col items-center">
          <h2 className="cursor-pointer font-bold">{"<Cole.Miller />"}</h2>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
