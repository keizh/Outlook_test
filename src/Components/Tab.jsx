import React from "react";

function Tab({ ele }) {
  return (
    <div className="tab">
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
          <p className="tab_light">{ele.date}</p>
          {ele.favorite && <span>Favorite</span>}
        </div>
      </section>
    </div>
  );
}

export default Tab;
