var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controllers.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

/* GET pagina preguntas*/
router.get('/quizes/question', quizController.question);

/* GET pagina respuestas */
router.get('/quizes/answer', quizController.answer);

router.get('/author', function(req, res){
	res.render("author");
});

module.exports = router;


module.exports = router;
