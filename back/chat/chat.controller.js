const chat = require("./chat.model");

//Getting all chat
async function getChat(req, res) {
    try {
        const chats = await chat.find();
        if (chats.length == 0) {
            res.status(500).json({ "message": "No Chat Here" })
        } else {
            res.status(200).json(chats);
        }
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

//create new message for chat
async function createMessage(req, res) {
    try {
        const newMessage = await chat.insertMany({
            name: req.body.name,
            message: req.body.message,
            role: req.body.role
        })
        if (newMessage.length == 0) {
            res.status(500).json({ "message": "Error creating Message" })
        } else {
            res.status(200).json(newMessage);
        }

    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

//Update a message
async function updateMessage(req, res) {
    try {
        const messageUpdate = await chat.findByIdAndUpdate(req.params.id,
            {
                name: req.body.name,
                message: req.body.message
            },
            {
                new: true,
            }
        )
        if (!messageUpdate) {
            res.status(500).json({ "message": "Error updating message" })
        } else {
            res.status(200).json(messageUpdate);
        }
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }

}

//delete chat by id
async function deleteMessage(req, res) {
    await chat.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Message deleted correctly." });

}

module.exports = {
    getChat,
    createMessage,
    updateMessage,
    deleteMessage
}