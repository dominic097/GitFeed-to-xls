var parser = require('xml2json');
var json2xls = require("json2xls");
var https = require('http');
var config = require('./config.json');

fs = require('fs');


const constructObj = (data) => {
    var xlsObj = [];

    data.forEach(element => {
        xlsObj.push({
            link: element.id,
            title: element.title,
            summary: element.summary,
            author: element.author.name ? element.author.name : '',
            description: element.description,
            milestone: element.milestone,
            due_date: element.due_date,
            labels: element.labels.label && Array.isArray(element.labels.label) && element.labels.label.length > 0 ? element.labels.label.join(',') : (typeof element.labels.label == "string" ? element.labels.label : ''),
            assignee: element.assignee && element.assignee.name ? element.assignee.name : ''
        })
    });
    return xlsObj;
}

const init = function () {
    config.forEach((item) => {
        https.get(item.url, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                var json = JSON.parse(parser.toJson(data));
                var xls = json2xls(constructObj(json.feed.entry));
                fs.writeFileSync(item.name + '.xlsx', xls, 'binary');
            });
        })
    })
}

init();
