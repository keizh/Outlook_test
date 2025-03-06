import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import store from "../App/store";
import {
  fetchSpecificEMAIL,
  readEmailAdded,
  fetchEMAILs,
} from "../Features/EmailSlice";
function Tab({ ele }) {
  const d = new moment(ele.date);
  const dispatch = useDispatch();
  const { activeEmail, hasMore, unreadEmail } = useSelector(
    (store) => store.email
  );

  const handler = () => {
    dispatch(fetchSpecificEMAIL(ele));
    // if (activeBTN == "Unread") {
    dispatch(readEmailAdded(ele));
    // }
    // check trick
    if (unreadEmail.length === 1 && hasMore) {
      console.log(`cheap trick played`);
      store.dispatch(fetchEMAILs({ cheat_used: true }));
    }
  };

  return (
    <div
      className={`tab ${
        activeEmail == null ? "" : activeEmail.id == ele.id ? "bg_white" : ""
      }`}
      onClick={handler}
    >
      <aside className="tab_left">
        <div className="profile">
          <span>{ele.from.name[0].toUpperCase()}</span>
        </div>
      </aside>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <p className="tab_light">
          From : <span className="tab_bold">{ele.from.email}</span>
        </p>
        <p className="tab_light">
          Subject : <span className="tab_bold">{ele.subject}</span>
        </p>
        <p className="tab_light text_whiteSpace_no_wrap">
          {ele.short_description}
        </p>
        <div style={{ display: "flex", gap: "20px" }}>
          <p className="tab_light">{d.format("L") + " " + d.format("LT")}</p>
          {ele.isFavorite && <span style={{ color: "#e54065" }}>Favorite</span>}
        </div>
      </section>
    </div>
  );
}

export default React.memo(Tab, (prev, next) => prev.ele.id === next.ele.id);
