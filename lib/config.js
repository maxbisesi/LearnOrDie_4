export const config =  {
    port: process.env.PORT || 4242,
    host: process.env.HOST || 'localhost',
    bucketbrigade:'You\'ve done well so far. Clearly you can handle yourself in rocky waters. Welcome to the Bucket Brigade.',
    cagemaster: 'Our recruits can get a little nervous. We need your titanium nerve to strike courage in their hearts. Go, lead your men as the new Cage Master',
    freediver: `Few have what it takes to dive these black waters. 
                    God frowns on those hideous forgotten creatures lurking below, but you must now match them in their cruelty. 
                    Suit up and kiss your loved ones goodbye, you are now a Free Diver.`,
    harpoonist: 'We need a steady hand like yours. Stay focused when your target is near. You are now a Harpoonist.',
    recruit: ` Hello Recruit, here\'s a plastic badge. We doubt you\'ll live long enough to give it back.
               If you're scared by the blood choked gurgles coming from below deck don't worry, it'll all be over soon.`,
    thebitten: 'You survived. You have lost all fear of these demons. Take your place in the strata of legend as one of the Bitten.',
    
};

export const RankModalDimensions = { width:'250', height:'250', viewBox:'-10 0 250 250'};

// Make sure when they register they create a unique username. 
export const queries = {
    getUser: `SELECT * FROM FlashUsers WHERE username = ? Limit 1`,

    getUsersCards: `SELECT c.card_id, c.card, c.answer, c.category, c.owner_id, fcu.correct, fcu.incorrect
                    FROM FlashCardUsers AS fcu INNER JOIN FlashCards AS c ON c.card_id = fcu.card_id
                    WHERE fcu.user_id = ?`,

    getAvatars: `SELECT * FROM Avatars WHERE user_id = ?`,

    getUserSessions: `SELECT * FROM UserSessions WHERE user_id = ? LIMIT 30`,

    getWeapons: `SELECT * FROM Weapons Where user_id IN (?,?)`,

    getCardSetCards: `SELECT csc.set_id, csc.card_id 
                      FROM CardSetUsers AS csu 
                      INNER JOIN CardSetCards AS csc 
                      ON csc.set_id = csu.set_id 
                      WHERE csu.user_id = ?`,
    createUser: `INSERT INTO FlashUsers(username,password,email,points) VALUES(?,?,?,0)`,
    createWeapon:`INSERT INTO Weapons(name, damage, defense) VALUES(?,?,?)`,
    createAvatar:`INSERT INTO Avatars(style,birthstar,user_id,primary_weapon,name,level) VALUES(?,?,?,?,?,?)`,
    insertCard: `INSERT INTO FlashCards(card,answer,category,owner_id) VALUES(?,?,?,?)`,
    insertFlashCardUser: `INSERT INTO FlashCardUsers VALUES(?,?,?,?)`,
    updateCard: `UPDATE FlashCards SET card="?",answer="?",category="?" WHERE card_id=?`,
    insertSession: `INSERT INTO UserSessions(
                                cards_seen,
                                correct,
                                incorrect,
                                cards_added,
                                points_added,
                                card_sets_added,
                                date,
                                user_id) VALUES(?,?,?,?,?,?,DEFAULT,?);`
}

export const GREATWHITE_SIZE = { width:281, height:129};
export const HAMMERHEAD_SIZE = { width:257,height:124};
export const NINJA_SIZE = { width:100, height:122};
export const WORLD_SIZE = { width: 1200, height: 600};
export const MAP_SIZE = { width: 1200, height: 1200};
export const OBJECT_SIZE = { width: 100, height: 100};

export const tiles = [
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
]