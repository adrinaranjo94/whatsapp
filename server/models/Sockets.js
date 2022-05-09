const {
  userConnected,
  userDisconnected,
  getUsers,
  saveMessage,
} = require("../controllers/sockets");
const { validateJWT } = require("../helpers/jwt");

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", async (socket) => {
      // Validate JWT
      const [valid, uid] = validateJWT(socket.handshake.query["x-token"]);

      if (!valid) {
        console.log("socket not identified");
        return socket.disconnect();
      }

      // Check user is online
      await userConnected(uid);
      // Emit all users connected
      this.io.emit("users-list", await getUsers());
      // Socket Join UID
      socket.join(uid);
      // Listen user send message
      socket.on("personal-message", async (payload) => {
        console.log("message recibido");
        const message = await saveMessage(payload);
        this.io.to(payload.from).emit("personal-message", message);
        this.io.to(payload.to).emit("personal-message", message);
      });
      // Disconnect
      socket.on("disconnect", async () => {
        await userDisconnected(uid);
        // Emit all users connected
        this.io.emit("users-list", await getUsers());
      });
    });
  }
}

module.exports = Sockets;
