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

### Prerequisites
- Install Compass
- Install Bootstrap-Sass

### Recommended
- Install Nodemon (https://github.com/remy/nodemon)

### To Do
- Angular.js Support
- jQuery Support
- Passport.js
	- OAuth Suport
	- Social Networks
- Email Support (Most likely Sendgrid)
- MongoDB Support
- Facebook
- Twitter
- Foursquare
- Waze
- Google

### Tips
- If using CoffeeScript and Nodemon use this command so that Sails restarts when .coffee files are saved:
    ```nodemon -e js,coffee app.js```
- Use an HTML to Jade converter for the templates found online. I've been using this one http://html2jade.aaron-powell.com/


### Bugs
- 2 Errors when server is started. It's triggered in Gruntfile.js line 447 by Compass.