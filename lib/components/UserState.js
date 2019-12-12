class UserState {
    constructor(){
        this.guest = true;
    }

    async login(un,pw) {
        //event.preventDefault();
        try {
            let un = this.state.username;
            let pw = this.state.password;
    
            const loginResponse = await axios.post('/login', { user: un, pass: pw });
    
            if (loginResponse.status === 200) {
                // they're logged in set the user in the context and go back to the question page
                console.log(`server responded!`);
                //this.props.changeUser(loginResponse);
                //this.goToQuestionPage();
                // If the user succesfully logs in then they are no longer a guest otherwise treat them as guest.
                this.guest = false;
                return true;
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
}
export default UserState;