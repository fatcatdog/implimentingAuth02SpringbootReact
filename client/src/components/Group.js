import React, { useState, useEffect } from 'react';
import Header from './Header';

function Group(props) {

  useEffect(() => {
    // confirmAuthenticated();

    let newVar = props.location.state.ourId;
    console.log("newVar = " + newVar);
    // getGroupFromBackend(newVar);
  }, []);


  return(
    <div>
      <Header />
      <h1>Group</h1>
    </div>
  )
}

export default Group;
