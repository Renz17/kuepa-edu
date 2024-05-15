const user = require("./user.model");
const bcrypt = require('bcrypt');

//Getting all users
async function getUsers(req, res) {
    try {
        const users = await user.find();
        if (users.length == 0) {
            res.status(500).json({ "message": "Users not found" })
        } else {
            res.status(200).json(users);
        }
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

//Creating new users
async function createNewUser(req, res) {
    try {
        const userExist = await user.findOne({user: req.body.user});
        if(userExist){
            res.status(500).json({ "message": "User Already Exist" })
        }else{
            const newUSer = await user.insertMany({
                name: req.body.name,
                password: await bcrypt.hash(req.body.password, 10),
                user: req.body.user,
                role: req.body.role
            })
            if (newUSer.length == 0) {
                res.status(500).json({ "message": "Error creating user" })
            } else {
                res.status(200).json(newUSer);
            }
        } 
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

//Update an User
async function updateUser(req, res) {
    try {
        const userUpdated = await user.findByIdAndUpdate(req.params.id,
            {
                name: req.body.name,
                password: await bcrypt.hash(req.body.password, 10),
                user: req.body.user,
                role: req.body.role

            },
            {
                new: true,
            }
        )
        if (!userUpdated) {
            res.status(500).json({ "message": "Error updating information" })
        } else {
            res.status(200).json(userUpdated);
        }
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }

}

//find and user by id
async function findUserByID(req, res) {
    try {
        const users = await user.findById(req.params.id);
        if (users.length == 0) {
            res.status(500).json({ "error": "User not found with id" });
        } else {
            res.status(200).json(users);
        }
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
}

//get user by user and password
async function GetUserByUserAndPass(req, res) {
    try {
        const userFinded = await user.findOne({ user: req.query.username });
        if (userFinded == null) {
            res.status(500).json({ "message": "User not found" });
        }else{
            const isPasswordValid = await bcrypt.compare(req.query.password, userFinded.password);
            if (!isPasswordValid) {
                res.status(500).json({ "message": "Password is incorrect" });
            }else{
                res.status(200).json(userFinded);
            }
        }
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }

}

//delete user by id
async function deleteUser(req, res) {
    await user.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted correctly." });

}

module.exports = {
    getUsers,
    deleteUser,
    createNewUser,
    updateUser,
    findUserByID,
    GetUserByUserAndPass
}