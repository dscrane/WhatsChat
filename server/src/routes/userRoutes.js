const express = require('express');
const { User } = require('../models/user');
const authenticate = require('../middleware/authenticate')

const router = new express.Router();

router.post('/create-user', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.send({ user, token })
  } catch (e) {
    console.log(e)
    res.send({ error: e})
  }
})

router.post('/login-user', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.username, req.body.password);
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch(e) {
    res.send({ error: { ...e } })
  }
});

router.get('/user-id', authenticate, (req, res) => {
  res.send(req.user)
})

router.get('/user', authenticate, (req, res) => {
  res.send({user: req.user})
})

router.post('/logout', authenticate, async (req, res) => {
  try {
    req.user;
    req.user.tokens = [];
    await req.user.save();

    res.send({logout: true});
  } catch (e) {
    res.send({logout: false})
  }
})

module.exports = router;
