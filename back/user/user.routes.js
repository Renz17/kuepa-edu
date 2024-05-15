const { Router } = require("express");
const { getUsers,
        updateUser,
        findUserByID,
        deleteUser,
        createNewUser,
        GetUserByUserAndPass} = require("./user.controller");

const router = Router();

//return all users
router.get("/", getUsers);

//return an user with user and password
router.get("/auth", GetUserByUserAndPass);

//return an user by id
router.get("/:id", findUserByID);

//update an user
router.patch("/update/:id", updateUser);

//create new user
router.post("/", createNewUser);

//delete an user
router.delete("/delete/:id", deleteUser);

module.exports = router;
