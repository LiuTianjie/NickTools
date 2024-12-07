<template>
  <div class="chat-box">
    <div class="chat-detail" ref="chatBox">
      <div class="chat-title"> {{ chatId }}</div>
      <div v-for="(message, index) in chatDetail?.list" :key="message.dataId">
        <GptMessageItem :message="message"></GptMessageItem>
      </div>
    </div>
    <div class="chat-input">
      <GptChatInput :chatId="chatId" @sendMessage="sendMessage" @onMessage="onMessage"></GptChatInput>
    </div>
  </div>
</template>
<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
const props = defineProps({
  chatId: String
})
const offset = ref(0)
const pageSize = ref(20)
const chatDetail = ref<ChatDetailData>()
const loading = ref(false)
const chatBox = ref<HTMLDivElement | null>(null)

const getChatDetail = () => {
  loading.value = true
  api.getChatDetail({
    chatId: props.chatId,
    offset: offset.value,
    pageSize: pageSize.value,
  }).then((res) => {
    console.log(res.data)
    chatDetail.value = res.data
  }).finally(() => {
    loading.value = false
  })
}

const sendMessage = (message: string) => {
  chatDetail.value?.list.push({
    dataId: uuidv4(),
    time: new Date().getTime().toString(),
    obj: 'Human',
    value: [{
      type: 'text',
      text: {
        content: message,
      }
    }]
  },
    {
      dataId: uuidv4(),
      time: new Date().getTime().toString(),
      obj: 'AI',
      value: [{
        type: 'text',
        text: {
          content: "",
        }
      }]
    })
  nextTick(() => {
    scrollToBottom();
  });
}

const onMessage = (data: any) => {
  let lastMessage = chatDetail.value?.list[chatDetail.value?.list.length - 1]
  if (lastMessage) {
    lastMessage.value[0].text.content += extractAndConcatenateContent(data)
    nextTick(() => {
      scrollToBottom();
    });
  }
}

const extractAndConcatenateContent = (rawData: string) => {
  const dataParts = rawData.trim().split(/data:\s*/).filter(part => part);
  let concatenatedContent = '';
  dataParts.forEach(part => {
    try {
      const parsed = JSON.parse(part);
      const content = parsed.choices?.[0]?.delta?.content || '';
      concatenatedContent += content;
    } catch (error) {
      // 
    }
  });
  return concatenatedContent;
}

const scrollToBottom = () => {
  if (chatBox.value) {
    chatBox.value.scrollTop = chatBox.value.scrollHeight;
  }
};


onMounted(() => {
  getChatDetail()
})
</script>
<style scoped>
.chat-box {
  @apply w-full h-[calc(100vh-82px)] flex flex-col;
  @apply dark:(bg-[#1e1e1e] text-white);
}

.chat-detail {
  @apply border-solid border-gray-100 rounded-md p-[16px] flex-1 overflow-y-scroll;
}

.chat-title {
  @apply font-semibold text-[20px] mb-[16px] pb-[16px] border-solid border-0 border-b-1 border-gray-100;
}

.chat-input {
  @apply flex-shrink-0 w-full h-[50px] rounded-md mt-[16px] mb-[32px];
}
</style>