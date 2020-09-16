const express = require('express');
const { ChatRoom } = require('../models/chatRoom')
const Message = require('../models/message')

const router = express.Router();

router.get('/chats', async (req, res) => {
  try {
    const chats = await ChatRoom.find().limit(8);
    res.send({ chats });
    console.log('message fetch successful')
  } catch (e) {
    console.log(e)
  }
})

router.post('/create-chatRoom', async (req, res) => {
  console.log(req.body)
  const chat = new ChatRoom (req.body);
  try {
    await chat.save()
    const chats = await ChatRoom.find().limit(8).sort({createdAt: -1})
    res.send({ chats })
    console.log('chat creation successful')
  } catch (e) {
    console.log(e)
  }
})



module.exports = router;