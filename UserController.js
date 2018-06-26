var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');
var Issue  = require(__root+'Issue');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(session({ secret: 'thisissecretkey', resave: false, saveUninitialized: true, }));



router.get('/',function(req,res){
	Issue.find({userid : req.session.user.email},function(err,issues){
		if(err) return res.status(404).send('Error');
		res.status(200).send(issues);
	});	
});

router.post('/issue',function(req,res){
	Issue.create({
		userid:req.session.user._id,
		issue:req.body.issue,
		type :req.body.issuetype
	},
	function(err,issue){
		if(err) return res.status(500).send('Error');
		res.status(200).render(__root+'dashboard',{
			issues:issue
		});
	}
	);
});
module.exports = router;