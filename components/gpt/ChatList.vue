<template>
  <div class="p-[16px] space-y-[16px] border-solid border-gray-200 rounded-md">
    <div :class="currentChatId == chat.chatId ? 'chat-item-active' : 'chat-item'" v-for="(chat, index) in chatList"
      :key="index" @click.stop="chageChatId(chat.chatId)">
      {{ chat.title }}
    </div>
    <div class="chat-item add-item">
      <Icon name="heroicons-outline:plus-circle" size="20"></Icon>
      <div>新建对话</div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['changeChatId'])
const props = defineProps({
  chatList: Array as PropType<ChatListData[]>,
  currentChatId: String
})
const chageChatId = (chatId: string) => {
  emit('changeChatId', chatId)
}
</script>
<style scoped>
.chat-item {
  @apply flex justify-center items-center text-[14px] cursor-pointer p-[10px] rounded-md ring-2 ring-gray-200 hover:(bg-gray-300) hover:(bg-gray-100 border-dark-100);
  @apply dark:hover:(bg-dark-50 font-semibold ring-gray-200);
}

.chat-item-active {
  @apply flex justify-center items-center text-[14px] bg-blue-500 p-[10px] rounded-md text-white ring-2 ring-blue-500;
  @apply dark:(bg-dark-50 ring-light-50 text-light-100) dark:hover:(bg-dark-100 font-semibold);
}

.add-item {
  @apply space-x-[6px] text-gray-400 ring-2 hover:(text-blue-500 !ring-blue-500 !bg-light-100);
  @apply dark:hover:(text-light-50 !bg-dark-50 !font-semibold !ring-gray-200);
}
</style>