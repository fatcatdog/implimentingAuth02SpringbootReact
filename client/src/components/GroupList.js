import React, { useState, useEffect } from 'react';
import Header from './Header';
import { withCookies } from 'react-cookie';
import { addGroupEndpoint, groupsEndpoint } from '../constants';
import '../styles/GroupList.css';


function GroupList(props) {
  async function fetchOurGroupsFromServer(csrfToken) {
     // console.log("Hey: " + csrfToken)

     const response = await fetch(groupsEndpoint, {
       method: 'GET',
       headers: {
         'X-XSRF-TOKEN': csrfToken,
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       credentials: 'include'
     });

     const body = await response.text();

     try {
       setData(JSON.parse(body));
       // console.log(body);
       // console.log(typeof body);
     } catch(e) {
     console.log("Error setting list of groups to state")
    }
   }

  async function postOurObjToServer(csrfToken, name, description) {
     const item = {"description": description, "id": 0, "name": name };
     console.log("Hey: " + csrfToken)
     console.log("item: " + JSON.stringify(item))

     const response = await fetch(addGroupEndpoint, {
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
     fetchOurGroupsFromServer(csrfToken);
     setName("");
     setDescription("");
   }

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const {cookies} = props;

  const handleSubmit = (evt) => {
        evt.preventDefault();

        // console.log(`Submitting Name ${name}`)
        // console.log(`Submitting Description ${description}`)
        postOurObjToServer(cookies.get('XSRF-TOKEN'), name, description);
  }

  useEffect(() => {
    fetchOurGroupsFromServer(cookies.get('XSRF-TOKEN'));
  }, []);

    // const listItems = data.map((d) =>
    //   <li key={d.id}>
    //       Name: {d.name}
    //     <br/>
    //       Description: {d.description}
    //     <br/>
    //     <br/>
    //   </li>
    // );
    // <p className="ourGroupList">{listItems}</p>

    const tableItems = data.map((d) =>
        <tr key={d.id}>
          <td>{d.name}</td>
          <td>{d.description}</td>
        </tr>
    );

  return(
    <div className="mainClass">
    <Header />
    <h1>Group List</h1>
    <table>
      <tbody>
      <tr>
        <th>Name</th>
        <th>Description</th>
      </tr>
      {tableItems}
      </tbody>
    </table>
    <div>
      <h1>Create a Group</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
  )
}

export default withCookies(GroupList);
