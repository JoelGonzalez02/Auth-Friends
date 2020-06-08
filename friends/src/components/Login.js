import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import {Link} from 'react-router-dom';

const Login = props => {

    const initialState = [
      {
        username: '',
        password: ''
      }
    ]

    const [credentials, setCredentials] = useState(initialState)

    const handleChange = e => {
        setCredentials({
            ...credentials, [e.target.name] : e.target.value
        })
    }

    const login = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('/login', credentials)
            .then(res => {
                localStorage.setItem('token', res.data.payload)
                props.history.push('/protected')
            })
            .catch(err => {
                console.error('There was an error', err)
            })
            props.setLoggedState(true)
            localStorage.setItem('loggedState', true)
    }

    return (
        <>
 
        <nav>
        <h1>Goku's Friends</h1>
        
        <div className='links'>
           <Link to='protected'>Friends List</Link>
          {props.loggedState ? <a onClick={() => props.logOut()} href='/'>Log Out</a> : <Link to='/'>Home</Link>}
        </div>
      </nav>
        <div className='loginForm'>
            <form onSubmit={login}>
                <input
                    type='text'
                    placeholder='Username'
                    name='username'
                    value={credentials.username}
                    onChange={handleChange}
                    />
                <input  
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={credentials.password}
                    onChange={handleChange}
                    />
                <button>Log In</button>
            </form>
        </div>
        </>
    )
}

export default Login;