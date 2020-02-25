import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Cookies, withCookies } from 'react-cookie';

async function postOurObjToServer(csrfToken, name, description) {
   const item = {"description": description, "id": 0, "name": name };
   console.log("Hey: " + csrfToken)
   console.log("item: " + JSON.stringify(item))

   const response = await fetch('/api/addGroup', {
     method: 'POST',
     headers: {
       'X-XSRF-TOKEN': csrfToken,
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(item),
     credentials: 'include'
   });

   const body = await response.text();

   console.log(body);
 }

function GroupList(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [csrfToken, setCsrfToken] = useState('');


  const handleSubmit = (evt) => {
        evt.preventDefault();
        const {cookies} = props;

        console.log(`Submitting Name ${name}`)
        console.log(`Submitting Description ${description}`)
        postOurObjToServer(cookies.get('XSRF-TOKEN'), name, description);
  }

  useEffect(() => {
    // setCsrfToken(cookies.get('XSRF-TOKEN'));
  }, []);

  // "description": "string",
  //   "id": 0,
  //   "name": "string"
  const data =[{"description":"our first description", "id":"our first id","name": "our first name"},{"description":"our second description", "id":"our second id","name": "our second name"}, {"description":"our third description", "id":"our third id","name": "our third name"}];
    const listItems = data.map((d) =>
      <li key={d.id}>
          {d.name}
        <br/>
          {d.description}
        <br/>
        <br/>
      </li>
    );

  return(
    <div>
    <Header />
    <h1>Group List</h1>
    <p>{listItems}</p>
    <br />
    <div>
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
