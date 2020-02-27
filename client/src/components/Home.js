import React, { useState, useEffect } from 'react';
import Header from './Header';
import { withCookies } from 'react-cookie';
import { getUserCredentialsEndpoint, logoutEndpoint } from '../constants';
import '../styles/Home.css';

function Home(props) {

  const [authenticated, setAuthenticated] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [user, setUser] = useState("");

  // function isJSON(str) {
  //     try {
  //         return (JSON.stringify(str) && !!str);
  //     } catch (e) {
  //       console.log("Hitting here!")
  //         return false;
  //     }
  // }

  async function confirmAuthenticated(){
    const {cookies} = props;

    const response = await fetch(getUserCredentialsEndpoint, {credentials: 'include'});

      if(response.status !== 200) {
        console.log(response.status + " not 200 indicates not logged in in browser && server")
      } else {

      const body = await response.text();

      if (body === '') {
        console.log("Home - confirmAuthenticated() - body == null")
        setAuthenticated(false)
      } else {
        console.log("Home - confirmAuthenticated() - body != null")
        // console.log(body)
        // if(isJSON(body)){
          // console.log(JSON.parse(body).login)
          setUser(body)
          setAuthenticated(true)
          setCsrfToken(cookies.get('XSRF-TOKEN'));
        // }
      }

    }

  }
  // at_hash: "EPqMDWfahp582ikwiJAPMA"
  // sub: "115392786650442285987"
  // email_verified: true
  // iss: "https://accounts.google.com"
  // given_name: "jacob"
  // locale: "en"
  // nonce: "-4ALtgM87POQGy-g6U6XMyevZHWtwEldphG-KOpVyzs"
  // picture: "https://lh3.googleusercontent.com/a-/AAuE7mDHx68t8TS9dR75-6e7vX6FgvY6KMCWU62uSJm9bQ=s96-c"
  // aud: ["744179736100-cvb9lqs8mq6sr6s1k4s3mlmuaepv3u6i.apps.googleusercontent.com"]
  // azp: "744179736100-cvb9lqs8mq6sr6s1k4s3mlmuaepv3u6i.apps.googleusercontent.com"
  // name: "jacob duchen"
  // exp: "2020-02-26T11:01:13Z"
  // family_name: "duchen"
  // iat: "2020-02-26T10:01:13Z"
  // email: "duchenjacob@gmail.com"

//   {login: "fatcatdog", id: 25831976, node_id: "MDQ6VXNlcjI1ODMxOTc2", avatar_url: "https://avatars1.githubusercontent.com/u/25831976?v=4", gravatar_id: "", …}
// login: "fatcatdog"
// id: 25831976
// node_id: "MDQ6VXNlcjI1ODMxOTc2"
// avatar_url: "https://avatars1.githubusercontent.com/u/25831976?v=4"
// gravatar_id: ""
// url: "https://api.github.com/users/fatcatdog"
// html_url: "https://github.com/fatcatdog"
// followers_url: "https://api.github.com/users/fatcatdog/followers"
// following_url: "https://api.github.com/users/fatcatdog/following{/other_user}"
// gists_url: "https://api.github.com/users/fatcatdog/gists{/gist_id}"
// starred_url: "https://api.github.com/users/fatcatdog/starred{/owner}{/repo}"
// subscriptions_url: "https://api.github.com/users/fatcatdog/subscriptions"
// organizations_url: "https://api.github.com/users/fatcatdog/orgs"
// repos_url: "https://api.github.com/users/fatcatdog/repos"
// events_url: "https://api.github.com/users/fatcatdog/events{/privacy}"
// received_events_url: "https://api.github.com/users/fatcatdog/received_events"
// type: "User"
// site_admin: false
// name: "fatcatdog"
// company: null
// blog: ""
// location: null
// email: null
// hireable: null
// bio: "@jakeduchen"
// public_repos: 97
// public_gists: 0
// followers: 9
// following: 15
// created_at: "2017-02-16T23:02:56Z"
// updated_at: "2020-02-26T09:57:47Z"
// private_gists: 0
// total_private_repos: 0
// owned_private_repos: 0
// disk_usage: 457825
// collaborators: 0
// two_factor_authentication: false

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

  function AuthenticatedUserView(user) {
    let dummyUserOject = {login : "Error parsing JSON"};
    let newVar
    try {
       newVar = JSON.parse(user.user);
       console.log(newVar)
    } catch(e) {
       return UnauthenticatedUserView();
    }
    // console.log(newVar)
    // console.log(newVar.login)
    // let user = user;
    if(newVar.login !== undefined){
      return (
        <div className="mainClass">
            <Header />
            <h1>Home</h1>
            <h2>Home</h2>
            <br />
              <button onClick={() => logout()}>Logout from {newVar.login}</button>
            <br />
          </div>
      );
    } else if(newVar.given_name !== undefined){
      return (
        <div className="mainClass">
            <Header />
            <h1>Home</h1>
            <h2>Home</h2>
            <br />
              <button onClick={() => logout()}>Logout from {newVar.given_name}</button>
            <br />
          </div>
      );
    } else {
      return (
        <div className="mainClass">
            <Header />
            <h1>Home</h1>
            <h2>Home</h2>
            <br />
              <button onClick={() => logout()}>Logout</button>
            <br />
          </div>
      );
    }
  }

  function UnauthenticatedUserView() {
    return (
        <div className="mainClass">
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
    return <AuthenticatedUserView user={user} />;
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
