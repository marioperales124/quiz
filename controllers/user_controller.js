var users = { admin : {id:1, username:"admin", password:"1234"},
			  pepe : {id:2, username:"pepe", password:"5678"}
			};
exports.autenticar = function  (login, password, callback) {
	models.User.find({
		where:{username:login}
	}).then(function(user) {
		if(user){
			if(user.verifyPassword(password)){
				callback(null, user);
			}else{callback(new Error ('Password erroneo, introduzca correctamente la contraseña'))}
		}else{callback(new Error('No existe el usuario '+login))}
	}).catch(function(error) {callback(error)});

	
};