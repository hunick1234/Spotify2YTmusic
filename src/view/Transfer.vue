<template>
    <div style="margin: auto;">
        <FolderTabs :tabs="['Artist', 'Playlist', 'Album']" :selected-tab="tab" @update:tab="tab = $event" />
        <div class="content">
            <div v-if="tab === 0">
                <SourceArtists />
                <TargetArtists />
            </div>
            <div v-else-if="tab === 1">
                <SourcePlaylists />
                <TargetPlaylists />
            </div>

            <div v-else-if="tab === 2">
                <SourceAlbums />
                <TargetAlbums />
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FolderTabs from '@/components/FolderTab.vue';
import SourceAlbums from '@/pages/source/SourceAlbums.vue';
import SourceArtists from '@/pages/source/SourceArtists.vue';
import SourcePlaylists from '@/pages/source/SourcePlayList.vue';
import TargetAlbums from '@/pages/target/TargetAlbums.vue';
import TargetArtists from '@/pages/target/TargetArtists.vue';
import TargetPlaylists from '@/pages/target/TargetPlayList.vue';

import { createOAuth2Platform } from '@/utils/auth';

const tab = ref(0);

async function authenticate(platform: 'Spotify' | 'YouTubeMusic') {
    const auth = createOAuth2Platform(platform);
    await auth.login();
}
</script>

<style>
.content {
    background: #f5ede2;
}
</style>