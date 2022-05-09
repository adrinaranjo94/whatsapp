import { ChatProvider } from "./context/chat/ChatContext";
import { AuthProvider } from "./context/auth/AuthContext";
import { SocketProvider } from "./context/socket/SocketContext";
import { AppRouter } from "./router/AppRouter";
// import "./css/chat.css";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

function App() {
  return (
    <ChatProvider>
      <AuthProvider>
        <SocketProvider>
          <AppRouter />
        </SocketProvider>
      </AuthProvider>
    </ChatProvider>
  );
}

export default App;
