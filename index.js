var Event = require("events").EventEmitter;
var emt = new Event();
var http = require('http');
var fs = require('fs');

http.createServer(function (req,res) {
	emt.once('login', function() {
		fs.appendFile('logger.txt', Date() + ' Пользователь залогигился!\r\n', function () {
			console.log(Date() + 'Пользователь залогигился! Данные в logger.txt обновлены!');
		}); 	
	});
	emt.once('active', function() {
		fs.appendFile('logger.txt', Date() + ' Пользователь находится на странице!\r\n', function () {
			console.log(Date() + 'Пользователь находится на странице! Данные в logger.txt обновлены!');
		}); 	
	});
	emt.once('about', function() {
		fs.appendFile('logger.txt', Date() + ' Пользователь запросил данные о себе!\r\n', function () {
			console.log(Date() + 'Пользователь запросил данные о себе! Данные в logger.txt обновлены!');
		}); 	
	});

	res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
		if (req.url==='/'){
			res.write("<a href='/login'>Вход</a><br>");
			emt.emit('active');
		}
		if (req.url==='/login'){
			res.write("<a href='/about'>О пользователе</a><br>");
			res.write("<a href='/'>Выход</a>");
			emt.emit('login');
		}
		if (req.url==='/about'){
			res.write("<a href='/'>Выход</a>");
			emt.emit('about');
		}

	res.end();
	// if (req.url==='/login') emt.emit('login');
}).listen(3000, function () {
	console.log('Серевер работает на localhost:3000');
});