<template>
    <div class="container">
        <!-- Public -->
        <div class="row justify-content-center">
            <div class="col-6 text-center pt-4 pb-4">
               Auth User : {{auth??'Unauthorize'}}
            </div>

            <div class="col-6 text-center pt-4 pb-4">
               Cookie : {{cookie??'No Cookie'}}
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
    export default {
        data(){
          return {
            cookie : ''
          }
        },
        mounted() {
            console.log('Component mounted.');
        },
        methods:{
          increment(){
            this.$store.commit('increment');
          },
          decrement(){
            this.$store.commit('decrement');
          }
        },
        computed:{
            count(){
                return this.$store.state.count
            },
            auth(){
                return this.$store.state.auth
            },
            cookie(){
               return this.$store.state.loginLimit;
            }
        },
        mounted(){
          
        }
    }
</script>
