require('./../../../bootstrap');
window.Vue = require('vue').default;

// Router
import router from './routes';

// Vuex File
import store from './store';


// mixin global added
import common from './common/mixin';
Vue.mixin(common);

// Vuetify
import Vuetify from 'vuetify'
Vue.use(Vuetify)

// VueProgressBar
import VueProgressBar from 'vue-progressbar';
Vue.use(VueProgressBar, {
    color: '#66FE5E',
    failedColor: 'red',
    thickness: '3px',
});

// sweetalert2
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  })
window.Swal = Swal;
window.Toast = Toast;




//vue-moment
Vue.use(require('vue-moment'));

// pagination
Vue.component('pagination', require('laravel-vue-pagination'));


Vue.component('index-component', require('../index.vue').default);



const app = new Vue({
  router,
  store,
  vuetify: new Vuetify(),

  data(){
    return{
      // For Preloader
      preloader:false
    }
  }
  
}).$mount('#app')

