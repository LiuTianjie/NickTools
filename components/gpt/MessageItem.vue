<template>
  <div class="mb-[16px] flex flex-col">
    <div v-if="isAI" class="ai-avatar">
      <Icon class="cursor-pointer text-dark-100 dark:text-light-100" name="mingcute:ai-fill" size="24" />
    </div>
    <div v-else class="ai-avatar self-end">
      <Icon class="cursor-pointer text-dark-100 dark:text-light-100" name="tabler:user" size="24" />
    </div>
    <div class="text-box" :class="isAI ? '' : 'self-end'">
      {{ message?.value[0].text.content }}
    </div>
  </div>

</template>
<script setup lang="ts">

const props = defineProps({
  message: Object as PropType<ChatDetailItem>
});

const isAI = computed(() => {
  return props.message?.obj.toLocaleLowerCase() === 'ai';
})

</script>

<style scoped>
.ai-avatar {
  @apply p-[4px] h-[32px] w-[32px] mb-[10px] rounded-full bg-gray-100 flex items-center justify-center;
  @apply dark:(bg-dark-50);
}

.text-box {
  @apply w-fit text-[14px] p-[8px] bg-gray-50 rounded-md leading-[28px];
  @apply dark:(bg-dark-50);
}
</style>