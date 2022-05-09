import React, { createContext, useReducer } from "react";
import { chatReducer } from "../../reducers/chatReducer";

export const ChatContext = createContext();

const initialState = {
  uid: "",
  currentChat: null, // UID del usuario al que yo quiero enviar messages
  users: [], // Todos los users de la base datos
  messages: [], // El chat seleccionado
};

export const ChatProvider = ({ children }) => {
  const [chatState, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider
      value={{
        chatState,
        dispatch,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
