/**
 * Module dependencies.
 */
const express = require("express");
const dotenv = require("dotenv");
const User = require("./models").User;
var Slack = require('slack-node');

/**
 * Load environment variables from .env file.
 */
dotenv.config();

/**
 * Create Express server.
 */
const app = express();
apiToken = process.env.SLACK_AUTH_TOKEN
slack = new Slack(apiToken);

slack.api('users.list', {
}, function (err, response) {
  console.log(response);
  var members = response.members;
  members.forEach(function (member) {
    User.findOne({
      where: { u_id: member.id }
    }).then((result) => {
      if (result === null) {
        var user_data = [
          {
            user_id: member.id,
            work_space_id: member.team_id,
            user_name: member.real_name ? member.real_name : member.profile.real_name,
            is_admin: member.is_admin | 0
          }
        ];
        var date = new Date();
        apiToken = process.env.SLACK_AUTH_TOKEN
        slack = new Slack(apiToken);
        slack.api('conversations.list', {
            types: 'im'
        }, function (err, response) {
            response.channels.forEach(function (element) {
            if (element.user === user_data[0].user_id) {
                var conversation_id = element.id;
                const data = {
                u_id: user_data[0].user_id,
                username: user_data[0].user_name,
                conversation_id: conversation_id,
                created_at: date,
                updated_at: date,
                is_admin: user_data[0].is_admin
                }
                User.create(data);
            }
            });
        });
      }
    });
  });
});


module.exports = app;
