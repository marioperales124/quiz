var models= require('../models/models.js');

exports.load= function(req, res, next, quizId){
 models.Quiz.find(quizId).then(
 function(quiz){
 if(quiz){
 req.quiz=quiz;
 next();
 } else{
 next(new Error('No existe el quizId= '+ quizId));}
 }
 ).catch(function(error) { next(error);})
};


exports.index= function(req, res){
  models.Quiz.findAll().then(function(quizes){
    res.render('quizes/index.ejs', {quizes : quizes, errors: []});
  }).catch(function(error){next(error);})

};

//GET quizes/:id
exports.show= function(req, res){
  //var pregunta = 'a';
  //var respuesta = 'b';
  
    res.render('quizes/show', {quiz : req.quiz, errors: []});
  };



//GET quizes/:id/answer
exports.answer = function(req, res) {
     models.Quiz.find(req.params.quizId).then(function(quiz) {
      if(req.query.respuesta===req.quiz.respuesta){
      res.render('quizes/answer', {quiz : req.quiz, respuesta: 'Correcto', errors: [] });
    }else{
      res.render('quizes/answer', {quiz : req.quiz, respuesta: 'Incorrecto', errors: [] });
    }
  })
};

 exports.new = function(req, res){
  var quiz=models.Quiz.build(
      {pregunta : "Pregunta" , respuesta : "Respuesta"}
    );
  res.render('quizes/new', {quiz : quiz, errors: []});
 };

 exports.create = function(req, res){
  console.log("ghgfhhfhgfhgfghfhgfhgf")
  var quiz=models.Quiz.build( req.body.quiz);
  quiz.validate().then(
    function(err){
      if(err){
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      }else{
         //guarda en DB
    quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
      console.log("ghgfhhfhgfhgfghfhgfhgf");
    res.redirect('/quizes');
      });
 

  }
})
};