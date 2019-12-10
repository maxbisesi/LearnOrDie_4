import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { UserContext } from './UserContext';
import ReactDOM from 'react-dom';
import Main from './Main';
import './HomeScreenCustomSheet.css';

class Login extends React.Component {
    constructor(context) {
        // always
        super();
        this.state = {username: '', password: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        console.log(context.name);
    }

    handleChange(event) {
        console.log(`handle Change Login component ${event.target.name}`);
        if(event.target.name === 'username'){ this.setState({username: event.target.value}); }
        else if( event.target.name === 'password'){ this.setState({password: event.target.value}); }
    }

    async handleSubmit (event) {
        event.preventDefault();
        this.context.changeUser();
        try {
            //const loginResponse = await axios.post('/login', { un: this.state.username, pw: this.state.password });
            let un = this.state.username;
            let pw = this.state.password;

            const loginResponse = await axios.post('/login', { user: un, pass: pw });

            if (loginResponse.status === 200) {
                // they're logged in set the user in the context and go back to the question page
                //this.conext.username = loginResponse.username;
                //this.context.name = loginResponse.name;
                console.log(`server responded!`);
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
                    <p>username: <input type='text' value={this.state.username || ''}  onChange={this.handleChange} /></p>
                    <p>password: <input type='password' value={this.state.password || ''}  onChange={this.handleChange} /></p>
                    <input type='submit' value='Submit' id='loginbutton' className='' />
                </form>
                <a href=''><button id='registerbutton' className=''>Register a new account</button></a>
            </div>
            <p id='lod'>...then Learn or Die.</p>
        </>
        );
    }
}

Login.contextType = UserContext;
export default Login;