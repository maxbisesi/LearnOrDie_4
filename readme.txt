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


=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
TESTS
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

Home tab:
----------
(*) - Categories 
() - Rank
() - Settings
(*) - DELETE ALL CARDS IN Category
() - Super-categories

Test tab:
----------
(*) - randomize questions
(*) - Next
(*) - Show
(*) - Review
(*) - Update
(*) - switch tabs stay on same question
(*) - refresh don't log out
(*) - As guest and as user
(*) - Points
(*) - Review for guests 
() - Study random filter on
() - implement other point levels

Chum tab
----------
(*) - Add cards as user
(*) - Add cards as guest and see them
(*) - Add cards as guest, register, then keep those cards.
(*) - Add cards as guest, login as existing user, then keep those cards
(*) - Increase font size
() - Chum animation
(*) - Quesiton count in session
() - Make Category a combo box.

Login tab
---------
(*) - Login
(*) - profile
(*) - register
(*) - Encrypt pw
(*) - tokens

Ranks
=========
() - badge graphics
(*) = Rank up modal
() - badges

GALLEY
---------
(*) - cancel button on cardset modal
(*) - Study a set 
() - Delete a set does not delete the cards 
(*) - Delete card
() - Share
() - Search
(*) - DEFECT = Moving to next page de selects question
() - Fix up confirm boxes with Custom dialogs or dailog library
() - randomize study set
(*) - Unstudy a set
(*) - in Galley, indicate when a Set is being studied

Utils
------
() - test cases for bs and rank.

 () - Category size inaccurate 

 () - Randomization algorithm throws off 'Next' sequence because there is a chance the 
      next random index is the same as the current index, in which case there would be no update.
      The smaller the size of the filtered cards the greater chance of this happening.
(*) - With new persistance feature, token is not created becuase it is only created in login method.
      So all future requests will fail after persisting. WAS happening when server restarts.

Collections and Categories
--------------------------
- Not every category has to be in a collection.
- Collections can be empty.
- Collection is a nullable field on FlashCard
- If you add a collection and then never a category to it, it won't be saved.

Images
--------
() - Can add them through chum, only predefined images though. Guest users too.
() - Can see them on question through test.


Profiles
-------------
  Settings
  () - Modules to add: Math Module
  () - Color Scheme
  () - Avatar

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

  Test Cases
  ===========
  () - Can chum card as guest or user. Guest cards save in store, User cards go to DB and Store
  () - All selenium tests need to also be done for guests

  () - The category must be one of the following... need to exclude a category after a positive test,
    otherwise you get false positives.

  () - Move api tests to Jest

  Defects:
  =============
  () - points animation plays when updating
  () - something weird with math module, using unicode in answer
  (*) - reset auto inc ids after tests, to not greatly throw off id numbers.
  (*) - Usersession saving
  (*) - POINTS
  () - CAN STILL USE KEYBOARD without logging in 
  () - User logs in as guest
  () - Harpoonist badge
  () - key in galley questions
  () - Make sure they know when they are deleting the last cards from a Set
  () - user with no cards, error in galley
  () - re dump DB before sending to production. 
  () - Rating undefined, Id not updating in Test tab
  (*) - Filter without selecting categories causes error
  (*) - Maintain sessions redux-persist.
  () - When renaming categories, all categories are displayed outside of collections.
  () - using Pi in answer copys the question above where pi was used..
  () - adding a question of an existing category does not update categories in Home tab

  Edge Cases:
  =============
  () - What happens if you filter by a category then delete that category ? 
  
      Not a problem. The card gets deleted in 
      the DB, but it stays in memory, it just gets a new property
      that says 'DELETED'
      
  () - What happens if you delete a card by card_id that doesn't exist in the DB ? :
       router.post('/deleteCards', async (req,res) => {
        const ids = req.body.cardids;
        logger(`...      Deleting cards: ${ids}`);
        let delTestCard;
        for(let i = 0; i < ids.length; i++) {
          delTestCard = await dataDAO.runQuery(`DELETE FROM FlashCards WHERE card_id = ?`,[ids[i]]);
          if(delTestCard.affectedRows === 1) {
            logger(`  ... deleted card_id: ${ids[i]}`);
          } else { 
            // Not always the case what if they delete a card that doesn't exist in the DB ? 
            logger(`...   /deleteCards, Error deleting: ${ids}`);
            res.status(500).send('Internal Server Error');
          }
        }
        res.status(200).send('OK'); 
      });


    New Features Needed
    --------------------
    () - Animations
    () - Logger
    () - Sessions  
    () - Key listeners
    () - Backups to Azure.
    () - Logout !
    () - Notes
    () - track changes by users, git style
    () - Give option to access general categories when registering
    () - Newly added categories to collections don't show up when filtering
    () - Move Categories out of collections. 
    () - filter categories from collections 
    () - Shark graphic on loading screen.
    () - Back to login button on registration





