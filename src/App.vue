<template>
  <div id="app" class="">
    <nav-bar></nav-bar>
    <div class="container flex flex-wrap  justify-between mx-auto m-10">
    <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

