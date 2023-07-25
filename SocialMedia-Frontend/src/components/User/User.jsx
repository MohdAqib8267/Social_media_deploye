import React, { useState } from "react";
import defaultimg from '../../img/images.jpeg'
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../redux/apiCalls";

const User = ({person,id}) => {
  
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser);
  // const [following,setFollowing] = useState(person.followers.includes(user.user._id));
  const handleFollow = () =>{
    {user.user.following.includes(person._id)?unfollowUser(dispatch,person._id,user.user):followUser(dispatch,person._id,user.user)}
    
    
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
      <button className={user.user.following.includes(person._id)?"button fc-button unfollowButton":"button fc-button"} onClick={handleFollow}>{user.user.following.includes(person._id)?"Unfollow":"Follow"}</button>
    </div>
  );
};

export default User;
