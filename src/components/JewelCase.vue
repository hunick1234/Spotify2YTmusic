<template>
    <div class="jewel-case" @mouseover="showFront = true" @mouseleave="showFront = false">
      <div v-if="!showFront" class="case-spine">
        <p>{{ title }}</p>
      </div>
      <div v-else class="case-front">
        <img :src="coverImage" alt="Album cover" />
      </div>
      <div class="case-back" v-if="showFront">
        <ul>
          <li v-for="(track, index) in tracklist" :key="index">
            {{ index + 1 }}. {{ track }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps } from 'vue';
  
  interface Props {
    coverImage: string;
    title: string;
    tracklist: string[];
  }
  
  defineProps<Props>();
  
  const showFront = ref(false);
  </script>
  
  <style scoped>
  .jewel-case {
    display: flex;
    flex-direction: column;
    width: 200px;
    border: 2px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    background: #f8f8f8;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }
  
  .jewel-case:hover {
    transform: scale(1.05) rotate(2deg);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .case-front img {
    width: 100%;
    border-bottom: 2px solid #ccc;
  }
  
  .case-spine {
    text-align: center;
    font-weight: bold;
    padding: 8px 0;
    background: #ddd;
    writing-mode: vertical-rl;
    text-orientation: upright;
  }
  
  .case-back {
    padding: 8px;
  }
  
  .case-back ul {
    list-style: none;
    padding: 0;
  }
  
  .case-back li {
    font-size: 14px;
  }
  </style>
  