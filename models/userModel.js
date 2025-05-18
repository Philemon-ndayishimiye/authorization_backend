
const mongoose = require('mongoose') ;

const Schema = mongoose.Schema ;

const userModel = new Schema({
    fullName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },
    
    isVerfid:{
        type:Boolean ,
        default:false
    }
})

const user = mongoose.model('Users' , userModel) ;

module.exports = user