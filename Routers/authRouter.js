const router = require("express").Router();
const { loginController } = require("../controllers/authController");


router
.route("/login")
.post(loginController);

module.exports = router;
