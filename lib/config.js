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

export const queries = {
    getUser: `SELECT * FROM FlashUsers Where username=? Limit 1`,

    getUsersCards: `SELECT c.card, c.answer, c.category, fcu.correct, fcu.incorrect
                    FROM FlashCardUsers AS fcu INNER JOIN FlashCards AS c ON c.card_id = fcu.card_id
                    WHERE fcu.user_id = ?`,

    getAvatars: `SELECT * FROM Avatars WHERE user_id = ?`,

    getUserSessions: `SELECT * FROM UserSessions WHERE user_id = ?`,

    getWeapons: `SELECT * FROM Weapons Where user_id IN (?,?)`,

    getCardSetCards: `SELECT csc.set_id, csc.card_id 
                      FROM CardSetUsers AS csu 
                      INNER JOIN CardSetCards AS csc 
                      ON csc.set_id = csu.set_id 
                      WHERE csu.user_id = ?`
}