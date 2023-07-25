import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal.jsx/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { logOut } from "../../redux/apiCalls";

const InfoCard = () => {

  const dispatch = useDispatch()
  const params = useParams();
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const user = useSelector((state)=>state.user.currentUser);

  useEffect(()=>{
    const fetchProfileUser = async() =>{
      if(profileUserId === user.user._id){
        setProfileUser(user.user);
        
      }
      else{
        console.log("fetching");
        const profileUser = await axios.get(`http://localhost:5000/user/${profileUserId}`);
        setProfileUser(profileUser);
        console.log(profileUser);
      }
    }
    fetchProfileUser();
  },[user.user])
  // console.log(profileUser)

  const handleLogout = async() =>{
    logOut(dispatch);
    
  }

  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user.user._id === profileUserId ? (
          <div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
            data={user.user}
          />
        </div>
        ):""}
        
      </div>

      <div className="info" style={{display:"flex", gap:'2rem'}}>
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship? profileUser.relationship:"__________"}</span>
      </div>

      <div className="info" style={{display:"flex", gap:'2rem'}}>
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.livesin? profileUser.livesin:"__________"}</span>
      </div>

      <div className="info" style={{display:"flex", gap:'2rem'}}>
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.worksAt? profileUser.worksAt:"__________"}</span>
      </div>

      <button className="button logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default InfoCard;
