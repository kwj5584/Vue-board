const express = require('express');
const router = express.Router();
const userList = require('../models/userList');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const cors = require('cors');
router.use(cors())
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/signup', [
  body('email')
  .custom((value)=>{
   return userList.findOne({email:value}).then((userDoc)=>{
    if(userDoc){
      return Promise.reject('Email alerady exist!')
    }
    });
  })
],
async (req,res,next)=> {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
}

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  try{
    const hashedPassword = await bcrypt.hash(password, 12);

    const userlist = new userList({
      email,
      password : hashedPassword,
      name
    });

    const result = await userlist.save();
    // console.log('new user is :',result)
    res.status(201).json({
      message : 'user created',
      userId : result._id
    })
  }catch(err){
    if(!err.statusCode){
      err.statusCode=500;
    }
    next(err);
  }
});

router.post('/login', async(req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    userList.findOne({email}, async (err,user)=>{
      if(!user){
        return res.status(500).send({error:err})
      }
      else{
        // console.log('login:',  user);
        const result = await bcrypt.compareSync(password,user.password);
        if(result===false){
          return res.status(500).send({error:err})
        }
        else{
          res.status(201).json({
            message : 'Login Success'
          })
        }
      }
    })
    
  });

module.exports = router;