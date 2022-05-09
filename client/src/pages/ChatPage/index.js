import React, { useContext } from "react";
import { ChatSelect } from "../../components/ChatSelect";
import { InboxPeople } from "../../components/InboxPeople";
import { Messages } from "../../components/Messages";
import { ChatContext } from "../../context/chat/ChatContext";

import "../../css/chat.css";
import "./styles.css";

export const ChatPage = () => {
  const { chatState } = useContext(ChatContext);

  return (
    <div className="chatPage">
      <div className="chatPage__content">
        <InboxPeople />

        {chatState.currentChat ? <Messages /> : <ChatSelect />}
      </div>
    </div>
  );
};
