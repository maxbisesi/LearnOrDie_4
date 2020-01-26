import express from 'express';
import config from './config';
// import serverRender from './renderers/serverRender';
import mime from 'mime';
//import cors from 'cors';
import morgan from 'morgan';
import { extname } from 'path';
import chalk from 'chalk';
import Data from './DataApi';

const app = express();
const router = express.Router();
const dataApi = new Data();
/*
What a server response looks like --- >

{data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
config:
adapter: ƒ xhrAdapter(config)
data: "{"user":"max","pass":"pass"}"
headers: {Accept: "application/json, text/plain, ", Content-Type: "application/json;charset=utf-8"}
maxContentLength: -1
method: "post"
timeout: 0
transformRequest: [ƒ]
transformResponse: [ƒ]
url: "/login"
validateStatus: ƒ validateStatus(status)
xsrfCookieName: "XSRF-TOKEN"
xsrfHeaderName: "X-XSRF-TOKEN"
__proto__: Object
data:
name: "Max Bisesi"
password: "pass"
username: "max"
__proto__: Object
headers:
connection: "keep-alive"
content-length: "56"
content-type: "application/json; charset=utf-8"
date: "Wed, 11 Dec 2019 19:21:39 GMT"
etag: "W/"38-RYojwT5JM+xHalw11Yd6MAOESgc""
x-powered-by: "Express"
__proto__: Object
request: XMLHttpRequest {readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
status: 200
statusText: "OK"
__proto__: Object


*/
app.use(morgan('combined'));
app.set('view engine', 'ejs');

// Middleware for every reqest that comes in
router.use(express.json());
router.use((req, res, next) => {
  console.log(chalk.blue('%s %s %s', req.method, req.url, req.path));
  next();
});

router.use(express.static('public'));

router.get('/', async (req, res) => {
  // const initialContent = await serverRender();
  res.render('main');
});

