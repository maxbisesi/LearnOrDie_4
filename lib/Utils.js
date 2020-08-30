import logger from './Logger';
import uuid from 'uuid';

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

  export function binarySearch(arr, l, r, i, log = false) {
    // Assume array is already sorted...
    // MAKE SURE TO SORT ARRAY FIRST
    // 1) take 0 - 44 l = 0 r = 44 i = 36
    //    mid = 22 arr[22] == 22, 22<36
    // 2) take 23 - 44 l = (23) r= 44 i = 36
    //     mid = 
    let mid = Math.floor(l + (r - l) / 2);
    if(log === true) { console.log(`left=${l} right=${r} mid=${mid}`); }
    if(r > 1 && l < r) {
        if (arr[mid] === i) {
            console.log(`MATCH !! -  ${arr[mid]} === ${i}`);
            return mid;
        }
        if (arr[mid] > i) {
            if(log === true) { console.log(`arr[mid]=${arr[mid]} > i = ${i}`); }
            return binarySearch(arr, l, mid - 1, i); 
        } 
        if(log === true) { console.log(`arr[mid]=${arr[mid]} < i = ${i}`); }
        return binarySearch(arr,mid + 1, r, i);
    }

    console.log(`${i} not found`);
    return -1;
  }

  export function binarySearchForCardId(A,I) {
    // Assume it's sorted 
    // return the index
    /**
     *  L := 0
        R := n − 1
        while L ≤ R do
            m := floor((L + R) / 2)
            if A[m] < T then
                L := m + 1
            else if A[m] > T then
                R := m - 1
            else:
                return m
        return unsuccessful
     * 
     */
    let L = 0;
    let R = A.length;
    while(L <= R) {
      let m = Math.floor((L + R) / 2);
      if(A[m].card_id < I) {
        L = m + 1;
      } else if(A[m].card_id > I) {
        R = m - 1;
      } else {
        return m;
      }
    }
    return -1;
  }

  export function processDatatable(rawtable) {
    // Turns data table into field=val object
    const rows = rawtable['rawTable'];
    const data = {};
    logger(`Process data table, rows:  `);
    rows.forEach( (row) => {
      if(row.includes('Field Name') || row.includes('Value')) {
        return;
      }
      logger(` - ${row} --`);
      const field = row[0];
      const val = row[1];
      data[field] = val;
    }); 
    logger(`Data Object: ${JSON.stringify(data)}`);
    return data;
  }
