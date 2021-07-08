const express = require('express');
const { ChatRoom } = require('../models/chatRoom')

const router = express.Router();

router.get('/chats', async (req, res) => {
  try {
    const chats = await ChatRoom.find().limit(8);
    res.send({ chats });
  } catch (e) {
    console.error(e)
  }
})

router.post('/create-chatRoom', async (req, res) => {
  console.log(req.body)
  const chat = new ChatRoom (req.body);
  try {
    await chat.save()
    res.send({ chat })
  } catch (e) {
    console.error(e)
  }
})


module.exports = router;