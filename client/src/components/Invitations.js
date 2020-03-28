import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import '../styles/Invitations.css';
import { withCookies } from 'react-cookie';
import { getGroupEndpoint, getUserCredentialsEndpoint, getMessageHistory, getInvitationsSendeeEndpoint, getInvitationsSenderEndpoint, updateAnInvitationEndpoint, addAnInvitationEndpoint } from '../constants';
import Header from './Header';

function Invitations(props) {
  const {cookies} = props;
  const [authenticated, setAuthenticated] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [user, setUser] = useState("");
  // const [data, setData] = useState([]);
  const [sendeeInvites, setSendeeInvites] = useState([]);
  const [senderInvites, setSenderInvites] = useState([]);

  const [sendeeObj, setSendeeObj] =  useState("");

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
          let ourNewUser = JSON.parse(body);
          setUser(ourNewUser)
          setAuthenticated(true)
          setCsrfToken(cookies.get('XSRF-TOKEN'));
          fetchOurInvitationsFromServer(ourNewUser.name);
        }
    }
  }

  async function fetchOurInvitationsFromServer(tempUserName) {

     const sendeeResponse = await fetch(getInvitationsSendeeEndpoint + tempUserName, {
       method: 'GET',
       headers: {
         'X-XSRF-TOKEN': csrfToken,
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       credentials: 'include'
     });

     const sendeeBody = await sendeeResponse.text();

     try {
       setSendeeInvites(JSON.parse(sendeeBody));
     } catch(e) {
     console.log("Error setting list of invites by sendee to state")
    }

      const senderResponse = await fetch(getInvitationsSenderEndpoint + tempUserName, {
        method: 'GET',
        headers: {
          'X-XSRF-TOKEN': csrfToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      const senderBody = await senderResponse.text();

      try {
        setSenderInvites(JSON.parse(senderBody));
      } catch(e) {
        console.log("Error setting list of invites by sender to state")
     }
   }

   async function postOurObjToServer(csrfToken, sendeeObj) {
      const item = {
        "id": 0,
        "sendee": sendeeObj,
        "sender": user.name
      };
      console.log("Hey: " + csrfToken)
      console.log("item: " + JSON.stringify(item))

      const response = await fetch(addAnInvitationEndpoint, {
        method: 'POST',
        headers: {
          'X-XSRF-TOKEN': csrfToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
        credentials: 'include'
      });
      console.log(response.status)

      // const body = await response.text();
      setSendeeObj("");
    }

    function handleSubmit(e){
      e.preventDefault();
      postOurObjToServer(csrfToken, sendeeObj);
      setSendeeObj("");
    }


  useEffect(() => {
    confirmAuthenticated();
  }, []);

  function attemptToAcceptInvite(ourInviteId, tempSender, tempStatus){
    // console.log("YO");
    // console.log(tempSender);
    // console.log(tempStatus);
    postOurInvitationAcceptanceToServer(ourInviteId)
  }

  async function postOurInvitationAcceptanceToServer(ourInviteId) {
    let obj = sendeeInvites.find(x => x.id === ourInviteId);

     const item = {
        "status": (obj.status) ? false : true,
        "id": obj.id,
        "sendee": obj.sender,
        "sender": user.name
      };

      console.log(item);

     const response = await fetch(updateAnInvitationEndpoint, {
       method: 'POST',
       headers: {
         'X-XSRF-TOKEN': csrfToken,
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(item),
       credentials: 'include'
     });
     console.log(response)
   }

  const sendeeInvitationsList = sendeeInvites.map((d) =>
      <tr key={d.id}>
        <td>{d.sender}</td>
        <td>{d.dateTime}</td>
        <td>{d.status.toString()}</td>
        <td onClick={() => { attemptToAcceptInvite(d.id, d.sender, d.status) }}>
          <a href="">Click me</a>
        </td>
      </tr>
  );

  const senderInvitationsList = senderInvites.map((d) =>
      <tr key={d.id}>
        <td>{d.sendee}</td>
        <td>{d.dateTime}</td>
        <td>{d.status.toString()}</td>
      </tr>
  );

  return(
    <div>
    <div className="centeringStuff">
      <Header />
      <h1>Invitations Sent to You</h1>
      <table>
        <tbody>
        <tr>
          <th>Name</th>
          <th>Time</th>
          <th>Status</th>
          <th>Accept Invite</th>
        </tr>
        {sendeeInvitationsList}
        </tbody>
      </table>
    </div>
    <div className="centeringStuff">
      <h1>Create an Invitation</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <label>
          User you want to invite to chat:
          <br />
          <br />
          <textarea className="field"
            type="text"
            value={sendeeObj}
            onChange={e => setSendeeObj(e.target.value)}
          />
        </label>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
    <div className="centeringStuff">
    <h1>Invitations Sent By You</h1>
    <table>
      <tbody>
      <tr>
        <th>Name</th>
        <th>Time</th>
        <th>Accepted By Other User</th>
      </tr>
      {senderInvitationsList}
      </tbody>
    </table>
    </div>
    </div>
  )
}

export default withCookies(Invitations);
