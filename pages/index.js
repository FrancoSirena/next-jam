import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import LogIn from "../components/login";
import Top from "../components/top";
import UserProvider from "../components/usercontext";
import styles from "../styles/index.module.scss";

export default function Home(props) {
  return (
    <UserProvider
      accessToken={props.access_token}
      refreshToken={props.refresh_token}
    >
      <div className="container">
        <Head>
          <title>Your Spotify Jam</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <header className={styles.title}>
            <h1>Your Spotify Jam</h1>
          </header>
          <p className={styles.descr}>
            Check out your most listened songs and your preferred gender. Just
            sign with your Spotify account and check out your cool stuff.
          </p>
          <LogIn />
          {props.access_token && <Top />}
        </main>

        <footer>Franco Sirena 2020</footer>
      </div>
    </UserProvider>
  );
}

Home.getInitialProps = (ctx) => {
  return {
    access_token: ctx.query.access_token,
    refresh_token: ctx.query.refresh_token,
  };
};
