var express = require('express');
var multer = require('multer');
var router = express.Router();


var quizController = require('../controllers/quiz_controllers.js');
var commentController = require('../controllers/comment_controller.js');
var sessionController = require('../controllers/session_controller.js');
var statsController = require('../controllers/stats_controller.js');
var userController = require('../controllers/user_controller.js');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []})
});

router.param('quizId', quizController.load);
router.param('commentId', commentController.load);
router.param('userId',userController.load);

router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

router.get('/user', userController.new);
router.post('/user', userController.create);
router.get('/user/:userId(\\d+)/edit', sessionController.loginRequired, userController.ownershipRequired,userController.edit);
router.put('/user/:userId(\\d+)', sessionController.loginRequired, userController.ownershipRequired, userController.update);
router.delete('/user/:userId(\\d+)', sessionController.loginRequired, userController.ownershipRequired, userController.destroy);


/* GET pagina preguntas*/
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
/* GET pagina respuestas */
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', sessionController.loginRequired,			 	quizController.new);
router.post('/quizes/create', sessionController.loginRequired, multer({dest:'./public/media/'}), 			quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired,quizController.ownershipRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.ownershipRequired, 	 multer({dest:'./public/media/'}), quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.ownershipRequired,	quizController.destroy);
router.get('/author', function(req, res){
	res.render("author", {errors: []});
});

router.get('/quizes/:quizId(\\d+)/comments/new',commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired,commentController.ownershipRequired, commentController.publish);
router.get('/quizes/stats', statsController.index);




module.exports = router;




