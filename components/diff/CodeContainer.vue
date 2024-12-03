<template>
  <div class="flex flex-col h-full">
    <Select v-model="lang" :options="langs" size="small" optionLabel="language" placeholder="javascript"
      class="select-btn" />
    <MonacoDiffEditor ref="diffEditor"
      class="flex-grow border border-blue-gray-200 border-solid rounded-[8px] overflow-hidden py-[12px]"
      :options="{ theme: computedTheme, renderSideBySideInlineBreakpoint: 375, readOnly: false, originalEditable: true, suggest: { showSnippets: false } }"
      :original="originValue" :modelValue="value" :lang="lang.code" />
  </div>
</template>

<script lang="ts" setup>
const value = ref('');
const originValue = ref('');
const langs = ref([{
  language: 'JavaScript',
  code: 'javascript',
}, {
  language: 'TypeScript',
  code: 'typescript',
},
{
  language: 'Python',
  code: 'python',
}
]);
const lang = ref(langs.value[0]);
const colorMode = useColorMode();


const computedTheme = computed(() => {
  return colorMode.value === 'dark' ? 'vs-dark' : 'vs-light';
});
</script>
<style scoped>
.select-btn {
  @apply w-full md:w-56 flex-shrink-0 mb-[16px];
}
</style>
