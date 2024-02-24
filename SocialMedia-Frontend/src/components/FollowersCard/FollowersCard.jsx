import React, { useEffect, useState } from 'react'
import './FollowersCard.css'

import { Followers } from '../../Data/FollowersData'
import User from '../User/User'
import axios from 'axios'
import { useSelector } from 'react-redux'

const FollowersCard = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [persons,setPersons] = useState([]);
  
  useEffect(()=>{
    const fetchPersons = async()=>{
      let data = await axios.get('http://localhost:5000/user');
      
      // setPersons(data.data.slice(-5));
      setPersons(data.data);
    }
    fetchPersons();
  },[]);
//  console.log(persons);
// console.log(user);
  return (
    <div className="FollowersCard">
        <h3>People you may know</h3>

        {persons.map((person, id) => {
        if (person._id != user?.user?._id) 
        return <User person={person} key={id} />;
      })}
    </div> 
  )
}

export default FollowersCard