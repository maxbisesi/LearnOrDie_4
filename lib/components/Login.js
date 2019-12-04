import React from 'react';

class Login extends React.Component {
    constructor(props) {
        // always
        super(props);
        this.state = {username: '', password: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // Run after the comp output renders to the DOM
    }

    componentDidmount() {
        
    }

    handleChange(event) {
        if(event.target.name === 'username'){ this.setState({username: event.target.value}); }
        else if( event.target.name === 'password'){ this.setState({password: event.target.value}); }
    }

    async handleSubmit (e) {
        event.preventDefault();
        // axios call
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

export default Login;