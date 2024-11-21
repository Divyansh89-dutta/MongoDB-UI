var express = require('express');
var router = express.Router();
var User = require('./users');
var DeletedUser = require('./users');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.get('/', function(req, res) {
  res.render('index');
});
router.post('/add-user', async function(req, res) {
  const {username, name, age} = req.body;
  console.log(username, name, age);
    const user = new User({username, name, age});
    await user.save();
    res.redirect('/display-users');
});
router.get('/display-users', async function(req, res) {
    const users = await User.find();
    res.render('display', {users});
});

router.get('/edit-user', async (req, res) => {
  const { username } = req.query;
  const user = await User.findOne({ username });
  if (user) {
    res.render('edit', { user: user });
  } else {
    res.render('error', { error: 'User not found' });
  }
});
router.post('/update-user', async (req, res) => {
  const { username, name, age } = req.body;
  const updateResult = await User.updateOne({ username }, { name, age });
  if (updateResult.modifiedCount > 0) {
    res.redirect('/display-users');
  } else {
    res.render('error', { error: 'Failed to update user' });
  }
});
router.get('/delete', async function(req, res) {
  const { username } = req.query;
  const deletedUser = await User.findOneAndDelete({username});
  if (deletedUser) {
    console.log(deletedUser);
    res.redirect('/display-users');
  } else {
    res.render('error', { error: 'User not found' });
  }
});

module.exports = router;
