import express from "express";
import {
  addmember,
  createChatRoom,
} from "../controllers/ChatRoomController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { checkIfAdmin } from "../middlewares/ChatRoomMiddleWares.js";
import validateId from "../middlewares/checkParamId.js";

const chatRoomRoutes = express.Router();

chatRoomRoutes.post("/", verifyToken, createChatRoom);
chatRoomRoutes.post(
  "/member/:id",
  verifyToken,
  validateId("id"),
  checkIfAdmin,
  addmember
);

export default chatRoomRoutes;
