import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Tab from "./Tab";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchEMAILs } from "../Features/EmailSlice";
function ListOfEmails() {
  const {
    unreadEmail,
    readEmail,
    favoriteEmail,
    hasMore,
    activeBTN,
    activeEmail,
  } = useSelector((store) => store.email);
  const dispatch = useDispatch();
  return (
    <div
      className={`ListOfEmails ${activeEmail != null ? "email" : ""}`}
      id="scrollableDiv"
    >
      {activeBTN == "Unread" && (
        <InfiniteScroll
          //   className="ListOfEmails"
          dataLength={unreadEmail.length}
          next={() => {
            console.log(`vrerefrefregre`);
            dispatch(fetchEMAILs());
          }}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>No More Emails...</b>
            </p>
          }
          scrollableTarget="scrollableDiv"
        >
          {unreadEmail.map((ele) => (
            <Tab key={ele.id} ele={ele} />
          ))}
        </InfiniteScroll>
      )}

      {activeBTN === "Read" &&
        readEmail.length > 0 &&
        favoriteEmail.map((ele) => <Tab key={ele.id} ele={ele} />)}

      {activeBTN === "Read" && readEmail.length == 0 && (
        <span>No Read Emails</span>
      )}

      {activeBTN === "Favorites" &&
        favoriteEmail.length > 0 &&
        favoriteEmail.map((ele) => <Tab key={ele.id} ele={ele} />)}

      {activeBTN === "Favorites" && favoriteEmail.length == 0 && (
        <span>No Favorite Email</span>
      )}
    </div>
  );
}

export default ListOfEmails;
