import Axios from "axios";
import Head from "next/head";
import CurrentPlaying from "../components/currentplaying";
import LogIn from "../components/login";
import Top from "../components/top";
import UserProvider from "../components/usercontext";
import UserProfile from "../components/userprofile";
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
            {props.user ? (
              <>
                <UserProfile user={props.user} />
                <CurrentPlaying />
              </>
            ) : (
              <h1>Your Spotify Jam</h1>
            )}
          </header>
          {!props.access_token && <LogIn />}
          <p className={styles.descr}>
            Check out your most listened artists and which music genres you
            prefer.
            {!props.access_token && (
              <>Just hit login and connect with your Spotify account.</>
            )}
          </p>
          {props.access_token && <Top />}
        </main>

        <footer>Franco Sirena 2020</footer>
      </div>
    </UserProvider>
  );
}

export async function getServerSideProps(ctx) {
  let user = null;
  if (ctx.query.access_token) {
    ({ data: user } = await Axios.get("https://api.spotify.com/v1/me/", {
      headers: {
        Authorization: `Bearer ${ctx.query.access_token}`,
      },
    }));
  }
  return {
    props: {
      access_token: ctx.query.access_token ?? null,
      refresh_token: ctx.query.refresh_token ?? null,
      user,
    },
  };
}
