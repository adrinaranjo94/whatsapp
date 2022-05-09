import React from "react";
import { timeMoment } from "../../helpers/timeMoment";

import "./styles.css";

export const IncomingMessage = ({ msg }) => {
  return (
    <div className="incomingMessage">
      <div className="incomingMessage__image">
        <img
          src="https://ptetutorials.com/images/user-profile.png"
          alt="sunil"
        />
      </div>
      <div className="incomingMessage__content">
        <div className="incomingMessage__message">
          <p>{msg.message}</p>
        </div>
        <div className="incomingMessage__date">
          <span className="deliveredDate"> {timeMoment(msg.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};
