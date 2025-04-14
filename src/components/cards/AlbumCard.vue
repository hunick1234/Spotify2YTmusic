<template>
  <div class="album-card card">
    <h3>{{ data.name }}</h3>
    <p><strong>Artist:</strong> {{ data.artist }}</p>
    <p><strong>Release Date:</strong> {{ data.releaseDate }}</p>
    <p><strong>Songs:</strong> {{ Object.keys(data.songs).length }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Albums } from '@/models/types';

defineProps<{ data: Albums }>();
</script>

<style scoped>
.album-card {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.album-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.album-card h3 {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: #333;
}

.album-card p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: #555;
}
</style>