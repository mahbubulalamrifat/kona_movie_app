<template>
    <div>
        <div>
            <div class="d-flex align-items-center justify-content-between">
                <div class="primary--text h3 ma-4">TRENDING NOW</div>
                <v-btn @click="$router.push({name: 'Trending'})" small color="primary">
                    <v-icon left> mdi-movie-open-play</v-icon>View All
                </v-btn>
            </div>
            <div class="trending">
                <div class="d-flex">
                    <v-col cols="12" lg="3" md="6" sm="6" v-for="(movies, index) in resultsTrending.slice(0,10)"
                        :key="index">
                        <v-skeleton-loader class="mx-auto" type="image, card-heading, list-item, list-item-three-line"
                            v-if="dataFetching == true"></v-skeleton-loader>
                        <v-card v-if="dataFetching == false">
                            <v-img :src="imagePath+movies.poster_path" height="250"></v-img>

                            <v-card-title>
                                <span class="font-weight-bold text-no-wrap"> {{movies.title}} </span>
                            </v-card-title>
                            <v-card-subtitle>
                                <span class="primary--text">
                                    Release Date: {{movies.release_date}}
                                </span>
                            </v-card-subtitle>

                            <v-card-text>
                                <div class="d-flex align-items-center">
                                    <v-rating :value="movies.vote_average" color="amber" length="10" dense
                                        half-increments readonly size="14"></v-rating>

                                    <div class="grey--text ms-4">
                                        {{movies.vote_average}} ({{movies.vote_count}})
                                    </div>
                                </div>
                            </v-card-text>

                            <!-- <v-divider class="mx-4"></v-divider>
                        <v-card-title>Genres</v-card-title>

                        <v-card-text>
                            <v-chip-group column>
                                <v-chip>5:30PM</v-chip>

                            </v-chip-group>
                        </v-card-text> -->

                        </v-card>
                    </v-col>
                </div>
            </div>
        </div>

        <div>
            <div class="d-flex align-items-center justify-content-between">
                <div class="teal--text h3 ma-4">TOPRATED</div>
                <v-btn @click="$router.push({name: 'Toprated'})" small color="teal" class="white--text">
                    <v-icon left> mdi-movie-open-play</v-icon>View All
                </v-btn>
            </div>
            <div style="overflow-x:auto">
                <div class="d-flex">
                    <v-col cols="12" lg="3" md="6" sm="6" v-for="(movies, index) in resultsToprated.slice(0,10)"
                        :key="index">
                        <v-skeleton-loader class="mx-auto" type="image, card-heading, list-item, list-item-three-line"
                            v-if="dataFetching == true"></v-skeleton-loader>
                        <v-card v-if="dataFetching == false">
                            <v-img :src="imagePath+movies.poster_path" height="250"></v-img>

                            <v-card-title>
                                <span class="font-weight-bold text-no-wrap"> {{movies.title}} </span>
                            </v-card-title>
                            <v-card-subtitle>
                                <span class="primary--text">
                                    Release Date: {{movies.release_date}}
                                </span>
                            </v-card-subtitle>

                            <v-card-text>
                                <div class="d-flex align-items-center">
                                    <v-rating :value="movies.vote_average" color="amber" length="10" dense
                                        half-increments readonly size="14"></v-rating>

                                    <div class="grey--text ms-4">
                                        {{movies.vote_average}} ({{movies.vote_count}})
                                    </div>
                                </div>
                            </v-card-text>

                            <!-- <v-divider class="mx-4"></v-divider>
                            <v-card-title>Genres</v-card-title>

                            <v-card-text>
                                <v-chip-group column>
                                    <v-chip>5:30PM</v-chip>

                                </v-chip-group>
                            </v-card-text> -->

                        </v-card>
                    </v-col>
                </div>
            </div>
        </div>

        <div>
            <div class="d-flex align-items-center justify-content-between">
                <div class="orange--text h3 ma-4">UPCOMING</div>
                <v-btn @click="$router.push({name: 'Upcoming'})" small color="orange" class="white--text">
                    <v-icon left> mdi-movie-open-play</v-icon>View All
                </v-btn>
            </div>
            <div style="overflow-x:auto">
                <div class="d-flex">
                    <v-col cols="12" lg="3" md="6" sm="6" v-for="(movies, index) in resultsUpcoming" :key="index">
                        <v-skeleton-loader class="mx-auto" type="image, card-heading, list-item, list-item-three-line"
                            v-if="dataFetching == true"></v-skeleton-loader>
                        <v-card v-if="dataFetching == false">
                            <v-img :src="imagePath+movies.poster_path" height="250"></v-img>

                            <v-card-title>
                                <span class="font-weight-bold text-no-wrap"> {{movies.title}} </span>
                            </v-card-title>
                            <v-card-subtitle>
                                <span class="primary--text">
                                    Release Date: {{movies.release_date}}
                                </span>
                            </v-card-subtitle>

                            <v-card-text>
                                <div class="d-flex align-items-center">
                                    <v-rating :value="movies.vote_average" color="amber" length="10" dense
                                        half-increments readonly size="14"></v-rating>

                                    <div class="grey--text ms-4">
                                        {{movies.vote_average}} ({{movies.vote_count}})
                                    </div>
                                </div>
                            </v-card-text>

                            <!-- <v-divider class="mx-4"></v-divider>
                            <v-card-title>Genres</v-card-title>

                            <v-card-text>
                                <v-chip-group column>
                                    <v-chip>5:30PM</v-chip>

                                </v-chip-group>
                            </v-card-text> -->

                        </v-card>
                    </v-col>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    export default {
        data() {
            return {


            }
        },

        methods: {

        },

        mounted() {
            this.getMovieTrending();
            this.getMovieToprated();
            this.getMovieUpcoming();
        }
    }

</script>

<style scoped>
    .trending {
        overflow-x: auto;
    }

    .trending::-webkit-scrollbar {
        width: 20px;
    }

    .trending::-webkit-scrollbar-track {
        background: #ddd;
    }

    .trending::-webkit-scrollbar-thumb {
        background: #1976D2;
    }

</style>
