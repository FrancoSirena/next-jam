import styles from '../styles/index.module.scss';

/**
 * Login button to connect to a spotify account
 * @returns {ReactElement} Login
 */
export default function LogIn() {
  return (
    <a href="/api/login" className={`button ${styles.connect}`}>
      Connect your account
    </a>
  );
}
