import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export default new Vuex.Store({

    state : {
        auth: [],
        watchList: [],
        searchData: null,
        genreData: null,
    },

    getters : {

        getAuth(state){
            return state.auth;
        },
        getWatchList(state){
            return state.watchList;
        },
        getSearchData(state){
            return state.searchData;
            
        },
        getGenreData(state){
            return state.genreData;
            
        },
    
 
    },

    mutations : {

        // Auth User
        setAuth(state, data){
            state.auth = data;
        },

        setWatchList(state, data) {
            
            state.watchList.push(data);
        },

        setSearchData(state, data){
            state.searchData = data;
        },

        setGenreData(state, data){
            state.genreData = data;
        },
    
    },

    actions :  {
        
    },

});