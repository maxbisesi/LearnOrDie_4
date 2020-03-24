If the user is a guest render certain components in Main,
If they logged in render the logged in components in main,
User context to access the logged in user object or guest object.\
https://redux.js.org/faq/performance
https://stackoverflow.com/questions/34995822/how-to-get-best-practice-react-redux-nested-array-data?noredirect=1&lq=1
https://hackernoon.com/shape-your-redux-store-like-your-database-98faa4754fd5
https://stackoverflow.com/questions/39695768/mapstatetoprops-in-redux-app-nesting-state-within-state


var links = [
  { endpoint: '/america' },
  { endpoint: '/canada' },
  { endpoint: '/norway' },
  { endpoint: '/bahamas' }
];

class Navigation extends React.Component {
  render() {
    const listItems = links.map((link) =>
        <li key={link.endpoint}>{link.endpoint}</li> 
    );
    return (
      <div className="navigation">
        <ul>
          {listItems}
        </ul>
      </div>
    );
}

https://reactjs.org/docs/conditional-rendering.html
Jurome
Jurome

-rank up( algorithm on login )
  -- rank up pop up
    + popup color should vary according to new rank.
    + Redo: harpoonist, 
  -- badges
- define how weapons, avatar, character, and rank interact.
- weapons
-profile
  cutomize color scheme
  Or is this determined by birthstar and rank ? 
- create card sets
- badges
- unlockables (gaff)
-svgs

Can't calculate Rank based on points, if you miss a question you lose points so how would that affect rank ?
Maybe a badge can be given by acheiving a certain total points. But rank should be a more complex calculation. 
A combination of the ratio of total / whiffed, total points, study sessions registerd, card sets made & shared.  
Length of a streak, just get all that data to a method and then create an algorithm for it. 

Define ranking algorithm in a strategy pattern.

You can win badges in Chum or Galley but you can only rank up in Test.

Show rankup modal if they acheive a new rank when they log out or make sure it shows next time they log in.

Only care about their rank if theyre logged in, guests don't get no rank.

Will have to persist rank state for a user, to keep track of badges rank etc. 

First define the Ranks and badges ( Can't code without knowing what to code. ):
/ may need to be adjusted / 

Recruit = < 5000pts

to gain the following ranks you must meet their listed criteria:

BucketBrigade: 5000 points
Harpoonist: 8000 - 13000 and 2 badges
FreeDiver: 13000 - 15000 and 5 badges
CageMaster: 18000 - 20000 and 10 badges
TheBitten: 20000 and 20 badges
GreatWhite: 30000 and 25 badges

Only thing on the mind of a shark is eat.

An Avatar consists of 
-=-=-=-=-=-=-=-=-=-=-=-=-=-
 - Character
 - Weapon of choice
 - secondary weapon
 - Birth Star
 - Color Style
 -=-=-=-=-=-=-=-=-=-=-=-=-=-

Characters
===========
Fish wife


03/18
-------
 Url listeners to convert: 
- Convert save session from old reducers to new RTK, then use new DataDAO
- Update cards
  Cards need to have Id and ownerId throughout.
- get Cards

While testing you should be able to see new cards you just created and update them

Use thunks to keep DB in sync with store for users, for guests do the normal thing and 

only save their stuff if they REGISTER otherwise forget it.

Owner Id is now stored on the FlashCard, that way when you're updating you can 
make sure that only the cards owner can update.


  characters: [],
  availableWeapons: ['Ghaff','Anchor and Chain','Hook hand','Cannon','Axe','Harpoon gun'],
  availableSecondWeapons: ['Parrot','Club','Net'],
  availableBirthStars: ['Southern Moon','Black Sun','The Virgin','Golden Eyed Skull'],
  availableStyles: ['Rogue','Princely','Theive in the Night'],
  lockedCharacters: [],
  lockedPrimaryWeapons: [],
  lockedSecondWeapons: [],
  lockedBirthStars: [],
  bosses: []



