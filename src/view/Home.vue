<script setup lang="ts">
import { createOAuth2Platform } from '../utils/auth';




</script>

<template>
  <div class="brutalist-container">
    <div class="header-block">
      <h1>Welcome to Spotify2YTmusic</h1>
    </div>

    <div class="info-block">
      <p>Transfer your playlists seamlessly between Spotify and YouTube Music.</p>
    </div>

    <div class="button-container">
      <router-link to="/transfer" class="brutalist-button transfer">Start Transfer</router-link>
    </div>
  </div>
</template>

<style scoped>
.brutalist-container {
  background: #ffffff;
  padding: 2rem;
  border: 4px solid #000000;
  box-shadow: 12px 12px 0px #000000;
  margin: 2rem;
}

.header-block {
  background: #000000;
  color: #ffffff;
  padding: 1rem;
  margin-bottom: 2rem;
  transform: rotate(-1deg);
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 2rem 0;
}

.brutalist-button {
  background: #ff0000;
  color: #ffffff;
  border: 3px solid #000000;
  padding: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transform: rotate(1deg);
  transition: transform 0.2s;
}

.brutalist-button:hover {
  transform: rotate(-1deg) scale(1.05);
  box-shadow: 8px 8px 0px #000000;
}

.brutalist-button.transfer {
  background: #00ff00;
  color: #000000;
  border: 3px solid #000000;
  padding: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transform: rotate(1deg);
  transition: transform 0.2s;
}

.brutalist-button.transfer:hover {
  transform: rotate(-1deg) scale(1.05);
  box-shadow: 8px 8px 0px #000000;
}

.info-block {
  background: #ffff00;
  border: 3px solid #000000;
  padding: 1rem;
  transform: rotate(1deg);
  margin-top: 2rem;
}

.info-block p {
  font-size: 1.2rem;
  font-weight: bold;
  color: #000000;
  margin: 0;
}
</style>
