<template>
  <div class="selector-wrapper" @wheel.prevent="onWheel">
    <div class="item-container">
      <CardRenderer v-for="(item, index) in visibleCards" :key="cardOffset + index" :type="item.type" :data="item.data"
        :focused="cardOffset + index === focusIndex" :style="getCardStyle(index)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from 'vue';
import { type Song, type Albums, type Artist, type Playlist } from "@/models/types";
import CardRenderer from '@components/cards/CardRenderer.vue';

const props = defineProps<{
  items: Array<{
    type: 'song' | 'playlist' | 'album' | 'artist';
    data: Song | Playlist | Albums | Artist;
  }>;
}>();

const focusIndex = ref(0)

function onWheel(event: WheelEvent) {
  if (event.deltaY > 0) {
    focusIndex.value = Math.min(focusIndex.value + 1, props.items.length - 1)
  } else {
    focusIndex.value = Math.max(focusIndex.value - 1, 0)
  }
}

const visibleCards = computed(() => {
  const start = Math.max(focusIndex.value - 2, 0)
  const end = Math.min(focusIndex.value + 3, props.items.length)
  return props.items.slice(start, end)
})

const cardOffset = computed(() => {
  return Math.max(focusIndex.value - 2, 0)
})

function getCardStyle(index: number) {
  const offsetFromCenter = index - (focusIndex.value - cardOffset.value)
  const baseX = offsetFromCenter * 220 // 卡片寬+間距
  const scale = offsetFromCenter === 0 ? 1.3 : 0.85
  const opacity = offsetFromCenter === 0 ? 1 : 0.3
  return {
    position: 'absolute',
    transform: `translateX(${baseX}px) scale(${scale})`,
    opacity,
    transition: 'transform 0.5s ease, opacity 0.5s ease',
    zIndex: 100 - Math.abs(offsetFromCenter),
  }
}



</script>

<style scoped>
.selector-wrapper {
  max-width: 100%;
  margin: 0 auto;
  overflow: hidden;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-container {
  position: relative;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-container::-webkit-scrollbar {
  display: none;
}
</style>