'use strict';

var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var runTimestamp = Math.round(Date.now()/1000);

/**
 * string to unicodes
 *
 * @param  {string} str string
 * @return {Array}      unicodes
 */
function string2unicodes(str) {
	return str.split('').map(function (text) {
		return text.charCodeAt(0);
	});
}

gulp.task("default",function() {
    return gulp.src(['./icons/*.svg'])
    .pipe(iconfont({
      fontName: 'nex-iconfont', // required
      //prependUnicode: true, // recommended option
      formats: ['ttf', 'eot', 'woff', 'svg'], // default, 'woff2' and 'svg' are available
      timestamp: runTimestamp, // recommended to get consistent builds when watching files
    }))
      .on('glyphs', function(glyphs, options) {
        // CSS templating, e.g.
		glyphs.forEach(function(item){
			item.unicode = item.unicode[0].charCodeAt(0);
			//console.log('unicode:', string2unicodes(item.unicode[0]))	
		});
        console.log(glyphs, options);
      })
    .pipe(gulp.dest('./fonts/'));
});