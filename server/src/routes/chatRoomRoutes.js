const express = require('express');
const { ChatRoom } = require('../models/chatRoom')

const router = express.Router();

router.get('/chats', async (req, res) => {
  try {
    const chats = await ChatRoom.find().limit(8).sort({createdAt: -1});
    console.log('fetch chat worked')
    res.send({ chats });
  } catch (e) {
    console.log(e)
  }
})

router.post('/create-chatRoom', async (req, res) => {
  console.log('something happened')
  const chat = new ChatRoom (req.body);
  try {
    await chat.save()
    const chats = await ChatRoom.find().limit(8).sort({createdAt: -1})
    console.log(chat)
    res.send({ chats })
  } catch (e) {
    console.log(e)
  }
})



module.exports = router;