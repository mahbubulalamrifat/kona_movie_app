<template>
    <div>
        <v-toolbar dark dense class="nav_color">

            <v-app-bar-title>
                <a href="/" class="text-white">
                    MOVEA
                </a>
            </v-app-bar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items class="hidden-sm-and-down mr-4">

                <v-btn small plain text link route :to="{ name: 'Dashboard'}" exact>
                    Home
                </v-btn>

                <v-btn small plain text link route :to="{ name: 'Trending'}" exact>
                    Trending
                </v-btn>

                <v-btn small plain text link route :to="{ name: 'Toprated'}" exact>
                    Top Rated
                </v-btn>


                <v-btn small plain text link route :to="{ name: 'Upcoming'}">
                    UpComing
                </v-btn>


                <v-btn small plain text link route :to="{ name: 'Watchlist'}" v-if="auth.name">
                    Watchlist
                </v-btn>


            </v-toolbar-items>

            <v-btn plain text small v-if="auth.name">{{auth.name}}</v-btn>

            <v-menu open-on-click offset-y transition="scale-transition">

                <template v-slot:activator="{ on, attrs }">

                    <v-avatar size="40" v-bind="attrs" v-on="on">
                        <v-img src="/all-assets/common/dummy.jpg"></v-img>
                    </v-avatar>

                </template>

                <v-list dense dark>
                    
                    <v-list-item @click="logout()" v-if="auth.name">
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>

                    <v-list-item @click="loginModalFunction()" v-else>
                        <v-list-item-title>Signin</v-list-item-title>
                    </v-list-item>
                </v-list>

            </v-menu>


            <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        </v-toolbar>



        <v-navigation-drawer v-model="drawer" absolute temporary dark right height="100%" style="background-color:black;">


            <v-list dense>

                <v-list-item link route :to="{ name: 'Dashboard'}" exact>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link route :to="{ name: 'Trending'}" exact>
                    <v-list-item-content>
                        <v-list-item-title>Trending</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link route :to="{ name: 'Toprated'}" exact>
                    <v-list-item-content>
                        <v-list-item-title>Top Rated</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link route :to="{ name: 'Upcoming'}" exact>
                    <v-list-item-content>
                        <v-list-item-title>Upcoming</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link route :to="{ name: 'Watchlist'}" exact v-if="auth.name">
                    <v-list-item-content>
                        <v-list-item-title>Watchlist
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
        </v-navigation-drawer>


        <!-- login modal -->
        <login-modal v-if="loginModal" :key="loginKey" @openRegister="registerModalFunction()"></login-modal>

        <!-- register modal -->
        <register-modal v-if="registerModal" :key="registerKey" @openLogin="loginModalFunction()"></register-modal>

    </div>
</template>




<script>
import login from "../auth/login.vue"
import register from "../auth/register.vue"
    export default {
        components:{
            "login-modal":login,
            "register-modal":register
        },

        data() {
            return {
                
                drawer: null,
                loginKey: 0,
                registerKey: 0,

            }
        },


        methods:{
            loginModalFunction(){

                this.registerModal = false;
                this.loginModal = true;
                this.loginKey++;
                

            },

            registerModalFunction(){

                this.loginModal = false;
                this.registerModal = true;
                this.registerKey++;
                

            }
        },

        watch: {
        },
    }

</script>


<style scoped>
    .nav_color {
        background-color: black !important;
    }

    .v-btn--active,
    .v-list-item--active {
        color: #2bed0f !important;
        background-color: transparent !important;
        text-decoration: none;
        border-bottom: 2px solid #2bed0f;
    }

    a:hover{
        text-decoration: none;
    }

</style>
