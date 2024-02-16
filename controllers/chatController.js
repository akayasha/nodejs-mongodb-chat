const ChatMessage = require('../models/ChatMessage');
const User = require('../models/User');
const mongoose = require('mongoose');


exports.viewMessages = async (req, res) => {
  try {
    const userId = req.user.id;
    // Fetch messages where the current user is either the sender or the receiver
    const messages = await ChatMessage.find({ $or: [{ sender: userId }, { receiver: userId }] })
                                      .populate('sender', 'username')
                                      .populate('receiver', 'username');
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const sender = req.user.id;
    let { receiver, message } = req.body;

    // Get receiver's userId if the input is username
    if (!mongoose.Types.ObjectId.isValid(receiver)) {
      const user = await User.findOne({ username: receiver });
      if (!user) {
        return res.status(400).json({ message: 'Receiver not found' });
      }
      receiver = user._id;
    }

    // Pastikan bahwa sender dan receiver tidak sama
    if (sender === receiver) {
      return res.status(400).json({ message: 'Sender and receiver cannot be the same' });
    }

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
