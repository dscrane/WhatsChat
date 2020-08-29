const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require('./models/user');
const authenticate = require('./middleware/authenticate')

// Initialize connection to the database
require('./db/db');

// Initialize the express server and the socketio connection
const app = express();
app.use(bodyParser.json());
app.use(cookieParser())
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

// Define port location
const PORT = process.env.PORT || 5500;

app.post('/create-user', async (req, res) => {
  const user = new User(req.body);
  console.log(user)
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.send({ user, token })
  } catch (e) {
    console.log(e)
    res.send({ error: e})
  }
})

app.post('/login-user', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.username, req.body.password);
    const token = await user.generateAuthToken();

/*    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.cookie('token', token, {
      httpOnly: false,
      expires: new Date(Date.now() + 8 * 3600000),
      domain: '.localhost:3000'
    });*/
    res.send({ user, token });
  } catch(e) {
    res.send({ error: { ...e } })
  }
});

app.get('/user-id', authenticate, (req, res) => {
  res.send(req.user._id)
})

app.get('/user', authenticate, (req, res) => {
  console.log('[REQ USER]:', req.user)
  res.send({user: req.user})
})

app.post('/logout', authenticate, async (req, res) => {
  console.log(req)
  /*try {
    req.user
    req.user.tokens = [];
    await req.user.save();

    res.send({logout: true});
  } catch (e) {
    res.send({logout: false})
  }*/
})

// Spin up the server on the defined PORT
app.listen(PORT, () => console.log(`[APP]: listening on http://localhost:5500`))