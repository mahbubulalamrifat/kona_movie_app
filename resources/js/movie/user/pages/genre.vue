<template>
    <div>
        <div class="d-flex flex-wrap jsutify-content-between justify-content-center">

            <div v-for="genre in genres" :key="genre.id">
                <v-btn-toggle multiple class="mx-2 my-2" outlined rounded color="red">
                    <v-btn small outlined color="red" rounded @click="getResultsByGenre(genre.id)">
                        {{genre.name}}
                    </v-btn>
                </v-btn-toggle>
            </div>

        </div>


        <v-row class="mt-3">
            <v-col cols="12" lg="4">
                <v-text-field placeholder="search by title" background-color="white" filled dense v-model="search"
                    clearable prepend-inner-icon="mdi-magnify" hide-details></v-text-field>
            </v-col>

            <v-col cols="6" lg="4">
                <v-menu v-model="menu" min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="from_date" placeholder="From Date" prepend-inner-icon="mdi-calendar-month" readonly
                            v-bind="attrs" v-on="on" clearable background-color="white" filled dense hide-details></v-text-field>
                    </template>

                    <v-date-picker v-model="from_date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                            Cancel
                        </v-btn>
                    </v-date-picker>
                </v-menu>
            </v-col>

            <v-col cols="6" lg="4">
                <v-menu v-model="menu2" min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="to_date" placeholder="To Date" prepend-inner-icon="mdi-calendar-month" readonly
                            v-bind="attrs" v-on="on" clearable background-color="white" filled dense hide-details></v-text-field>
                    </template>

                    <v-date-picker v-model="to_date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu2 = false">
                            Cancel
                        </v-btn>
                    </v-date-picker>
                </v-menu>
            </v-col>
        </v-row>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                menu: '',
                menu2: '',

                expand: false,
            }
        },

        created() {
            this.getGenres();
        }
    }

</script>


<style scoped>
.datetime-picker input[data-v-a46a390c] {

  height: 38px;
}
</style>
