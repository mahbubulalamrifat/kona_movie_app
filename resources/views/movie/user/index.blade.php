<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="Movie, Movie Trailer, Upcoming Movie, Trending Movie, New Movie, Movie Cast">
    <meta name="author" content="Md.Mahbubul Alam Rifat">
    <meta name="author" content="Md.Mahbubul Alam Rifat, mahbubulalamrifat@gmail.com">
    @include('common.movie-icon')
    <title>Movie for Enthuasias</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/movie/user/app.css') }}">
</head>
<body>
    <div id="app">
        <div v-if="preloader" class="loader">
            <div class="loader-icon">Loading...</div>
        </div>
        <index-component authuser="{{ Auth::user() }}" style="background-color: black;overflow-x:hidden;"></index-component>
    </div>
    <script src="{{ asset('js/movie/user/app.js') }}"></script>
</body>

</html>
