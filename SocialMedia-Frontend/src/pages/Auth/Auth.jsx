import React from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {login, signup} from '../../redux/apiCalls'

const Auth = () => {
  const [isSignup,setIsSignup] = useState(true);
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user);
  //console.log(user.isFetching);
  const [data, setData] = useState(initialState);
  const [confirmpass,setConfermpass] = useState(true);

  const handleChange =(e)=>{
    setData({...data,[e.target.name]:e.target.value});
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log(data.password);
    // if(data.password !== data.confirmpass){
    //   setConfermpass(false);
    // }
    // else{
    //   setConfermpass(true);

    // }
    if(isSignup){
      // console.log(data);
      data.password === data.confirmpass ? signup(dispatch,{data}) : setConfermpass(false);

    }
    else{
      login(dispatch,{data});
    }

  }
  
  const resetForm=()=>{
    setConfermpass(true);
    setData(initialState);
  }
  return (
    <div className="Auth">
      {/* Left */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>𝕱𝖎𝖊𝖘𝖙𝖆</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      {/* Right */}
     
      <div className="a-right">
      <form className="infoForm authForm" onSubmit={handleSubmit}> 
        <h3>{isSignup?"SignUp" : "Login"}</h3>

        {isSignup &&
        <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstname"
            value={data.firstname}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastname"
            value={data.lastname}
            onChange={handleChange}
          />
        </div>
        }
        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            value={data.username}
            placeholder="Usernames"
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="password"
            className="infoInput"
            name="password"
            value={data.password}
            placeholder="Password"
            onChange={handleChange}
          />
          {isSignup && (
          <input
            type="password"
            className="infoInput"
            name="confirmpass"
            value={data.confirmpass}
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          )}
        </div>
        <span
        style={ {  color: "red",
        fontSize: "12px",
        alignSelf: "flex-end",
        marginRight: "5px",}}
        >{confirmpass? "":"*Confirm password is not same"}</span>

        <div>
            <span style={{fontSize: '12px', cursor:"pointer"}}
             onClick={() => {
              resetForm();
              setIsSignup((prev) => !prev);
            }}
            
            >
              {isSignup? "Already have an account. Login!":"Don't have an account! LogIn"}
              
              </span>
        </div>
        <button className="button infoButton" type="submit" disabled={user.isFetching}>{user.isFetching?"Loading...":isSignup?"Signup":"Login"}</button>
      </form>
    </div>
    </div>
  );
};

export default Auth;
