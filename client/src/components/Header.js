import React from 'react';
import { Link } from 'react-router-dom';

function Header() {

  return(
    <div>
    <button><Link to="/">Home</Link></button>
    <br/>
    <button><Link to="/groups">Groups</Link></button>
    </div>
  )
}

export default Header;
