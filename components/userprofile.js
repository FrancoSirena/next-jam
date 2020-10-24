import Link from "next/link";
import styles from "../styles/userprofile.module.scss";

export default function UserProfile({ user }) {
  return (
    <div className={styles.profile}>
      <div className={styles.logout}><Link href="/"><a>Logout</a></Link></div>
      <img className={styles.image} src={user.images?.[0].url} />
      <div className={styles.info}>
        <h1 className={styles.name}>{user.display_name}</h1>
        <span>Followers: {user.followers.total}</span>
      </div>
    </div>
  );
}
