import React, { useState, useEffect, useRef } from 'react';
import '../styles/Header.css';
import '../styles/Group.css';
import Header from './Header';
import { getGroupEndpoint, getUserCredentialsEndpoint, getMessageHistory } from '../constants';
import { withCookies } from 'react-cookie';
import { Redirect } from "react-router-dom";

////these are imported in the component
// const Stomp = require('stompjs')
// const SockJS = require('sockjs-client')

let stompClient;

function EveryonePublicChat(props) {
  const {cookies} = props;
  const [authenticated, setAuthenticated] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [user, setUser] = useState("");
  const [currentMessage, setCurrentMessage] =useState("");
  const [messages, setMessages] = useState([]);
  // const [members, setMembers] = useState([]);

  const [connected, setConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const textInputRef = useRef(null);
  // const [userJustClickedJoinRoom, setUserJustClickedJoinRoom] = useState(false);

  function onError(){
      console.log("Failed connecting....")
  }

 const Stomp = require('stompjs')
 const SockJS = require('sockjs-client')

 function OurChatJoinLeaveButtons(connected){

     // if(userJustClickedJoinRoom){
     //   return (<div>Loading...</div>);
     // }

     if(connected){
       return (
         <form onSubmit={e => sendLeaveMessage(e)}>
           <button type="submit">Leave chat Room</button>
         </form>
       )
     } else {
       return (
         <form onSubmit={e => handleSubmit(e)}>
           <button type="submit">Join public chat room</button>
         </form>
      )
     }
     }

   // function functionToSetClickTrue(e){
   //   e.preventDefault();
   //   setUserJustClickedJoinRoom(true);
   //    connect();
   //   console.log("Hopefully this executes only once!")
   //
   // }

   function handleSubmit(e) {
     e.preventDefault();
     // setUserJustClickedJoinRoom(true);
     // OurChatJoinLeaveButtons.useState();
     // console.log("ooooy " + userJustClickedJoinRoom)
     connect();
     textInputRef.current.focus()
   }

  function connect() {
    // setUserJustClickedJoinRoom(true);
    if(user.name) {
      var socket = new SockJS('/ws');
      stompClient = Stomp.over(socket);
      stompClient.connect({}, function(frame) {
          setConnected(true);
          // setUserJustClickedJoinRoom(false);
          // console.log('Connected: ' + frame);
          stompClient.send("/app/addUser", {}, JSON.stringify({sender: user.name, type: 'JOIN'}))
          stompClient.subscribe('/topic/public', function(messagePayload) {
            try {
              onMessageReceived(messagePayload)
            } catch(e) {
              console.log(e)
              setConnected(false);
              // setUserJustClickedJoinRoom(false);
            }
          });
      });
      }
      // setUserJustClickedJoinRoom(false);
  }

  // //this needs to be implimented
  // function checkIfNameIsInArray(senderName){
  //   setMembers(members => [...members, senderName]);
  // }

  function addMessageToState(newMessage){
   setMessages(messages => [...messages, newMessage]);
 };

  function onMessageReceived(payload){

      let message = JSON.parse(payload.body);

      // checkIfNameIsInArray(message.sender);

      if (message.type === 'JOIN') {
        console.log("message.type === 'JOIN'");
        console.log(message);
        message.content = "JOINED THE CHAT";
        addMessageToState(message);

      } else if (message.type === 'LEAVE') {
        console.log("message.type === 'LEAVE'");
        console.log(message);
        message.content = "LEFT THE CHAT";
        addMessageToState(message);

      } else if (message.type === 'TYPING') {
        console.log("message.type === 'TYPING'");
        console.log(message);
        addMessageToState(message);

      } else if (message.type === 'CHAT') {
        console.log("message.type === 'CHAT'");
        console.log(message);
        addMessageToState(message);

      } else {
        console.log("Idk bruh")
      }
      scrollToBottom();
  }

    function sendMessage(value){

      if (stompClient) {

        let chatMessage = {
          sender: user.name,
          content: value,
          type: "CHAT"
        };

        // send public message
        stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage));
      } else {
        console.log("function sendMessage stompClient is null....")
      }
  }

  function sendLeaveMessage(e){
    e.preventDefault();

    if (stompClient) {

      let chatMessage = {
        sender: user.name,
        content: "",
        type: "LEAVE"
      };

      // send public message
      stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage));
      stompClient.disconnect(function () {
        console.log("Killed websocket connection.")
      })
      stompClient = null;
      setConnected(false);
    } else {
      console.log("function sendMessage stompClient is null....")
    }
}

  function printMessageHistory(){
    console.log(messages);
  }

  useEffect(() => {
    confirmAuthenticated();

    // let newVar = props.location.state.ourId;
    // getGroupFromBackend(newVar);
  }, []);

  async function confirmAuthenticated(){
    const {cookies} = props;

    const response = await fetch(getUserCredentialsEndpoint, {credentials: 'include'});

        if(response.status !== 200) {
          console.log(response.status + " not 200 indicates Group confirmAuthenticated failed")
        } else {

        const body = await response.text();

        if (body === '') {
          setAuthenticated(false)
        } else {
          // console.log(body)
          setUser(JSON.parse(body))
          setAuthenticated(true)
          setCsrfToken(cookies.get('XSRF-TOKEN'));
        }
    }
  }

