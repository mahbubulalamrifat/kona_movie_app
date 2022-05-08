import axios from "axios";

export default {
    // Login
    login() {
        this.overlay = true
        this.form.post('/auth/login').then(response => {

            if (response.status == 200) {
                Toast.fire({
                    icon: 'success',
                    title: response.data.msg
                });
            }

            this.overlay = false;
            this.loginModal = false;
            location.reload();

        }).catch(error => {
            this.overlay = false;

            Toast.fire({
                icon: 'error',
                title: 'Invalid Credentials'
            });
            
        })
    },


    register() {
        this.overlay = true;
        this.form.post('/auth/register').then(response => {

            if (response.status == 200) {
                Toast.fire({
                    icon: 'success',
                    title: response.data.msg
                });
            }
            this.overlay = false;
            this.registerModal = false;
            location.reload();
        })
    },


    logout() {
        axios.post('/auth/logout').then(response => {
            if (response.status == 200) {
                Toast.fire({
                    icon: 'success',
                    title: response.data.msg
                });
            }

            location.reload();

        })
    }
}
