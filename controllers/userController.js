
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()

const secreteKey = process.env.SECRETE_KEY 


exports.Registration = async (req,res)=>{

    const{fullName, Email , password}=req.body

    try {
        const currentUser = await userModel.findOne({Email});
        if(currentUser) return res.status(401).json('user already exist')

        const user = await userModel.create({fullName, Email , password});
        res.json({message:'user created successfully', user})

        const token = jwt.sign({Email: Email}, secreteKey , {expiresIn:'1d'});
        
        const Url =  `http://localhost:5000/verify-email?token=${token}`;
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



