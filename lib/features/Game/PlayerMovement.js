import store from '../../redux/store';
import { NINJA_SIZE, WORLD_SIZE } from '../../config';
import { changePlayerPosition } from './gameSlice';

export function handlePlayerMovement(player) {

    function handleKeyDown(e){
        e.preventDefault();
        switch(e.keyCode) {
            case 38: dispatchMove('NORTH'); break;
            case 39: dispatchMove('EAST'); break;
            case 40: dispatchMove('SOUTH'); break;
            case 37: dispatchMove('WEST'); break;
            default:
                console.log(e.keyCode);
        }
    }

    function dispatchMove(direction) {
        const newPos = getNewPosition(direction);
        console.log(`new pos: ${newPos}`);
        const payload = {'playerPosition':newPos};
        store.dispatch(changePlayerPosition(payload));
    }

    function observeBoundaries(newPos, oldPos) {
        return ( newPos[0] >= 0 && newPos[0] <= WORLD_SIZE.width) &&
                ( newPos[1] >= 0 && newPos[1] <= WORLD_SIZE.height)
                ? newPos : oldPos;
    }

    function getNewPosition(direction){ 
        const oldPos = store.getState().gameSlice.playerPosition;
        let newPos;
        switch(direction) {
            case 'NORTH': newPos = [oldPos[0], oldPos[1] - NINJA_SIZE.height]; break;
            case 'EAST': newPos = [oldPos[0] + NINJA_SIZE.width, oldPos[1]]; break;
            case 'SOUTH': newPos = [oldPos[0], oldPos[1] + NINJA_SIZE.height]; break;
            case 'WEST': newPos = [oldPos[0] - NINJA_SIZE.width, oldPos[1]]; break;
        }

        return observeBoundaries(newPos,oldPos);
    }
  
    window.addEventListener('keydown', (e) => {
        handleKeyDown(e);
    });

    return player;
}