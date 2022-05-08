<template>
    <div>

        <genre-component></genre-component>

        <v-row>
            <v-col cols="12" lg="3" md="6" sm="6" v-for="movies in resultsToprated" :key="movies.id">
                <v-skeleton-loader class="mx-auto" type="image, card-heading, list-item, list-item-three-line"
                    v-if="dataFetching == true">
                </v-skeleton-loader>

                <v-hover v-else>
                    <template v-slot:default="{ hover }">

                        <v-card>
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
                                    <v-rating :value="movies.vote_average" color="amber" length="10" dense half-increments
                                        readonly size="14"></v-rating>

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

                            <v-fade-transition>
                                <v-overlay v-if="hover" absolute color="#036358">
                                    <div class="d-flex flex-column justify-content-center align-items-center">
                                        <v-btn @click="showDetails(movies)">View Details</v-btn>
                                        or,
                                        <v-btn small color="indigo" class="mt-3 white--text" @click="addWatchList(movies)">
                                            <v-icon left>mdi-star</v-icon> Add to Watchlist
                                        </v-btn>

                                        <!-- <v-btn small color="error" class="mt-3 white--text" @click="removeWatchList(movies)" v-else>
                                                <v-icon left>mdi-star</v-icon> Remove from Watchlist
                                            </v-btn> -->
                                    </div>
                                </v-overlay>
                            </v-fade-transition>

                        </v-card>
                    </template>
                </v-hover>

            </v-col>
        </v-row>

        <div class="my-3 text-center">
            <div ref="infinitescrolltrigger" id="scoll-trigger"></div>
             <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
                v-if="showloader"
                class="mx-auto"
                ></v-progress-circular>
        </div>

    </div>
</template>

<script>
    import genre from "../genre.vue"
    export default {
        components: {
            "genre-component": genre,
        },

        methods: {

            showDetails(data) {
                this.$router.push({
                    name: 'Details',
                    params: {
                        details: data
                    }
                })
            },


            scrollTrigger() {
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.intersectionRatio > 0) {
                            this.showloader = true;
                            setTimeout(() => {
                                this.page += 1;
                                this.getMovieToprated();
                                this.showloader = false;
                            }, 2000);
                        }
                    });
                });
                observer.observe(this.$refs.infinitescrolltrigger);
            
                
            }
        },

        mounted(){
            setTimeout(() => {
                this.scrollTrigger();
            }, 2000);
            
        },

        created() {

           this.getMovieToprated();

        },

        watch: {
            searchData: function (e) {

                if (e) {
                    this.resultsToprated = e;
                }

            },

            genreData: function (e) {

                if (e) {
                    this.resultsToprated = e;
                }

            }
        }


    }

</script>
