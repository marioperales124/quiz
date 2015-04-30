var express = require('express');
var router = express.Router();

var quizController = require('./routes/index');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

/* GET pagina preguntas*/
router.get('/quizes/question', quizController.question);

/* GET pagina respuestas */
router.get('/quizes/answer', quizController.answer);

module.exports = router;
