import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = ({ user: { login, avatar_url, html_url } }) => {

    /* Here we are taking out these props from props.user but we are destructuring here.
    Hence we are taking out user from props and then login,avatar_url,etc from user.

    ...............................................................

    Taking out of these props from user(props.user) we can also do just (props) but for clean code we are doing this.*/

    // const { login, avatar_url, html_url } = props.user;

    return (<div className='card text-center'>
        <img src={avatar_url} alt=""
            className='round-img' style={{ width: '60px' }} />

        <h3>{login}</h3>
        <div>
            <Link to={`/users/${login}`} className='btn btn-dark btn-sm my-1'>More</Link>
        </div>
    </div>
    )

}

export default UserItem;