<template>
<div class="d-md-block" style="min-height: 5px;background-color: #232;"></div>
<nav class="navbar navbar-expand-lg bg-light">

    <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar scroll</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
            <ul class="me-auto"> </ul>
            <ul class="navbar-nav me-auto my-2 my-lg-0" style="--bs-scroll-height: 100px;">
                <router-link v-for="(route,i) in router" :key="i" class="nav-link p-4 pt-2 pb-2" tag="li" active-class="active" aria-current="page" :to="route.path">
                    <b>{{route.name}}</b>
                </router-link>
            </ul>
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            <ul class="navbar-nav my-2 my-lg-0" style="--bs-scroll-height: 100px;">
                <router-link class="nav-link p-4 pt-2 pb-2 fw-bold"  active-class="active" aria-current="page" to="/login">Login</router-link>
            </ul>
        </div>
    </div>
</nav>
</template>

<script>
export default {
    data() {
        return {
            title: "<Zakerxa/>",
            navIcon: 'navbar-toggler-icon',
            navTran: 'transform: rotateZ(0deg);',
            navCheck: false,
            bsOffcanvas: '',
            router: [{
                    name: "Home",
                    path: "/"
                },
                {
                    name: "About",
                    path: "/about"
                },
                {
                    name: "Contact",
                    path: "/contact"
                }
            ]
        }
    },
    methods: {
        navigatorClick() {
            this.navCheck = !this.navCheck;
            if (this.navCheck) {
                this.navIcon = "btn-close btn-close-dark ";
                this.navTran = "transition:transform 0.5s;transform: rotateZ(90deg); "
            } else {
                this.navIcon = "navbar-toggler-icon ";
                this.navTran = "transition:transform 0.5s;transform: rotateZ(0deg);"
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.navigation {
    position: fixed;
    background: #fff;
    top: 0;
    padding: 0;
    z-index: 9999;
    width: 100%;
}

@media screen and (min-width:768px) {
    .nav-link {
        &:hover {
            transition: transform 0.2s;
            transform: rotate(10deg);
        }

        &:active {
            transition: border-bottom .2s;
            border-bottom: 3px solid #d6f0ff;
            ;
        }
    }

    .exact-active {
        font-weight: bold;
        cursor: pointer;
        border-bottom: 3px solid #d6f0ff;
        ;
    }
}
</style>
