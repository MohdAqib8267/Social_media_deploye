import React, { useState } from "react";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import "./ProfileCard.css";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';

const ProfileCard = ({location}) => {

  // console.log(location);
  const user = useSelector((state)=>state.user.currentUser);
  const post = useSelector((state)=>state.post);
  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  // console.log(user.user.coverPicture);
  const ProfilePage = false;
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
      <img src={user.user.coverPicture ? user.user.coverPicture : Cover} alt="" />
      
      
  
      <img src={user.user.profilePicture ? user.user.profilePicture : Profile} alt="" />
      

    
      </div>

      <div className="ProfileName">
        <span>{user.user.firstname} {user.user.lastname}</span>
        <span>{user.user.worksAt? user.user.worksAt : 'Write about yourself'}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.user.following.length}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.user.followers.length}</span>
            <span>Followers</span>
          </div>

          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{post.posts.filter((p)=>p.userId===user.user._id).length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === "profilePage" ? "" : <span>
        <Link style={{textDecoration:"none", color:"inherit"}} to={`/profile/${user.user._id}`} >
        My Profile
        </Link></span>}
    </div>
  );
};

export default ProfileCard;