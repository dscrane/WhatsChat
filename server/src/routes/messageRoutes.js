const express = require('express');
const Message = require('../models/message')

const router = express.Router();

router.get('/messages', async (req, res) => {
  try {

    console.log(req.query.chatRoomId)
    const messages = await Message.find({chatRoomId: req.query.chatRoomId}).limit(50).sort({createdAt: 1});
    res.send({ chatId: req.query.chatRoomId, messages: messages });
  } catch (e) {
    console.error(e)
  }
})

module.exports = router;
