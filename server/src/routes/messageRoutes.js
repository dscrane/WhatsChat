import express from "express";
import { default as Message } from '../models/message.js';

const router = express.Router();

router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find({chatroomId: req.query.chatroomId}).limit(50).sort({createdAt: 1});
    res.send({ chatId: req.query.chatroomId, messages: messages });
  } catch (e) {
    console.error(e)
  }
})

export default router;
