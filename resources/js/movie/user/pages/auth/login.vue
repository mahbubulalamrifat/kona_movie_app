<template>
    <div>
        <v-dialog v-model="signinModal" max-width="500px" transition="dialog-transition">

            <v-form>

                <v-card class="pb-4">
                    <v-card-title class="justify-center">
                        MOVEA Login
                    </v-card-title>
                    <v-card-text>
                        <!-- Error -->
                        <v-alert v-if="error" shaped prominent type="error" dismissible>
                            {{ errorMsg }}
                        </v-alert>


                        <form @submit.prevent="login()">

                            <v-text-field type="text" label="Email" :rules="[v => !!v || 'Email is required!']"
                                v-model="form.email" prepend-icon="mdi-account-alert-outline" required></v-text-field>
                            <div v-if="form.errors.has('email')" v-html="form.errors.get('email')" />



                            <v-text-field :type="passwordType ?'text': 'password'"
                                :append-icon="passwordType ?'mdi-eye':'mdi-eye-off'"
                                @click:append="passwordType=!passwordType" label="Password"
                                :rules="[v => !!v || 'Password is required!']" v-model="form.password"
                                prepend-icon="mdi-lock-alert-outline" required></v-text-field>
                            <div v-if="form.errors.has('password')" v-html="form.errors.get('password')" />


                            <v-btn block outlined rounded class="light-blue darken-4 text-white" type="submit">
                                <v-icon dense>
                                    mdi-login
                                </v-icon>
                                Login
                            </v-btn>

                        </form>

                    </v-card-text>

                    <div class="text-center">
                        Not registered yet ? 
                        <v-btn class="teal--text" text plain small @click="$emit('openRegister')"> 
                            <v-icon size="16" left>
                                mdi-account-plus
                            </v-icon>
                            Register
                        </v-btn>
                    </div>
                </v-card>

                

                <v-overlay :value="overlay">
                    <v-progress-circular
                        indeterminate
                        size="64"
                    ></v-progress-circular>
                </v-overlay>

            </v-form>

        </v-dialog>

    </div>
</template>


<script>
    import Form from 'vform'
    
    export default {
        data() {
            return {
                signinModal: true,

                passwordType: false,
                loading: false,
                password: null,

                error: false,
                errorMsg: '',


                // Form
                form: new Form({
                    email: '',
                    password: ''
                }),

                overlay: false,

            }
        },
        
        watch: {
            signinModal: function (e) {
                if (!e) {
                    this.form.errors.clear();
                    this.form.reset();
                    this.error = false;
                }
            },

        },
    }

</script>