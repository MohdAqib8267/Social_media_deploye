import React, { useState } from "react";
import defaultimg from '../../img/images.jpeg'
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../redux/apiCalls";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Msg} from "@iconscout/react-unicons/icons/uil-message"
import { UilMessage } from "@iconscout/react-unicons";

const User = ({person,id}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser);
  // const [following,setFollowing] = useState(person.followers.includes(user.user._id));
  const handleFollow = () =>{
    {user.user.following.includes(person._id)?unfollowUser(dispatch,person._id,user.user):followUser(dispatch,person._id,user.user)}
  }
  const startChat = async() =>{
    try {

      
      const createChat = await axios.post(`http://localhost:5000/chat`,{
        senderId: user?.user?._id,
        receiverId:person?._id
      })
      console.log(createChat);
      navigate('../chat');
      

    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="follower">
      <div>
        <img src={person.profilePicture?person.profilePicture : defaultimg} alt="" className="followerImage" />
        <div className="name">
          <span>{person.firstname}</span> 
          <span>@{person.username}</span>
        </div>
      </div>
      <div>
      <button className={user.user.following.includes(person._id)?"button fc-button unfollowButton":"button fc-button"} onClick={handleFollow}>{user.user.following.includes(person._id)?"Unfollow":"Follow"}</button>
      <button onClick={startChat} style={{transform:"rotate(-45deg)",border:"none"}}> <UilMessage /></button>
     
     </div>
    </div>
  );
};

export default User;
