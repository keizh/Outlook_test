import React from "react";
const buttonData = ["Unread", "Read", "Favorites"];
import { useSelector, useDispatch } from "react-redux";
import { setActiveBTN } from "../Features/EmailSlice";

function Navigation() {
  const { activeBTN } = useSelector((store) => store.email);
  const dispatch = useDispatch();
  return (
    <nav>
      <span>Filter By : </span>
      {buttonData.map((ele, index) => (
        <button
          onClick={() => dispatch(setActiveBTN(ele))}
          key={index}
          className={`${activeBTN === ele ? "active-button" : ""}`}
        >
          {ele}
        </button>
      ))}
    </nav>
  );
}

export default Navigation;
