const express = require('express');
const router = express.Router();
const userList = require('../models/userList');
const bcrypt = require('bcrypt');
const cors = require('cors');
router.use(cors())
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/signup',(req,res,next)=> {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  try{
    const hashedPassword = bcrypt.hash(password,12);

    const user = new userList({
      email,
      password : hashedPassword,
      name
    });

    const result = user.save();
    console.log('new user is :',result)
    res.status(201).json({
      message : 'user created',
      userId : result._id
    })
  }catch(err){
    console.log(err)
  }
});

router.post('/login', (req,res)=>{
  const email = req.body.email;
  const password = req.body.password;

  const hashedPassword = bcrypt.hash(password,12);

  userList.findOne({email},(err,user)=>{
    if(err){
      return res.json({
        message : 'Email이 유효하지않습니다.'
      })
    }
  })
  userList.findOne({password:hashedPassword},(err,user)=>{
    if(err){
      return res.json({
        message : '패스워드가 잘못되었습니다.'
      })
    }
  })
})

module.exports = router;