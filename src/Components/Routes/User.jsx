import React, { Fragment, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Repos from '../../repos/Repos';
import GitHubContext from '../../context/github/githubContext';

const User = ({ match }) => {

    const { getUser, user, loading, getUserRepos, repos } = useContext(GitHubContext);

    useEffect(() => {

        getUser(match.params.login); //getparams

        getUserRepos(match.params.login)
    }, [])

    const {
        name,
        hireable,
        location,
        followers,
        login,
        following,
        public_repos,
        public_gists,
        html_url,
        blog,
        bio,
        company,
        avatar_url
    } = user;

    if (loading) return <Spinner />;

    return (
        <Fragment>
            <Link to='/' className='btn btn-light'>Back to Search</Link>
            Hireable: {' '}
            {hireable ? <i className='fas fa-check text-success' /> : <i className='fas fa-times-circle text-danger' />}

            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} alt="avatar" className="round-img" style={{ width: '150px' }} />
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div>
                    {bio && <Fragment>
                        <h3>Bio</h3>
                        <p>{bio}</p>
                    </Fragment>}
                    <a className='btn btn-dark my-1' href=
                        {html_url}>Visit GitHub Profile</a>
                    <ul>
                        <li>{login && <Fragment>
                            <strong>Username: {login}</strong>
                        </Fragment>}</li>
                        <li>{login && <Fragment>
                            <strong>Company: {company}</strong>
                        </Fragment>}</li>
                        <li>{login && <Fragment>
                            <strong>Website: {blog}</strong>
                        </Fragment>}</li>
                    </ul>
                </div>

            </div>

            <div className="card text-center">
                <div className="badge badge-primary">Followers: {followers}</div>
                <div className="badge badge-success">Following: {following}</div>
                <div className="badge badge-secondary">Public Repos: {public_repos}</div>
                <div className="badge badge-dark">Public Gists: {public_gists}</div>
            </div>
            <Repos repos={repos} />
        </Fragment>
    )
}

export default User;
