const router = require("express").Router();

const {getAllOrOne ,register} =require('../controllers/usersController')

router
.route('/users')
.get(getAllOrOne)
.post(register)

module.exports=router;