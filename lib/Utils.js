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
    `received`,`from`,`FFRF’s`,`copresidents,`,`DanBarker`,`and`,`AnnieLaurieGaylor.`,'a','ability','able','about','above',
    'accept','according','account','across','act','action','activity','actually','add','address','administration','admit','adult',
    'affect','after','again','against','age','agency','agent','ago','agree','agreement','ahead','air','all','allow','almost','alone',
    'along','already','also','although','always','American','among','amount','analysis','and','animal','another','answer','any',
    'anyone','anything','appear','apply','approach','area','argue','arm','around','arrive','art','article','artist','as','ask',
    'assume','at','attack','attention','attorney','audience','author','authority','available','avoid','away','baby','back','bad',
    'bag','ball','bank','bar','base','be','beat','beautiful','because','become','bed','before','begin','behavior','behind','believe',
    'benefit','best','better','between','beyond','big','bill','billion','bit','black','blood','blue','board','body','book','born',
    'both','box','boy','break','bring','brother','budget','build','building','business','but','buy','by','call','camera','campaign',
    'can','cancer','candidate','capital','car','card','care','career','carry','case','catch','cause','cell','center','central',
    'century','certain','certainly','chair','challenge','chance','change','character','charge','check','child','choice','choose',
    'church','citizen','city','civil','claim','class','clear','clearly','close','coach','cold','collection','college','color','come',
    'commercial','common','community','company','compare','computer','concern','condition','conference','Congress','consider',
    'consumer','contain','continue','control','cost','could','country','couple','course','court','cover','create','crime','cultural',
    'culture','cup','current','customer','cut','dark','data','daughter','day','dead','deal','death','debate','decade','decide',
    'decision','deep','defense','degree','Democrat','democratic','describe','design','despite','detail','determine','develop',
    'development','die','difference','different','difficult','dinner','direction','director','discover','discuss','discussion',
    'disease','do','doctor','dog','door','down','draw','dream','drive','drop','drug','during','each','early','east','easy','eat',
    'economic','economy','edge','education','effect','effort','eight','either','election','else','employee','end','energy','enjoy',
    'enough','enter','entire','environment','environmental','especially','establish','even','evening','event','ever','every',
    'everybody','everyone','everything','evidence','exactly','example','executive','exist','expect','experience','expert','explain',
    'eye','face','fact','factor','fail','fall','family','far','fast','father','fear','federal','feel','feeling','few','field',
    'fight','figure','fill','film','final','finally','financial','find','fine','finger','finish','fire','firm','first','fish',
    'five','floor','fly','focus','follow','food','foot','for','force','foreign','forget','form','former','forward','four',
    'free','friend','from','front','full','fund','future','game','garden','gas','general','generation','get','girl','give',
    'glass','go','goal','good','government','great','green','ground','group','grow','growth','guess','gun','guy','hair','half',
    'hand','hang','happen','happy','hard','have','he','head','health','hear','heart','heat','heavy','help','her','here','herself',
    'high','him','himself','his','history','hit','hold','home','hope','hospital','hot','hotel','hour','house','how','however',
    'huge','human','hundred','husband','I','idea','identify','if','image','imagine','impact','important','improve','in','include',
    'including','increase','indeed','indicate','individual','industry','information','inside','instead','institution','interest',
    'interesting','international','interview','into','investment','involve','issue','it','item','its','itself','job','join','just',
    'keep','key','kid','kill','kind','kitchen','know','knowledge','land','language','large','last','late','later','laugh','law',
    'lawyer','lay','lead','leader','learn','least','leave','left','leg','legal','less','let','letter','level','lie','life',
    'light','like','likely','line','list','listen','little','live','local','long','look','lose','loss','lot','love','low','machine',
    'magazine','main','maintain','major','majority','make','man','manage','management','manager','many','market','marriage',
    'material','matter','may','maybe','me','mean','measure','media','medical','meet','meeting','member','memory','mention',
    'message','method','middle','might','military','million','mind','minute','miss','mission','model','modern','moment','money',
    'month','more','morning','most','mother','mouth','move','movement','movie','Mr','Mrs','much','music','must','my','myself',
    'name','nation','national','natural','nature','near','nearly','necessary','need','network','never','new','news','newspaper',
    'next','nice','night','no','none','nor','north','not','note','nothing','notice','now','not',
    'number','occur','of','off','offer','office','officer','official','often','oh','oil','ok','old','on','once','one',
    'only','onto','open','operation','opportunity','option','or','order','organization','other','others','our','out','outside',
    'over','own','owner','page','pain','painting','paper','parent','part','participant','particular','particularly','partner',
    'party','pass','past','patient','pattern','pay','peace','people','per','perform','performance','perhaps','period','person',
    'personal','phone','physical','pick','picture','piece','place','plan','plant','play','player','PM','point','police','policy',
    'political','politics','poor','popular','population','position','positive','possible','power','practice','prepare','present',
    'president','pressure','pretty','prevent','price','private','probably','problem','process','produce','product','production',
    'professional','professor','program','project','property','protect','prove','provide','public','pull','purpose','push','put',
    'quality','question','quickly','quite','race','radio','raise','range','rate','rather','reach','read','ready','real','reality',
    'realize','really','reason','receive','recent','recently','recognize','record','red','reduce','reflect','region','relate','relationship',
    'religious','remain','remember','remove','report','represent','Republican','require','research','resource','respond','response',
    'responsibility','rest','result','return','reveal','rich','right','rise','risk','road','rock','role','room','rule','run','safe',
    'same','save','say','scene','school','science','scientist','score','sea','season','seat','second','section','security','see',
    'seek','seem','sell','send','senior','sense','series','serious','serve','service','set','seven','several','sex','sexual','shake',
    'share','she','shoot','short','shot','should','shoulder','show','side','sign','significant','similar','simple','simply','since',
    'sing','single','sister','sit','site','situation','six','size','skill','skin','small','smile','so','social','society','soldier',
    'some','somebody','someone','something','sometimes','son','song','soon','sort','sound','source','south','southern','space',
    'speak','special','specific','speech','spend','sport','spring','staff','stage','stand','standard','star','start','state',
    'statement','station','stay','step','still','stock','stop','store','story','strategy','street','strong','structure','student',
    'study','stuff','style','subject','success','successful','such','suddenly','suffer','suggest','summer','support','sure',
    'surface','system','table','take','talk','task','tax','teach','teacher','team','technology','television','tell','ten','tend',
    'term','test','than','thank','that','the','their','them','themselves','then','theory','there','these','they','thing','think',
    'third','this','those','though','thought','thousand','threat','three','through','throughout','throw','thus','time','to','today',
    'together','tonight','too','top','total','tough','toward','town','trade','traditional','training','travel','treat','treatment',
    'tree','trial','trip','trouble','true','truth','try','turn','TV','two','type','under','understand','unit','until','up','upon',
    'us','use','usually','value','various','very','victim','view','violence','visit','voice','vote','wait','walk','wall','want',
    'war','watch','water','way','we','weapon','wear','week','weight','well','west','western','what','whatever','when','where',
    'whether','which','while','white','who','whole','whom','whose','why','wide','wife','will','win','wind','window','wish',
    'with','within','without','woman','wonder','word','work','worker','world','worry','would','write','writer','wrong','yard',
    'yeah','year','yes','yet','you','young','your','yourself'],

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
    this.randomData.randomCategory = this.createRandomCategory();
    this.randomData.randomCard = this.createRandomCard();
    this.randomData.randomAnswer = this.createRandomAnswer();
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
          case `random:Card`:
            field = this.randomData.randomCard;
            break;
          case `random:Answer`:
            field = this.randomData.randomAnswer;
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

    createRandomCard() {

    }

    createRandomAnswer() {

    }

    createRandomCategory() {
      let category = '';
      let letters = this.letters.length;
      for(let c = 0; c < 10; c++) {
        category += this.letters[Math.floor(Math.random()*letters)];
      }
      return category;
    }

} export default new Utils();