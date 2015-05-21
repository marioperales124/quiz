var path = require('path');
var pg=require('pg');
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = "sqlite";
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

var Sequelize = require('sequelize');

var sequelize = new Sequelize(DB_name, user, pwd,
 {
 	dialect: dialect,
	protocol: protocol,
	port: port,
	host: host,
	storage: storage, // solo SQLite (.env)
	omitNull: true // solo Postgres
 }
);


var Quiz = sequelize.import(path.join(__dirname,'quiz'));

var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);

var user_path = path.join(__dirname,'user');
var User = sequelize.import(user,path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

Quiz.belongsTo(User);
User.hasMany(Quiz);

exports.Quiz = Quiz;
exports.Comment = Comment;
exports.User = User;

sequelize.sync().then(function() {
	if (count === 0) {
			User.bulkCreate(
				[{username: 'admin', password: '1234', isAdmin: true},
				{username: 'pepe', password: '5678'}
				]).then(function(){
					console.log('Base de datos (tabla usuarios) inicializada');

				
	Quiz.count().then(function (count){
		if (count === 0) {
 			Quiz.bulkcreate(
 				[{pregunta: 'Capital de Italia',
				  respuesta: 'Roma', UserId: 2
				   },
 				 {pregunta: 'Capital de Portugal',
				   respuesta: 'Lisboa', UserId: 2
				   }])
 			.then(function(){console.log('base de datos iniciada')});
			};
		});
	});
});
