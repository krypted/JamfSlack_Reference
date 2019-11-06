var Slack = require('slack-node');
const dotenv = require('dotenv');
const apiUrl = 'https://slack.com/api';
const axios = require('axios');
var convert = require('xml-js');
var request = require('request');
const qs = require('querystring');
const logger = require('logger').createLogger('development.log');
apiToken = process.env.SLACK_AUTH_TOKEN;
slack = new Slack(apiToken);
dotenv.config();

exports.computerDetails = (req, res) => {
    var slack_headers = {
        'Authorization': 'Bearer ' + process.env.SLACK_AUTH_TOKEN
    };
    var req_text = req.body.text;
    if (req_text != '') {
        let device_rexexp = /[a-zA-Z]+/g;        
        const device = req_text.match(device_rexexp);
        let id_regexp = /[0-9]+/g;
        const id = req_text.match(id_regexp);
        var end_point = process.env.API_END_POINT +"/" + device[0]
        if(id) {
            end_point = process.env.API_END_POINT +"/" + device[0] + '/id/' + id[0];
        }
        logger.info('Url endpoint ' + end_point);
        var username = process.env.USERNAME
        var password = process.env.PASSWORD
        var options = {            
            url: end_point,
            auth: {
                user: username,
                password: password
            }
        }
        request(options, function (err, res, body) {
            if (err) {
                console.dir(err)
                return
            }
            var message = body;
            let regexp = /<?xml/ig;            
            if (regexp.test(message)) {             
                message = convert.xml2json(message, {compact: true, spaces: 4});
                uploadTextMessage(req, res, message, options)
            } else {
                var message = "No records Found";
                postMessage(slack_headers, req, res, message)
            }
        })
    } else {
        var message = "*Need some help with `/q`*?" +
        "\n" + "`/q <endpointname> <id>`" + "\n";
        postMessage(slack_headers, req, res, message)
    }
    res.send('')
}

function postMessage(slack_headers, req, res, message) {
    var message_data = {
        text: message,
        channel: req.body.channel_id
    }
    axios({
        url: `${apiUrl}/chat.postMessage`,
        method: "post",
        data: message_data,
        headers: slack_headers
    }).then(result => {

    });
}

function uploadTextMessage(req, res, message, options) {
    var message_data = {     
        token: process.env.SLACK_AUTH_TOKEN,   
        content: message,
        channels: req.body.channel_id,
        filename: 'deviceinfo.json',
        title: 'User: ' + req.body.user_name + ', \n\n' + 'Endpoint: ' + options.url,
        filetype: 'javascript'
    }
    axios.post(`${apiUrl}/files.upload`, qs.stringify(message_data)).then((result) => {

    }).catch((err) => {
        res.sendStatus(500);
    });
}