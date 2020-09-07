const express = require('express');
const Message = require('../models/message')

const router = express.Router();

router.get('/messages/:chatId', async (req, res) => {
  try {
    const messages = await Message.find({chatId: req.params.chatId}).limit(12);
    res.send({ chatId: req.params.chatId, messages: messages });
    console.log(messages)
  } catch (e) {
    console.log(e)
  }
})

module.exports = router;