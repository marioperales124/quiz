exports.loginRequired = function (req, res, next) {
	if(req.session.user){
		next();
	}else{
		res.redirect('/login');
	}

};


exports.new= function (req, res) {
	// body...
	var errors = req.session.errors || {};
	req.session.errors = {};
	res.render('sessions/new',{errors: errors});
};

exports.create = function(req,res){
	var login= req.body.login;
	var password= req.body.password;
	var userController = require('./user_controller');
	userController.autenticar(login, password, function(error, user){
		if(error){
			req.session.errors = [{"message":'Se ha producido un error tramboloko: '+error}];
			res.redirect("/login");
			return;
		}
		req.session.user = {id:user.id, username:user.username, isAdmin:user.isAdmin};
		req.session.cookie.maxAge = 120000;
		res.redirect(req.session.redir.toString());

	});
};

exports.destroy = function(req,res){
	delete req.session.user;
	res.redirect(req.session.redir.toString());
};

