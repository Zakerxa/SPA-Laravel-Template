<template>
<div class="container">
    <div class="row justify-content-center d-flex align-items-center" style="min-height:85vh">
        <div class="col-11 col-sm-8 col-md-6 col-lg-4 text-center">
            <form v-if="stateOne" class="card p-3 pt-4 pb-4">
                <h3 class="fw-bold pb-3">Register</h3>
                <p v-if="errors" class="alert alert-danger small p-2">{{errors}}</p>
                <div class="form-floating mb-3">
                    <input v-model="form.username" type="email" class="form-control" id="username" placeholder="Username" />
                    <label for="username">Username</label>
                </div>
                <div class="form-floating mb-3">
                    <input v-model="form.email" type="email" class="form-control" id="email" placeholder="name@example.com" />
                    <label for="email">Email address</label>
                </div>
                <div class="mt-2">
                    <button @click="stateOne=false" class="btn btn-primary w-100" type="button">Next</button>
                </div>
            </form>
            <form v-else @submit.prevent="register" class="card p-3 pt-4 pb-4">
                <h3 class="fw-bold pb-3">Register</h3>
                <div class="form-floating mb-3">
                    <input v-model="form.phone" type="phone" class="form-control" id="Phone" placeholder="Phone" />
                    <label for="Phone">Phone</label>
                </div>
                <div class="form-floating mb-3">
                    <input v-model="form.password" type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                    <label for="floatingPassword">Password</label>
                </div>
                <div class="mt-2">
                    <button @click="register" class="btn btn-success w-100" type="button">Register</button>
                </div>
                <div class="mt-2">
                    <button @click="stateOne=true" class="btn btn-dark w-100" type="button">Back</button>
                </div>
            </form>
        </div>
    </div>
</div>
</template>


<script>
import axios from 'axios';
export default {
    data() {
        return {
            registerLoading : false,
            form:{
                username: 'Zin Min Htet',
                email : 'a@gmail.com',
                phone : '09687717767',
                password:'123'
            },
            stateOne: true,
            errors : ''
        }
    },
    methods:{
        register(e){
            e.preventDefault();
            this.registerLoading = true;
            axios.get('/sanctum/csrf-cookie').then(response => {
                fetch('/api/user/register', {
                    method: 'post',
                    headers: {
                        "Accept" : 'application/json',
                        "Content-Type" : 'application/json',
                        "X-CSRF-Token": this.csrfToken
                    },
                    credentials: "same-origin",
                    body: JSON.stringify(this.form)
                })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    if(res.response == 'success') this.authRedirect(res.token);
                    else this.clearData(res.errors);
                })
                .catch(err => this.clearData(err.errors))
            });
        },
        authRedirect (token) {
            this.registerLoading = false;
            this.clearData();
            this.$router.push(this.$route.query.redirect || '/login')
        },
        clearData(res) {
            this.registerLoading = false;
            this.forms = {};
            if(res){
                res.password ? this.errors = res.password[0] : '';
                res.email ? this.errors = res.email[0] : '';
                res.username ? this.errors = res.username[0] : '';
                res.phone ? this.errors = res.phone[0] : '';
            }
            else this.errors = '';
            this.stateOne = true;
        },
    }
}
</script>


<style></style>
