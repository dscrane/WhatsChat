import express from "express";
import { User } from "../models/user.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.get("/user-id", authenticate, (req, res) => {
  res.send(req.user);
});

router.get("/user", authenticate, (req, res) => {
  res.send({ user: req.user });
});

router.post("/create-user", async (req, res) => {
  const user = new User(req.body);
  try {
    user.currentRooms = [
      ...user.currentRooms,
      "Buddies",
      "soccer",
      "welcome room",
    ];
    await user.save();
    const token = await user.generateAuthToken();
    await user.generateAvatar();

    res.send({ user, token });
  } catch (e) {
    res.send({ error: e });
  }
});

router.post("/login-user", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.send({ error: { ...e } });
  }
});

router.post("/user-delete", authenticate, async (req, res) => {
  try {
    await req.user.remove();
    res.send({ userDeleted: true });
  } catch (e) {
    console.error(e);
  }
});

router.post("/logout", authenticate, async (req, res) => {
  try {
    req.user;
    req.user.tokens = [];
    await req.user.save();

    res.send({ logout: true });
  } catch (e) {
    res.send({ logout: false });
  }
});

router.patch("/user-update", authenticate, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "username", "email", "password"];

  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.send({ error: "Invalid Updates" });
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    res.send(req.user);
    await req.user.save();
  } catch (e) {
    console.error(e);
  }
});

export default router;
