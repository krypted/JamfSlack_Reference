# JamfSlack_Reference

The general steps you'll follow to get this Slack Bot working are as follows:
1.	Download the code
2.	Perform dependency installs
3.	Prep node app.js
4.	Create .env file in root folder
	
First, download all the files in this project. Then we'll start by editing the .env file in the project. These settings include the following:

PORT = 3000
NODE_ENV = development
SLACK_AUTH_TOKEN = <this is an auth token that we'll grab later in this readme>
POST_SERVER_ITEM_ACCESS_TOKEN = <this is a bot token that we'll grab later in this readme>
USERNAME=<replace with the username for your Jamf Pro Server API Account>
PASSWORD=<replace with the password for your API Account>
API_END_POINT = <replace with the URL to your API, like https://krypted.jamfcloud.com/JSSResource>

We'll come back here and put in the auth token and server item so no need to know those juuuust yet. Next, we'll create the app in Slack. To do so, browse to https://api.slack.com/apps and click on New Slack App. Provide a name for the app and enter the Development Slack Workspace that you'll be installing the app into. I'd recommend using a development space before promoting to your master Slack instance. Once you've selected the appropriate information, click Create App. 

Next, let's create the bot user. For this, click on Bot Users in the app sidebar and then provide a name for the bot. This is what the response will appear as in Slack when you run a query. So you might say "Jamf Pro" or "Daneel" or "Siri" but it will look like a Slack user is responding with some information about the endpoint being queried so this is what that response displays as. 

Now click Edit Command. This is where we call the app we just uploaded. I use /q as my command (for query) but you can choose to use something else (my initial tests used /askjamf but that was too much typing as I'm kinda' lazy). The bot has been taught to return with a list if there's no parameter provided. So 

 




















Create a slash command 
https://api.slack.com/apps/APRKB1E03/slash-commands?

 







Oauth and permissions 

https://api.slack.com/apps/APRKB1E03/oauth?


 


1.	SLACK_AUTH_TOKEN = bot access token 
2.	POST_SERVER_ITEM_ACCESS_TOKEN
https://docs.rollbar.com/docs/nodejs
