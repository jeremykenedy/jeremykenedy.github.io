# jeremykenedy.com 8.0 aka [jeremykenedy.github.io](https://jeremykenedy.github.io) [![License](http://jeremykenedy.com/license-gpl3.svg)]()

This is the repository for [jeremykenedy.github.io](https://jeremykenedy.github.io), version 8.0

| jeremykenedy.com details |
| :------------ |
| Uses jQuery 2.1.4 Library |
| Uses Bower to pull libraries|
| Uses NPM for Dependencies |
| Uses GULP to build JS assets|
| Uses Bourbon 3.2.4 SASS library |
| Uses SCSS to generate CSS libraries |
| Uses skrollr.js 0.6.30 JS parallax library |
| Uses mixitup.js 2.1.11 JS Filter UI Library|


### Project Setup
###### (Not including the dev environment)

1. In Terminal Run

	`sudo git clone git@bitbucket.org:jeremykenedy/jeremykenedy.com-8.0.git jeremykenedy.local`

2. From the projects root run `bower update`

3. From the projects root run `sudo npm install`

4. From the projects root run `sudo gulp copyfiles`

5. From the projects root run `sudo gulp`

6. From the projects run the sass compiler with:
	* In Development: `sudo sass --watch sass/app.scss:css/style.css`

	* In Production: `sudo sass --watch sass/app.scss:css/style.min.css --style compressed`


### Library Documenations
* [jQuery 2.1.4](https://api.jquery.com/)
* [skrollr 0.6.30](https://github.com/Prinzhorn/skrollr/tree/master/examples)
* [mixitup 2.1.11](https://mixitup.kunkalabs.com/docs/)
* [Bourbon SASS 3.2.4](http://bourbon.io/docs/)



### License
[GNU GENERAL PUBLIC LICENSE V3](http://jeremykenedy.com/LICENSE)
