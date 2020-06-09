import React, { useState, useEffect, useContext } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import AddFriend from './AddFriend';
import Card from './Card';
import {Link} from 'react-router-dom';
import {FriendsContext} from '../contexts/friendsContext';

const FriendsList = () => {

    const initialFormState = {
        id: Date.now(),
        name: '',
        age: '',
        email: '',
        picture: ''
    }

    const [friends, setFriends] = useState([]);
    const [friendsForm, setFriendsForm] = useState(initialFormState);
    
    const loggedState = useContext(FriendsContext);
    const logOut = useContext(FriendsContext);


    useEffect(() => {
        axiosWithAuth()
            .get('http://localhost:5000/api/friends')
            .then(res => {
                setFriends(res.data)
            })
            .catch(err => {
                console.error('There was an error', err)
            })
    }, [])

        const handleChange = e => {
            setFriendsForm({
                ...friendsForm, [e.target.name] : e.target.value
            })
        }

        const handleUpdate = e => {
            e.preventDefault();
            axiosWithAuth()
                .post(`http://localhost:5000/api/friends/`, friendsForm)
                .then(res => {
                    setFriends(res.data)
                    setFriendsForm(initialFormState);
                })
                .catch(err => {
                    console.error('There was an error', err)
                })
        }

        const handleDelete = e => {
            axiosWithAuth()
            .delete(`http://localhost:5000/api/friends/${e.target.id}`, e.target.id)
            .then(res => {
                setFriends(res.data)
            })
          }

        return (
                <>
                <FriendsContext.Provider value={friends}>
            <nav>
                    <h1>Goku's Friends</h1>
                <div className='links'>
                    <Link to ='/'>Home</Link>
                    {loggedState ? <a onClick={() => logOut()} href='/'>Log Out</a> : <Link to='/protected'>Login</Link>}
               </div>
            </nav>

                  <div className='friendText'>
                       <h3>Add a Friend!</h3>
                  </div>
                   
                  <div className='addFriend'>
                    <AddFriend handleUpdate={handleUpdate} handleChange={handleChange} friendsForm={friendsForm}/>
                  </div>

                  <div className='friendsCard'>
                    {friends.map((friend, index) => {
                        return (
                            <div className='friend' key={index}>
                                <Card friend={friend} handleDelete={handleDelete} />
                            </div>          
                    )
                  })}
                  </div>
                </FriendsContext.Provider>
               </>
        )
    }



export default FriendsList;