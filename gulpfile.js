var gulp = require("gulp");
var sass = require("gulp-sass");

// Define tasks after requiring dependencies
function style() {
    // Where should gulp look for the sass files?
    // My .sass files are stored in the styles folder
    // (If you want to use scss files, simply look for *.scss files instead)
    return (
        gulp
            .src("assets/*.sass")
 
            // Use sass with the files found, and log any errors
            .pipe(sass())
            .on("error", sass.logError)
 
            // What is the destination for the compiled file?
            .pipe(gulp.dest("styles"))
    );
}
 
// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style;

	
function watch(){
    // gulp.watch takes in the location of the files to watch for changes
    // and the name of the function we want to run on change
    gulp.watch('assets/*.sass', style)
}
    
// Don't forget to expose the task!
exports.watch = watch


var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var minify = require('gulp-clean-css');
var rename = require('gulp-rename');


var styleConfig = {
    sassMain: 'assets/sass/style.scss',
    sassFiles: 'assets/sass/*.scss',
    cssfiles: ['assets/css/style.css'],
    dest: 'assets/css',
    autoprefixerOptions: {
        browsers: ['last 2 versions', '> 5%']
    }
};

var bootstrapConfig = {
    sassMain: 'assets/sass/bootstrap.scss',
    sassFiles: 'assets/sass//*.scss',
    cssfiles: ['assets/css/bootstrap.css'],
    dest: 'assets/css',
    autoprefixerOptions: {
        browsers: ['last 2 versions', '> 5%']
    }
};

function style() {
    return(
        gulp
        .src(styleConfig.sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix(styleConfig.autoprefixerOptions.browsers))
        .pipe(minify())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest(styleConfig.dest))
    );
}

function bootstrap() {
    return (
        gulp
        .src(bootstrapConfig.sassMain)
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix(bootstrapConfig.autoprefixerOptions.browsers))
        .pipe(gulp.dest(bootstrapConfig.dest))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(minify())
        .pipe(gulp.dest(bootstrapConfig.dest))
    );
}

function watch() {
    gulp.watch(styleConfig.sassFiles, style);
    gulp.watch(bootstrapConfig.sassFiles, bootstrap);
}

exports.watch = watch;