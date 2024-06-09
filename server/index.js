import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./database/connection.js";
import { userAuthRoutes, userUnauthRoutes } from "./routes/UserRoutes.js";
import { validationError } from "./middlewares/ValidationError.js";
import dotenv from "dotenv";
import verifyToken from "./middlewares/verifyToken.js";
import chatRoomRoutes from "./routes/ChatRoomRoutes.js";
import Message from "./models/MessageModel.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for new messages
  socket.on("chat message", async ({ text, senderId, chatRoomId }) => {
    try {
      const message = new Message({
        text,
        sender: senderId,
        chatRoom: chatRoomId,
      });
      await message.save();
      io.emit("chat message", message); // Broadcast the message to all clients
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3001;

app.use(express.json());

// unauth routes
app.use("/users", userUnauthRoutes);

// auth routes
app.use(verifyToken);
app.use("/users", userAuthRoutes);
app.use("/chat", chatRoomRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
