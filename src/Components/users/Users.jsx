import React, { useContext } from 'react'
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import GithubContext from '../../context/github/githubContext';


const Users = () => {

    const githubContext = useContext(GithubContext);
    const { users, loading } = githubContext;

    if (loading) {
        return <Spinner />;
    } else {
        return (
            <div className="userDiv">
                {users.map((user) => {
                    return <UserItem key={user.id} user={user} />
                })}
            </div>
        );
    }
}

export default Users;
