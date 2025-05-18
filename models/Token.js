// table that will store user Id and its token , id is referenced from the user table

const mongoose = require('mongoose') ;

const Schema = mongoose.Schema ;

const TokenModel = ({
    
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },

    token:{
        type:String,
        required:true
    }
})

const Token = mongoose.model('Token' , TokenModel);

module.exports = Token