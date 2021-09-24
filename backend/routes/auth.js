const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fatchuser');

const JWT_SECRET = "thisistocken$0";

//1: Create a User using: POST '/api/auth/createuser'. doesn't reqiure login
router.post('/createuser', [
  body('name', 'enter a valid name').isLength({ min: 2 }),
  body('email', 'enter a valid email').isEmail(),
  body('password', 'password atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)

    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET)


    //res.json(user) 
    res.json({ authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error")
  }
})


//2: Create a User using: POST '/api/auth/login'. doesn't reqiure login
router.post('/login', [
  body('email', 'enter a valid email').isEmail(),
  body('password', 'password cannot be blank').exists(),
], async (req, res) => {

  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "please try to login with correct info" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Please try to login with correct info" })
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET)
    res.json({ authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error")
  }


});


//3: Get logginn User Details using: POST '/api/auth/getuser'. Login reqiured
router.post('/getuser', fetchuser, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error ")
  }
})
module.exports = router

