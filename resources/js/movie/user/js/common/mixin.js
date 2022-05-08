import axios from "axios";
import {
    mapGetters
} from 'vuex'

import auth from '../../js/common/auth'


import {
    debounce
} from './../../../../helpers'

export default {
    data() {
        return {
            // api
            api_key: '49464736fba80789eb69d1c6a5b65743',
            api_url: 'https://api.themoviedb.org',
            // search
            search: '',

            // from to
            from_date: '',
            to_date: '',

            // image path
            imagePath: 'https://image.tmdb.org/t/p/original',

            // videopath        
            videoPath: 'https://www.youtube.com/embed/',

            // all genre
            genres: [],


            resultsToprated: [],
            resultsTrending: [],
            resultsUpcoming: [],

            // initial page
            page: 1,

            dataFetching: true,

            // for search by genre
            genreId: [],

            loginModal: false,
            registerModal: false,

            watchItem: [],

            // scroll trigger
            showloader: false,
        }
    },

    methods: {

        ...auth,



        // getGenres
        getGenres() {
            axios.get(this.api_url + "/3/genre/movie/list?api_key=" + this.api_key + "&language=en-US").then(response => {
                this.genres = response.data.genres
            })
        },


        // getResults
        getResults() {
            this.dataFetching = true;
            axios.get(this.api_url + '/3/search/movie?api_key=' + this.api_key + '&query=' + this.search).then(response => {

                this.$store.commit('setSearchData', response.data.results);

            });
            this.dataFetching = false;
        },

        // search by date range
        getByDaterange() {
            if (this.from_date != '' && this.to_date != '') {

                axios.get(this.api_url + '/3/discover/movie?api_key=' + this.api_key + '&primary_release_date.gte=' + this.from_date + '&primary_release_date.lte=' + this.to_date + '').then(response => {
                    this.$store.commit('setSearchData', response.data.results);
                })

            }

        },


        // getResults
        getResultsByGenre(id) {
            this.dataFetching = true;
            this.genreId.push(id);
            axios.get(this.api_url + '/3/discover/movie?api_key=' + this.api_key + '&&with_genres=' + this.genreId).then(response => {

                this.$store.commit('setGenreData', response.data.results);
            })
            this.dataFetching = false;
        },

        pageCount() {
            return Math.ceil(this.totalResults/this.maxPerPage);
        },

        getMovieTrending() {
            this.dataFetching = true;

            axios.get(
                    this.api_url + '/3/trending/movie/day?api_key=' + this.api_key + '&page=' +
                    this.page)
                .then(
                    response => {
                        if (this.page > 1) {
                            this.resultsTrending.push(...response.data.results);
                        } else {
                            this.resultsTrending = response.data.results;
                        }
                        this.dataFetching = false;
                        this.totalResults = response.data.total_results
                    });
        },

        getMovieToprated() {

            this.dataFetching = true;

            axios.get(this.api_url + '/3/movie/top_rated?api_key=' + this.api_key + '&page=' + this.page)
                .then(
                    response => {
                        if (this.page > 1) {
                            this.resultsToprated.push(...response.data.results);
                        } else {
                            this.resultsToprated = response.data.results;
                        }
                    })

            this.dataFetching = false;

        },


        getMovieUpcoming() {

            this.dataFetching = true;

            axios.get(this.api_url + '/3/movie/upcoming?api_key=' + this.api_key + '&page=' + this.page)
                .then(
                    response => {
                        if (this.page > 1) {
                            this.resultsUpcoming.push(...response.data.results);
                        } else {
                            this.resultsUpcoming = response.data.results;
                        }
                    })

            this.dataFetching = false;

        },

        // add to watchlist
        addWatchList(movie) {
            if (this.auth.name) {

                axios.post('/watchlist/store/' + movie.id).then(response => {
                    
                    Toast.fire({
                        icon: response.data.icon,
                        title: response.data.msg
                    });

                })
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'You have to login first'
                });
            }

        },

        // remove from watchlist
        removeWatchList(id) {

            axios.delete('/watchlist/remove/' + id).then(response => {
                if (response.status == 200) {
                    Toast.fire({
                        icon: 'success',
                        title: 'Removed From Watchlist '
                    });

                    this.getWatchList();
                }

            });


        },


        getWatchList() {
            if (!this.auth.name) {
                this.$router.push({
                    name: 'Trending',
                })
            } else {


                this.watchData = [];
                axios.get('/watchlist/index').then(response => {
                    response.data.forEach(element => {

                        axios.get(this.api_url + '/3/movie/' + element.movie_id + '?api_key=' + this.api_key + '&language=en-US').then(res => {
                            this.watchData.push(res.data);
                        })
                    });

                });
            }

        }


        // End Methods
    },

    watch: {

        //Excuted When make change value 
        paginate: function (value) {
            this.$Progress.start();
            this.getResults();
            this.$Progress.finish();
        },


        search: debounce(function (value) {
            this.$Progress.start();
            this.getResults();
            this.$Progress.finish();
        }, 1000),

        from_date: function (value) {
            this.$Progress.start();
            this.getByDaterange();
            this.$Progress.finish();
        },

        to_date: function (value) {
            this.$Progress.start();
            this.getByDaterange();
            this.$Progress.finish();
        },

    },

    computed: {

        // map this.count to store.state.count getLoading 
        ...mapGetters({
            'auth': 'getAuth',
            'userWatchList': 'getWatchList',
            'searchData': 'getSearchData',
            'genreData': 'getGenreData',
        }),

    },



}
