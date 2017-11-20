const passport = require('passport');
const Controller = require('../../lib/controller');
const AccountFacade = require('./facade');
const generateJWTToken = require('../helpers').generateJWTToken;

class AccountController extends Controller {

  /**
  * Create new account. Is authenticated by passport
  */
  createAccount(req, res, next) {
  // Check authorization
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ message: info });

      if (!user || user.admin === false) return res.status(401).json({ message: 'Not authorized' });

      return AccountFacade.createAccount(req.body, user.company)
      .then(resp => res.status(201).json({ username: resp.username }))
      .catch(err => next(err));
    })(req, res, next);
  }

  /**
  * Login method
  */
  login(req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) return next(err);

      if (!user) {
        return res.status(401).json({ message: info.message });
      }

      return res.status(200).json({
        accessToken: generateJWTToken(user),
        user: {
          username: user.username,
          id: user.id,
          admin: user.admin
        }
      });
    })(req, res, next);
  }
}

module.exports = new AccountController(AccountFacade);
