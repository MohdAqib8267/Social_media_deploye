// import React, { useEffect, useRef, useState } from "react";
// import "./Chat.css";
// import LogoSearch from "../../components/LogoSearch/LogoSearch";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import Conversation from "../../components/Conversation/Conversation";
// import { Link } from "react-router-dom";
// import Home from "../../img/home.png";
// import Noti from "../../img/noti.png";
// import Comment from "../../img/comment.png";
// import { UilSetting } from "@iconscout/react-unicons";
// import ChatBox from "../../components/ChatBox/ChatBox";
// import {io} from 'socket.io-client';

// const Chat = () => {
//   const user = useSelector((state) => state.user.currentUser);
//   // console.log(user.user)
//   const [chats, setChats] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [onlineUsers,setOnlineUsers]=useState([]);
//   const [sendMessage,setSendMessage]=useState(null);
//   const [receivedMessage,setReceivedMessage]=useState(null);
//   const socket = useRef();

//  // Get the chat in chat section
//   useEffect(() => {
//     const getChats = async () => {
//       try {
//         const data = await axios.get(
//           `http://localhost:5000/chat/${user.user._id}`
//         );
//         setChats(data.data);
//         // console.log(data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getChats();
//   }, [user.user]);

//   // Connect to Socket.io
//   useEffect(()=>{
//     socket.current = io('ws://localhost:8800');
//     socket.current.emit("new-user-add",user.user._id);
//     socket.current.on("get-users",(users)=>{
//       setOnlineUsers(users);
//     });
//   },[user.user])

 

//    //send message to socket server
//    useEffect(() => {
//     if (sendMessage!==null) {
//       // console.log(sendMessage);
//       socket.current.emit("send-message", sendMessage);
//     }
//   }, [sendMessage]);


//     //receive meesage from socket server
//     useEffect(()=>{
//       socket.current.on("recieve-message",(data)=>{
//         // console.log({d:data});
//         setReceivedMessage(data);
//       })
//     },[]);
//     const checkOnlineStatus = (chat) => {
//       const chatMember = chat.members.find((member) => member !== user._id);
//       const online = onlineUsers.find((user) => user.userId === chatMember);
//       return online ? true : false;
//     };
  
// //  console.log(receivedMessage);
//   return (
//     <div className="Chat">
//       {/* left side */}
//       <div className="Left-side-chat">
//         <LogoSearch />
//         <div className="Chat-container">
//           <h2>Chats</h2>
//           <div className="Chat-list">
//             {chats.map((chat) => (
//               <div onClick={() => setCurrentChat(chat)}>
//                 <Conversation data={chat} currentUser={user.user._id} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Right side */}
//       <div className="Right-side-chat">
//         <div style={{ width: "20rem", alignSelf: "flex-end" }}>
//           <div className="navIcons">
//             <Link to={"../Home"}>
//               <img src={Home} alt="" />
//             </Link>
//             <UilSetting />
//             <img src={Noti} alt="" />
//             <Link to={"../chat"} style={{ cursor: "pointer" }}>
//               <img src={Comment} alt="" />
//             </Link>
//           </div>
//         </div>
//         {/* chat body */}
//         <ChatBox chat={currentChat} currentUser={user.user._id} setSendMessage={setSendMessage}  receivedMessage={receivedMessage}/>
//       </div>
//     </div>
//   );
// };

// export default Chat;






import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Conversation from "../../components/Conversation/Conversation";
import { Link } from "react-router-dom";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import ChatBox from "../../components/ChatBox/ChatBox";
import {io} from 'socket.io-client';

const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const user = useSelector((state) => state.user.currentUser);
  const [chatList,setChatList]=useState([]);
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  // Get the chat in chat section

  // console.log(user);
  useEffect(() => {
    

    const getChats = async () => {
      try {
        const data = await axios.get(
                    `http://localhost:5000/chat/${user.user._id}`
                  );
        setChats(data.data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
    
    
  }, [user.user._id]);
 

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user.user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
      // console.log(users);  
    });
  }, [user.user]);

  // Send Message to socket server
  useEffect(() => {   
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);


  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data)
      setReceivedMessage(data);
    }

    );
  }, []);


  const checkOnlineStatus = (chat) => {
    // console.log(chat.members);
    const chatMember = chat.members.find((member) => member !== user.user._id);
    // console.log(onlineUsers);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    // console.log(online);  

    return online ? true : false;
    
  };
// console.log(chatList);
  return (
    <div className="Chat">
         {/* left side */}
         <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            
            {chats.map((chat) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation
                  data={chat}
                  currentUser={user.user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    
           {/* Right side */}
           <div className="Right-side-chat">
             <div style={{ width: "20rem", alignSelf: "flex-end" }}>
               <div className="navIcons">
                 <Link to={"../Home"}>
                   <img src={Home} alt="" />
                 </Link>
                 <UilSetting />
                 <img src={Noti} alt="" />
                 <Link to={"../chat"} style={{ cursor: "pointer" }}>
                   <img src={Comment} alt="" />
                 </Link>
              </div>
            </div>
            {/* chat body */}
            <ChatBox
          chat={currentChat}
          currentUser={user.user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
          </div>
         </div>
  );
};

export default Chat;