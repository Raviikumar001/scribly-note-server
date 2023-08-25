const User = require('../models/user')
const bcrypt = require('bcryptjs');
const  { StatusCodes } =require ('http-status-codes');
const BadRequestError = require('../error/Bad-request')
const CustomAPIError  = require('../error/custom-api')

const Login = async(req,res)=>{
   
    const {email, password} = req.body;
    console.log(email);
    if(!email || !password)
    {
        throw new BadRequestError('Please provide all values');
        
    }
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
        throw new UnAuthenticatedError('Invalid Credentials');
      }

    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if (!isPasswordCorrect) {
        throw new UnAuthenticatedError('Invalid Credentials');
      }
    user.password = undefined;

    console.log(req.user, "req user")
    // req.session = {
    //     user:user.username,
    //     email:user.email
    //     // Any other user-related data you want to store in the session
    //   };
    req.user = user;
    res.cookie("user", user.username)
    // res.cookie("email", user.email)

    console.log("in auth router %j" ,req.cookies )

      console.log(req.session, "after saving")
      res.status(StatusCodes.OK).json({ user});

    
   }

const Register = ("/register", async (req,res)=> {
    console.log(req.body.username)
    try {
      const currentUser = await User.findOne({ email: req.body.email });
  
      if(currentUser)
       {
         res.send("user already Exists");
       }  else {
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        console.log(hashedPassword)
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword
        });
        newUser.save();
        console.log(newUser)
        res.send("User Created",);
  
      }
    } catch (error){
      console.error(error);
    }})
  

    module.exports = {Login, Register}