# Sailsjs Starter Kit
### A Sails.js boilerplate to help you save time in your future projects

## Objective
To simplify the setup process of a Sails.js app with already working authentication methods, landing page, template engines, etc.

## Features
- [Jade Template Engine Support](http://jade-lang.com/api/)
- [Compass/Sass Support](https://github.com/gruntjs/grunt-contrib-compass)
- [Bootstrap 3.1 Support](https://github.com/twbs/bootstrap-sass)
- [CoffeeScript Support](https://github.com/gruntjs/grunt-contrib-coffee)
- [Nodemon Support](https://github.com/remy/nodemon)
- [Landing page](http://html5up.net/tessellate/)
- [Passport.js](http://passportjs.org/)
  - Local Authentication
  - Twitter
  - Facebook
  - Google
- MongoDB Support
- Session Storage using MongoDB
- Environment variable support using autoenv or foreman
- [Internalization(i18n) Support](https://github.com/mashpie/i18n-node)
- [Google Analytics](http://www.google.com/analytics/)
- Console Helpers
	- Show user where {type: value} if empty shows all users
  - Destroy All

## Prerequisites
- Install [Compass](http://compass-style.org/install/)
- Install [Bootstrap-Sass](https://github.com/twbs/bootstrap-sass)
- Install [MongoDB](http://www.mongodb.org/downloads)

##Autoenv
I'm using [autoenv](https://github.com/kennethreitz/autoenv) which exports the variables in the .env file
and adds them to the environment.<br/>
`$ cd ~`<br/>
`$ git clone https://github.com/unixorn/autoenv ~/.autoenv`<br/>
`$ echo 'source ~/.autoenv/activate.sh' >> ~/.bashrc`<br/>
if you're using zshell then use this command instead:<br/>
`$ echo 'source ~/.autoenv/activate.sh' >> ~/.zshrc`<br/>

*If you don't want to use environment variables then you must replace all the instances of 'process.env.' with the proper tokens or variables

## Google Analytics
#### Support for Google Universal Analytics script using jade's include feature.<br/>
In `views/ga.jade` replace the values with the Tracking ID and with the proper url
  `ga('create', 'Replace me with Google Analytics Token', 'sails-starter-kit.herokuapp.com');`<br/>
To every jade file added you must include this `include ../ga.jade` if you want it to be tracked by google analytics
- Tip: First create the heroku app to replace the url in this script.

## Heroku
#### These steps will help you through your heroku deployment
- Download the heroku toolbelt
[heroku toolbelt](https://toolbelt.heroku.com/)
- Create the heroku app<br/>
`$ heroku apps:create yourAppName`
- Add mongoDB support<br/>
`$ heroku addons:add mongolab:sandbox`
- Add multiple heroku buildpacks to be able to download from npm and ruby<br/>
`$ heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git`
- Add your environment variables to heroku:<br/>
`$ heroku plugins:install git://github.com/ddollar/heroku-config.git`<br/>
`$ heroku config:push`
- Push to heroku<br/>
`$ git push heroku master`

### Tips
- Install [Nodemon](https://github.com/remy/nodemon)
- If using CoffeeScript and Nodemon use this command so that Sails restarts when .coffee files are saved:
    ```nodemon -e js,coffee app.js```
- Use an [html2jade](http://html2jade.aaron-powell.com/) converter for the templates found online.

### To Do
- Email Support (Most likely Sendgrid)
- Password Reset
- Flash Messages
- Console Helpers
  - Destroy user where...
- Add secrets configuration as an alternative to .env variables

### Bugs
- 2 Errors when server is started. It's triggered in Gruntfile.js line 447 by Compass.