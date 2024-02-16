const ChatMessage = require('../models/ChatMessage');

exports.viewMessages = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch messages
    const messages = await ChatMessage.find({ $or: [{ sender: userId }, { receiver: userId }] });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;

    // Create message
    const newMessage = new ChatMessage({
      sender,
      receiver,
      message
    });

    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
