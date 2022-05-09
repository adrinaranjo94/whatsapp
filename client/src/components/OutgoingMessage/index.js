import React from "react";
import { timeMoment } from "../../helpers/timeMoment";

import "./styles.css";

export const OutgoingMessage = ({ msg }) => {
  return (
    <div className="outgoingMessage">
      <div className="outgoingMessage__content">
        <div className="outgoingMessage__message">
          <p>{msg.message}</p>
        </div>
        <div className="outgoingMessage__date">
          <span className="deliveredDate"> {timeMoment(msg.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};
