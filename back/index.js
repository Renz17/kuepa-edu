const express = require("express");
const cors = require("cors");
const { connect } = require("./db_conn/config");
require("dotenv").config();
const http = require('http');
const { Server } = require("socket.io"); 
const userRoutes = require("./user/user.routes");
const chatRoutes = require("./chat/chat.routes");


const app = express();
const serverSocket = http.createServer(app);
const io = new Server(serverSocket, {
  cors: {
    origin: ["http://localhost:5173", ""],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"]
  }  
});

connect();
serverSocket.listen(process.env.PORT, ()=>{
    console.log("App Listened at", process.env.PORT);
});

io.on('connection', socket =>{
  console.log("Client connected");

  socket.on('message', (data)=> {
    socket.broadcast.emit("message",data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/users", userRoutes);
app.use("/chats", chatRoutes);

// Endpoint for 404
app.use((req, res) => {
  res.status(404).json({ message: "Not found." });
});
