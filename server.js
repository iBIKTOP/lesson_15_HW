var http = require('http');
var fs = require('fs');

http.createServer(function (req,res) {

	if (req.url==='/stream'){
		var stream = fs.createReadStream('lorem.txt');
		stream.pipe(res); //pipe - соеденение нашего стрима и переменной res, будет постипенно передаваться данные.
	}
	if (req.url==='/file'){
		fs.readFile('lorem.txt', function(err, data) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			res.end();
  		});
	}
}).listen(3000, function () {
	console.log('Серевер работает на localhost:3000');
});