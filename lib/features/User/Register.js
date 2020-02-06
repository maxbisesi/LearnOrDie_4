import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Main from '../Global/Main';
//import './registrationPageCustomSheet.css';

class Register extends React.Component {
  constructor() {
      super();
      this.state = {username: '', password: '', confirmpw: '', firstname: '', lastname: '', email: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateLogin(info) {
        
    }

    start() {
        ReactDOM.render(
            <Main />, document.getElementById('root')
        );
    }

    handleChange(event) {
        const target = event.target.name;
        const value = event.target.value;
        switch (target) {
            case 'username': this.setState({username: value}); return;
            case 'password': this.setState({password: value}); return;
            case 'confirmpw': this.setState({confirmpw: value}); return; 
            case 'firstname': this.setState({username: value});return;
            case 'lastname': this.setState({ username: value }); return;
            case 'email': this.setState({email: value}); return;
            default: throw new Error('invalid change target');
        }
    }
    
    async handleSubmit (event) {
        event.preventDefault();
        try {
            //const loginResponse = await axios.post('/login', { un: this.state.username, pw: this.state.password });
            
            let un = this.state.username;
            let pw = this.state.password;
            let confirm = this.state.confirmpw;
            let firstname = this.state.firstname;
            let lastname = this.state.lastname;
            let em = this.state.email; 
            
            if (this.validateLogin()) {
                const response = await axios.post('/register', { user: un, pass: pw });
                if (response.status === '200') {
                    // set user as logged 
                    this.start;
                }
            } else {
                // do something else 
            }
        } catch (e) {
            console.log('ERROR : ' + e);
        }
    }

  render() {
    return (
      <div className="registration">
        <p id="wa">Welcome Aboard.</p>
        <form
            className="centerRegistrationScreen"
            onSubmit={this.handleSubmit}
        >
          <p>
            <span id="loginfield">username:</span>{' '}
            <input type="text" name="username" value={this.state.username || ''} onChange={this.handleChange} />
          </p>
          <p>
            <span id="loginfield">password:</span>{' '}
            <input type="password" name="password" value={this.state.password || ''} onChange={this.handleChange} />
          </p>
          <p>
            <span id="loginfield">confirm:</span>{' '}
            <input type="password" name="confirmpw" value={this.state.confirmpw || ''} onChange={this.handleChange} />
          </p>
          <p>
            <span id="loginfield">First Name:</span>{' '}
            <input type="text" name="firstname" value={this.state.firstname || ''} onChange={this.handleChange} />
          </p>
          <p>
            <span id="loginfield">Last Name:</span>{' '}
            <input type="text" name="lastname" value={this.state.lastname || ''} onChange={this.handleChange} />
          </p>
          <p>
            <span id="loginfield">Email:</span>{' '}
            <input type="text" name="email" id="emailfield" value={this.state.emial || ''} onChange={this.handleChange} />
          </p>
          <p>
            <input type="submit" name="register" value="register"/>
          </p>
        </form>

        <div>
            <p style={{color:'red', fontSize: 20}}>
              Ooops! those passwords don't match. Try again
            </p>
            <p style={{color: 'red', fontSize: 20}}>
              That User already exists{' '}
            </p>
            <p style={{ color: 'crimson' }}>You didn't fill out a required field</p>
        </div>
      </div>
    );
  }
}

export default Register;