router.post('/updateDB', (req, res) => {
  const state = req.body.data;
  // console.log(`UPDATE DB ${chalk.blue.bgYellow(JSON.stringify(req.body.data))}`);
  /*
    loggedIn: false,
    user : {
        user_id: '0',
        userName: 'guest_user',
        firstName: 'GUEST',
        lastName: 'GUEST',
        email: 'guestEmail',
        totalPoints: 0,
        cardCount: 0,
        rank: 'GUEST',
        guest: true
    },
    categoryNames: {},
    index: 0,
    cards: [
        {cardid:'id1',answer: 'card1',card:'Giving a node an onclick attribute has a similar effect. This works for most types of events—you can attach a handler through the attribute whose name is the event name with on in front of it.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id2',answer: 'card1',card:'Each browser event handler is registered in a context. In the previous example we called addEventListener on the window object to register a handler for the whole window. Such a method can also be found on DOM elements and some other types of objects. Event listeners are called only when the event happens in the context of the object they are registered on.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id3',answer: 'card1',card:'Each browser event handler is registered in a context. In the previous example we called addEventListener on the window object to register a handler for the whole window. Such a method can also be found on DOM elements and some other types of objects. Event listeners are called only when the event happens in the context of the object they are registered on.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id4',answer: 'card1',card:'he window binding refers to a built-in object provided by the browser. It represents the browser window that contains the document. Calling its addEventListener method registers the second argument to be called whenever the event described by its first argument occurs.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id5',answer: 'card1',card:'he window binding refers to a built-in object provided by the browser. It represents the browser window that contains the document. Calling its addEventListener method registers the second argument to be called whenever the event described by its first argument occurs.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id6',answer: 'card1',card:'he window binding refers to a built-in object provided by the browser. It represents the browser window that contains the document. Calling its addEventListener method registers the second argument to be called whenever the event described by its first argument occurs.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id7',answer: 'card1',card:'2Some primitive machines do handle input like that. A step up from this would be for the hardware or operating system to notice the keypress and put it in a queue. A program can then periodically check the queue for new events and react to what it finds there.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id8',answer: 'card1',card:'Giving a node an onclick attribute has a similar effect. This works for most types of events—you can attach a handler through the attribute whose name is the event name with on in front of it.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id9',answer: 'card1',card:'Each browser event handler is registered in a context. In the previous example we called addEventListener on the window object to register a handler for the whole window. Such a method can also be found on DOM elements and some other types of objects. Event listeners are called only when the event happens in the context of the object they are registered on.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id10',answer: 'card1',card:'Each browser event handler is registered in a context. In the previous example we called addEventListener on the window object to register a handler for the whole window. Such a method can also be found on DOM elements and some other types of objects. Event listeners are called only when the event happens in the context of the object they are registered on.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id11',answer: 'card1',card:'he window binding refers to a built-in object provided by the browser. It represents the browser window that contains the document. Calling its addEventListener method registers the second argument to be called whenever the event described by its first argument occurs.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id12',answer: 'card1',card:'he window binding refers to a built-in object provided by the browser. It represents the browser window that contains the document. Calling its addEventListener method registers the second argument to be called whenever the event described by its first argument occurs.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id13',answer: 'card1',card:'he window binding refers to a built-in object provided by the browser. It represents the browser window that contains the document. Calling its addEventListener method registers the second argument to be called whenever the event described by its first argument occurs.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
        {cardid:'id14',answer: 'card1',card:'2Some primitive machines do handle input like that. A step up from this would be for the hardware or operating system to notice the keypress and put it in a queue. A program can then periodically check the queue for new events and react to what it finds there.',category:'cat2',times_right:0,times_wrong:0,owner_id:0,fk_user_id:0}
    ],
    currentCard:  {cardid: 'STARTERCARD', card:"Welcome to LearnOrDie,\nGet Ready to Sink or Swim or be eaten alive,\nIf this is your first time it's going to be rough,\nGood Luck! Click either button to get started.", answer: "", category: "",times_right:0,times_wrong:0,owner_id:0,fk_user_id:0},
    session: {points: 0, streak: 0, rut: 0, streakClass:'', nailed:0, whiffed:0},
    history: {total:0, times_right:0, times_wrong:0},
    reviews: [],
    //add this to the DB
    profile: {experience: 'guest'} */
    // If the user is a guest, do nothing.
    if(state.loggedIn === false) {
      // do nothing just return
      res.status(200).send('DB not updated, User is guest');
      return;
    }
    // Compare their cards in the DB to the cards in their state insert any new cards
    const userId = state.user.user_id;
    const cards = dataApi.getCardsForUser(userId);
});

router.post('/register', (req, res) => {
  /*let un = req.body.user;
  let pw = req.body.pass;
  console.log(`un = ${un}`);
  console.log(`pw = ${pw}`);
  res.send('it worked !'); */
});

router.post('/login', async (req, res) => {
  // check credentials and return yay or nay
  let un = req.body.user;
  let pw = req.body.pass;
  
  let user = await dataApi.checkCredentials(un, pw);

  if (user === 'Invalid password') {
    // 401 unauthorized
    res.sendStatus(401);
  }
  if (user === 'Not Found') {
    // 403 Forbidden
    res.sendStatus(403);
  }
  
  //this.props.login(loginResponse.data.user);
  // get id
  let id = user.user_id;
  let cardsResponse = await dataApi.getCardsForUser(id);
  console.log(chalk.magenta(`Response length from Data Api: ${cardsResponse.length}`));
  if(cardsResponse.length > 0) {
    console.log(chalk.redBright('...sending response')); 
    const body = {loggedInUser: user, cards: cardsResponse};
    res.status(200).type('application/json').send(body);
  }
  else{ throw new Error(`-- Login -- Couldn't get Cards from server  `);}
  

});

router.post('/getCards', async (req, res) => {
  let id = req.body.userid;
  // cards array
  let cards = await dataApi.getCardsForUser(id);
  console.log(chalk.magenta(`Response length from Data Api: ${cards.length}`));
  res.status(200).type('application/json').send(cards);
});

app.use('/', router);

app.listen(config.port, () => {
  console.log(`Running on port: ${config.port} ... b`);
});