function onError() {
  console.log("Could not connect to WebSocket server. Please refresh this page to try again!");
}

function handleSendMessageSubmit(e) {
  e.preventDefault();
  if(currentMessage.trim().length === 0) {
      let newFakeMessage = {};
      newFakeMessage.sender = "BOT (only you can see this)";
      newFakeMessage.type = "CHAT";
      newFakeMessage.content = "Your message was empty. Try typing something!"
      addMessageToState(newFakeMessage)
  } else if (connected === false){
      let newFakeMessage = {};
      newFakeMessage.sender = "BOT (only you can see this)";
      newFakeMessage.type = "CHAT";
      newFakeMessage.content = "Something isn't right. Please try clicking the Connect to Chat button";
      addMessageToState(newFakeMessage)
  } else {
      sendMessage(currentMessage);
      setCurrentMessage("");
  }

  textInputRef.current.focus();
}

function scrollToBottom(){
  messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
}

const OurStatusIndicator = (connected) => {
    if(connected){
      return (
       <div>
         Connected status:{" "}<div className="greenCircleStyle"></div>
       </div>
      )
    } else {
      return (
       <div>
         Connected status:{" "}<div className="redCircleStyle"></div>
       </div>
     )
    }
}

  return (
    <div>
      <div className="centeringStuff">
        {
          // We wrap the header in this to try close any websockets upon leaving chat room (whether they were open or not)
        }
        <div onClick={e => sendLeaveMessage(e)}>
      <Header />
      <h1>Home</h1>
      </div>
    <div>
       {OurChatJoinLeaveButtons(connected)}
  </div>
</div>

      <div>
        <div className="centeringStuff">
          <h2>Chatting as:{" "}{user.name}</h2>
          {OurStatusIndicator(connected)}
        </div>
        <br />
          <div className="Container">
            <div className="MessageList" ref={messagesEndRef}>
                {messages.map(function(key, value){
                    return (
                        <div className="Message" key={value}>
                          {key.sender && (
                              <span className="author">{key.sender}:</span>
                            )}
                        {key.content}
                      </div>
                    )
                  })}
            </div>
            <div>
               <form className="MessageForm" onSubmit={e => handleSendMessageSubmit(e)}>

               <div className="input-container">
               <input
                 type="text"
                 value={currentMessage}
                 onChange={e => setCurrentMessage(e.target.value)}
                 ref={textInputRef}
                />
               </div>
               <div className="button-container">
                 <button type="submit">Send</button>
               </div>
               </form>
             </div>
          </div>
        </div>
      </div>
  )
}


export default withCookies(EveryonePublicChat);
