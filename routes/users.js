const express = require('express');
const router = require('express-promise-router')();

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
  .post(UsersController.signIn);

router.route('/secret')
  .get(UsersController.secret);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
