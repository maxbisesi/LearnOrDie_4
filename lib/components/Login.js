import React from 'react';
import axios from 'axios';
//import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Main from './Main';
import './HomeScreenCustomSheet.css';
import { loginAction, setCards } from '../actions';
import store from './store';
import { connect } from "react-redux";
import Profile from "./Profile"

class Login extends React.Component {
  constructor(props) {
    // always
    super(props);
    this.state = {username: '', password: '', loginFailed: true};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goToQuestionPage = this.goToQuestionPage.bind(this);
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
        // go back to question page as valid user
        //console.log(`login response: ${JSON.stringify(loginResponse)}`);
        this.props.setCards(loginResponse.data.cards);
        this.props.login(loginResponse.data.loggedInUser);
        this.props.login();
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

  goToQuestionPage() {
    ReactDOM.render(<Main />, document.getElementById('root'));
  }

  render() {
    return (
      <>
        <h1>Brave the treachorous Waters..</h1>
        <div className="centerLoginScreen">
          <form onSubmit={this.handleSubmit}>
            <p>
              username:{' '}
              <input
                type="text"
                name="user"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </p>
            <p>
              password:{' '}
              <input
                type="password"
                name="pass"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </p>

            <input type="submit" value="Submit" id="loginbutton" className="" />
          </form>
          <div hidden={this.state.loginFailed}>Invalid login data try again.</div>
        </div>
        <p id="lod">...then Learn or Die.</p>
      </>
    ) : <Profile />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(loginAction(user)),
    setCards: (cards) => dispatch(setCards(cards))
  };
};

export default connect(null,mapDispatchToProps)(Login);
