import React, { useContext } from "react";

import { AuthContext } from "../../context/auth/AuthContext";
import { ChatContext } from "../../context/chat/ChatContext";

import { SidebarChatItem } from "../SidebarChatItem";

import "./styles.css";

export const Sidebar = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  const { uid } = auth;

  return (
    <div className="sidebar">
      {chatState.users
        .filter((user) => user.uid !== uid)
        .map((user) => (
          <SidebarChatItem key={user.uid} user={user} />
        ))}
    </div>
  );
};
