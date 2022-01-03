<script setup lang="ts">
import DemoContainer from './components/DemoContainer.vue'
</script>

<template lang="pug">
h1 Core Invenio Store
pre.code-block {{ $invenio }}
h1 Current Invenio App Config
pre.code-block {{ $invenioConfig }}
DemoContainer
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
