import React, { useState, useEffect } from 'react';
import Header from './Header';
import { withCookies } from 'react-cookie';
import { getUserCredentialsEndpoint, loginEndpoint, githubLoginEndpoint, googleLoginEndpoint, logoutEndpoint } from '../constants';

function Home(props) {

  const [authenticated, setAuthenticated] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [user, setUser] = useState(undefined);

  async function confirmAuthenticated(){

    const {cookies} = props;

    const response = await fetch(getUserCredentialsEndpoint, {credentials: 'include'});
    const body = await response.text();
    // let tempUser = JSON.parse(body);
    if (body === '') {
      console.log("Home - confirmAuthenticated() - body == null")
      setAuthenticated(false)
    } else {
      console.log("Home - confirmAuthenticated() - body != null")
      console.log(body)
      setAuthenticated(true)
      setUser(JSON.parse(body))
      setCsrfToken(cookies.get('XSRF-TOKEN'));
    }
  }

  // async function login(){
  //   const response = await fetch(loginEndpoint, {credentials: 'include'});
  //   const body = await response.text();
  //   // let tempUser = JSON.parse(body);
  //   console.log("Home - confirmAuthenticated()")
  //   console.log(body);
  //   if (body === '') {
  //     setAuthenticated(false)
  //   } else {
  //     setAuthenticated(true)
  //     setUser(JSON.parse(body))
  //   }
  // }

  function login() {
    let port = (window.location.port ? ':' + window.location.port : '');
    if (port === ':3000') {
      port = ':8080';
    }
    window.location.href = '//' + window.location.hostname + port + '/private';
  }

  async function logout(){
    fetch(logoutEndpoint, {method: 'POST', credentials: 'include',
    headers: {'X-XSRF-TOKEN': csrfToken}}).then(res => res.json())
    .then(response => {
      console.log(response)
      window.location.href = response.logoutUrl + "?id_token_hint=" +
        response.idToken + "&post_logout_redirect_uri=" + window.location.origin;
    });
  }

  function printUser(){
    alert(JSON.stringify(user))
  }

  function printToken(){
    alert(csrfToken)
  }

  // async function loginWithGithub(){
  //   const response = await fetch(githubLoginEndpoint, {credentials: 'include'});
  //   const body = await response.text();
  //   // let tempUser = JSON.parse(body);
  //   console.log("Home - Github - confirmAuthenticated()")
  //   console.log(body);
  //   if (body === '') {
  //     setAuthenticated(false)
  //   } else {
  //     setAuthenticated(true)
  //     setUser(JSON.parse(body))
  //   }
  // }
  //
  // async function loginWithGoogle(){
  //   const response = await fetch(googleLoginEndpoint, {credentials: 'include'});
  //   const body = await response.text();
  //   // let tempUser = JSON.parse(body);
  //   console.log("Home - Google - confirmAuthenticated()")
  //   console.log(body);
  //   if (body === '') {
  //     setAuthenticated(false)
  //   } else {
  //     setAuthenticated(true)
  //     setUser(JSON.parse(body))
  //   }
  // }

  // <button onClick={() => loginWithGithub()}>Login with GitHub</button>
  // <br />
  // <button onClick={() => loginWithGoogle()}>Login with GitHub</button>
  // <br />
  // <button onClick={() => logout()}>Logout</button>
  useEffect(() => {
    confirmAuthenticated();
  }, []);

  return(
    <div>
    <Header />
    <h1>Home</h1>
    <br />
    <button onClick={() => login()}>login</button>
    <br />
    <button onClick={() => logout()}>Logout</button>
    <br />
    <button onClick={() => printUser()}>Print User</button>
    <br />
    <button onClick={() => printToken()}>Print Token</button>
    </div>
  )
}

export default withCookies(Home);
