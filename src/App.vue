<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="app-container">
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 0 auto;
}

header {
  background: #1db954;
  color: white;
  border-radius: 10px;
}

main {
  width: 100vw;
  height: 100vh;
}
</style>
