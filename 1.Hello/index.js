var express = require('express');
var app = express();

var port = 999;

app.get('/', function(req, res){
	res.send('<a href="/todos">This is a link</a>')
});

app.get('/toDo', function(req, res){
	res.send('<ul><li>Đi chợ</li><li>Nấu cơm</li><li>Rửa bát</li><li>Học Code</li></ul>');
});

app.listen(port, function(){
	console.log('Server listenning on port ' + port);
});