<template>
  <div class="top-container">
    <div class="flex items-center space-x-[4px]">
      <Icon name="fluent:math-formula-16-filled" size="18" class="text-dark-100 dark:text-light-100" />
      <div class="font-semibold text-[20px] top-title"> NickTools</div>
    </div>
    <div class="flex items-center space-x-[16px]">
      <ColorMode></ColorMode>
      <div v-if="user.data">{{ user.data?.account }}</div>
      <Icon v-else class="cursor-pointer text-dark-100 dark:text-light-100" name="flowbite:user-circle-solid" size="24"
        @click.stop="showLogin" />
      <Icon v-if="user.data" class="cursor-pointer text-dark-100 dark:text-light-100" name="tabler:logout" size="24"
        @click.stop="logOut" />
    </div>
  </div>

</template>
<script setup lang="ts">
import { UserLoginPopup } from "#components"
const nuxtApp = useNuxtApp()
const user = useUserInfoStore()

const showLogin = () => {
  openPopup(UserLoginPopup)
}
const logOut = () => {
  user.clearUserInfo()
  nuxtApp.$router.push('/json')
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