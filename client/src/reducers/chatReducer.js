import { types } from "../types/types";

// const initialState = {
//     uid: '',
//     currentChat: null, // UID del usuario al que yo quiero enviar messages
//     users: [], // Todos los users de la base datos
//     messages: [], // El chat seleccionado
// }

export const chatReducer = (state, action) => {
  switch (action.type) {
    case types.loadUsers:
      return {
        ...state,
        users: [...action.payload],
      };

    case types.setCurrentChat:
      if (state.currentChat === action.payload) return state;

      return {
        ...state,
        currentChat: action.payload,
        messages: [],
      };

    case types.newMessage:
      if (
        state.currentChat === action.payload.from ||
        state.currentChat === action.payload.to
      ) {
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      } else {
        return state;
      }

    case types.loadMessages:
      return {
        ...state,
        messages: [...action.payload],
      };

    default:
      return state;
  }
};
