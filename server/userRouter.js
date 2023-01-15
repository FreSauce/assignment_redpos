//user router
const { Router } = require("express");

const router = Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  mailToEmail,
} = require("./userController");

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/mail", mailToEmail);

module.exports = router;
