import React from 'react';

const Card = props => {
    const {friend} = props;
    return (
        <div className='friendsCard'>
            <div className='friends'>
               <h3>{friend.name}</h3>
               <div className='friendPicture'>
                    <img src={friend.picture} alt='Friend Picture' />
               </div>
            <div className='friendInfo'>
                 <p>Age: {friend.age} </p>
               <p>Email: {friend.email}</p>
            </div>
        <button id={friend.id} onClick={e => props.handleDelete(e)}>Delete Friend</button>
            </div> 
        </div>
    )
}

export default Card;