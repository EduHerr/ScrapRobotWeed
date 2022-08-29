require('dotenv').config();
const mysql = require ('mysql');

const conn = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

conn.connect(function (err){
	if(err){
		console.log('Se produjo un error al intentar conectar con la base de datos: ' + err);
		return;
	}
	else{
		console.log('Conexion exitosa con la base de datos.');
	}
});

conn.end();

module.exports = conn;