{/*

    
const secreteKey = process.env.SECRETE_KEY 

const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel')


exports.verifyEmail = async(req,res)=>{

    const {token} = req.body

    try {
        const decoded = jwt.verify(token , secreteKey);
        const user = await userModel.findOne({Email: decoded.Email});

        if(!user) return res.status(401).json('user does not exist');

        if (user.isVerified) return res.status(400).json({ message: 'Already verified' });



    } catch (error) {
        
    }


}
    
    */}