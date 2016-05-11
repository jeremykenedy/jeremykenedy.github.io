/*
 |--------------------------------------------------------------------------
 | GULP JS provides a clean, fluent API for defining some basic Gulp tasks
 | for your application. By default, we are compiling the Sass and JS
 | file for our application, as well as publishing vendor resources.
 |--------------------------------------------------------------------------
 | ########    ###    ########  ##       ########     #######  ########     ######   #######  ##    ## ######## ######## ##    ## ########  ######
 |    ##      ## ##   ##     ## ##       ##          ##     ## ##          ##    ## ##     ## ###   ##    ##    ##       ###   ##    ##    ##    ##
 |    ##     ##   ##  ##     ## ##       ##          ##     ## ##          ##       ##     ## ####  ##    ##    ##       ####  ##    ##    ##
 |    ##    ##     ## ########  ##       ######      ##     ## ######      ##       ##     ## ## ## ##    ##    ######   ## ## ##    ##     ######
 |    ##    ######### ##     ## ##       ##          ##     ## ##          ##       ##     ## ##  ####    ##    ##       ##  ####    ##          ##
 |    ##    ##     ## ##     ## ##       ##          ##     ## ##          ##    ## ##     ## ##   ###    ##    ##       ##   ###    ##    ##    ##
 |    ##    ##     ## ########  ######## ########     #######  ##           ######   #######  ##    ##    ##    ######## ##    ##    ##     ######
 |--------------------------------------------------------------------------
 | TABLE OF CONTENTS
 |--------------------------------------------------------------------------
 |	 |	 1. Commands 		- Quick List of GULP Commands
 |	 |	 2. Loads 			- Preprocessors load calls
 |	 |	 3. Controllers 	- Choose what ot compile
 |	 |	 4. Assets 			- File asset management
 |	 |	 5. APP CSS & JS 	- Process Assets
 |--------------------------------------------------------------------------
 |--------------------------------------------------------------------------
 |   ##                  ######   #######  ##     ## ##     ##    ###    ##    ## ########   ######
 | ####                 ##    ## ##     ## ###   ### ###   ###   ## ##   ###   ## ##     ## ##    ##
 |   ##                 ##       ##     ## #### #### #### ####  ##   ##  ####  ## ##     ## ##
 |   ##      #######    ##       ##     ## ## ### ## ## ### ## ##     ## ## ## ## ##     ##  ######
 |   ##                 ##       ##     ## ##     ## ##     ## ######### ##  #### ##     ##       ##
 |   ##                 ##    ## ##     ## ##     ## ##     ## ##     ## ##   ### ##     ## ##    ##
 | ######                ######   #######  ##     ## ##     ## ##     ## ##    ## ########   ######
 |--------------------------------------------------------------------------
 | Terminal/Bash Commands
 |--------------------------------------------------------------------------
 | sudo gulp copyfile 		<= 	Runs Gulp to copy assets
 | sudo gulp 				<= 	Runs Gulp to compile assets
 |--------------------------------------------------------------------------
 |--------------------------------------------------------------------------
 |  #######                ##        #######     ###    ########   ######
 | ##     ##               ##       ##     ##   ## ##   ##     ## ##    ##
 |        ##               ##       ##     ##  ##   ##  ##     ## ##
 |  #######     #######    ##       ##     ## ##     ## ##     ##  ######
 | ##                      ##       ##     ## ######### ##     ##       ##
 | ##                      ##       ##     ## ##     ## ##     ## ##    ##
 | #########               ########  #######  ##     ## ########   ######
 |--------------------------------------------------------------------------
 |--------------------------------------------------------------------------
 | Loads - Core GULP and Plugin Preprocessors loads
 |--------------------------------------------------------------------------
 */
	var gulp = require('gulp'),
	    del = require('del'),
		sass = require('gulp-sass'),
	    less = require('gulp-less'),
	    cache = require('gulp-cache'),
	    nano = require('gulp-cssnano'),
	    jshint = require('gulp-jshint'),
	    uglify = require('gulp-uglify'),
	    rename = require('gulp-rename'),
	    concat = require('gulp-concat'),
	    notify = require('gulp-notify'),
	    imagemin = require('gulp-imagemin'),
		minifyCSS = require('gulp-clean-css'),
	    concatCss = require('gulp-concat-css'),
	    livereload = require('gulp-livereload'),
		minifyHTML = require('gulp-minify-html'),
	    lessToScss = require('gulp-less-to-scss'),
	    autoprefixer = require('gulp-autoprefixer');
/*
 |--------------------------------------------------------------------------
 |  #######                 ######   #######  ##    ## ######## ########   #######  ##       ##       ######## ########
 | ##     ##               ##    ## ##     ## ###   ##    ##    ##     ## ##     ## ##       ##       ##       ##     ##
 |        ##               ##       ##     ## ####  ##    ##    ##     ## ##     ## ##       ##       ##       ##     ##
 |  #######     #######    ##       ##     ## ## ## ##    ##    ########  ##     ## ##       ##       ######   ########
 |        ##               ##       ##     ## ##  ####    ##    ##   ##   ##     ## ##       ##       ##       ##   ##
 | ##     ##               ##    ## ##     ## ##   ###    ##    ##    ##  ##     ## ##       ##       ##       ##    ##
 |  #######                 ######   #######  ##    ##    ##    ##     ##  #######  ######## ######## ######## ##     ##
 |--------------------------------------------------------------------------
 |--------------------------------------------------------------------------
 | ASSET MANAGEMENT CONTROLLER - Choose which assets to compile when running gulp
 |--------------------------------------------------------------------------
 | 1 = ON
 | 2 = OFF
 |--------------------------------------------------------------------------
 */

	/* APP __-------------------------------------------------------------------*/
	var enable_compile_app			= 1;			// Compile App Assets?
	var enable_compile_app_css		= 0;			// Compile App SCSS & CSS?
	var enable_compile_app_js		= 1;			// Compile App JS?

	// NOTE GULP WAS MALFORMING THE SCSS SO USE THE RUBY SASS COMPILER LISTENER.

