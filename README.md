# JamfSlack_Reference

This project is a reference implementation to build a Slack interface to Jamf Pro. It could be used for most any REST endpoint thought. 

##Usage

Basically you send it a /q followed by an endpoint and it spits out json. Syntax is pretty much as follows:

/q <ENDPOINTNAME> <PARAM>
	
As an example, let's say you wanted to query computers for a list of devices, simply enter:

/q computers

Based on the list of devices, if you wanted to query for device id 8 then run:

/q computers 8

To see a full list of endpoints, check out https://developer.jamf.com/apis/classic-api/index.

##Installation

The general steps you'll follow to get this Slack Bot working are as follows:

1. Perform dependency installs

2. Download the code

3. Prep node app.js

4. Create .env file in root folder

	
First, let's prep the host. Per the package.json file, the packages you'd need to install (e.g. via npm) include:  

⋅⋅* "async": "^3.1.0",

⋅⋅* "axios": "^0.19.0",

⋅⋅* "chalk": "^2.4.2",

⋅⋅* "cheerio": "^1.0.0-rc.3",

⋅⋅* "dotenv": "^8.1.0",

⋅⋅* "express": "^4.17.1",

⋅⋅* "fs": "0.0.1-security",

⋅⋅* "logger": "0.0.1",

⋅⋅* "moment-timezone": "^0.5.27",

⋅⋅* "mysql2": "^1.7.0",

⋅⋅* "path": "^0.12.7",

⋅⋅* "request": "^2.88.0",

⋅⋅* "rollbar": "^2.13.0",

⋅⋅* "sequelize": "^5.19.6",

⋅⋅* "slack-node": "^0.1.8",

⋅⋅* "xml-js": "^1.6.11"


Next, download all the files in this project. Then we'll start by editing the .env file in the project. These settings include the following:

⋅⋅*PORT = 3000

⋅⋅*NODE_ENV = development

⋅⋅*SLACK_AUTH_TOKEN = <this is an auth token that we'll grab later in this readme>

⋅⋅*POST_SERVER_ITEM_ACCESS_TOKEN = <this is a bot token that we'll grab later in this readme>

⋅⋅*USERNAME=<replace with the username for your Jamf Pro Server API Account>
	
⋅⋅*PASSWORD=<replace with the password for your API Account>
	
⋅⋅*API_END_POINT = <replace with the URL to your API, like https://krypted.jamfcloud.com/JSSResource>


We'll come back here and put in the auth token and server item so no need to know those juuuust yet. Next, we'll create the app in Slack. To do so, browse to https://api.slack.com/apps and click on New Slack App. Provide a name for the app and enter the Development Slack Workspace that you'll be installing the app into. I'd recommend using a development space before promoting to your master Slack instance. Once you've selected the appropriate information, click Create App. 

Next, let's create the bot user. For this, click on Bot Users in the app sidebar and then provide a name for the bot. This is what the response will appear as in Slack when you run a query. So you might say "Jamf Pro" or "Daneel" or "Siri" but it will look like a Slack user is responding with some information about the endpoint being queried so this is what that response displays as. Click Save to commit those changes. 

Now click Edit Command. This is where we call the app we just uploaded. I use /q as my command (for query) but you can choose to use something else (my initial tests used /askjamf but that was too much typing as I'm kinda' lazy). The bot has been taught to return with a list if there's no parameter provided or informaton about a specific object if there is a param. So you can put that text in there or leave it blank. The Request URL is the most important thing here. That's the URL to the .js app. 

Next, click on "Oauth & Permissions"Here, copy the OAuth Access Token into that SLACK_AUTH_TOKEN field in the .env file and then click Save again. Almost done. Next you'll need the POST_SERVER_ITEM_ACCESS_TOKEN. Per https://docs.rollbar.com/docs/nodejs, that is in your rollbar config. 
