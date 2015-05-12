var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controllers.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []})
});

router.param('quizId', quizController.load);

/* GET pagina preguntas*/
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
/* GET pagina respuestas */
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.get('/quizes/create', quizController.create);
router.get('/quizes/author', function(req, res){
	res.render("author");
});

module.exports = router;



