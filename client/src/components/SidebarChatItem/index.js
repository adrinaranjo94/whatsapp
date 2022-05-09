import React, { useContext } from "react";

import { ChatContext } from "../../context/chat/ChatContext";
import { privateFetch } from "../../helpers/fetch";
import { scrollToBottom } from "../../helpers/scrollToBottom";

import { types } from "../../types/types";

import "./styles.css";

export const SidebarChatItem = ({ user }) => {
  const { chatState, dispatch } = useContext(ChatContext);
  const { currentChat } = chatState;

  const onClick = async () => {
    dispatch({
      type: types.setCurrentChat,
      payload: user.uid,
    });

    const resp = await privateFetch(`messages/${user.uid}`);
    dispatch({
      type: types.loadMessages,
      payload: resp.messages,
    });

    scrollToBottom("messages");
  };

  return (
    <div
      className={`chatList__item ${
        user.uid === currentChat ? "currentChat" : ""
      }`}
      onClick={onClick}
    >
      <div className="chatList__icon">
        <div className="chatList__image">
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="sunil"
          />
        </div>
      </div>
      <div className="chatList__name">
        <h5> {user.name} </h5>
        {user.online ? (
          <span className="online">Online</span>
        ) : (
          <span className="offline">Offline</span>
        )}
      </div>
    </div>
  );
};
