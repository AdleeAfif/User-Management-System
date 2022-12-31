const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Call Controller functions
router.get("/", userController.view);
router.post("/", userController.find);
router.get("/:id", userController.delete);

router.get("/view/:id", userController.viewUser);

router.get("/addUser", userController.viewAddUser);
router.post("/addUser", userController.add);

router.get("/editUser/:id", userController.viewEditUser);
router.post("/editUser/:id", userController.edit);

module.exports = router;
