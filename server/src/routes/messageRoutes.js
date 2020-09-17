const express = require('express');
const Message = require('../models/message')

const router = express.Router();

router.get('/messages/:chatRoomId', async (req, res) => {
  try {
    console.log(req.params)
    const messages = await Message.find({chatRoomId: req.params.chatRoomId}).limit(50).sort({createdAt: 1});
    res.send({ chatId: req.params.chatRoomId, messages: messages });
  } catch (e) {
    console.log(e)
  }
})

module.exports = router;