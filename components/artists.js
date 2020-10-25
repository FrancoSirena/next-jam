import Pill from "./pill";
import styles from "../styles/top.module.scss";

/**
 * Show the most listened artists, showing their popularity
 * And displaying them with a Grid layout
 * @returns {ReactElement} Artists
 */
export default function Artists({ data, loading, applyFilter }) {
  const results =
    data || Array.from({ length: 3 }, (_, index) => ({ id: `fake_${index}` }));
  return (
    <article className={`${styles.list} ${loading && styles.loading}`}>
      {results.map((value) => (
        <section key={value.id} className={styles.wrapper}>
          <div className={styles.artistInfo}>
            {value.image && (
              <img className={styles.image} src={value.image.url} />
            )}
            <div>
              <h1>
                <a href={value.uri}>{value.name}</a>
              </h1>
              <div className={styles.extraInfo}>
                <span className={styles.title}>Followers:</span>
                <span className={styles.info}>&nbsp;{value.followers}</span>
              </div>
              <div className={styles.extraInfo}>
                <span className={styles.title}>Popularity:</span>
                <span className={styles.info}>&nbsp;{value.popularity}</span>
              </div>
            </div>
          </div>
          <div className={styles.pills}>
            {value.genres?.map((gen) => (
              <Pill key={`${value.id}-${gen}`} as="button" onClick={() => applyFilter(gen)}>{gen}</Pill>
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}
