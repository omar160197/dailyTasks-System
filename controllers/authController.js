const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  loginController: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const employee = await User.findOne({ email });

      if (employee) {
        const validPassword = await bcrypt.compare(password, employee.password);
        console.log(validPassword);
        if (validPassword) {
          const token = jwt.sign({ _id: employee._id }, process.env.SECRET);
          res.status(200).json({ login: "success", employee, token: token });
        } else res.status(400).send(`your password is incorrect`);
      } else res.status(400).send(`Invalid email`);
    } catch (error) {
      res.status(400).send(`login error:${error}`);
    }
  },
};
