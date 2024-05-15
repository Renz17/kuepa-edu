const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: {
                values: ["Student", "Moderator"],
                message: '{VALUE} is not supported'
            }
        },
    },
    {
        timestamps: true,
        collection: "Chat"
    }
)

module.exports = mongoose.model("Chat", chatSchema);