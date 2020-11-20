const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema;
const dotenv = require('dotenv')
dotenv.config();

const commentConnection = mongoose.createConnection(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.3tudg.mongodb.net/Clusters?retryWrites=true&w=majority`);

const commentSchema = new Schema({
  
  boardNum:{
    type:Number,
    required:true
  },
  id:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true
  },
  contents:{
    type:String,
    required:true
  },

},{collection : 'commentList'})

autoIncrement.initialize(commentConnection);

commentSchema.plugin(autoIncrement.plugin,{
  model : 'commentList',
  startAt:1,
  increment:1
})

module.exports = mongoose.model('commentList',commentSchema);