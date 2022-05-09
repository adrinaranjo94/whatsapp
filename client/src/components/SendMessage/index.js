import React, { useContext, useState } from "react";

import { AuthContext } from "../../context/auth/AuthContext";
import { ChatContext } from "../../context/chat/ChatContext";
import { SocketContext } from "../../context/socket/SocketContext";

import "./styles.css";

export const SendMessage = () => {
  const [message, setMessage] = useState("");

  const { socket } = useContext(SocketContext);
  const { auth } = useContext(AuthContext);
  const { chatState } = useContext(ChatContext);

  const onChange = ({ target }) => {
    setMessage(target.value);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();

    if (message.length === 0) {
      return;
    }

    socket.emit("personal-message", {
      from: auth.uid,
      to: chatState.currentChat,
      message,
    });

    setMessage("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="inputChat">
        <div className="inputChat__input">
          <input
            type="text"
            className="write_msg"
            placeholder="Mensaje..."
            value={message}
            onChange={onChange}
          />
        </div>
        <div className="inputChat__button">
          <button className="button" type="submit">
            enviar
          </button>
        </div>
      </div>
    </form>
  );
};
