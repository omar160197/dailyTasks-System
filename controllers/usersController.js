const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res, next) => {
    try {
      let { username, email, password } = req.body;
      const user = await User.findOne({email:email})
      if (!user) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        password = hashedPassword;

        const newUser = new User({
          username,
          email,
          password,
        });
        await newUser.save();
        res.status(200).json(newUser);
      } else next(`this email is elready exist ${email}`);
    } catch (err) {
      next(err);
    }
  },

  getAllOrOne: async (req, res, next) => {
    try {
      const allUsers = await User.find();
      res.status(200).json(allUsers);
    } catch (err) {
      next(err);
    }
  },

  
};
