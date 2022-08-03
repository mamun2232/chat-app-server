const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const port = process.env.PORT || 5001
// route hendeler
const userHender = require("./router/userHandeler");
const Message = require("./mongoose-model/messageModel");

// server config
const app = express();
app.use(cors());
app.use(express.json());
const expressServer = http.createServer(app);

// cannet to database
const uri =
  "mongodb+srv://mamun:S5HeC6taAJaFfltI@mamun.rd1yf.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongose was cannet");
  })
  .catch((err) => {
    console.log(err);
  });

// Socket server
const io = new Server(expressServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["get", "post"],
  },
});

io.on("connection", (socket) => {
  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  // resive new message
  socket.on("newMessage", ({ newMessage, room }) => {
    // const message = newMessage
    // console.log(newMessage);
    const sendMessageDb = new Message(newMessage);
    sendMessageDb.save((err) => {
      if (!err) {
        console.log("message send database");
        // data read by db
        Message.find({}, (error, data) => {
          if (error) {
            console.log("data read fald");
            console.log(data);
          } else {
            console.log(data);
            io.emit("getLatestMessage", data);
          }
        });
      } else {
        console.log("sorry message not send");
      }
    });
  });
});
// router
app.use("/user", userHender);

expressServer.listen(port, () => {
  console.log("server stat was 5001 port");
});
