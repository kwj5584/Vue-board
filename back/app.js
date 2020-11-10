const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
const dataList = require('./models/dataList');
const app = express();


app.use(bodyParser.json())
app.use(cors())
const dotenv = require('dotenv')

mongoose.Promise= global.Promise;

 mongoose.set('useFindAndModify',true)
// mongoose.connect('/api/update',{useFindAndModify:true})
dotenv.config();

app.post('/api/listAdd', async (req,res)=>{
  const title = req.body.title;
  const writer = req.body.writer;
  const password = req.body.password
  const contents = req.body.contents

  try{
    const datalist = new dataList({
      title,
      writer,
      password,
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

app.get('/api/getList', (req,res)=>{ // 리스트에 부를 내용
   dataList.find({},{ _id:1, title:1, writer:1, password:1 },(err,datalist)=>{
      if(err) return res.status(500).send({error:err})
      res.send(datalist)
   })
})

app.get(`/api/detailList`, (req,res) =>{ // 세부페이지에 부를 내용
  const getId = req.query.id
  dataList.findOne({ _id : getId }, { title:1, writer:1, contents:1,password:1 },(err,datalist)=>{
    if(err) return res.status(500).send({error : err});
    if(!datalist) return res.status(404).send({error: 'List not found'});
    res.send(datalist);
  })
})

  app.delete(`/api/delete`,(req,res)=>{
    const getId = req.query.id;
    dataList.findOneAndDelete({_id:getId},(err,docs)=>{
      if(err){console.log(err)}
      else{ 
        console.log("Delete User : ", docs)
        res.send('success')
      }

    })
  })
  // app.get('/api/update',(req,res)=>{
  //   const getId = req.query.id;
  //   dataList.findOne({ _id: getId }, {title:1, writer:1, contents:1, password:1}, (err,dataList)=>{
  //     if(err) return res.status(500).send({error : err});
  //     if(!dataList) return res.status(404).send({error : 'List not found'});
  //     res.send(dataList);
  //     console.log(dataList);
  //   })
  // })

  app.patch(`/api/updatePage`,(req,res)=>{
    const getId = req.query.id;
    dataList.findOneAndUpdate({_id:getId} ,
      { $set: { title: req.body.title, writer:req.body.writer, contents: req.body.contents, password: req.body.password } },
       {returnNewDocument : true}, (err,datalist)=>{
         if(err) {return res.status(500).send({error: err})}
         else{
         res.send(datalist);
         console.log(datalist)
        }
       })
  })

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.3tudg.mongodb.net/Clusters?retryWrites=true&w=majority`).then(()=>{
  app.listen(3000, () => console.log('connected'));
}).catch(err=> console.log(err))


