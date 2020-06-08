import React from 'react';
import {Link} from 'react-router-dom';

const HomePage = props => {
  return (
    <>
      <nav>
        <h1>Goku's Friends</h1>
        <div className='links'>
           <Link to='protected'>Friends List</Link>
          {props.loggedState ? <a onClick={() => props.logOut()} href='/'>Log Out</a> : <Link to='/protected'>Login</Link>}
        </div>
      </nav>
     <div className='home'>
    </div>
    </>
  )
}

export default HomePage;