import logger from './Logger';
// checkRankUp takes the user object
// then returns the new rank, it's up to the client to determine
// if the new rank is different from the old one. 
export function checkRankUp(currentRank, currentPoints, badges ) {
    // Algorithm that determines if rise in rank is in order
    switch(currentRank) {
      case `Recruit`: 
        // To become BB
        if(currentPoints > 5000) { return 'BucketBrigade'; }
        return 'Recruit';
      case `BucketBrigade`:
        // To Become Harpoonist
        if(currentPoints > 8000 && badges >= 2) { return 'Harpoonist'; }
        return 'BucketBrigade';
      case `Harpoonist`: 
        // To become FreeDiver
        if(currentPoints > 13000 && badges >= 5) { return 'FreeDiver'; }
        return 'Harpoonist';
      case `FreeDiver`: 
        // to become CageMaster
        if( currentPoints > 18000 && badges >= 10 ) { return 'CageMaster'; }
        return 'FreeDiver'
      case `CageMaster`: 
        // To become Bitten
        if ( currentPoints > 20000 && badges >= 20) { return 'TheBitten'; }
        return 'CageMaster';
      case `TheBitten`: 
        // To become Bitten
        if ( currentPoints > 30000 && badges >= 30) { return 'GreatWhite'; }
        return 'TheBitten';
      case `GreatWhite`: 
        throw new Error('Utils: checkRankUp -> GreatWhite not yet implemented.');
        // What do you do here ? 
      case `Guest`: return 'Guest';
      default: throw new Error(`Utils: checkRankUp -> unknown rank: ${currentRank}`);
    }
  
  }

  export function tempId() {
    const nums = [0,1,2,3,4,5,6,7,8,9];
    const letters = ['A','B','C','D','E','F','G','H','I','J'];
    // rand is 0 inclusive. 
    let id = '';
    
    for(let i = 0; i<15; i++) {
      const rand = Math.floor(Math.random()*10);
      const ev = Math.floor(Math.random()*4) + 1;
      const dig = ev % 2 === 0 ? nums[rand] : letters[rand];
      id += dig;
    }

    logger(`Utils: temp Id -> ${id}`);
    return id;
  }

  export function binarySearch(arr, l, r, i) {
    let mid = Math.floor(l + (r - l) / 2);
    console.log(`left-${l} right-${r} mid${mid}`);

    if(r > 1 && l < r) {
        if (arr[mid] === i) {
            console.log(`match ${arr[mid]} === ${i}`);
            return mid;
        }

        if (arr[mid] > i) {
            return binarySearch(arr, l, mid - 1, i); 
        } 

        return binarySearch(arr,mid + 1, r, i);
    }

    console.log(' Not found ');
    return -1;
  }