<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout name="baselayout">
    <NuxtPage></NuxtPage>
    <Toast />
  </NuxtLayout>
</template>
<script setup lang="ts">
</script>
<style>
html,
body {
  margin: 0 !important;
  padding: 0 !important;
}

* {
  box-sizing: border-box !important;
}

.dark body {
  @apply bg-[#1e1e1e] text-white;
}
</style>