import React from 'react';
import { addUser } from '../../tools/redux/user/user.action';
import { useAppContext } from '../../tools/redux/app.provider';

function User() {
    const { state, dispatch } = useAppContext();
    const { users } = state;

    console.log("User.jsx -> 7: users", users  )
    return (
        <div>
            <div>
                {users.map((user, i) => (<p key={user.id}>{user.name}</p>))}
            </div>
            <button onClick={() => { dispatch(addUser("User name")) }}>Add USER</button>

        </div>
    );
}

export default User;
