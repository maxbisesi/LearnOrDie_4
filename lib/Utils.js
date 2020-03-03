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
      default: throw new Error('Utils: checkRankUp -> unknown rank');
    }
  
  }