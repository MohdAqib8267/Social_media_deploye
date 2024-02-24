// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import defaultPicture from "../../img/images.jpeg";
// import "./ChatBox.css";
// import { format } from "timeago.js";
// import InputEmoji, { async } from "react-input-emoji";

// const ChatBox = ({ chat, currentUser,setSendMeesage, receivedMessage }) => {
//   // console.log(chat);
//   const [userData, setUserData] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const scroll = useRef(null);

//   useEffect(()=>{
//     if(receivedMessage !== null && receivedMessage?.chatId === chat._id){
//       setMessages([...messages,receivedMessage]);
//     }
//   },[receivedMessage])

//   // fetching data for header
//   useEffect(() => {
//     const userId = chat?.members?.find((id) => id !== currentUser);
//     const getUserData = async () => {
//       try {
//         const data = await axios.get(`http://localhost:5000/user/${userId}`);
//         // console.log(data.data);
//         setUserData(data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     if (chat != null) {
//       getUserData();
//     }
//   }, [chat, currentUser]);

//   //fetching Messages
//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const data = await axios.get(
//           `http://localhost:5000/message/${chat._id}`
//         );
//         // console.log(data.data);
//         setMessages(data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     if (chat !== null) {
//       fetchMessages();
//     }
//   }, [chat]);
//   console.log(messages);

//   useEffect(() => {
  
//     scroll.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);
//   const handleChange = (newMessage) => {

//     setNewMessage(newMessage);
//   };

//   const handleSend=async(e)=>{
//     e.preventDefault();
//     const message = {
//       senderId:currentUser,
//       text:newMessage,
//       chatId:chat._id,
//     }

//     // send message to database
//     try {
//       const {data} = await axios.post(`http://localhost:5000/message`,message);
//       setNewMessage("");
//       setMessages([...message,data]);
//     } catch (error) {
//       console.log(error);
//     }

//     //send message to socket server
//     const receiverId = chat.members.find((id)=>id!==currentUser);
//     setSendMeesage([...message,receiverId]);

//   }

//   // console.log(newMessage)
//   return (
//     <div className="ChatBox-container">
//       {chat?(
//         <>
//         <div className="chat-header">
//           <div className="follower">
//             <div>
//               <img
//                 src={
//                   userData?.profilePicture
//                     ? userData.profilePicture
//                     : defaultPicture
//                 }
//                 alt="Profile"
//                 className="followerImage"
//                 style={{ width: "50px", height: "50px" }}
//               />
//               <div className="name" style={{ fontSize: "0.8rem" }}>
//                 <span>
//                   {userData?.firstname} {userData?.lastname}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
//         </div>

//         {/* chatBox Messages */}

//         <div className="chat-body" ref={scroll} >
//         {messages.map((message) => (
//             <>
//               <div ref={scroll}
//                 className={
//                   message.senderId === currentUser ? "message own" : "message"
//                 }
//               >
//                 <span>{message.text}</span>{" "}
//                 <span>{format(message.createdAt)}</span>
//               </div>
//             </>
//           ))}
//         </div>

//         {/* chat-sender */}

//         <div className="chat-sender">
//           <div>+</div>
//           <InputEmoji value={newMessage} onChange={handleChange} />
//           <div className="send-button button" onClick={handleSend}>send</div>
//         </div>
//       </>
//       ):
//       (
//         <span className="chatbox-empty-message">
//             Tap on a chat to start conversation...
//           </span>
//       )
//       }

//     </div>
//   );
// };

// export default ChatBox;


import React, { useEffect, useState } from "react";
import { useRef } from "react";
// import { addMessage, getMessages } from "../../api/MessageRequests";
// import { getUser } from "../../api/UserRequests";
import "./ChatBox.css";
import { format } from "timeago.js";
import defaultPicture from "../../img/images.jpeg";
import axios from "axios";
import InputEmoji from "react-input-emoji";
import { io } from "socket.io-client";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {

  const socket = io("http://localhost:5000");
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const data = await axios.get(`http://localhost:5000/user/${userId}`);
        setUserData(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await axios.get(
          `http://localhost:5000/message/${chat._id}`
        );
        setMessages(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send Message
  //   const handleSend = async(e)=> {
  //     e.preventDefault()
  //     const message = {
  //       senderId : currentUser,
  //       text: newMessage,
  //       chatId: chat._id,
  //   }
  //   const receiverId = chat.members.find((id)=>id!==currentUser);
  //   // send message to socket server
  //   setSendMessage({...message, receiverId});
  //   // send message to database
  //   try {
  //     const {data} = await axios.post(`http://localhost:5000/message`,message);
  //     setMessages([...messages, data]);
  //     setNewMessage("");
  //   }
  //   catch
  //   {
  //     console.log("error")
  //   }
  // }

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    // send message to database
    try {
      const { data } = await axios.post(
        `http://localhost:5000/message`,
        message
      );
      setNewMessage("");
      setMessages([...messages, data]);
    } catch (error) {
      console.log(error);
    }

    //send message to socket server
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
    socket.emit('send-message', message); 
  };

  // Receive Message from parent component
  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  const scroll = useRef();
  const imageRef = useRef();
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? userData.profilePicture
                        : defaultPicture
                    }
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chat-body */}
            <div className="chat-body">
            {Array.isArray(messages) && messages.map((message,index) => (
            <>
              <div ref={scroll} key={index}
                className={
                  message.senderId === currentUser ? "message own" : "message"
                }
              >
                <span>{message.text}</span>{" "}
                <span>{format(message.createdAt)}</span>
              </div>
            </>
          ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <div onClick={() => imageRef.current.click()}>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
              />
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
