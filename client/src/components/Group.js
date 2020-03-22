import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import Header from './Header';
import { getGroupEndpoint, getUserCredentialsEndpoint, getMessageHistory } from '../constants';
import { withCookies } from 'react-cookie';
// import * as Stomp from 'stompjs';
// import * as SockJS from 'sockjs-client';
// import Stomp from 'stompjs';
// import SockJS from 'sockjs-client';

var stompClient = null;

function Group(props) {
  const [group, setGroup] = useState({});
  const {cookies} = props;
  const [authenticated, setAuthenticated] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [user, setUser] = useState("");
  const [currentMessage, setCurrentMessage] =useState("");
  const [messages, setMessages] = useState([]);

  // const [channelConnected, setChannelConnected] = useState(false);

  function onError(){
      console.log("Failed connecting....")
  }

 // function connect(){
 //
 //    if(user.name) {
 //
 //      const Stomp = require('stompjs')
 //      var SockJS = require('sockjs-client')
 //      SockJS = new SockJS('/ws')
 //      stompClient = Stomp.over(SockJS);
 //      // stompClient.connect({}, onConnected(), onError());
 //      stompClient.connect({}, function(){
 //        // console.log( "Connected : " + frame);
 //        stompClient.subscribe('/topic/public', onMessageReceived(this));
 //        stompClient.send('/app/addUser', {}, JSON.stringify({ sender: user.name, type: 'JOIN' }))
 //
 //        }, function(error) {
 //          alert(error);
 //      });
 //    }
 //  }

 function connect(){

    if(user.name) {

      const Stomp = require('stompjs')
      var SockJS = require('sockjs-client')
      SockJS = new SockJS('/ws')
      stompClient = Stomp.over(SockJS);

      // stompClient.connect({}, onConnected(), onError());
      stompClient.connect({}, onConnected, onError);
    }

  }

  function onConnected() {
    // Subscribe to the Public Topic
      stompClient.subscribe('/topic/public', onMessageReceived);

      // Tell your username to the server
      stompClient.send("/app/addUser",
          {},
          JSON.stringify({sender: user.name, type: 'JOIN'})
      )
  }


  function printMessageHistory(){
    console.log(messages);
  }

  // function sendMessage(type, value){
    function sendMessage(value){

      if (stompClient) {
        // var chatMessage = {
        //   sender: this.state.username,
        //   content: type === 'TYPING' ? value : value,
        //   type: type
        //
        // };
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

function onMessageReceived(payload){
    let message = JSON.parse(payload.body);

    if (message.type === 'JOIN') {
      console.log("message.type === 'JOIN'");
      console.log(message);
    } else if (message.type === 'LEAVE') {
      console.log("message.type === 'LEAVE'");
      console.log(message);
    } else if (message.type === 'TYPING') {
      console.log("message.type === 'TYPING'");
      console.log(message);
    } else if (message.type === 'CHAT') {
      console.log("message.type === 'CHAT'");
      console.log(message);
    } else {
      console.log("Idk bruh")
    }
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

const listMessages = messages.map((messageObject) =>
  <li>{messageObject}</li>
);

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

   <div>
       <div>
           <ul>
             {listMessages}
           </ul>
           <form onSubmit={e => handleSendMessageSubmit(e)}>
               <div>
                   <div>
                     <textarea className="field"
                       type="text"
                       value={currentMessage}
                       onChange={e => setCurrentMessage(e.target.value)}
                     />
                   </div>
                     <input type="submit" value="Submit" />
               </div>
           </form>
       </div>
   </div>
      </div>
    </div>
  )
}

export default withCookies(Group);
