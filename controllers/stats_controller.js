var models = require('../models/models.js');

exports.index = function(req,res) {
	models.Quiz.count().then(function(numQuiz) {
		models.Comment.count().then(function(numCom){
			models.Quiz.findAll({
				include:[{
					model:models.Comment
				}]

			}).then(function(quizes){
				var QuizesComentados = 0;
				if(quizes){
					for(i in quizes){
						if(quizes[i].Comments.length){
							QuizesComentados++;
						}
					}
				}
				res.render('quizes/stats', {
					quizes: numQuiz,
					comments : numCom,
					commentedQuizes : QuizesComentados,
					errors: []
				});
			});
		});
	});
};