var Event = require("events").EventEmitter;
var emt = new Event();
var http = require('http');
var fs = require('fs');
function getDate() {
	var d = new Date();
    var options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    return d.toLocaleString("ru", options);
}

emt.on('login', function() {
    fs.appendFile('logger.txt', getDate() + ' Пользователь залогинился!\r\n', function () {
        console.log(getDate() + ' Пользователь залогинился! Данные в logger.txt обновлены!');
    });
});
emt.on('active', function() {
    fs.appendFile('logger.txt', getDate() + ' Пользователь находится на странице!\r\n', function () {
        console.log(getDate() + ' Пользователь находится на странице! Данные в logger.txt обновлены!');
    });
});
emt.on('about', function() {
    fs.appendFile('logger.txt', getDate() + ' Пользователь запросил данные о себе!\r\n', function () {
        console.log(getDate() + ' Пользователь запросил данные о себе! Данные в logger.txt обновлены!');
    });
});

http.createServer(function (req,res) {
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
}).listen(3000, function () {
	console.log('Серевер работает на localhost:3000');
});