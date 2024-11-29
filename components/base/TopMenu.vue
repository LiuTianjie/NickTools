<template>
  <div class="top-container">
    <div class="flex items-center space-x-[4px]">
      <Icon name="fluent:math-formula-16-filled" size="18" style="color: black;" />
      <div class="font-semibold text-[20px] top-title"> NickTools</div>
    </div>
    <div class="flex items-center space-x-[8px]">
      <Icon class="cursor-pointer" name="duo-icons:bell-badge" size="26" style="color: black" @click.stop="toGithub" />
      <Icon class="cursor-pointer" name="uil:github" size="32" style="color: black" @click.stop="toGithub" />
    </div>
  </div>

</template>
<script setup lang="ts">
const toGithub = () => {
  window.open('https://github.com/LiuTianjie')
}
</script>
<style scoped>
.top-container {
  @apply p-[16px] h-[50px] w-screen bg-[#FFFFFF50] fixed top-0 backdrop-blur-sm flex justify-between z-999;
  @apply border-solid border-0 border-b-1 border-gray-100;
}

.top-title {
  font-family: PT Sans Caption;
}
</style>