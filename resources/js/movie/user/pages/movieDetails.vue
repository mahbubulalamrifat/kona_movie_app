<template>
    <div>

        <v-card outlined max-width="800" class="mx-auto" v-if="allDetails">
            <v-img height="300px" width="800px" :src="imagePath+allDetails.poster_path" v-if="img == true">

                <v-card-title class="white--text d-flex justify-content-between algin-items-center">
                    <span>
                        <v-btn small color="orange white--text" @click="img =!img">
                            <v-icon left>mdi-motion-play</v-icon>
                            Watch Trailer
                        </v-btn>
                    </span>
                    <p class="ml-3">
                        {{allDetails.title}}
                    </p>
                </v-card-title>
            </v-img>

            <embed width="100%" height="300" :src="videoPath+videoLink.key" v-if="img == false">


            <v-card-title>Casts</v-card-title>

            <v-card-actions>

                <div class="d-flex flex-wrap mx-2 align-items-center">
                    <div v-for="cast in casts" :key="cast.id">
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-avatar size="60" v-if="cast.profile_path" v-bind="attrs" v-on="on">
                                    <v-img :src="imagePath+cast.profile_path"></v-img>
                                </v-avatar>
                            </template>
                            <span>{{cast.original_name}}</span>
                        </v-tooltip>

                        
                    </div>
                </div>

            </v-card-actions>

            <!-- <v-card-title>Crews</v-card-title>
            <v-card-actions>

                <div class="d-flex flex-wrap mx-2 align-items-center">
                    <div v-for="crew in crews" :key="crew.id">
                        <v-avatar size="60">
                            <v-img v-if="crew.profile_path" :src="imagePath+crew.profile_path"></v-img>
                        </v-avatar>
                    </div>
                </div>
                
            </v-card-actions> -->

            <v-card-actions @click="show = !show">
                <v-btn color="orange lighten-2" text>
                    Overview
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
            </v-card-actions>

            <v-expand-transition>
                <div v-show="show">
                    <v-divider></v-divider>

                    <v-card-text>
                        {{ allDetails.overview }}
                    </v-card-text>
                </div>
            </v-expand-transition>




        </v-card>




    </div>
</template>

<script>
    export default {


        data() {
            return {
                allDetails: this.$route.params.details,
                videoLink: '',
                img: true,
                casts: [],
                show: false,
            }
        },

        methods: {
            playTrailer(movie_id) {

                axios.get("https://api.themoviedb.org/3/movie/" + movie_id +
                    "/videos?api_key=49464736fba80789eb69d1c6a5b65743&language=en-US").then(response => {


                    response.data.results.forEach(element => {

                        if (element.type == "Trailer" && element.published_at <= new Date()
                            .toISOString()) {
                            this.videoLink = element;
                        }

                    });


                })
            },

            getCast() {
                axios.get("https://api.themoviedb.org/3/movie/" + this.allDetails.id +
                    "/credits?api_key=49464736fba80789eb69d1c6a5b65743&language=en-US").then(response => {

                    //this.crews = response.data.crew;
                    this.casts = response.data.cast;

                })
            }
        },

        created() {
            if (this.allDetails == null) {

                this.$router.go(-1);
            } else {
                this.getCast();
                this.playTrailer(this.allDetails.id);
            }
        }
    }

</script>
