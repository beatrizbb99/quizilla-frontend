<template>
  <div id="app">
    <QuizillaHeader/>
    <router-view/>
  </div>
</template>

<script>
import QuizillaHeader from '@/components/QuizillaHeader.vue'; 
import '@/styles/App.css'; 

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
