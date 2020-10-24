import styles from '../styles/index.module.scss';

export default function LogIn() {
  return (
    <a href="/api/login" className={`button ${styles.connect}`}>
      Connect your account
    </a>
  );
}
