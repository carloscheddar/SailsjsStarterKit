# Sailsjs Starter Kit
### A Sails.js boilerplate to help you save time in your future projects

### Objective
To create an empty Sails.js app that already has tools installed.

### Features
- Jade Template Engine Support
- Compass/Sass Support (https://github.com/gruntjs/grunt-contrib-compass)
- Bootstrap 3.1 Support (https://github.com/twbs/bootstrap-sass)
- CoffeeScript Support (https://github.com/gruntjs/grunt-contrib-coffee)
- Nodemon Support (https://github.com/remy/nodemon)
- Landing page (http://html5up.net/tessellate/)
- Passport.js
  - Local Authentication
  - Twitter
  - Facebook
- MongoDB Support
- Session Storage using MongoDB
- Environment file at root(.env)
- Console Helpers
	- Show user where {type: value} if empty shows all users
  - Destroy All

### Prerequisites
- Install Compass
- Install Bootstrap-Sass
- Install MongoDB

### Recommended
- Install Nodemon (https://github.com/remy/nodemon)

### To Do
- Angular.js Support
- jQuery Support
- Passport.js
	- OAuth Suport
	- Social Networks
  - Foursquare
  - Waze
  - Google
- Email Support (Most likely Sendgrid)
- internalization(i18n) Support
- Google Analytics
- Password Reset
- Console Helpers
  - Destroy user where...

### Tips
- If using CoffeeScript and Nodemon use this command so that Sails restarts when .coffee files are saved:
    ```nodemon -e js,coffee app.js```
- Use an HTML to Jade converter for the templates found online. I've been using this one http://html2jade.aaron-powell.com/
- Use autoenv to automatically load the .env file to the environment.


### Bugs
- 2 Errors when server is started. It's triggered in Gruntfile.js line 447 by Compass.