const { Router } = require("express");
const { getChat,
        createMessage,
        updateMessage,
        deleteMessage} = require("./chat.controller");

const router = Router();

//return all chats
router.get("/", getChat);

//update a message
router.patch("/update/:id", updateMessage);

//create new message
router.post("/", createMessage);

//delete a message
router.delete("/delete/:id", deleteMessage);

module.exports = router;