import React, { useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { UserContext } from './UserContext';
import ReactDOM from 'react-dom';
import Main from './Main';

class Login extends React.Component {
    constructor(props) {
        // always
        super(props);
        this.state = {username: '', password: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if(event.target.name === 'username'){ this.setState({username: event.target.value}); }
        else if( event.target.name === 'password'){ this.setState({password: event.target.value}); }
    }

    async handleSubmit (event) {
        event.preventDefault();
        try {
            //const loginResponse = await axios.post('/login', { un: this.state.username, pw: this.state.password });
            let un = this.state.username;
            let pw = this.state.password;

            const loginResponse = await axios.post('/login', { user: un, pass: pw });
            if (loginResponse.status === 200) {
                // they're logged in set the user in the context and go back to the question page
                this.conext.username = loginResponse.username;
                this.context.name = loginResponse.name;
                this.goToQuestionPage();
            }  

            if (loginResponse.status === 401) {
                // wrong password
                //TODO Do something with context here
            }

            if (loginResponse.status === 403) {
                // username not found
                // TODO do something with context here
            }
        } catch (e) {
            console.log('ERROR : ' + e);
        }
    }

    goToQuestionPage() { 
        ReactDOM.render(
            <Main />, document.getElementById('root')
          ); 
    }

    render(){
        return (
        <>
            <p id='bttw'>Brave the Treacherous Waters...</p>
            <div className='centerLoginScreen'>
                <form onSubmit={this.handleSubmit}>
                    <p>username: <input name='username' type='text' value={this.state.username || ''} onChange={this.handleChange} /></p>
                    <p>password: <input name='password' type='password' value={this.state.password || ''} onChange={this.handleChange} /></p>
                    <input type='submit' value='Submit' id='loginbutton' className='' />
                </form>
                <a href='registrationPage.jsp'><button id='registerbutton' className=''>Register a new account</button></a>
            </div>
            <p id='lod'>...then Learn or Die.</p>
        </>
        );
    }
}

Login.contextTypes = UserContext;
export default Login;