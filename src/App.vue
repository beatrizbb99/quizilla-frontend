<template>
  <div id="app">
    <QuizillaHeader/>
    <router-view/>
  </div>
</template>

<script>
import QuizillaHeader from '@/components/QuizillaHeader.vue'; 
export default {
  name: 'App',
  components: {
    QuizillaHeader
  }
}
</script>

<style>
.error {
    border: 2px solid red;
}
</style>
