export const authenticate = (req,res,next) => {
    let token = req.user.token;
    let user_id = req.user.user_id;

    let knownToken = global.authTokens.find( toke => toke.user_id == user_id);
    if(knownToken.token === token) {
        console.log(`token: ${knownToken } - useid: ${user_id}`);
        next();
    } else {
        res.sendStatus(403);
    }
};
