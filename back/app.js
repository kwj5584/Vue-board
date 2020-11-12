const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json())
app.use(cors())
const dotenv = require('dotenv')

mongoose.Promise= global.Promise;

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.3tudg.mongodb.net/Clusters?retryWrites=true&w=majority`

 mongoose.set('useFindAndModify',true)
dotenv.config();

const boardRouter = require('./router/board');
app.use('/board',boardRouter);

const userRouter = require('./router/user');
app.use('/user',userRouter);

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.3tudg.mongodb.net/Clusters?retryWrites=true&w=majority`,{useNewUrlParser: true})
.then(()=>{
  app.listen(3000, () => console.log('connected'));
}).catch(err=> console.log(err))


