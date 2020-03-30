import store from '../../redux/store';
import { NINJA_SIZE, WORLD_SIZE } from '../../config';
import { changePlayerPosition } from './gameSlice';

export function handlePlayerMovement(player) {

    function handleKeyDown(e){
        e.preventDefault();
        switch(e.keyCode) {
            case 38: attemptMovement('NORTH'); break;
            case 39: attemptMovement('EAST'); break;
            case 40: attemptMovement('SOUTH'); break;
            case 37: attemptMovement('WEST'); break;
            default:
                console.log(e.keyCode);
        }
    }

    function attemptMovement(direction) {
        const oldPos = store.getState().gameSlice.playerPosition;
        const newPos = getNewPosition(direction,oldPos);

        if(observeBoundaries(newPos, oldPos)) {
            dispatchMove(newPos,direction);
        } else {
            console.log('cant move');
        }

    }

    function getNewPosition(direction,oldPos){ 
        let newPos;
        switch(direction) {
            case 'NORTH': newPos = [oldPos[0], oldPos[1] - NINJA_SIZE.height]; break;
            case 'EAST': newPos = [oldPos[0] + NINJA_SIZE.width, oldPos[1]]; break;
            case 'SOUTH': newPos = [oldPos[0], oldPos[1] + NINJA_SIZE.height]; break;
            case 'WEST': newPos = [oldPos[0] - NINJA_SIZE.width, oldPos[1]]; break;
        }
        return newPos;
    }
 
    function observeBoundaries(newPos, oldPos) {
        return ( newPos[0] >= 0 && newPos[0] <= WORLD_SIZE.width - NINJA_SIZE.width) &&
                ( newPos[1] >= 0 && newPos[1] <= WORLD_SIZE.height - NINJA_SIZE.height);
               // ? newPos : oldPos;
    }

    function getSpriteLocation(direction, walkIndex) {
        switch(direction) {
            case 'NORTH': return '0px 0px'; 
            case 'EAST':  return getNinjaEastWalk(walkIndex);
            case 'SOUTH':  return '0px 0px';
            case 'WEST': return getNinjaLeftWalk(walkIndex); 
        }
        
    }

    function getNinjaLeftWalk(walkIndex) {
        /*switch(walkIndex) {
            case 0: return `${NINJA_SIZE.width * 0}px ${NINJA_SIZE.height * 0}px`;
            case 1: return `${NINJA_SIZE.width * .9}px ${NINJA_SIZE.height * 0}px`;
            case 2: return `${NINJA_SIZE.width * 2}px ${NINJA_SIZE.height * 0}px`;
            case 3: return `${NINJA_SIZE.width * 3}px ${NINJA_SIZE.height * 0}px`;
        }*/
        return '0px 0px';
    }

    function getNinjaEastWalk(walkIndex) {
        switch(walkIndex) {
            case 0: return `${NINJA_SIZE.width * 0}px ${NINJA_SIZE.height * 0}px`;
            case 1: return `${NINJA_SIZE.width * 2}px ${NINJA_SIZE.height * 0}px`;
            case 2: return `${NINJA_SIZE.width * 4}px ${NINJA_SIZE.height * 0}px`;
            case 3: return `${NINJA_SIZE.width * 0}px ${NINJA_SIZE.height * 1}px`;
            case 4: return `${NINJA_SIZE.width * 1}px ${NINJA_SIZE.height * 1}px`;
            case 5: return `${NINJA_SIZE.width * 3}px ${NINJA_SIZE.height * 1}px`;
            case 6: return `${NINJA_SIZE.width * 0}px ${NINJA_SIZE.height * 2}px`;
            case 7: return `${NINJA_SIZE.width * 2}px ${NINJA_SIZE.height * 2}px`;
            case 8: return `${NINJA_SIZE.width * 4}px ${NINJA_SIZE.height * 2}px`;
            case 9: return `${NINJA_SIZE.width * 1}px ${NINJA_SIZE.height * 3}px`;
        }    
    } 

    function observeObstacle(newPos, oldPos) {
        const tiles = store.getState().gameSlice.tiles;
        //const y = newPos[1] / NINJA_SIZE.width;
        //const x = newPos[0] / NINJA_SIZE.height;
        console.log(`next y ${newPos[1]} next x ${newPos[0]}`);
        console.log(`y: ${y}, x: ${x}`);
        const nextTile = tiles[x][y];
        console.log(` nextTile: ${nextTile}`);
        return nextTile < 5;
    }

    function dispatchMove(newPos, direction) {
        const walkIndex = getWalkIndex();
        const sprLoc = getSpriteLocation(direction, walkIndex);
        const payload = {'playerPosition':newPos, 'direction':direction, 'spriteLocation':sprLoc, 'walkIndex':walkIndex };
        store.dispatch(changePlayerPosition(payload));
    }
  
    function getWalkIndex() {
        const walkIndex = store.getState().gameSlice.walkIndex;
        return walkIndex >= 9 ? 0 : walkIndex + 1;
    }

    window.addEventListener('keydown', (e) => {
        handleKeyDown(e);
    });

    return player;
}