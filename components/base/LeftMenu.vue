<template>
  <div class="menu-container">
    <div class="space-y-[16px]">
      <div :class="index == menu_index ? 'menu-item-active' : 'menu-item'" v-for="(menu, index) in menu_functions"
        :key="index" @click.stop="selectMenu(index)">
        <Icon v-if="menu.icon" :name="menu.icon" size="20" />
        <div> {{ menu.name }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const menu_functions = ref([
  {
    name: 'JSON解析',
    icon: 'si:json-fill'
  },
  {
    name: '时间戳转换',
    icon: 'mdi:clock-time-seven-outline'
  },
  {
    name: 'Diff差异比较',
    icon: 'mynaui:git-diff'
  },
  {
    name: 'ico网站图标',
    icon: 'hugeicons:ico'
  },
  {
    name: 'xhs爆款文案',
    icon: 'simple-icons:xiaohongshu'
  },
  {
    name: '在线文生图',
    icon: 'ri:ai-generate-text'
  },
  {
    name: 'AI视频生成',
    icon: 'tdesign:mobile-shortcut-filled'
  },
  {
    name: '满纯血GPT',
    icon: 'hugeicons:ai-chat-02'
  },
  {
    name: '摸鱼冠军',
    icon: 'noto-v1:fish'
  },
  {
    name: '今日头条',
    icon: 'emojione-monotone:newspaper'
  },
  {
    name: '面试神器',
    icon: 'icon-park-twotone:mirror'
  },
  {
    name: '文件共享',
    icon: 'uil:folder-network'
  },
  {
    name: '短链生成',
    icon: 'mingcute:link-line'
  },
  {
    name: '爬虫托管',
    icon: 'solar:minimalistic-magnifer-bug-line-duotone'
  },
  {
    name: '定时任务',
    icon: 'ic:round-access-time'
  },
  {
    name: '全网小说',
    icon: 'emojione-monotone:green-book'
  },
  {
    name: '出证件照',
    icon: 'formkit:avatarman'
  }
]);

const menu_index = ref(0);
const selectMenu = (index: number) => {
  menu_index.value = index;
};
</script>
<style scoped>
.menu-container {
  @apply w-[200px] h-screen pt-[66px] py-[16px] px-[2px] overflow-y-scroll bg-[#f6f6f7] px-[16px] rounded-[4px];
}

.menu-item {
  @apply flex justify-center items-center space-x-[4px];
  @apply ring-2 ring-gray-200 text-gray-400 rounded-[6px] text-[14px] p-[8px] cursor-pointer;
  @apply hover:(bg-[#FFFFFF50] backdrop-opacity-30 ring-dark-200 transition-all duration-100 text-dark-500);
}

.menu-item-active {
  @apply flex justify-center items-center space-x-[4px];
  @apply ring-2 rounded-[6px] p-[8px] cursor-pointer font-bold;
  @apply bg-[#FFFFFF50] backdrop-opacity-30 ring-blue-500 transition-all duration-100 text-blue-500 text-[15px];
}
</style>