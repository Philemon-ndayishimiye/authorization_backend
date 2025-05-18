
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()

const TokenModel = require('../models/Token')
const SendEmail = require('../utils/SendEmail')
const crypto = require('crypto');


const secreteKey = process.env.SECRETE_KEY 


exports.Registration = async (req,res)=>{

    const{fullName, Email , password}=req.body

    try {
        const currentUser = await userModel.findOne({Email});
        if(currentUser) return res.status(401).json('user already exist')

        const user = await userModel.create({fullName, Email , password});
        

        let token = new TokenModel({
            userId:user._id ,
            token: crypto.randomBytes(32).toString('hex')
        })
        await token.save();

        let message = `${process.env.BASE_URL}/verify/${user.id}/${token.token}`;
        SendEmail(user.Email , 'verify email' , message )

        res.json('email sent to your account successfully')

        
        
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

exports.VerifyUserEmail = async (req, res) => {
  const { id, token } = req.params;

  try {
    const user = await userModel.findOne({ _id: id });
    if (!user) return res.status(400).json('User does not exist');

    const tokenDoc = await TokenModel.findOne({
      userId: user._id,
      token: token
    });

    if (!tokenDoc) return res.status(400).send("Invalid link");

    user.isVerfied = true;
    await user.save();

    await TokenModel.findByIdAndDelete(tokenDoc._id);


    res.send("Email verified successfully");

  } catch (error) {

    console.log('error occurred:', error);
    res.status(500).send("Internal Server Error");
  }
};




