var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'join_us'
});


app.get('/', async (req, res) => {
	var q = 'select count(*) as count from users';
	connection.query(q, function(err, results, fields) {
		if(err) throw err;
		var count = results[0].count;
		//res.send('<h1>we have ' + count + 											//	' users</h1>');
		console.log(count);
		res.render('home', { count });
	 });
});

app.post('/register', (req, res) => {
	//var email = req.body.email;
	var person = { email: req.body.email, last_name: req.body.lastName, first_name: req.body.firstName, birth_date: req.body.birthDate };
	var lastName = req.body.lastName;
	var firstName = req.body.firstName;
	var q = 'insert into users set ?';
	connection.query(q, person, (err, results, fields) => {
		if(err) throw err;
		//res.redirect('/');
		res.render('register', { lastName, firstName });
	});
});


/*app.get('/', async (req, res) => {
	var q = 'select count(*) as count from users';
	connection.query(q, function(err, results, fields) {
		if(err) throw err;
		res.send('<h1>we have ' + results[0].count + 						' users</h1>');
	 });
});
*/


//connection.end();

/*
app.get('/', async (req, res) => {
	console.log('yyyeeeeaahh');
	res.send('<h1>this on?</h1>');
});
*/
app.get('/joke', (req, res) => {
	var joke = '<h1>hahahaha</h1>';
	res.send(joke);
	console.log('joke');
});
/*
app.get('/random_num', async (req, res) => {
	var r = Math.floor(Math.random() * 10) + 1;
	res.send(r.toString());
	console.log('math');
});
*/
app.listen(3000, function() {
	console.log('mmm');
});