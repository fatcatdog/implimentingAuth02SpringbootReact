import React, { useState, useEffect } from 'react';
import Header from './Header';
import { withCookies } from 'react-cookie';
import { getUserCredentialsEndpoint, logoutEndpoint } from '../constants';

function Home(props) {

  const [authenticated, setAuthenticated] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [user, setUser] = useState(undefined);

  function isJSON(str) {
      try {
          return (JSON.parse(str) && !!str);
      } catch (e) {
          return false;
      }
  }

  async function confirmAuthenticated(){
    const {cookies} = props;

    const response = await fetch(getUserCredentialsEndpoint, {credentials: 'include'});

    if(response.status === 400) {
      console.log("400 indicates not logged in in browser && server")
    }

    const body = await response.text();

    if (body === '') {
      console.log("Home - confirmAuthenticated() - body == null")
      setAuthenticated(false)
    } else {
      console.log("Home - confirmAuthenticated() - body != null")
      // console.log(body)
      if(isJSON(body)){
        setUser(JSON.parse(body))
        setAuthenticated(true)
        setCsrfToken(cookies.get('XSRF-TOKEN'));
      }
    }
  }

  function login() {
    // if(typeof user === 'undefined'){
    if(!authenticated){
      let port = (window.location.port ? ':' + window.location.port : '');
      if (port === ':3000') {
        port = ':8080';
      }
      window.location.href = '//' + window.location.hostname + port + '/private';
    } else {
      alert("You are already logged in as: " + user.login);
    }
  }

  async function logout(){
    // const {cookies} = props;

    const response = await fetch(logoutEndpoint, {
        method: 'POST',
        headers: {
          'X-XSRF-TOKEN': csrfToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });


    const body = await response.text();

    // console.log(body);

    setCsrfToken('');
    setAuthenticated(false);
    setUser(undefined);
  }

  // function printUser(){
  //   alert(JSON.stringify(user))
  // }
  //
  // function printToken(){
  //   alert(csrfToken)
  // }

  function AuthenticatedUserView() {
    return (
        <div>
          <Header />
          <h1>Home</h1>
          <br />
            <button onClick={() => logout()}>Logout</button>
          <br />
        </div>
    );
  }

  function UnauthenticatedUserView() {
    return (
        <div>
          <Header />
            <h1>Home</h1>
          <br />
            <button onClick={() => login()}>login</button>
          <br />
        </div>
    );
  }

  // function ConsoleLogging() {
  //   return (
  //       <div>
  //         <br />
  //           <button onClick={() => login()}>login</button>
  //         <br />
  //       </div>
  //   );
  // }

  useEffect(() => {
    confirmAuthenticated();
  }, []);


  if(authenticated){
    return <AuthenticatedUserView />;
  } else {
    return <UnauthenticatedUserView />;
  }

  // return(
  //   <div>
  //   <Header />
  //   <h1>Home</h1>
  //   <br />
  //   <button onClick={() => login()}>login</button>
  //   <br />
  //   <button onClick={() => logout()}>Logout</button>
  //   <br />
  //   <button onClick={() => printUser()}>Print User</button>
  //   <br />
  //   <button onClick={() => printToken()}>Print Token</button>
  //   </div>
  // )
}

export default withCookies(Home);
