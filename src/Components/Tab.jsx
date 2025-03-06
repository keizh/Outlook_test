import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { fetchSpecificEMAIL } from "../Features/EmailSlice";
function Tab({ ele }) {
  const d = new moment(ele.date);
  const dispatch = useDispatch();
  const { activeEmail } = useSelector((store) => store.email);
  return (
    <div
      className={`tab ${
        activeEmail == null ? "" : activeEmail.id == ele.id ? "bg_white" : ""
      }`}
      onClick={() => dispatch(fetchSpecificEMAIL(ele))}
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
        <div>
          <p className="tab_light">{d.format("L") + " " + d.format("LT")}</p>
          {ele.favorite && <span>Favorite</span>}
        </div>
      </section>
    </div>
  );
}

export default Tab;
