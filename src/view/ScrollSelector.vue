<template>
    <ScrollSelector :items="cards" />
</template>

<script setup lang="ts">
import ScrollSelector from '@/components/ScrollSelector.vue'
import type { Song } from '@/models/types';

const cards: { type: "song"; data: Song }[] = Array.from({ length: 10 }, (_, index) => ({
    type: 'song',
    data: {
        id: `${index + 1}`,
        name: `Song ${index + 1}`,
        artist: [`Artist ${index + 1}`],
        albums: `Album ${index + 1}`,
        duration: Math.floor(Math.random() * 300) // Random duration between 0 and 300 seconds
    }
}));
</script>