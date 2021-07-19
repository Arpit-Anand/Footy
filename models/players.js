let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let playerSchema = new Schema({
  name:{
    type : String,
    required : true
  },
  jersey :{
    type : Number, required : false
  },
  age : {
    type: Number, required: true
  },
  country:{
    type: String, required: true
  },
  position:{
    type: String, required: true
  },
  goalScored:{
    type: Number, required : false
  },
  cleansheet:{
    type: Number, required : false
  }
});

let Player = module.exports = mongoose.model('Player', playerSchema);
