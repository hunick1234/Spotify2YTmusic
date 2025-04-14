<template>
  <div class="artist-card">
    <h3>{{ data.name }}</h3>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Artist } from '@/models/types';

defineProps<{ data: Artist }>();
</script>

<style scoped>
.artist-card {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.artist-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.artist-card h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #333;
}
</style>