const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;
const dotenv = require('dotenv');
dotenv.config();

mongoose.set('useCreateIndex', true)
const userConnection = mongoose.createConnection(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.3tudg.mongodb.net/Clusters?retryWrites=true&w=majority`)

const userSchema = new Schema({
  id:{
    type:Number
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
},{collection : 'userlist'})

autoIncrement.initialize(userConnection);

userSchema.plugin(autoIncrement.plugin,{
  model:'userList',
  startAt:1,
  increment:1
})

module.exports = mongoose.model('userList', userSchema);