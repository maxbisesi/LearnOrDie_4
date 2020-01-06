import store from '../store';
store.subscribe(update);

function update() {
    let currentState;
    const nextState = store.getState();
    console.log(`initial state: ${nextState}`);
    if(nextState !== currentState) {
        currentState = nextState;
        console.log(currentState.user.firstName);
    }
}
    

