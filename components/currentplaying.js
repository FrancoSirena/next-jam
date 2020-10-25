import { useUserContext } from "./usercontext";
import useRequest from "./hooks/useRequest";
import style from "../styles/currentplaying.module.scss";

/**
 * Shows current playing track if there is any
 * It auto updates itself each minute to check for new track.
 * It shows a preview if there is a preview_url
 * @returns {ReactElement} CurrentPlaying
 */
export default function CurrentPlaying() {
  const { accessToken } = useUserContext();

  const { data: listening, loading, request } = useRequest(
    {
      url: "/api/current_playing",
    },
    {
      auto: Boolean(accessToken),
    }
  );

  React.useEffect(() => {
    let interval;
    if (accessToken) {
      interval = setInterval(request, 60000)
    }
    return () => interval && clearInterval(interval)
  }, [accessToken, request]);

  return (
    <article style={{ textAlign: "right", fontSize: "13px"}}>
      <div className={style.title}>
        <h1>Current Playing</h1>
        <button type="button" onClick={request} className={style.refresh} title="Refresh playing track">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" version="1.1">
            <path d="M8 5C0 5, 0 20, 8 20" stroke="#3066BE" fill="transparent"></path>
            <path d="M12 5C20 5, 20 20, 12 20" stroke="#3066BE" fill="transparent"></path>
            <path d="M8 5L5 3Z" stroke="#3066BE" fill="transparent"></path>
            <path d="M8 5L6 9Z" stroke="#3066BE" fill="transparent"></path>
            <path d="M12 20L14 16Z" stroke="#3066BE" fill="transparent"></path>
            <path d="M12 20L15 22Z" stroke="#3066BE" fill="transparent"></path>
          </svg>
        </button>
      </div>
      {(loading || !listening?.item) && <span>...</span>}
      {!loading && listening?.item && (
        <>
          <div className={style.track}>
            <svg width={20} height={20}>
              <line
                x1={1}
                x2={1}
                y1={0}
                y2={20}
                style={{ stroke: "#3066BE", strokeWidth: 5 }}
              />
              <line
                x1={8}
                x2={8}
                y1={4}
                y2={16}
                style={{ stroke: "#3066BE", strokeWidth: 5 }}
              />
              <line
                x1={15}
                x2={15}
                y1={0}
                y2={20}
                style={{ stroke: "#3066BE", strokeWidth: 5 }}
              />
            </svg>
            <h2>{listening.item.artists[0].name} - {listening.item.name}</h2>
          </div>
          {listening.item.preview_url && (
            <audio controls>
              <source src={listening.item.preview_url} type="audio/mpeg" />
              Please use a modern browser
            </audio>
          )}
        </>
      )}
    </article>
  );
}
