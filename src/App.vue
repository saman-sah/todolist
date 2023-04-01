<template>
  <home-componenet :screenWidth="screenWidth"/>
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'App',
  data() {
    return {
      screenWidth: 0,
    }
  },
  components: {
    'home-componenet':Home
  },
  mounted() {
    this.updateScreenWidth();
    this.onScreenResize();
  },
  methods: {
    onScreenResize() {
      window.addEventListener("resize", () => {
        this.updateScreenWidth();
      });
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    },
  },
}
</script>