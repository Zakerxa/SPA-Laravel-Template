<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8 pt-4">
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
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
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
            }
        }
    }
</script>
