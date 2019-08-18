const keys = require('./keys');
const redis = require('redis');

function fib( pos ) {
	return ( pos <= 1 ) ? 1 : fib( pos-1 ) + fib( pos-2 );
}

const redisClient = redis.createClient({
	host: keys.redis.HOST,
	port: keys.redis.PORT,
	retry_strategy : () => 1000
});

const redisSubscriber = redisClient.duplicate();

redisSubscriber.on( 'message', (channel, message) => {
	message = parseInt(message);
	if( isNaN(message) )
		console.error("message sent NaN");
	else
		redisClient.hset( 'values', message, fib(message) );
});

redisSubscriber.subscribe( 'insert' );