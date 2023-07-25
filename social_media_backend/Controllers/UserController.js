import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";

// get a User
export const getUser =async(req,res)=>{
  const id = req.params.id;
  
  try {
    const User = await UserModel.findById(id);

    
    if(User){
      const {password, ...otherDetails} = User._doc;
      res.status(200).json(otherDetails);
    }
    else{
      res.status(404).json("No such user exists");
    }
  } catch (error) {
    res.status(500).json({error:error.message});
  }
  
}
  
//Update a User

export const updateUser = async (req, res) => {
  
      const id = req.params.id;
      
      const { _id, currentUserAdminStatus, password} = req.body;
        // console.log({id,_id});  
        // console.log(req.body);
      if(id === _id ){

        try{
            if(password){
          const salt = await bcrypt.genSalt(10);  
          req.body.password = await bcrypt.hash(password,salt);
          }
         const user = await UserModel.findByIdAndUpdate(id,req.body,{new: true});
        //  console.log(User._id.toString());

         const token = jwt.sign(
          {username: user.username, id:user._id.toString()},
          process.env.JWT_KEY,
          {expiresIn:"7h"}
         )
          // console.log(user);
         res.status(200).json({user,token});
        }
        catch(error){
          res.status(500).json(error);
        }
        
      }
      else{
        res.status(403).json("Access Denied! you can only update your own profile");

      }
};

//Delete User
export const deleteUser = async(req,res)=>{
  const id = req.params.id;
  const {currentUserId, currentUserAdminStatus}= req.body

  if(currentUserId === id || currentUserAdminStatus){
    try {
       await UserModel.findOneAndDelete(id);
      
        res.status(200).json("User Deleted Successfully!");
  
    } catch (error) {
      res.status(500).json(error);
    }
  }
  else{
    res.status(403).json("Access Denied! You can only Delete Your Own Details.");
  }
}

//Followers User
export const followUser = async(req,res)=>{
 
  const id = req.params.id;//jisko karna hai

  const {_id} = req.body; //jo kar rha hai
//  console.log(req.headers.authorization.split(" ")[1]);
  if(id === _id){
    //if user wants to follow himself/herself
    res.status(403).json("Action Forbidden!");
  }
  else{
    try{
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);
      
      //check if what it is already followed?
      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });
        // console.log({followUser,followingUser});
        // res.status(200).json("User followed!");
        res.status(200).json({followUser,followingUser});
      } else {
        res.status(403).json("User is Already followed by you");
      }

    } catch (error) {
      res.status(500).json(error);
    }
  }
};

//unFollow User
export const unFollowUser = async(req,res)=>{
  const id = req.params.id;

  const {_id} = req.body;

  if(id === _id){
    //it is not unfollowed itself
    res.status(403).json("Action Forbidden");
  }
  else{
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);
      // console.log(followUser);
      if (followUser.followers.includes(_id)) {
        await followUser.updateOne({ $pull: { followers: _id } });
        await followingUser.updateOne({ $pull: { following: id } });
        // res.status(200).json("User Unfollowed!");
        res.status(200).json({followUser,followingUser});
      }
      else{
        res.status(403).json("user is not followed by you!");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};


//get All Users
export const getAllUsers =async(req,res)=>{
  try {
    let users = await UserModel.find();
    users = users.map((user)=>{
      const {password,...otherDetails}=user._doc
      return otherDetails;
    })
    res.status(200).json(users);
    
  } catch (error) {
    res.status(500).json(error);
  }
}