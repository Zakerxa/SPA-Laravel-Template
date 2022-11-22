<template>
    <div class="container">
      <div class="row d-flex align-items-center justify-content-center" style="min-height:80vh">
        <div class="col-12 text-center">
            <h2>This is about page</h2>
            <p>{{authUser}}</p>
        </div>
      </div>
    </div>
  </template>

  <script>
import { mapGetters } from 'vuex';
  export default {
    computed: mapGetters(['count', 'auth','authUser', 'globalNoti']),
  }
  </script>

  <style>

  </style>
