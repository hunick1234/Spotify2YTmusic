<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { createOAuth2Platform } from "../utils/auth";

const router = useRouter();

const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
};

const clearCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

onMounted(async () => {
  const platform = getCookie("platform");
  clearCookie("platform");

  if (platform) {
    const auth = createOAuth2Platform(platform as "Spotify" | "YouTubeMusic");
    auth.getAccessToken();
    router.push("/");
  }else{
    router.push("/login");
  }
});
</script>

<template>
  <div>
    <h1>授權成功，正在跳轉...</h1>
  </div>
</template>