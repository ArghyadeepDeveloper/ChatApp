import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./database/connection.js";
import userRoutes from "./routes/UserRoutes.js";
import { validationError } from "./middlewares/ValidationError.js";
import dotenv from "dotenv";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Socket.io connection
io.on("connection", (socket) => {
  console.log("a user connected");

  // Listen for new messages
  socket.on("chat message", async (msg) => {
    try {
      const message = new Message({ text: msg });
      await message.save();
      io.emit("chat message", msg); // Broadcast the message to all clients
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });
});

const PORT = process.env.PORT || 3001;

app.use(express.json());

//routes
app.use("/users", userRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
