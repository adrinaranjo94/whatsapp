import React, { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { ChatContext } from "../../context/chat/ChatContext";

import { IncomingMessage } from "../IncomingMessage";
import { OutgoingMessage } from "../OutgoingMessage";
import { SendMessage } from "../SendMessage";

import "./styles.css";

export const Messages = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  return (
    <div className="messages">
      <div id="messages" className="messages__list">
        {chatState.messages.map((message) =>
          message.to === auth.uid ? (
            <IncomingMessage key={message._id} msg={message} />
          ) : (
            <OutgoingMessage key={message._id} msg={message} />
          )
        )}
      </div>
      <SendMessage />
    </div>
  );
};
