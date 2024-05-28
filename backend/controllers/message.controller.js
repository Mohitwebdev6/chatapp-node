import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      message,
    });

    await newMessage.save();

    conversation.messages.push(newMessage._id);

    await conversation.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error, ": Error in sendMessage controller");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    }).populate("messages");

    if(!conversation) res.status(401).json([])

    let messages=conversation.messages

    res.status(200).json(messages);
  } catch (error) {
    console.log(error, ": Error in getMessage controller");
    res.status(500).json({ message: "Internal server error" });
  }
};
