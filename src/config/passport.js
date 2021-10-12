import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';
import jwt from 'jsonwebtoken';
import path from 'path';
import { response, log } from 'helper';
import constant from './constants';
import TokenModel from '../collections/Token';

const bearer = new BearerStrategy(async (token, done) => {
    try {
        const isValid = await TokenModel.findOne({ access_token: token });
        if (isValid) {
            const user = jwt.verify(
                token,
                constant.keys.publicKEY,
                constant.authConfig,
            );
            if (user) {
                user.token = token;
                return done(null, user, { scope: 'all' });
            }
        }
    } catch (e) {
        log.error(null, e, path.join(__dirname, path.basename(__filename)));
    }
    return done(null, false, { scope: 'all' });
});

passport.use(bearer);

export const verifyTokenFromHeader = (req, res, next) => {
    passport.authenticate('bearer', { session: false }, (err, user) => {
        if (err) {
            return response.res401(res);
        } else if (!user) {
            response.res401(res);
        } else {
            req.user = user; // Forward user information to the next middleware
            next();
        }
    })(req, res, next);
};

export default passport;
