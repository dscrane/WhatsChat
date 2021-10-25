import express from "express";
import { Chatroom } from "../models/chatroom.js";
import { User } from "../models/user.js";

const router = express.Router();

router.post("/MessagesDisplay", async (req, res) => {
  if (typeof req.body === 'string') {
    req.body = JSON.parse(req.body);
  }
  try {
    const chats = await Chatroom.find({"name": {$in: req.body.rooms}})
    res.send({ chats });
  } catch (e) {
    console.error(e);
  }
});

router.post("/create-chatroom", async (req, res) => {
  let userSocketId;
  const users = await User.find({});

  for (const user of users) {
    console.log(user);
    // if (user.username === req.body) {
    //   userSocketId = user.socketId
    // }
    //
    //
    // req.body === user.username ? username = req.body : roomname = req.body
  }

  const chat = new Chatroom(req.body);
  try {
    await chat.save();
    res.send({ chat });
  } catch (e) {
    console.error(e);
  }
});

export default router;
