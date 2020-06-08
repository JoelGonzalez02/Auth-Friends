import React, {useContext} from 'react';
import {FriendsContext} from '../contexts/friendsContext';

const AddFriend = props => {

    const friends = useContext(FriendsContext);
    return (
        <div className='addFriendForm'>
            <form className='addFriend'>
                <input 
                    type='text'
                    placeholder='Name'
                    name='name'
                    onChange={props.handleChange}
                    value={friends.name}
                    />
                <input
                    type='number'
                    placeholder='Age'
                    name='age'
                    onChange={props.handleChange}
                    value={friends.age}
                    />
                <input
                    type='email'
                    placeholder='Email'
                    name='email'
                    onChange={props.handleChange}
                    value={friends.email}
                    />
                <button onClick={e => props.handleUpdate(e)}><p className='buttonText'>Add a Friend</p></button>
            </form>
        </div>
    )
}

export default AddFriend;