const express = require("express");
const User = require("../mongoose-model/userModel");
const Message = require("../mongoose-model/messageModel");
const router = express.Router();

router.get("/:email", async (req, res) => {
  const email = req.params.email;
  const data = await User.find({ email: email });

  res.send(data);
});

// user create router
router.post("/", async (req, res) => {
  const userData = req.body;
  const sendDataToDB = new User(userData);
  await sendDataToDB.save((err) => {
    if (!err) {
      res.status(200).json("Data Post SuccessFull");
    } else {
      res.status(500).json("There was a server side error");
    }
  });
});

// user message send router
router.post("/message", async (req, res) => {
  const id = req.body.id;
  const message = req.body;
  const sendMessageDb = new Message({ ...message, user: id });
  try {
    sendMessageDb.save((err) => {
      if (!err) {
        Message.find({ user: id })
          .populate("user")
          .exec((error, data) => {
            if (!error) {
              res
                .status(200)
                .json({ message: "Data Post SuccessFull", data: data });
            } else {
              res.status(500).json("There was a server side error 11");
            }
          });
      } else {
        res.status(500).json("There was a server side error");
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/", (req, res) => {
  Message.find({}, (err, data) => {
    if (err) {
      res.send("data read fald");
      console.log(data);
    } else {
      res.send(data);
    }
  });

  // all mesage delete
  router.delete("/", (req, res) => {
    Message.deleteMany({}, (error, data) => {
      if (!error) {
        console.log("Deelete Success");
        res.send(data);
      } else {
        console.log("delete faild");
      }
    });
  });
});

module.exports = router;
