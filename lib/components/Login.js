import React from 'react';
import axios from 'axios';
import './Styles/Login.css';
import { loginAction, setCards } from '../actions';
import { connect } from "react-redux";
import Profile from "./Profile";

class Login extends React.Component {

  constructor(props) {
    // always
    super(props);
    this.state = {username: '', password: '', loginFailed: true};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {

    if (event.target.name === 'user') {
      this.setState({ username: event.target.value });
    } else if (event.target.name === 'pass') {
      this.setState({ password: event.target.value });
    }

  }

  async handleSubmit(event) {

    event.preventDefault();
    const config = {
      validateStatus: function (status) {
        if(status === 200 || status === 401 || status === 403) { return true; }
        return false;
      }
    };

    let un = this.state.username;
    let pw = this.state.password;

    const loginResponse = await axios.post('/login', { user: un, pass: pw },config);

    if (loginResponse.status === 200) {
      // Get the cards and catgories for this user
      this.props.setCards(loginResponse.data.cards);
      this.props.login(loginResponse.data.loggedInUser);
    }

    if (loginResponse.status === 401) {
      // wrong password
      //TODO Do something with context here
    }

    if (loginResponse.status === 403) {
      // username not found
      // TODO do something with context here
      console.log('User not found');
      this.setState((state,props) => { return {username: '', password: '', loginFailed: false}; } );
      // Display something
    }
    
  }

  render() {

    return (
      <div>
      {this.props.loggedIn ? 
      (<Profile />) :
      (<div className="login-screen-background">
       <h1 className="login-screen-title">Brave the treachorous Waters..</h1>
        <div className=".login-screen-center">
          <form onSubmit={this.handleSubmit}>
            <p>
              username:{' '}
              <input
                type="text"
                name="user"
                value={this.state.username}
                onChange={this.handleChange}
                className="login-input"
              />
            </p>
            <p>
              password:{' '}
              <input
                type="password"
                name="pass"
                value={this.state.password}
                onChange={this.handleChange}
                className="login-input"
              />
            </p>

            <input type="submit" value="Login" id="loginbutton" className="login-loginbutton" />
          </form>
          <div hidden={this.state.loginFailed}>Invalid login data try again.</div>
        </div>
        <p className="login-screen-subtitle">...then Learn or Die.</p>
        </div>)}
        </div>
    );
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(loginAction(user)),
    setCards: (cards) => dispatch(setCards(cards))
  };
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
