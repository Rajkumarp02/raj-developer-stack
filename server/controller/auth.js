import jwt from'jsonwebtoken'
import  bcrypt from 'bcryptjs'
import users from '../models/auth.js'
import dotenv from 'dotenv'
dotenv.config()

export const signup  = async (req,res) => {
  const {name,email,password,number,userAgent,ipAdd} = req.body;
  console.log(req.body);
  try{
     
    const existUser =  await users.findOne({ email });
    if(existUser) {
      console.log(existUser);
       return res.status(404).json({message:"already exist"});
       
    }
    
     
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await users.create({name,email,password:hashedPassword,number,userAgent,ipAdd})
    const token = jwt.sign({email:newUser.email, id:newUser._id},  `${process.env.JWT_SECRET}`,{expiresIn:"1h"});
    return res.status(200).json({result:newUser,token})

  }catch(error){
     res.status(500).json({message:"something wrong"});
    console.log(error);
  }
}

export const login  = async (req,res) => {
    const {email,password} = req.body;
    console.log(req.body);
   
    try{
         
         const existUser =  await users.findOne({email});
        
        if(!existUser) {
           return res.status(404).json({ message:"don't exist"});
        }
    
        const isPw = await bcrypt.compare(password, existUser.password);
        console.log(isPw);
        if(!isPw){
           return res.status(404).json({message:"not match pw"});
           
        }
        const token = jwt.sign({email:existUser.email ,id:existUser._id},  `${process.env.JWT_SECRET}`,
          { expiresIn: "1h" })
         return res.status(200).json({result:existUser,token,userAgent: existUser.userAgent, ipAdd: existUser.ipAdd})
    
      }catch(error){
        console.log(error)
         return res.status(500).json({message:"something wrong"});
       
  
      }
}

export const loginHistory = async(req,res) => {
try {
  const logHistory = await users.find()
  
 return res.status(200).json(logHistory)

}catch(error) {
  console.log(error);
  return res.status(500).json({message:"something wrong"});
}
}



/* export const request = async (req,res) => {
  const user =  await users.findOne({
    number:req.body.number
  });
  if(user) return res.status(400).send("user alredy registred");
  const OTP = otpGenerator.generate(6,{
    digits:true,alphabets:false,upperCase:false,specialChars:false
  });
  const number = req.body.number;
  console.log(OTP);
  const accountSid = 'AC5979968987c526e14698da96212169a4';
  const authToken = 'fdf7aeb7004a82b697c6f6bafb298570';
  const client = twilio(accountSid, authToken);

client.messages
    .create({
      body:`hey here you get your otp:${OTP}`,
      from:'6382209795',
      to:number,
    })
    .then(message => console.log(message.sid))
    .done();
   //const otp = new users({number:'',otp:''})
  //otp.otp = await bcrypt.hash(otp.otp,salt);
  //const result = await otp.save();
  return res.status(200).send("otp send succesfully")
}

export const verify = async (req,res) => {
  const otpHolder = await otp.find({
    number:req.body.number
  });
  if(otpHolder.length === 0) return res.status(400).send("Ypu use an expired Otp!!.");
  const rightOtp = otpHolder[otpHolder.length - 1];
  const validUser = await bcrypt.compare(req.body.otp, rightOtp.otp);
  if(rightOtp.number === req.body.number && validUser) {
    const user = new users(_.pick(req.body, ["number"]));
    const token = jwt.sign({number:user.number,id:user._id,},`${process.env.JWT_SECRET}`,{ expiresIn: "1h" })
    const result = await user.save();
    const OTPDelete = await users.deleteMany({
      number:rightOtp.number
    });
    return res.status(200).send({
      message:"User registration SuccessFully",
      token:token,
      data:result
    });
  }else{
  return res.status(400).send("your Otp was wrong");
  }
} */