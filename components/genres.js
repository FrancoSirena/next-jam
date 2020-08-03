import Pill from "./pill";
import styles from "../styles/top.module.scss";

function Genres({ data, applyFilter, filter, loading, artistsCount = 20 }) {
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

export default Genres;
