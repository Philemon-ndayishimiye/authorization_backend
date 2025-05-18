
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()


exports.Registration = async (req,res)=>{

    const{fullName, Email , password}=req.body

    try {
        const user = await userModel.create({fullName, Email , password});
        res.json({message:'user created successfully', user})
    } catch (error) {
         console.log('error occured', error);
    }

}

exports.login = async (req,res)=>{

    const {Email , password}=req.body

    try {
        const user = await userModel.findOne({Email});
        if(!user){
            res.json('invalid user name')
        }
        else{
            const equalpassword = user.password === password ;

            if(!equalpassword){
                res.json('invalid password');
            }
            else{
                const SecretKey = process.env.SECRETE_KEY
                const token = jwt.sign({email:Email , password:password} , SecretKey , {expiresIn:'1h'} );

                res.json({message:'login successfully' , token})
            }
        }
    } catch (error) {

        console.log('error occured', error)
        
    }

}

exports.dashboardmsg = (req,res)=>{

    res.json('protected routes');

}

exports .getAllUser = async(req,res)=>{

    try {
        const user = await userModel.find();
        res.json(user);
    } catch (error) {
        
        console.log('error occured', error)
    }

}



