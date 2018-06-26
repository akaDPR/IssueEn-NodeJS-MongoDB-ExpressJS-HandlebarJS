var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');
var User  = require(__root+'User');
var Issue = require(__root+'Issue');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(session({ secret: 'thisissecretkey', resave: false, saveUninitialized: true, }));
// var User = require('../user/User');

router.get('/',function(req,res){
  res.send('AuthController Works');
});
var bcrypt = require('bcryptjs');
router.post('/login', function(req, res) {

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).render(__root+'login',{
      emailmessage:"email not found"});
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).render(__root+'login',{
      message:"Password Invalid "});
      req.session.user = user;
      

      Issue.find({userid:req.session.user._id} ,function(err,issue){
        if(err) return res.status(500).send('Error');
        res.render(__root+'dashboard',{
          user:user,
          issues:issue
        });
      }); 
        
  });

});

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
  
});

router.post('/register', function(req, res) {
var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    name : req.body.username,
    email : req.body.email,
    password : hashedPassword
  }, 
  function (err, user) {
    if (err) return res.status(500).send("There was a problem registering the user`.");
    res.status(200).render(__root+'login',{ registered:"Account registered successfully" })
  });

});


module.exports = router;
