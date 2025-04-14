<template>
  <div class="tabs">
    <div v-for="(tab, index) in tabs" :key="index" :class="['tab', { active: index === selectedTab }]"
      @click="$emit('update:tab', index)">
      <span :class="{ underline: index === selectedTab }">{{ tab }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tabs: string[];
  selectedTab: number;
}>();
defineEmits(['update:tab']);
</script>

<style scoped>
.tabs {
  display: flex;
  padding: 0;
  gap: 0.1rem;
  font-family: monospace;
}

.tab {
  position: relative;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem 0.25rem 0 0;
  cursor: pointer;
  background: #e0d8c7;
  transition: all 0.3s ease;
  clip-path: polygon(20% 0, 80% 0, 100% 100%, 0 100%);
}

.tab.active {
  background: #f5ede2;
  box-shadow: 0 -3px 0 0 #f5ede2 inset;
}

.underline {
  text-decoration: underline;
  color: purple;
}
</style>
