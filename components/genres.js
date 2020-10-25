import Pill from "./pill";
import styles from "../styles/top.module.scss";

/**
 * Shows most listened music genres
 * Each genre is a pill which can be toggled on/off
 * to filter by that specific genre.
 * @returns {ReactElement} Genres
 */
export default function Genres({ data, applyFilter, filter, loading, artistsCount = 20 }) {
  return (
    <div className={styles.genres}>
      {!loading &&
        Object.entries(data)
          .map(([key, count]) => (
            <div key={key} className={styles.genre}>
              <Pill
                as="button"
                style={{
                  transform: `scale(${count / artistsCount + 0.8})`,
                }}
                onClick={() => applyFilter(key)}
                className={`${filter?.has(key) && "selected"}`}
              >
                {key}
              </Pill>
            </div>
          ))}
    </div>
  );
}