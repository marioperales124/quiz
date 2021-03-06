var crypto = require ('crypto');
var key = process.env.PASSWORD_ENCRYPTION_KEY;

module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define(
		'User',{
			username:{
				type: DataTypes.STRING,
				unique : true,
				validate:{
					notEmpty: {msg: "Por favor, escriba un nombre de usuario"},
					isUnique : function(value,next) {;
						var self = this;
						User.find({where:{username: value}}).then(function(user){
							if (user && self.id !== user.id){
								return next('Nombre de usuario ya utilizado');
							}
						return next();		
						}).catch(function(err){return next(err);});
					}
				}
			},
			password:{
				type: DataTypes.STRING,
				validate:{notEmpty: {msg: "Por favor, escriba una contraseña valida"}},
				set: function (password){
					var encripted = crypto.createHmac('sha1',key)
					.update(password).digest('hex');
				if(password===''){encripted='';}
				this.setDataValue('password',encripted);	
				}
			},
			isAdmin:{
				type: DataTypes.BOOLEAN,
				defaultValue: false
			}


		},
		{
			instanceMethods:{
				verifyPassword: function(password) {
					var encripted=crypto.createHmac('sha1',key)
					.update(password).digest('hex');
					
					return encripted === this.password;

				}
			}
		}

		);
	return User;
}