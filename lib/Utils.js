import logger from './Logger';
import uuid from 'uuid';
import { config } from './config';

class Utils {
  randomData = {
    words:['Sen', 'Bill','Cassidy','wanted','to','leave','no','doubt','about','his',
    'position','when','the','Freedom','from','Religion','Foundation','asked','him','to','stop',
    'putting','Bible','verses','on','his','official','Facebook','page.','Freedom','from','Religion',
    'Foundation','has','demanded','that','I','stop','sharing','BibleVerses','with','you','The','Left',
    `wont`,`bully`,`me`,`into`,`canceling`,`Christianity.`,`Their`,`request`,`is`,`denied`,`Cassidy`,`tweeted`,
    `Sept 1.`,`In`,`a`,`telephone`,`interview`,`Wednesday`,`with`,`TheEpochTimes`,`from`,`Louisiana,`,
    `ourconstitution`,`says`, `we`, `have`, `freedom`, `religion`, `NotFreedom`,
    `cancel`, `everybodyelses`,`Cassidy`,`pointedto`,`what`,`he`,`described`,`as`,
    `thecancelculture`,`as`,`anegativeinfluence`,`onthe`,`country’sdailypoliticaldiscourse.`,
    `“OnethingIthinkwehavegottocancelisthecancelculture`,`Cassidy`,`said`,`in`,`the`,`interview.`,
    `“Theidea`,`thatour`,`fellowAmericans`,`cannotlivefreely`,`becausesomebody`,`istriggeredbywhatever`,
    `TheLouisianaRepublican,`,`whoisamedicaldoctor,`,`wasrespondingto`,`an`,`Aug.14,2020,`,`letter`,`he`,
    `received`,`from`,`FFRF’s`,`copresidents,`,`DanBarker`,`and`,`AnnieLaurieGaylor.`],

    names:['John','Rick','Max','Fox','Rory','Iceman','Ben','Jackson','Franklin','Hamilton',
    'BIGDOG','BOII','Marcel','LaSeanabitch','Wilson','Mikey','Nicco','Jesus','Shorty','Mo','Nick','Thom',
    'Jess','Mckinlee','Tanner'],
  
    randomCard: '',
    randomAnswer: '',
    randomCategory:'',
    randomUsername:''
  };

  nums = [0,1,2,3,4,5,6,7,8,9];
  letters = ['A','B','C','D','E','F','G','H','I','J'];

  constructor() {
    this.randomData.randomUsername = this.getRandomUsername();
    this.randomData.randomCategory = this.getRandomCategory();
    logger(`Utils constructor. randomUsername: ${this.randomData.randomUsername}\n randomCategory: ${this.randomData.randomCategory}`);
  }

  // checkRankUp takes the user object
  // then returns the new rank, it's up to the client to determine
  // if the new rank is different from the old one. 
  checkRankUp(currentRank, currentPoints, badges ) {
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
          return 'FreeDiver';
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

    tempId() {
      // rand is 0 inclusive. 
      let id = '';
      
      for(let i = 0; i<15; i++) {
        const rand = Math.floor(Math.random()*10);
        const ev = Math.floor(Math.random()*4) + 1;
        const dig = ev % 2 === 0 ? this.nums[rand] : this.letters[rand];
        id += dig;
      }

      logger(`Utils: temp Id -> ${id}`);
      return id;
    }

    binarySearch(arr, l, r, i, log = false) {
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
              return this.binarySearch(arr, l, mid - 1, i); 
          } 
          if(log === true) { console.log(`arr[mid]=${arr[mid]} < i = ${i}`); }
          return this.binarySearch(arr,mid + 1, r, i);
      }

      console.log(`${i} not found`);
      return -1;
    }

   binarySearchForCardId(A,I) {
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

    processDatatable(rawtable) {
      // Turns data table into field=val object
      // Only works for datatables with two colums.
      const rows = rawtable['rawTable'];
      const data = new Map();

      rows.forEach( (row) => {
        if(row.includes('Field Name') && row.includes('Value')) {
          return;
        }

        let field = row[0];
        let val = row[1];

        // Fill in system values for val
        switch(val) {
          case `randomusername`: 
            val = this.randomData.randomUsername;
            break;
          case `randomcategory`:
            val = this.randomData.randomCategory;
            break;
          case `starterMessage`:
            val = config.startermessage;
            break;
          default: break;
        }

        // Fill in system values for field
        switch(field) {
          case `randomusername`: 
            field = this.randomData.randomUsername;
            break;
          case `randomcategory`:
            field = this.randomData.randomCategory;
            break;
          case `starterMessage`:
            field = config.startermessage;
            break;
          default: break;
        }

        data.set(field,val);
      }); 
      return data;
    }

    createCategoryId(name) {
      return name.replace(/\s/g,'').trim().toLowerCase();
    }

    getRandomUsername() {
      // rand is 0 inclusive. 
      let randouser = '';
      let randomnames = this.randomData.names.length;
      let randomwords = this.randomData.words.length;
      randouser += this.randomData.names[Math.floor(Math.random()*randomnames)];
      randouser += this.randomData.words[Math.floor(Math.random()*randomwords)];
      randouser += this.randomData.words[Math.floor(Math.random()*randomwords)];

      for(let i = 0; i<5; i++) {
        const num = Math.floor(Math.random()*10);
        randouser += num;
      }
      logger(`Utils: getRandomUsername(): ${randouser}`);
      return randouser; 
    }

    getRandomCategory() {
      let category = '';
      let letters = this.letters.length;
      for(let c = 0; c < 10; c++) {
        category += this.letters[Math.floor(Math.random()*letters)];
      }
      return category;
    }

} export default new Utils();