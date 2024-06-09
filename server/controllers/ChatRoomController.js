import ChatRoom from "../models/ChatRoomModel.js";
import User from "../models/UserModel.js";

// Create Chat Room
export const createChatRoom = async (req, res) => {
  const { name, type } = req.body;
  const userId = req.user.id; // Assuming req.user.id contains the ID of the authenticated user

  try {
    // Check if both the authenticated user and the member exist
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Create a new chat room
    const newChatRoom = new ChatRoom({
      name,
      type,
      members: [userId],
      createdBy: userId,
      admin: [userId],
    });

    // Save the chat room to the database
    const savedChatRoom = await newChatRoom.save();

    res.status(201).json(savedChatRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addmember = async (req, res) => {
  const { memberId } = req.body; // ID of the member to be added
  const chatRoomId = req.params.id; // ID of the chat room

  try {
    // Check if the chat room exists
    const chatRoom = await ChatRoom.findById(chatRoomId);
    if (!chatRoom) {
      return res.status(404).json({ message: "Chat room not found" });
    }

    // Check if the member exists
    const member = await User.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the member is already in the chat room
    if (chatRoom.members.includes(memberId)) {
      return res
        .status(400)
        .json({ message: "User is already a member of the chat room" });
    }

    // Add the member to the chat room
    chatRoom.members.push(memberId);
    await chatRoom.save();

    res.status(200).json(chatRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
