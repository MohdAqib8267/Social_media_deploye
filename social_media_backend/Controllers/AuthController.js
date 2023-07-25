import UserModel from "../Models/userModel.js";
 import bcrypt from "bcrypt";
 import  jwt  from "jsonwebtoken";
 import dotenv from 'dotenv';
 dotenv.config();
// console.log(process.env.JWT_KEY); 
// Registering a new User
export const registerUser = async (req, res) => {

//   const user = new UserModel(req.body);
//   const result= await user.save();
//   res.send(result);
 

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass
  const newUser = new UserModel(req.body);
  const {username} = req.body
  try {
    const oldUsername = await UserModel.findOne({username});
    if(oldUsername){
      return res.status(400).json({message:'username is already exists!'});
      // console.log('user already exists');
    }
    
    const user = await newUser.save();
       
    const token = jwt.sign({
      username:user.username, id:user._id
    },process.env.JWT_KEY,{expiresIn:'7h'});

    return res.status(200).json({user,token});   
    
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// login User

export const loginUser = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await UserModel.findOne({username: username})


        if(user)
        {
            const validity = await bcrypt.compare(password, user.password)


            // validity? res.status(200).json(user): res.status(400).json("Wrong Password")
            if(!validity){
              res.status(400).json("Wrong Password!");
            }
            else{
              const token = jwt.sign({
                username:user.username, id:user._id  
              },process.env.JWT_KEY,{expiresIn:'7h'});
              res.status(200).json({user,token});
            }
        }
        else{
            res.status(404).json("User does not exists")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}