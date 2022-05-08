const mix = require('laravel-mix');

// Main CSS
mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .sourceMaps();



// *********Start movie *********Start


//movie user JS 
mix.js('resources/js/movie/user/js/app.js', 'public/js/movie/user/app.js')
    .vue();
//movie user CSS 
mix.styles([
        'resources/css/common/preloader.css',
        'resources/css/movie/user/style.css',
    ], 'public/css/movie/user/app.css');

// *********End movie *********End
