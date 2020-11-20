const express = require('express');
const router = express.Router();
const commentList = require('../models/commentList');
const cors = require('cors');
router.use(cors());
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/commentsRegister',async(req,res)=>{

  console.log('comment req.body :',req.body)
  const boardNum = req.body.boardNum
  const id = req.body.id;
  const password = req.body.password;
  const contents = req.body.contents

  try{
    const commentlist = new commentList({
      boardNum,
      id,
      password,
      contents
    });
    await commentlist.save();
    res.status(201).json({
      message : 'comment created'
    })
  }catch(err){
    console.log(err)
  }
})

router.post('/getComments',(req,res)=>{
  const payload = req.body
  console.log('req body:',payload);
  commentList.find({boardNum:req.body.payload},{id:1,contents:1},(err,commentlist)=>{
    if(err) return res.status(500).send({error:err});
    res.send(commentlist);
  })
})

router.post('/deleteComment',(req,res)=>{
  console.log(req.body)
  commentList.findOneAndDelete({boardNum:req.body.boardNum, _id:req.body.wantDelete},(err,rst)=>{
    if(err) return res.status(500).send({error : err});
    else { console.log('delete comment : ',rst)
    res.send('success delete')
  }
  })
})

module.exports = router;