<template>
  <InputText pt:root:class="input-bottom" v-model="input" v-on:keyup.enter="sendMessage"
    placeholder="你有什么问题尽管问吧～按Enter发送">
  </InputText>
</template>
<script setup lang="ts">
const emit = defineEmits(['sendMessage', 'onMessage'])
const props = defineProps({
  chatId: String
})
const input = ref<string>("")

const sendMessage = () => {
  if (!input.value) return
  emit('sendMessage', input.value)
  useApi().sendMessage({
    chatId: props.chatId,
    message: input.value,
  }, (data: any) => {
    emit('onMessage', data)
  })
  input.value = ""
}

</script>

<style scoped>
.input-bottom {
  @apply w-full h-full px-[16px] text-[14px] bg-light-100 rounded-md border-none;
  @apply focus:(border-none);
  box-shadow: 1px 1px 10px 4px rgba(8, 11, 14, 0.06) !important;
}
</style>