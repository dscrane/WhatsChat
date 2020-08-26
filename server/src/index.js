const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { User } = require('./models/user');

// Initialize connection to the database
require('./db/db');

// Initialize the express server and the socketio connection
const app = express();
app.use(bodyParser.json());
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
    res.status(401).send()
  }
})

app.post('/login-user', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.username, req.body.password);

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch(e) {
    res.send({ error: 'unable to log you in at this time' })
  }
})

// Spin up the server on the defined PORT
app.listen(PORT, () => console.log(`[APP]: listening on http://localhost:5500`))