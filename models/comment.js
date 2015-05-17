module.exports=function (sequelize, DataTypes) {
	return sequelize.define('Comment',{
			texto:{
			type: DataTypes.STRING,
			validate: {notEmpty:{msg: "Es un campo vacio"}}
		},
		publicado:{
			type: DataTypes.BOOLEAN,
			defaultValue: false
			}
		}	
	);
}
