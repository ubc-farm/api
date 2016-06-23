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
//require('marko/node-require').install();
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
gulp.task('frontend', ['no-transform'], () => {
	return gulp.src([
		'./frontend/**/*.js',
		'./backend/shared/**/*.js', //shared JS with backend,
		'./views/**/_*/**/*.js', 
		'!./views/_helpers/**/*', 
		'!./views/_layouts/html.js',
		'!./views/**/**.marko.js',
		'!./frontend/no-transform/**',
		'!./frontend/typings/**',
		'!./frontend/demo/**',
		'!./frontend/**/*.src.js'
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
gulp.task('no-transform', () => {
	return gulp.src([
		'./frontend/no-transform/**/*',
		'!./frontend/no-transform/**/*.src.js'
	])
		.pipe(gulp.dest(path.join(outputPath, 'js')))
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
		'!./frontend/**/vendor/**',
		'!./**/typings/**'
	], {base: './'})
	.pipe(jsdoc2md({'example-lang': 'js'}))
	.pipe(rename(path => {path.extname = '.md'}))
	.pipe(gulp.dest('./docs/JSDoc'))
})

/** Run all frontend script related tasks */
gulp.task('scripts', ['frontend', 'sw']);
	
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

gulp.task('marko-views', () => {
	return gulp.src('./views/**/*.marko')
		.pipe(gulp.dest('./bin/views'))
})

gulp.task('backend', ['marko-views'], () => {
	return gulp.src([
		'./backend/**/*.js',
		'./backend/**/*.jsx',
		'./views/**/*.js', 
		'./views/**/*.jsx',
		'**/app/**/*.js',
		'**/lib/**/*.js'
	], {base: './'})
		.pipe(sourcemaps.init())
		.pipe(babel({
			plugins: [
				'transform-es2015-modules-commonjs',
				'transform-react-jsx'
			],
			babelrc: false
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist'))
})

/** Do everything */
gulp.task('build', ['marko', 'assets', 'frontend', 'styles', 'backend']);

gulp.task('watch', () => {
	gulp.watch('./styles/**/*.css', ['styles'])
	gulp.watch([
		'./frontend/**/*.js',
		'./frontend/**/*.jsx',
		'./backend/shared/**/*.js', //shared JS with backend,
		'./views/**/_components/**', //shared React components
		'./views/**/_layouts/shell.js', 
		'./views/**/*.jsx',
		'!./views/**/_*/**/*.jsx',
		'!./frontend/typings/**',
		'!./frontend/demo/**',
		'!./frontend/**/*.src.js'
	], ['frontend']);
	gulp.watch('./frontend/workers/sw.js', ['sw']);
	gulp.watch('./assets/**', ['assets']);
	gulp.watch('./views/**/*.marko', ['marko']);
	gulp.watch([
		'./backend/**/*.js',
		'./backend/**/*.jsx',
		'./views/**/*.js', 
		'./views/**/*.jsx'
	], ['backend'])
})

gulp.task('test', shell.task(['mocha']))