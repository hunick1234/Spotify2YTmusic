<template>
    <div class="card" :class="{ focused, unfocused: !focused }">
        <component :is="renderComponent" :data="data" />
    </div>
</template>

<script setup lang="ts">
import SongCard from '@/components/cards/SongCard.vue';
import PlaylistCard from '@/components/cards/PlaylistCard.vue';
import AlbumCard from '@/components/cards/AlbumCard.vue';
import ArtistCard from '@/components/cards/ArtistCard.vue';
import { defineProps, computed } from 'vue';
import type { Albums, Artist, Playlist, Song } from '@/models/types';

const props = defineProps<{
    type: 'song' | 'playlist' | 'album' | 'artist';
    data: Song | Playlist | Albums | Artist;
    focused: boolean;
}>();

const renderComponent = computed(() => {
    switch (props.type) {
        case 'song':
            return SongCard;
        case 'playlist':
            return PlaylistCard;
        case 'album':
            return AlbumCard;
        case 'artist':
            return ArtistCard;
        default:
            throw new Error('Unsupported card type');
    }
});
</script>

<style scoped>
.card {
    width: 10%;
    height: 1em;
    padding: 1.5rem;
    border-radius: 1rem;
    background: #1e1e1e;
    color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    transition: transform 0.3s ease, opacity 0.3s ease;
    text-align: center;
    cursor: pointer;
}

.focused {
    transform: scale(1.3);
    opacity: 1;
    background: #1db954;
    color: black;
}

.unfocused {
    transform: scale(0.85);
    opacity: 0.3;
}
</style>