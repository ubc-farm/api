const gulp = require('gulp'),
	postcss = require('gulp-postcss'),
	cssimport = require('postcss-import'),
	cssvars = require('postcss-css-variables'),
	imagemin = require('gulp-imagemin'),
	jsdoc2md = require('gulp-jsdoc-to-markdown'),
	rename = require('gulp-rename')
	
const path = require('path');
const outputPath = process.env.WWW_STATIC;

/** 
 * Compile CSS with postcss-import and postcss-css-variables,
 * then output to the static folder.
 */
gulp.task('styles', () => {
	return gulp.src([
		'./styles/**/*.css',
//		'!./styles/utils/*.css'
	], {base: './styles'})
//		.pipe(postcss([cssimport(), cssvars()]))
		.pipe(gulp.dest(path.join(outputPath, 'css')))
})

gulp.task('docs', () => {
	return gulp.src([
		'./frontend/**/*.js',
		'./backend/**/*.js',
		'!./frontend/**/vendor/**',
		'!./**/typings/**'
	], {base: './'})
	.pipe(jsdoc2md({'example-lang': 'js'}))
	.pipe(rename(path => {path.extname = '.md'}))
	.pipe(gulp.dest('./docs/JSDoc'))
})
	
/** Minify images and copy to static */
gulp.task('images', () => {
	return gulp.src('./assets/images/**')
		.pipe(imagemin())
		.pipe(gulp.dest(path.join(outputPath, 'assets/images')))
})

/** Copy misc assets to root folder */
gulp.task('misc-assets', () => {
	return gulp.src('./assets/misc/**', {buffer: false})
		.pipe(gulp.dest(path.join(outputPath, 'root')))
})

/** Copy other assets to static folder */
gulp.task('other-assets', () => {
	return gulp.src([
		'./assets/**',
		'!./assets/images/**',
		'!./assets/misc/**'
	])
		.pipe(gulp.dest(path.join(outputPath, 'assets')))
})

/** Run all asset related tasks */
gulp.task('assets', ['images', 'misc-assets', 'other-assets']);

gulp.task('marko-views', () => {
	return gulp.src('./views/**/*.marko')
		.pipe(gulp.dest('./bin/views'))
})

gulp.task('watch', () => {
	gulp.watch('./styles/**/*.css', ['styles'])
	gulp.watch('./assets/**', ['assets']);
})