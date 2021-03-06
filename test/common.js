var path = require('path'),
	should = require('should'),
	Arrow = require('arrow'),
	MongoDB = require('mongodb'),
	MongoClient = MongoDB.MongoClient;

// Create a test collection.
var config = new (Arrow.Loader)(path.resolve(__dirname + '/../')),
	mongoURL = config.connectors['appc.mongo'].url;

var server = new Arrow();
exports.mongoURL = mongoURL;
exports.Arrow = Arrow;
exports.server = server;
exports.connector = server.getConnector('appc.mongo');

before(function (next) {
	this.timeout(30000);
	MongoClient.connect(mongoURL, function didConnect(err, db) {
		if (err) {
			return console.error(err);
		}
		db.collection('super_post').insert([
			{Hello: 'world!', Foo: 2},
			{Hello: 'sun!', Foo: 5},
			{divergentDocument: true},
			{Hello: 'sky!', Foo: 7},
			{Hello: 'Earth!', Foo: 1},
			{Hello: 'birds!', Foo: 3},
			{How: 'are you today?!', Foo: 3}
		], function (err) {
			next(err);
		});
	});
});

before(function before(next) {
	this.timeout(30000);
	server.start(function () {
		next();
	});
});

after(function after(next) {
	server.stop(next);
});
