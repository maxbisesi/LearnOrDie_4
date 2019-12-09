import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class Login extends React.Component {
    constructor(props, context) {
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
            
        } catch (e) {
            console.log('ERROR : ' + e);
        }
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

Login.contextTypes = { user: PropTypes.object };
export default Login;