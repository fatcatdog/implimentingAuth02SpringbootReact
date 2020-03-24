import React, { useState, useEffect, useRef } from 'react';
import '../styles/Header.css';
import '../styles/Group.css';
import Header from './Header';
import { getGroupEndpoint, getUserCredentialsEndpoint, getMessageHistory } from '../constants';
import { withCookies } from 'react-cookie';

////these are imported in the component
// const Stomp = require('stompjs')
// const SockJS = require('sockjs-client')

let stompClient;

function Group(props) {
  const [group, setGroup] = useState({});
  const {cookies} = props;
  const [authenticated, setAuthenticated] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [user, setUser] = useState("");
  const [currentMessage, setCurrentMessage] =useState("");
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);

  const [connected, setConnected] = useState(false);
  const messagesEndRef = useRef(null);

  function onError(){
      console.log("Failed connecting....")
  }

 const Stomp = require('stompjs')
 const SockJS = require('sockjs-client')

  function connect() {

    if(user.name) {
      var socket = new SockJS('/ws');
      stompClient = Stomp.over(socket);
      stompClient.connect({}, function(frame) {
          setConnected(true);
          console.log('Connected: ' + frame);
          stompClient.send("/app/addUser", {}, JSON.stringify({sender: user.name, type: 'JOIN'}))
          stompClient.subscribe('/topic/public', function(messagePayload) {
            try {
              onMessageReceived(messagePayload)
            } catch(e) {
              console.log(e)
            }
          });
      });
      }
  }

  // function onConnected() {
  //   // Subscribe to the Public Topic
  //     // stompClient.subscribe("/topic/public", onMessageReceived(this));
  //     stompClient.subscribe("/topic/public", onMessageReceived);
  //
  //     // Tell your username to the server
  //     stompClient.send("/app/addUser", {}, JSON.stringify({sender: user.name, type: 'JOIN'}))
  // }

  //this needs to be implimented
  function checkIfNameIsInArray(senderName){
    setMembers(members => [...members, senderName]);
  }

  function addMessageToState(newMessage){
   setMessages(messages => [...messages, newMessage]);
 };

  function onMessageReceived(payload){
    // console.log("Why the fuck is this not working?")
    // console.log(typeof payload);
    // console.log(JSON.stringify(payload))
      let message = JSON.parse(payload.body);

      checkIfNameIsInArray(message.sender);

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
      // scrollToBottom();
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

  function printMessageHistory(){
    console.log(messages);
  }

  useEffect(() => {
    confirmAuthenticated();
    getGroupFromBackend(props.location.state.ourId);
  }, []);

  async function getGroupFromBackend(aNewGroupId){
    const response = await fetch(getGroupEndpoint + aNewGroupId, {
      method: 'GET',
      headers: {
        'X-XSRF-TOKEN': cookies.get('XSRF-TOKEN'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    try {
      let textBody = await response.text();
      let jsonBody = JSON.parse(textBody);
      setGroup(jsonBody)
    } catch(e) {
      console.log("Error getting group")
      console.log(e)
   }

  }

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

function handleSubmit(e) {
  e.preventDefault();
  connect();
}

function handleSendMessageSubmit(e) {
  e.preventDefault();
  // console.log(currentMessage);
  sendMessage(currentMessage);
  setCurrentMessage("");
}

// function updateScrollbar() {
//   $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
//     scrollInertia: 10,
//     timeout: 0
//   });
// }

  // function scrollToBottom(){
  //   let objDiv = document.getElementById('messages');
  //   objDiv.scrollTop = objDiv.scrollHeight;
  // }


  return (
    <div className="mainClass">
      <Header />
      <h1>Group</h1>
      Group Name:
      <br />
      {group.name}
      <br />
      <br />
      Group Description:
      <br />
      {group.description}
      <br />
      <br />
    <div>
      <div>
       <div>
             <form onSubmit={e => handleSubmit(e)}>
               <div>
                 Chatting as:{" "}{user.name}
               </div>
               <div>
                   <button type="submit">Start Chatting</button>
               </div>
           </form>
           <button onClick={() => printMessageHistory()}>Print Messages</button>
     </div>
   </div>
  </div>


      <div>
          <div class="chat">
            <div class="chat-title">
              <h1>Public Chat</h1>
            </div>
            <div class="messages" ref={messagesEndRef}>
              <div class="messages-content">
                {messages.map(function(key, value){
                    return (
                      <div>
                        <div class="message message-personal">
                        {key.sender} - {key.content}
                        <br />
                        <br />
                      </div>
                     </div>
                    )
                  })}
              </div>
            </div>
            <div class="message-box">
              <form onSubmit={e => handleSendMessageSubmit(e)}>

              <textarea type="text" class="message-input" value={currentMessage} onChange={e => setCurrentMessage(e.target.value)} />
                <br />
                <br />
              <button type="submit" class="message-submit">Send</button>

              </form>
            </div>

          </div>
          <div class="bg"></div>
        </div>

    </div>
  )
}
// <div>
//   <h1>Our Chat Box</h1>
//
//         {members.map(function(key, value){
//            return (
//              <div>
//                {key}
//              </div>
//            )
//          })}
//
//          {messages.map(function(key, value){
//             return (
//               <div>
//                 {key.sender} - {key.content}
//              </div>
//             )
//           })}
// </div>

export default withCookies(Group);
