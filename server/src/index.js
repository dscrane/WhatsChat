/* ----   IMPORTS    ---- */
import { createServer } from "http";
import path from "path";
import express from "express";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import cors from "cors";
import { default as userRouter } from "./routes/userRoutes.js";
import { default as chatRouter } from "./routes/chatRoomRoutes.js";
import { socketConfig } from "./config/socket.js";
import { db } from "./db/db.js";
import { log } from "./utils/logs.js";
/* ----   ****    ---- */

// Initialize database
db();

// Initialize the express server and the socketio connection
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  allowEIO3: true,
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:39918",
      "http://127.0.0.1:9102/",
    ],
    methods: ["GET", "POST"],
  },
});

// Define port
const PORT = process.env.PORT || 5500;

// Connect middlewares
app.use(express.json(), express.urlencoded({ extended: true }), express.text());
app.use(cors());

// Connect routers
app.use(userRouter);
app.use(chatRouter);

// Connect static files
const __dirname = path.resolve();
console.log(__dirname);
app.use(express.static(path.join(__dirname, "/src/public")));

// Create root route
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/src/public/index.html"));
});

// Link up socket config
socketConfig(io);

// Spin up server
httpServer.listen(PORT, () => {
  log.app(`listening on localhost:${PORT}`);
});
