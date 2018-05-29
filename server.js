const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const gitFeedToXl = require('./git-xls.js');
const path = require('path');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.post('/', function (req, res) {
    console.log(req.body);
    res.send('POST request to homepage');
    gitFeedToXl(req.body).then(() => {

    })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))