<template>
  <div class="song-card">
    <h3>{{ data.name }}</h3>
    <p><strong>Artist:</strong> {{ data.artist.join(', ') }}</p>
    <p><strong>Album:</strong> {{ data.albums }}</p>
    <p><strong>Duration:</strong> {{ formatDuration(data.duration) }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Song } from '@/models/types';

defineProps<{ data: Song }>();

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
</script>

<style scoped>
.song-card {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.song-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.song-card h3 {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: #333;
}

.song-card p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: #555;
}
</style>