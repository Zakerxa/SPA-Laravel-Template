<template>

    <div v-if="loading" class="loading">
       <!-- Show Loading if Data not ready yet -->
       <div class="row d-flex align-items-center p-0 m-0" style="height:100vh;width:100vw;">
           <div class="col-12 text-center p-0">
               <h3 class="fw-bold">{{loadingIcon}}</h3>
           </div>
       </div>
    </div>
    <div v-else>

        <Transition appear name="fade">
          <Navigation v-if="scrollDown"/>
        </Transition>

        <router-view/>

        <Footer />
    </div>

</template>

<script>
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';
import { mapGetters } from 'vuex';
export default {
    data(){
        return{
            loadingIcon : '<Zakerxa/>',
            loading : true,
            scrollPosition : '',
            scrollDown : true
        }
    },
    components:{
      Navigation,
      Footer
    },
    created () {
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll () {
        var currentScrollPosition = window.scrollY;
        if (currentScrollPosition > this.scrollPosition) {
            if(currentScrollPosition >= 320) this.scrollDown = false;
        }else this.scrollDown = true;
        this.scrollPosition = currentScrollPosition;
       }
    },
    computed: {
       ...mapGetters(['authUser'])
    },
    watch:{
      $route(to,from){
        this.$store.dispatch('gettingAuthUser').then(()=>{
           if(!this.authUser) this.$store.commit('removeAuthorize');
        }).catch(()=>{
           if(!this.authUser) this.$store.commit('removeAuthorize');
        })
      }
    },
    mounted(){
       document.addEventListener('DOMContentLoaded', () => this.loading = false);
       this.$nextTick(()=> console.log("Render has been loaded"));
       // Fetching UserData form parent
       fetch('api/products').then(res=>res.json())
       .then(res=>{
        console.log(res)
       })
       .catch(err=>console.log(err));
    }
}
</script>

<style lang="scss">
$primary-color :  #d6f0ff;
* {
  scroll-behavior: smooth;
  padding: 0;
  margin: 0;
}

.main{
    min-height: 100vh;
}

.loading{
    background: #d6f7ff;
    z-index:10;
    position:fixed;
    height:100vh;
    width:100vw;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
