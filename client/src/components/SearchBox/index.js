import React, { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

import "./styles.css";

export const SearchBox = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <div className="searchBox">
      <div className="searchBox__header">
        <h4>{auth.name}</h4>
      </div>
      <div className="searchBox__bar">
        <button className="button" onClick={logout}>
          Salir
        </button>
      </div>
    </div>
  );
};
