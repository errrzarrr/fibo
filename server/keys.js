module.exports = {
	redis : {
		HOST: process.env.REDIS_HOST,
		PORT: process.env.REDIS_PORT || 6379
	}
	,pg: {
		USER:		process.env.PG_USER
		,HOST:		process.env.PG_HOST
		,DATABASE:	process.env.PG_DATABASE
		,PASS:		process.env.PG_PASS
		,PORT:		process.env.PG_PORT 
	}
};
