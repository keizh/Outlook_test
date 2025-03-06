import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Tab from "./Tab";
import InfiniteScroll from "react-infinite-scroll-component";
function ListOfEmails() {
  const { unreadEmail } = useSelector((store) => store.email);
  //   const dispatch = useDispatch();
  return (
    <div className="ListOfEmails">
      <InfiniteScroll dataLength={unreadEmail.length} next={() => dis}>
        {unreadEmail.map((ele) => (
          <Tab key={ele.id} ele={ele} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default ListOfEmails;
