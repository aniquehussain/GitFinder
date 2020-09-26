import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';


const Search = () => {

    const { searchUsers, clear, users } = useContext(GithubContext);
    const { setAlert } = useContext(AlertContext);

    const [text, setText] = useState("");

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        if (text === '') {
            setAlert("Please Enter Something", "light")
        } else {
            searchUsers(text);
            setText(" ");
        }

    }
    // const hasUsers = users.length > 0 ? true : false

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <input type="text" name="text" value={text} placeholder="Search Users..." onChange={handleChange} />
                <input className="btn btn-dark btn-block" type="submit" value="Search" />
            </form>
            {users.length > 0 && <button className="btn btn-light btn-block" onClick={clear}>Clear</button>}
        </div>

    )
}



export default Search;