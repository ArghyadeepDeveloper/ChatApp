import ChatRoom from "../models/ChatRoomModel.js";

export const checkIfAdmin = async (req, res, next) => {
  try {
    const chatRoom = await ChatRoom.findById(req.params.id);
    if (chatRoom.admin.includes(req.user.id)) {
      next();
    } else {
      res
        .status(401)
        .json({ message: "you ae not authorized since you are not an admin" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
