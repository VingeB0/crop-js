'use strict;'
var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		}
	});
});

gulp.task('sass', function(){
  return gulp.src('app/sass/*.sass')
  	.pipe(plumber())
    .pipe(sass({
    	outputStyle: 'expanded'
    }))
    .pipe(autoprefixer({
    	browsers: ['last 2 versions'],
    	cascade: false
    }))
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.reload({
		stream: true
	}))
});

gulp.task('watch', ['browser-sync','sass'], function(){
	gulp.watch('app/sass/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/*.js', browserSync.reload);
});

gulp.task('default', ['watch', 'browser-sync']);