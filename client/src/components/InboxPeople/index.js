import React from "react";
import { SearchBox } from "../SearchBox";
import { Sidebar } from "../Sidebar";

import "./styles.css";

export const InboxPeople = () => {
  return (
    <div className="inboxPeople">
      <SearchBox />

      <Sidebar />
    </div>
  );
};
