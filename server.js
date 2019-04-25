const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

let listener = app.listen(8081, function () {
    console.log(`Listening on ${listener.address().port}`);
});