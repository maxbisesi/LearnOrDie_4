import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { UserContext } from './UserContext';
import ReactDOM from 'react-dom';
import Main from './Main';
import './HomeScreenCustomSheet.css';

class Login extends React.Component {
  constructor() {
    // always
    super();
    this.state = { username: '', password: '' };

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
    event.preventDefualt();
    if( this.props.login(this.state.username,this.state.password) ){ /*redirect*/ }
    else { /* show error messege */ }
  }

  goToQuestionPage() {
    ReactDOM.render(<Main />, document.getElementById('root'));
  }

  render() {
    return (
      <>
      <h1>Brave the treachorous Waters..</h1>
       <div className='centerLoginScreen'>
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
        </div>
        <p id='lod'>...then Learn or Die.</p>
      </>
    );
  }
}

Login.contextType = UserContext;
export default Login;
