import React, { useEffect, useState } from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { useSelector } from 'react-redux'
import { likePosts } from '../../redux/apiCalls'
import axios from 'axios'


const Post = ({data}) => {
  // console.log(data);
  const user = useSelector((state)=>state.user.currentUser);
  // console.log(user.user._id)
  const [liked,setLiked] = useState(data.likes.includes(user._id));
  const [likes,setLikes] = useState(data.likes.length);


  const handleLiked=()=>{
    likePosts(data._id,user.user._id)
    setLiked((prev)=>!prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  }
 
  return (
    <div className="Post">
        <img src={data.image} alt="" />


        <div className="postReact">
            <img src={liked?Heart: NotLike} alt="" onClick={handleLiked} style={{cursor:"pointer"}} />
            <img src={Comment} alt="" />
            <img src={Share} alt="" />
        </div>


        <span style={{color: "var(--gray)", fontSize: '12px'}}>{likes} likes</span>

        <div className="detail">
            <span><b>{data.name}</b></span>
            <span> {data.desc}</span>
        </div>
    </div>
  )
}

export default Post