import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import AddFriend from './AddFriend';
import Card from './Card';
import {Link} from 'react-router-dom';
import {FriendsContext} from '../contexts/friendsContext';

const FriendsList = props => {

    const [friends, setFriends] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        axiosWithAuth()
            .get('http://localhost:5000/api/friends', JSON.stringify(localStorage.getItem('token')))
            .then(res => {
                setFriends(res.data)
            })
            .catch(err => {
                console.error('There was an error', err)
            })
    }, [])

        const handleChange = e => {
            setInput({
                ...input, id: Date.now(), [e.target.name] : e.target.value
            })
        }

        const handleUpdate = e => {
            e.preventDefault();
            axiosWithAuth()
                .post(`http://localhost:5000/api/friends/`, input)
                .then(res => {
                    setFriends(res.data)
                   
                })
                .catch(err => {
                    console.error('There was an error', err)
                })
                 setInput('');
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
                <Link to ='/'><p className='home'>Home</p></Link>
                <h3>Add a Friend!</h3>
                <div className='addFriend'>
                    <AddFriend handleUpdate={handleUpdate} handleChange={handleChange} friends={friends} />
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