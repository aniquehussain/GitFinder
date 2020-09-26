import React from 'react';
import './App.css';
import Navbar from './Components/layout/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './Components/Routes/About';
import Alert from './Components/layout/Alert';
import User from './Components/Routes/User';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import Home from './Components/Routes/Home';
import NotFound from './Components/layout/NotFound';

const App = () => {

  // useEffect(() => {
  //   setLoading(true);
  //   const userList = async () => {
  //     let gotUser = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //     gotUser = await gotUser.data;
  //     console.log(gotUser);//this is the list of users
  //     setUsers(gotUser);
  //     setLoading(false);
  //   }
  //   userList();
  // }, [])



  return (
    <GithubState>
      <AlertState>

        <Router>
          <div>

            <Navbar />
            <div className='container'>
              <Alert />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/users/:login" component={User} />
                <Route exact path="/about" component={About} />
                <Route component={NotFound} />
              </Switch>

            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  )
}

export default App;
