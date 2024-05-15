const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        user: {
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
        collection: "Users"
    }
)

module.exports = mongoose.model("User", userSchema);