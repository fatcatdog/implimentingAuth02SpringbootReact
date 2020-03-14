import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import '../styles/Header.css';
import Header from './Header';
import { getGroupEndpoint, getUserCredentialsEndpoint, getMessageHistory } from '../constants';
import { withCookies } from 'react-cookie';
// import { w3cwebsocket as W3CWebSocket } from "websocket";
// import { StompJs } from '@stomp/stompjs';
// import { TalkBox } from "react-talk";
// import SockJsClient from "react-stomp";

function Group(props) {
  const [group, setGroup] = useState({});
  const {cookies} = props;
  const [authenticated, setAuthenticated] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [user, setUser] = useState("");
  // const [responseFromWs, setResponseFromWs] = useState("");
  // const [message, setMessage] = useState([]);
  // const [client, setClient] = useState(null);
  const [stompClient, setStompClient] = useState(null);


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
      // setData(JSON.parse(body));
      // console.log(jsonBody);
      // console.log(typeof body);
    } catch(e) {
      console.log("Error getting group")
      console.log(e)
   }
  }

  async function confirmAuthenticated(){
    const {cookies} = props;

    const response = await fetch(getUserCredentialsEndpoint, {credentials: 'include'});

      if(response.status !== 200) {
        // console.log(response.status + " not 200 indicates not logged in in browser && server")
      } else {

      const body = await response.text();

      if (body === '') {
        // console.log("Home - confirmAuthenticated() - body == null")
        setAuthenticated(false)
      } else {
        // console.log("Home - confirmAuthenticated() - body != null")
        // console.log(body)
        // if(isJSON(body)){
          // console.log(JSON.parse(body).login)
          setUser(JSON.parse(body))
          setAuthenticated(true)
          setCsrfToken(cookies.get('XSRF-TOKEN'));
        // }
      }
  }
}

function connectWS() {

  console.log("Clicked connectWS!")
}

function disconnectWS() {

  console.log("Clicked disconnectWS!")
}

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
          <button onClick={() => connectWS()}>
            Connect
          </button>
            <br />
            <br />
              <button onClick={() => disconnectWS()}>
            Disconnect
          </button>
             <br />
             <br />
        </div>
    </div>
  )
}




export default withCookies(Group);
