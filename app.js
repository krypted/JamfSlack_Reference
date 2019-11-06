const express = require('express');
const app = express();
const dotenv = require('dotenv');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const slackController = require('./controllers/SlackController.js');
app.use(express.static('public'));
dotenv.config();
var Rollbar = require('rollbar');
var rollbar = new Rollbar({
  accessToken: process.env.POST_SERVER_ITEM_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true
});

// log a generic message and send to rollbar
rollbar.log('Hello world!');

const rawBodyBuffer = (req, res, buf, encoding) => {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
    }
};

app.use(express.static('./'));


app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));
app.use(rollbar.errorHandler());
app.set('port', process.env.PORT);

app.post('/computer-details', slackController.computerDetails);

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;