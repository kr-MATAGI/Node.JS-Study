'use strict'; // 코드의 안정성을 위하여 문법검사를 더 확실하게 하겠다.

import gulp from 'gulp';
import gutil from 'gulp-util';

// plug-in
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import del from 'del';

/**
 *  디렉토리 정의 
 *  이 과정은 필수가 아니지만, 이렇게 하면 코드가 간결해지고 수정하기 용이하다.
 *  Example Code는 src -> dest 로 minify 됨.
 */
const DIR = 
{
    SRC: 'src',
    DEST: 'dest'
};

const SRC =
{
    JS: DIR.SRC + '/js/*.js',
    CSS: DIR.SRC + '/css/*.css',
    HTML: DIR.SRC + '/*.html',
    IMAGES: DIR.SRC + '/images/*'
};

const DEST =
{
    JS: DIR.DEST + '/js',
    CSS: DIR.DEST + '/css',
    HTML: DIR.DEST + '/',
    IMAGES: DIR.DEST + '/images'
}


// minify java script
gulp.task('js', function() {
    return gulp.src(SRC.JS)
                .pipe(uglify())
                .pipe(gulp.dest(DEST.JS));
});

// minify css
gulp.task('css', function() {
    return gulp.src(SRC.CSS)
           .pipe(cleanCSS({compatibility: 'ie8'}))
           .pipe(gulp.dest(DEST.CSS));
});

// minify html
gulp.task('html', function() {
    return gulp.src(SRC.HTML)
                .pipe(htmlmin({collapseWhitespace: true}))
                .pipe(gulp.dest(DEST.HTML));
});

// compress images
gulp.task('images', function() {
    return gulp.src(SRC.IMAGES)
                .pipe(imagemin())
                .pipe(gulp.dest(DEST.IMAGES));
});

// clean
gulp.task('clean', async function() {
    return del.sync([DIR.DEST]);
});

/**
 * WATCH
 * 특정 디렉토리 및 파일들을 감시하고 있따가 변동이 감지 될 시, 지정한 Task를 수행.
 */
gulp.task('watch', () => {
    let watcher = {
        js : gulp.watch(SRC.JS, gulp.series('js')),
        css : gulp.watch(SRC.CSS, gulp.series('css')),
        html : gulp.watch(SRC.HTML, gulp.series('html')),
        images : gulp.watch(SRC.IMAGES, gulp.series('images'))
    };
    
    // event.type?, event.path?
    let notify = function(event) {
        gutil.log('File', gutil.colors.yellow(event), 'was', gutil.colors.magenta(event.type)); 
    };

    for(let key in watcher)
    {
        watcher[key].on('change', notify);
    }
});

// default
/**
 * Task를 열거할 때, gulp.series 인지 gulp.parallel 인지 수정한다. (직렬, 병렬 실행)
 */
gulp.task('default', gulp.series(['clean', 'js', 'css', 'html', 'images', 'watch']), function() {
    gutil.log('Gulp is running');
});