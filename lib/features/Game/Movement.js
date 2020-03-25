import store from '../../redux/store'
import config from '../../config';

export function handlePlayerMovement(player) {

    function getNewPosition(direction){ 
        oldPos = store.getState().gameSlice.playerPosition;
        switch(direction) {
            case 'NORTH':break;
            case 'EAST':break;
            case 'SOUTH':break;
            case 'WEST':break;
        }
    }

    function dispatchMove(direction) {
        

    }

    function handleKeyDown(e){
        e.preventDefault();
        
        switch(e.keyCode) {
            case 38:dispatchMove('NORTH'); break;
            case 39: dispatchMove('EAST'); break;
            case 40: dispatchMove('SOUTH'); break;
            case 37: dispatchMove('WEST'); break;
            default:
                console.log(e.keyCode);
        }
    }

    window.addEventListener('keydown', (e) => {
        handleKeyDown(e);
    });

    return player;
}