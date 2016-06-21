const gulp = require('gulp'),
	rev = require('gulp-rev'),
	postcss = require('gulp-postcss'),
	cssimport = require('postcss-import'),
	cssvars = require('postcss-css-variables'),
	imagemin = require('gulp-imagemin'),
	babel = require('gulp-babel'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	jsdoc2md = require('gulp-jsdoc-to-markdown'),
	rename = require('gulp-rename'),
	shell = require('gulp-shell');
	
const path = require('path');
const outputPath = process.env.WWW_STATIC;
require('marko/node-require').install();
//const manifestPath = process.env.REV_MANIFEST;
//const manifestFolder = path.dirname(manifestPath);

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

/**
 * Build main JS files, creating sourcemaps, to js folder
 */
gulp.task('main-js', () => {
	return gulp.src([
		'./frontend/**/*.js',
		'./frontend/**/*.jsx',
		'./backend/shared/**/*.js', //shared JS with backend
		'./backend/shared/**/*.jsx', //shared JS with backend
		'!./frontend/vendor/**',
		'!./frontend/vendor-es6/**',
		'!./frontend/typings/**',
		'!./frontend/demo/**',
		'!./frontend/workers/sw.js'
	])
		.pipe(sourcemaps.init())
		.pipe(babel({
			plugins: [
				'transform-es2015-modules-systemjs',
				'transform-strict-mode',
				'transform-react-jsx'
			],
			babelrc: false
		}))
		//.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.join(outputPath, 'js')))
})

/** Copy vendor files */
gulp.task('vendor', ['vendor-es6'], () => {
	return gulp.src([
		'./frontend/vendor/**',
		'!./frontend/vendor/**/*.src.js'
	], {base: './frontend'})
		.pipe(gulp.dest(path.join(outputPath, 'js')))
})

gulp.task('vendor-es6', () => {
	return gulp.src([
		'./frontend/vendor-es6/**',
		'!./frontend/vendor-es6/**/*.src.js'
	])
		.pipe(sourcemaps.init())
		.pipe(babel({
			plugins: [
				'transform-es2015-modules-systemjs'
			],
			babelrc: false
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.join(outputPath, 'js/vendor')))
})

/** Minify sw.js and put it in root */
gulp.task('sw', () => {
	return gulp.src('./frontend/workers/sw.js')
		.pipe(uglify())
		.pipe(gulp.dest(path.join(outputPath, 'root')))
})

gulp.task('docs', () => {
	return gulp.src([
		'./frontend/**/*.js',
		'./backend/**/*.js',
		'!./frontend/vendor/**',
		'!./frontend/vendor-es6/**',
		'!./**/typings/**'
	], {base: './'})
	.pipe(jsdoc2md({'example-lang': 'js'}))
	.pipe(rename(path => {path.extname = '.md'}))
	.pipe(gulp.dest('./docs/JSDoc'))
})

/** Run all frontend script related tasks */
gulp.task('scripts', ['main-js', 'vendor', 'sw']);
	
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

/** Compile all marko files */
gulp.task('marko', shell.task([
	'markoc views/'
]))

/** Do everything */
gulp.task('build', ['marko', 'assets', 'scripts', 'styles']);

gulp.task('watch', () => {
	gulp.watch('./styles/**/*.css', ['styles'])
	gulp.watch([
		'./frontend/**/*.js',
		'./frontend/**/*.jsx',
		'./backend/shared/**/*.js', //shared JS with backend
		'./backend/shared/**/*.jsx', //shared JS with backend
		'!./frontend/vendor/**',
		'!./frontend/typings/**',
		'!./frontend/demo/**',
		'!./frontend/workers/sw.js'
	], ['main-js']);
	gulp.watch([
		'./frontend/vendor/**',
		'!./frontend/vendor/**/*.src.js'
	], ['vendor']);
	gulp.watch('./frontend/workers/sw.js', ['sw']);
	gulp.watch('./assets/images/**', ['images']);
	gulp.watch('./assets/misc/**', ['misc-assets']);
	gulp.watch([
		'./assets/**',
		'!./assets/images/**',
		'!./assets/misc/**'
	], ['other-assets']);
	gulp.watch('./views/**/*.marko', ['marko']);
})

gulp.task('test', shell.task(['mocha']))