/*
 |--------------------------------------------------------------------------
 | ##                         ###     ######   ######  ######## ########  ######
 | ##    ##                  ## ##   ##    ## ##    ## ##          ##    ##    ##
 | ##    ##                 ##   ##  ##       ##       ##          ##    ##
 | ##    ##     #######    ##     ##  ######   ######  ######      ##     ######
 | #########               #########       ##       ## ##          ##          ##
 |       ##                ##     ## ##    ## ##    ## ##          ##    ##    ##
 |       ##                ##     ##  ######   ######  ########    ##     ######
 |--------------------------------------------------------------------------
 | Gulp Asset Management - Create Gulp function copyfiles
 |--------------------------------------------------------------------------
 | Copy any needed files.
 | Do a 'gulp copyfiles' after bower updates
 |--------------------------------------------------------------------------
 */
gulp.task("copyfiles", function() {

	/*
	 |--------------------------------------------------------------------------
	 | Copy jQuery Library
	 |--------------------------------------------------------------------------
	 */

	gulp.src("vendor/bower_dl/jquery/dist/jquery.min.js")
		.pipe(gulp.dest("js/vendor/"));

	gulp.src("vendor/bower_dl/jquery/dist/jquery.js")
		.pipe(gulp.dest("js/vendor/"));

	/*
	 |--------------------------------------------------------------------------
	 | Copy Modernizr Library
	 |--------------------------------------------------------------------------
	 */

	gulp.src("vendor/bower_dl/jquery/dist/jquery.min.js")
		.pipe(gulp.dest("js/vendor/"));

	gulp.src("vendor/bower_dl/jquery/dist/jquery.js")
		.pipe(gulp.dest("js/vendor/"));


	/*
	 |--------------------------------------------------------------------------
	 | Copy skrollr Library
	 |--------------------------------------------------------------------------
	 */

	gulp.src("vendor/bower_dl/skrollr/dist/skrollr.min.js")
		.pipe(gulp.dest("js/vendor/"));

	gulp.src("vendor/bower_dl/skrollr/src/skrollr.js")
		.pipe(gulp.dest("js/vendor/"));

	/*
	 |--------------------------------------------------------------------------
	 | Copy mixitup Library
	 |--------------------------------------------------------------------------
	 */

	gulp.src("vendor/bower_dl/mixitup/build/jquery.mixitup.min.js")
		.pipe(gulp.dest("js/vendor/"));

	gulp.src("vendor/bower_dl/mixitup/src/jquery.mixitup.js")
		.pipe(gulp.dest("js/vendor/"));

	/*
	 |--------------------------------------------------------------------------
	 | Copy Easter Egg Files
	 |--------------------------------------------------------------------------
	 */

	gulp.src("vendor/bower_dl/konami-astroids/basic/*.js")
		.pipe(gulp.dest("js/vendor/"));

	/*
	 |--------------------------------------------------------------------------
	 | Copy Hover.scss Library
	 |--------------------------------------------------------------------------
	 */

	gulp.src("vendor/bower_dl/hover/scss/**")
		.pipe(gulp.dest("sass/hover/"));

});

/*
 |--------------------------------------------------------------------------
 | ########                  ###    ########  ########
 | ##                       ## ##   ##     ## ##     ##
 | ##                      ##   ##  ##     ## ##     ##
 | #######     #######    ##     ## ########  ########
 |       ##               ######### ##        ##
 | ##    ##               ##     ## ##        ##
 |  ######                ##     ## ##        ##
 |--------------------------------------------------------------------------
 */

gulp.task('default', function() {

	// PROCESS APP ASSETS
	if (enable_compile_app) {


		// APP SASS/CSS
		if (enable_compile_app_css) {

			// COMPILE SASS/SCSS - APP CSS
		    gulp.src('sass/**/*.scss')
		        .pipe(sass().on('error', sass.logError))
		        .pipe(gulp.dest('sass/build/css/'));

		    // COMBINE CSS
			var cssSources = [
				'build/css/**/*.css',
				'sass/build/css/app.css'
			];

			gulp.src(cssSources)
			    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
			    .pipe(concat('style.css'))
			    .pipe(gulp.dest('css'))
			    .pipe(minifyCSS())
			    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
			    .pipe(concat('style.min.css'))
			    .pipe(gulp.dest('css'))

		}

		// APP JS
		if (enable_compile_app_js) {

			var jsSources = [
				'js/vendor/jquery.js',
				'js/vendor/skrollr.js',
				'js/vendor/jquery.mixitup.js',
				'js/vendor/konami.js',
				'js/app.js'
			];

			gulp.src(jsSources)
			    .pipe(concat('js-compiled.js'))
			    .pipe(gulp.dest('js'))
			    .pipe(concat('js-compiled.min.js'))
			    .pipe(uglify())
			    .pipe(gulp.dest('js'));

		}
	}

});








