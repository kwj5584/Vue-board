const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment')

const Schema = mongoose.Schema;
const dotenv = require('dotenv')

dotenv.config();
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.3tudg.mongodb.net/Clusters?retryWrites=true&w=majority`

// const boardConnection = mongoose.createConnection(url,(err,database)=>{
//     if(err){
//        console.error(err);
//       }
//       db = database;
//   })
const boardConnection = mongoose.createConnection(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.3tudg.mongodb.net/Clusters?retryWrites=true&w=majority`);


const dataSchema = new Schema({
  id:{
    type:Number
  },
  title:{
    type : String,
    requried:true
  },
  contents:{
    type : String,
    requried:true
  },
})

autoIncrement.initialize(boardConnection);

dataSchema.plugin(autoIncrement.plugin,{
  model : 'dataList',
  startAt:1,
  increment:1
})


module.exports = mongoose.model('dataList', dataSchema)