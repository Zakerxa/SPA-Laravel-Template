<template>
<div class="container">

    <div class="row justify-content-center d-flex align-items-center" style="min-height:85vh">

        <div class="col-11 col-sm-8 col-md-6 col-lg-4 text-center position-relative">
            <div v-show="loginLoading" class="overlayLoading">
                <div class="row">
                    <p class="text-muted">Loading . . .</p>
                </div>
            </div>
            <form @submit.prevent="login" class="card p-3 pt-4 pb-4">
                <h3 class="fw-bold pb-3">Login</h3>
                <p v-if="errors" class="alert alert-danger small p-2">{{errors}}</p>
                <div class="form-floating mb-3">
                    <input type="email" v-model="email" @keyup="checkPass" class="form-control" id="floatingInput" placeholder="name@example.com" required/>
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating">
                    <input :type="checkPassword" v-model="password" @keyup="checkPass" class="form-control" id="floatingPassword" placeholder="Password" autofocus="false" autocomplete="off" required />
                    <font-awesome-icon v-show="showicon" @click="eyecheck()" :icon="checkIcon" class="text-end position-absolute pt-2 pb-2" style="margin-right: 10px;cursor:pointer;bottom:5px;right:0;"></font-awesome-icon>
                    <label for="floatingPassword">Password</label>
                </div>
                <div class="mt-3">
                    <button :disabled="disPassword" class="btn btn-primary w-100" type="submit">Login</button>
                </div>
                <div class="mt-2">
                    <router-link class="btn btn-dark w-100" to="/register">Register</router-link>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal SuccessForm -->
    <div class="col-12">
        <div class="modal fade" id="modalDelSuccessForm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content boxshadow border-0">
                    <div class="modal-header">
                        <h3 class="modal-title fs-5 fw-bold" style="letter-spacing:1px;" id="staticBackdropLabel">
                            <font-awesome-icon icon="fa-solid fa-check-circle" class="text-success" /> Successfully Deleted. </h3>
                    </div>
                    <div class="modal-body">
                        <div class="col-12">
                            <p class="text-muted pt-2">You can contact me anytime via this form.</p>
                        </div>
                        <button type="button" data-bs-dismiss="modal" class="btn readyFormDel">Got it</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>

export default {
    data() {
        return {
            showicon : false,
            loginLoading: false,
            checkPassword: 'password',
            checkIcon: 'fa-solid fa-eye-slash',
            checkState: true,
            disPassword: true,
            password: 'karito',
            email : 'e@gmail.com',
            errors : ''
        }
    },
    methods: {
        eyecheck() {
            this.checkState = !this.checkState;
            if (this.checkState) {
                this.checkPassword = 'password';
                this.checkIcon = 'fa-solid fa-eye-slash';
            } else {
                this.checkPassword = 'text';
                this.checkIcon = 'fa-solid fa-eye';
            }
        },
        checkPass() {
            if(this.password.length >= 1){
                this.disPassword = false;
                this.showicon = true;
            } else {
                this.disPassword = true;
                this.showicon = false;
            }
        },
        login(e) {
            if (this.disPassword) return;
            e.preventDefault();
            this.loginLoading = true;

            this.$store.dispatch('login',{email:this.email,password:this.password})
            .then(() => this.authRedirect())
            .catch(() => this.clearData())
        },
        authRedirect (token) {
            this.loginLoading = false;
            if(this.$store.state.auth){
              this.$store.commit('updateAuthorize');
              this.clearData();
              this.$router.push(this.$route.query.redirect || '/')
            }
        },
        clearData() {
            this.loginLoading = false;
            this.showicon = false;
            this.password = '';
            this.email = '';
        }
    },
    computed:{
        errors(){
            return this.$store.state.loginError;
        }
    }
}
</script>

<style lang="scss">
.overlayLoading {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 9999;
    border: none;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.749);

    div {
        justify-content: center;
        position: absolute;
        align-items: center;
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
    }
}
</style>
