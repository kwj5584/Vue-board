const express = require('express');
const router = express.Router();
const dataList = require('../models/dataList');
const commentList = require('../models/commentList');
const cors = require('cors');
router.use(cors())
const bodyParser = require('body-parser');
router.use(bodyParser.json())
// const userList = require('../models/userList');
let commentCount = []
let count=0;
router.get('/getList', (req,res)=>{ // 리스트에 부를 내용
  dataList.find({},{ _id:1, title:1,writer:1,views:1},(err,datalist)=>{
     if(err) return res.status(500).json({error:err})
     if(!datalist) return res.status(404).json({message : 'datalist not found'})

    res.send(datalist)
    })
})

router.get('/getCommentList', (req,res)=>{
  dataList.find({},{_id:1}, (err,datalist)=>{
    if(err) console.log(err);

     commentList.find({},{boardNum:1},(err,commentlist)=>{
       if(err) console.log(err);

      for(var i=0; i<datalist.length; i++){
        for(var j=0; j<commentlist.length; j++){
          // console.log('comentlist : ',commentlist[j].boardNum)
          if(commentlist[j].boardNum === datalist[i]._id){
            count++;
          }
        }
        commentCount[i] = count;
        count=0;
      }
      // console.log('commentcount :',commentCount)
       return true;
     }) // commentList.find end
  })
  res.send(commentCount)
  })

router.post('/listAdd', async (req,res)=>{
  // console.log('request is :', req.body)
  const title = req.body.title;
  const writer = req.body.writer;
  const contents = req.body.contents

  try{
    const datalist = new dataList({
      title,
      writer,
      contents
    });
    const result = await datalist.save();
    res.status(201).json({
      message: 'data created',
      userId : result._id
    })
  }catch(err){
    console.log(err)
  }
});

router.get(`/detailList`, (req,res) =>{ // 세부페이지에 부를 내용
  const getId = req.query.id
  dataList.findOne({ _id : getId }, { title:1,  contents:1,writer:1, views:1 },(err,datalist)=>{
    // console.log('detail :', datalist);
    datalist.views++;
    datalist.save();
    if(err) return res.status(500).send({error : err});
    if(!datalist) return res.status(404).send({error: 'List not found'});
    res.send(datalist);
  })
})

router.post('/findDetailTitle',(req,res)=>{
  // console.log('request : ',req.body.payload)
  dataList.find({title: {$regex : req.body.payload } },{title:1, writer:1,views:1},(err,datalist)=>{
    if(err) return res.status(500).send({error : err});
    if(!datalist) return res.status(404).send({error : 'List not found'});
    res.send(datalist);
  })
})

router.post('/findDetailWriter',(req,res)=>{
  // console.log('request : ',req.body.payload)
  dataList.find({writer: {$regex : req.body.payload } },{title:1, writer:1,views:1},(err,datalist)=>{
    if(err) return res.status(500).send({error : err});
    if(!datalist) return res.status(404).send({error : 'List not found'});
    res.send(datalist);
  })
})

router.delete(`/delete`,(req,res)=>{
    const getId = req.query.id;
    dataList.findOneAndDelete({_id:getId},(err,docs)=>{
      if(err){console.log(err)}
      else{ 
        // console.log("Delete User : ", docs)
        res.send('success')
      }
    })
    commentList.deleteMany({boardNum:getId},(err)=>{
      if(err) return res.status(500).send({error:err})
    })
  })

  router.patch(`/updatePage`,(req,res)=>{
    const getId = req.query.id;
    dataList.findOneAndUpdate({_id:getId} ,
      { $set: { title: req.body.title,  contents: req.body.contents} },
       {returnNewDocument : true}, (err,datalist)=>{
         if(err) {return res.status(500).send({error: err})}
         else{
         res.send(datalist);
        //  console.log(datalist)
        }
       })
  })

  module.exports = router;