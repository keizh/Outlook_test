import React from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment/moment";
import {
  closeEmail,
  unfavoriteEmail,
  favoriteEmailAdded,
} from "../Features/EmailSlice";
function Email() {
  const { activeEmail } = useSelector((store) => store.email);
  const dispatch = useDispatch();
  const favoriteHandler = () => {
    console.log(`vreerg`);
    if (activeEmail.isFavorite) {
      dispatch(unfavoriteEmail(activeEmail));
    } else {
      dispatch(favoriteEmailAdded(activeEmail));
    }
  };
  if (activeEmail == null) {
    return <div></div>;
  } else {
    const d = new moment(activeEmail.date);
    return (
      <div className="email">
        <div className="emial_Content">
          <div className="left">
            <div className="profile">
              <span>{activeEmail.from.name[0].toUpperCase()}</span>
            </div>
          </div>
          <div className="right">
            <div className="topper">
              <h2>{activeEmail.subject}</h2>
              <button className="favorite_btn" onClick={favoriteHandler}>
                {activeEmail.isFavorite ? (
                  <span>Remove Favorite</span>
                ) : (
                  <span>Add to Favorite</span>
                )}
              </button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p className="tab_light">
                {d.format("L") + " " + d.format("LT")}
              </p>
              <button onClick={() => dispatch(closeEmail())}>close</button>
            </div>
            <div className="email_body">
              <section dangerouslySetInnerHTML={{ __html: activeEmail.body }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Email;
