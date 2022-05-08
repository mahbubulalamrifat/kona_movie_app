<template>
    <v-app>
        <nav-bar></nav-bar>
        <v-main>
            <pre-loader v-if="preloader"></pre-loader>
            <div class="pa-2 mt-10">
                <router-view></router-view>
                <vue-progress-bar></vue-progress-bar>
            </div>
        </v-main>

        <!-- Back to top btn -->
        <v-btn v-scroll="onScroll" v-show="fab" fab dark fixed bottom right color="primary" @click="toTop" style="z-index:1111">
            <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>



    </v-app>
</template>

<script>
    import navBar from './pages/common/navbar.vue'
    import loader from './pages/common/loader.vue'


    export default {

        props: ['authuser'],

        components: {
            'nav-bar': navBar,
            'pre-loader': loader,
        },

        data() {
            return {
                fab: false,
                preloader: true,

            }
        },

        methods: {

            onScroll(e) {
                if (typeof window === 'undefined') return
                const top = window.pageYOffset || e.target.scrollTop || 0
                this.fab = top > 20
            },

            toTop() {
                this.$vuetify.goTo(0)
            },


        },

        mounted(){
            setTimeout(() => {
                this.preloader = false
            }, 3000);
        },


        created() {
            this.$Progress.start();
            if(this.authuser){
                this.$store.commit('setAuth', JSON.parse(this.authuser) );
            }else{

            }

            
            


            this.$Progress.finish();
        }

    }

</script>
