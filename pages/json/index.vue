<template>
  <div class="json-container">
    <div class="flex min-h-[calc(100vh-82px)] space-x-[16px]">
      <textarea class="json-textarea" placeholder=" " v-model="originText"></textarea>
      <Icon name="mingcute:transfer-fill" class="text-gray-400 self-center"></Icon>
      <div class="json-viewer">
        <JsonViewer :value="computeObject" :expand-depth="5" copyable></JsonViewer>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const originText = ref('');

const computeObject = computed(() => {
  try {
    return JSON.parse(originText.value);
  } catch (e) {
    return e;
  }
});
</script>
<style scoped>
.json-container {
  @apply w-full min-h-[calc(100vh-82px)] px-[16px];
}

.json-textarea {
  @apply flex-1 min-h-full resize-none rounded-[8px] border border-blue-gray-200 p-[16px] font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200;
  @apply focus:(border-1 border-gray-900 outline-0);
}

.json-viewer {
  @apply flex-1 min-h-full border-1 border border-blue-gray-200 border-solid p-[16px] rounded-[8px];
}
</style>
<style>
.jv-container,
.jv-code {
  padding: 0 !important;
}
</style>