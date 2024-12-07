<template>
  <div class="top-container">
    <div class="flex items-center space-x-[4px]">
      <Icon name="fluent:math-formula-16-filled" size="18" class="text-dark-100 dark:text-light-100" />
      <div class="font-semibold text-[20px] top-title"> NickTools</div>
    </div>
    <div class="flex items-center space-x-[16px]">
      <ColorMode></ColorMode>
      <Icon class="cursor-pointer text-dark-100 dark:text-light-100" name="flowbite:user-circle-solid" size="24"
        @click.stop="showLogin" />
    </div>
  </div>

</template>
<script setup lang="ts">
import { UserLoginPopup } from "#components"
const nuxtApp = useNuxtApp()
const showLogin = () => {
  openPopup(UserLoginPopup)
}
</script>
<style scoped>
.top-container {
  @apply p-[16px] h-[50px] w-screen bg-[#FFFFFF50] fixed top-0 backdrop-blur-sm flex justify-between z-999;
  @apply border-solid border-0 border-b-1 border-gray-100;
  @apply dark:(bg-[#1e1e1e80] text-white border-gray-500);
}

.top-title {
  font-family: PT Sans Caption;
}
</style>