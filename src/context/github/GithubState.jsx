import React, { useReducer } from 'react';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import axios from 'axios';

import {
    GET_REPOS,
    GET_USER,
    GET_USERS,
    SET_LOADING,
    CLEAR_USERS
} from '../types';


const GithubState = props => {

    const initialState = {

        users: [],
        loading: false,
        user: {},
        repos: []

    }

    let githubClientId;
    let githubClientSecret;

    if (process.env.NODE_ENV !== 'production') {
        githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
        githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
    } else {
        githubClientId = process.env.GITHUB_CLIENT_ID;
        githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    //GET User
    const getUser = async (username) => {
        setLoading();
        let gotUser = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);


        dispatch({
            type: GET_USER,
            payload: gotUser.data
        });

    }


    //Search User
    const searchUsers = async (text) => {

        setLoading();
        let gotUser = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        console.log(gotUser.data.items);//this is the list of users
        gotUser = gotUser.data.items
        dispatch({
            type: GET_USERS,
            payload: gotUser
        })

    }
    //Get Repos
    const getUserRepos = async (username) => {

        setLoading();
        let gotUserRepos = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        dispatch({
            type: GET_REPOS,
            payload: gotUserRepos.data
        });

    }
    //SET loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    //Clear Users

    const clear = () => {
        dispatch({ type: CLEAR_USERS });
    }


    return (<GithubContext.Provider value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clear,
        getUser,
        getUserRepos
    }}>

        {props.children}
    </GithubContext.Provider>
    )
}

export default GithubState;