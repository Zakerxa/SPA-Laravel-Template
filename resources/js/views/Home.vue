<template>
<div class="container">
    <!-- Public -->
    <div class="row justify-content-center">

        <div v-if="globalNoti" class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>{{globalNoti}}</strong>, See you again.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

        <div class="col-12 text-center pt-4 pb-4">
            Auth User : {{auth??'Unauthorize'}}
        </div>


        <div class="col-md-8 pt-4 pb-4">
            <div class="card">
                <div class="card-header">Example Component {{count}}</div>

                <div class="card-body">
                    I'm an example component.
                    <div class="">
                        <button class="btn btn-sm btn-primary" @click="increment">Increment</button> |
                        <button class="btn btn-sm btn-danger" @click="decrement">Decrement</button>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- Auth User -->
    <div v-if="auth" class="row justify-content-center">
        <div class="col-12 text-center">
            <h2 class="pt-5">Now you are login user</h2>
            <div class="p-2">{{authUser}}</div>
        </div>
    </div>

    <!-- Unauthorize -->
    <div v-else class="row justify-content-center">

        <div class="col-12 mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quidem quos amet laboriosam reprehenderit, quis ab cum exercitationem voluptates autem pariatur aperiam, adipisci at aspernatur labore ipsa quaerat atque qui!
        </div>

    </div>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex';

export default {
    data() {
        return {}
    },
    methods: {
        increment() {
            this.$store.commit('increment');
        },
        decrement() {
            this.$store.commit('decrement');
        }
    },
    computed: {
       ...mapGetters(['count', 'auth','authUser', 'globalNoti'])
    },
    watch:{
        $route(to,from){this.$store.commit('globalMessage',null)}
    }
}
</script>
