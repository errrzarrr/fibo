const WEBPORT = 5000;
const keys = require('./keys');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');;;
const redis = require('redis');
const { Pool } = require('pg');

const app = express();
app.use( cors() );
app.use( bodyParser.json() );

function fib( pos ) {
	return ( pos <= 1 ) ? 1 : fib( pos-1 ) + fib( pos-2 );
};

// Postgres
const pgClient = new Pool({
	user:		keys.pg.USER
	,host:		keys.pg.HOST
	,port:		keys.pg.PORT
	,database:	keys.pg.DATABASE
	,password:	keys.pg.PASS
});

pgClient.on( 'error', () => console.error('Postgres connection lost!') );

pgClient
	.query('CREATE TABLE IF NOT EXISTS values (number INT)' )
	.catch( err => console.error(`Postgres error creating table: ${err}`) );

// redis
const redisClient = redis.createClient({
	host: keys.redis.HOST,
	port: keys.redis.PORT,
	retry_strategy : () => 1000
});

const redisPublisher = redisClient.duplicate();

redisPublisher.on( 'message', (channel, message) => {
	redisClient.hset( 'values', message, fib( parseInt(message) ) );
});

// express
app.get('/', (req,res) => {
	res.send('Hi');
});

app.get('/values/all', async (req,res)  => {
	const values = await pgClient.query('SELECT * FROM values');
	res.send(values.rows);
});

app.get('/values/current', async (req,res) => {
	redisClient.hgetall('values', (err,values) => {
		res.send(values);
	});
});

app.post('/values', async (req,res) => {
	const index = parseInt( req.body.index );
	
	console.log(`received: ${index}`);

	if( index > 40 ) {
		return res.status(422).send('number too high');
	}

	if(  isNaN(index) ) {
		return res.status(422).send("message sent NaN");
	}

	redisClient.hset('values', index, 'Nothing yet!');
	redisPublisher.publish('insert', index);
	pgClient
		.query('INSERT INTO values(number) VALUES($1)', [index])
		.catch( err => console.error("Postgress Error @POST: /values: ", err));

	res.send( {working: true} );
});

app.listen(WEBPORT, () => {
	console.error(`API/Server started at port #${WEBPORT}`);
});
