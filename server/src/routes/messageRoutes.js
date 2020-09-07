const express = require('express');
const Message = require('../models/message')

const router = express.Router();

router.get('/messages/:chatId', async (req, res) => {
  console.log(req.params.chatId)
  try {
    const messages = await Message.find({chatId: req.params.chatId}).limit(10);
    console.log('fetch messages worked')
    res.send({ chatId: req.params.chatId, messages: messages });
  } catch (e) {
    console.log(e)
  }
})

module.exports = router;