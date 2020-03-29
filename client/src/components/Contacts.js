import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import '../styles/Invitations.css';
import { withCookies } from 'react-cookie';
// import { getUserCredentialsEndpoint, getContactsSendeeEndpoint, getContactsSenderEndpoint, addAContactEndpoint, getCheckIfUserIsRealEndpoint } from '../constants';

import { getUserCredentialsEndpoint, getCheckIfUserIsRealEndpoint } from '../constants';
import Header from './Header';

function Contacts(props) {
  // const {cookies} = props;
  const [authenticated, setAuthenticated] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [user, setUser] = useState("");
  // const [data, setData] = useState([]);
  // const [sendeeInvites, setSendeeInvites] = useState([]);
  // const [senderInvites, setSenderInvites] = useState([]);
  // const [imageUrl, setImageUrl] = useState("");

  const [newContact, setNewContact] =  useState("");
  const [contacts, setContacts] = useState([]);

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
          // fetchOurInvitationsFromServer(ourNewUser.name);
        }
    }
  }

  // async function fetchOurInvitationsFromServer(tempUserName) {
  //
  //    const sendeeResponse = await fetch(getContactsSendeeEndpoint + tempUserName, {
  //      method: 'GET',
  //      headers: {
  //        'X-XSRF-TOKEN': csrfToken,
  //        'Accept': 'application/json',
  //        'Content-Type': 'application/json'
  //      },
  //      credentials: 'include'
  //    });
  //
  //    const sendeeBody = await sendeeResponse.text();
  //
  //    try {
  //      setSendeeInvites(JSON.parse(sendeeBody));
  //    } catch(e) {
  //    console.log("Error setting list of invites by sendee to state")
  //   }
  //
  //     const senderResponse = await fetch(getContactsSenderEndpoint + tempUserName, {
  //       method: 'GET',
  //       headers: {
  //         'X-XSRF-TOKEN': csrfToken,
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       credentials: 'include'
  //     });
  //
  //     const senderBody = await senderResponse.text();
  //
  //     try {
  //       setSenderInvites(JSON.parse(senderBody));
  //     } catch(e) {
  //       console.log("Error setting list of invites by sender to state")
  //    }
  //  }

   // async function postOurObjToServer(csrfToken, sendeeObj) {
   //    const item = {
   //      "id": 0,
   //      "sendee": sendeeObj,
   //      "sender": user.name
   //    };
   //    console.log("Hey: " + csrfToken)
   //    console.log("item: " + JSON.stringify(item))
   //
   //    const response = await fetch(addAContactEndpoint, {
   //      method: 'POST',
   //      headers: {
   //        'X-XSRF-TOKEN': csrfToken,
   //        'Accept': 'application/json',
   //        'Content-Type': 'application/json'
   //      },
   //      body: JSON.stringify(item),
   //      credentials: 'include'
   //    });
   //    console.log(response.status)
   //
   //    // const body = await response.text();
   //    setSendeeObj("");
   //  }

    // async function getCheckIfUserIsRealFetch(csrfToken, sendeeObj) {
    //    // const item = {
    //    //   "principalName":sendeeObj
    //    // };
    //    // console.log("Hey: " + csrfToken)
    //    // console.log("item: " + JSON.stringify(item))
    //    // alert(JSON.stringify(item));
    //
    //    const response = await fetch(getCheckIfUserIsRealEndpoint + sendeeObj, {
    //      method: 'GET',
    //      headers: {
    //        'X-XSRF-TOKEN': csrfToken,
    //        'Accept': 'application/json',
    //        'Content-Type': 'application/json',
    //        "name":sendeeObj
    //      },
    //      // body: JSON.stringify(item),
    //      credentials: 'include'
    //    });
    //
    //    // setImageUrl(body);
    //    if(response.status === 200) {
    //      postOurObjToServer(csrfToken, sendeeObj)
    //    }
    //  }

    function addToTempContactList(){
      let ourNewContact = {"id": contacts.length, "name": newContact}
      setContacts(contacts => [...contacts, ourNewContact]);
      localStorage.setItem('myContacts', (contacts));
      setNewContact("");
    }

    function handleSubmit(e){
      e.preventDefault();
      addToTempContactList();
      // postOurObjToServer(csrfToken, sendeeObj);
      // getCheckIfUserIsRealFetch(csrfToken, sendeeObj);

      // setSendeeObj("");
    }


  useEffect(() => {
    confirmAuthenticated();

  }, []);

  // function attemptToJoinInvite(ourInviteId, tempSender, tempStatus){
  //   console.log("attemptToJoinInvite");
  //   console.log("Not implimented yet :(");
  //   // console.log(tempSender);
  //   // console.log(tempStatus);
  //   // postOurInvitationAcceptanceToServer(ourInviteId)
  // }

  // async function postOurInvitationAcceptanceToServer(ourInviteId) {
  //   let obj = sendeeInvites.find(x => x.id === ourInviteId);
  //
  //    const item = {
  //       "status": (obj.status) ? false : true,
  //       "id": obj.id,
  //       "sendee": obj.sender,
  //       "sender": user.name
  //     };
  //
  //     console.log(item);
  //
  //    const response = await fetch(updateAContactEndpoint, {
  //      method: 'POST',
  //      headers: {
  //        'X-XSRF-TOKEN': csrfToken,
  //        'Accept': 'application/json',
  //        'Content-Type': 'application/json'
  //      },
  //      body: JSON.stringify(item),
  //      credentials: 'include'
  //    });
  //    console.log(response)
  //  }

  // const sendeeInvitationsList = sendeeInvites.map((d) =>
  //     <tr key={d.id}>
  //       <td>{d.sender}</td>
  //       <td>{d.dateTime}</td>
  //       <td>{d.status.toString()}</td>
  //       <td onClick={() => { attemptToJoinInvite(d.id, d.sender, d.status) }}>
  //         <a href="">Click me</a>
  //       </td>
  //     </tr>
  // );
  //
  // const senderInvitationsList = senderInvites.map((d) =>
  //     <tr key={d.id}>
  //       <td>{d.sendee}</td>
  //       <td>{d.dateTime}</td>
  //       <td>{d.status.toString()}</td>
  //     </tr>
  // );

  function handleContactClick(name) {
    console.log("name name: " + name);
  }

  const contactsList = contacts.map((d) =>

      <tr key = {d.id}>
          <td>
            <Link to={{
              pathname: "/privateChat",
              state: { chatPartner: d.name }
            }}>{d.name}</Link>

          </td>
    </tr>


  );

  return(
    <div>
    <div className="centeringStuff">
      <Header />
      <h1>Contacts</h1>
      <table>
        <tbody>
        <tr>
          <th>Name</th>
        </tr>
        {/*{sendeeInvitationsList}{senderInvitationsList}*/}
        {contactsList}
        </tbody>
      </table>
    </div>
    <div className="centeringStuff">
      <h1>Add a new Contact</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <label>
          Please enter the name of the user you want to add to contacts:
          <br />
          <br />
          <input className="field"
            type="text"
            value={newContact}
            onChange={e => setNewContact(e.target.value)}
          />
        </label>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>

    </div>
  )
}

export default withCookies(Contacts);
