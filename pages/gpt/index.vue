<template>
  <div class="flex px-[16px] min-h-[calc(100vh-82px)] space-x-[16px]">
    <GptChatList class="h-fit" :currentChatId="currentChatId" :chatList="chatList" @changeChatId="changeChatId"
      @newChat="newChat">
    </GptChatList>
    <GptChatDetail v-for="(chat, index) in chatList" :key="index" v-show="currentChatId == chat.chatId"
      :chatId="chat.chatId" class="flex-1"></GptChatDetail>
  </div>
</template>
<script setup lang="ts">

const chatList = ref<ChatListData[]>([])
const currentChatId = ref("")
const loading = ref(false)

const getChatList = () => {
  loading.value = true
  useApi().getChatList().then((res) => {
    chatList.value = res.data
    currentChatId.value = res.data[0].chatId
    console.log(chatList.value);
  }).finally(() => {
    loading.value = false
  })
}

const changeChatId = (chatId: string) => {
  currentChatId.value = chatId
}

const newChat = () => {

}

onMounted(() => {
  getChatList()
})


</script>