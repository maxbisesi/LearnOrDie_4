// base Class for different Ranking strategies
// Every rank will have their own pointing system, 

export class RankObserver {
    constructor(userrank){
        this.currentRank = userrank;
    }

    notify(){ 
        // called when redux state changes
    
    }
    
}

