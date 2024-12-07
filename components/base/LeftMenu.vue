<template>
  <div class="menu-container">
    <div class="space-y-[16px]">
      <div v-for="(menu, index) in menu_functions" :key="index"
        :class="menu.route == route.path ? 'menu-item-active' : 'menu-item'" @click.stop="selectMenu(menu, index)">
        <Icon v-if="menu.icon" :name="menu.icon" size="20" />
        <div> {{ menu.name }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface MenuItem {
  name: string;
  icon: string;
  route: string;
}
const menu_functions = ref([
  {
    name: 'JSON解析',
    icon: 'si:json-fill',
    route: '/json'
  },
  {
    name: '满纯血GPT',
    icon: 'hugeicons:ai-chat-02',
    route: '/gpt'
  },
  {
    name: 'Vue-SFC',
    icon: 'ph:file-vue-fill',
    route: '/vuesfc'
  },
  {
    name: '时间戳转换',
    icon: 'mdi:clock-time-seven-outline',
    route: '/timestamp'
  },
  {
    name: 'Diff差异比较',
    icon: 'mynaui:git-diff',
    route: '/diff'
  },
  {
    name: 'ico网站图标',
    icon: 'hugeicons:ico',
    route: '/ico'
  },
  {
    name: 'xhs爆款文案',
    icon: 'simple-icons:xiaohongshu',
    route: '/xhs'
  },
  {
    name: '在线文生图',
    icon: 'ri:ai-generate-text',
    route: '/text2img'
  },
  {
    name: 'AI视频生成',
    icon: 'tdesign:mobile-shortcut-filled',
    route: '/video'
  },
  {
    name: '摸鱼冠军',
    icon: 'noto-v1:fish',
    route: '/fish'
  },
  {
    name: '今日头条',
    icon: 'emojione-monotone:newspaper',
    route: '/toutiao'
  },
  {
    name: '面试神器',
    icon: 'icon-park-twotone:mirror',
    route: '/interview'
  },
  {
    name: '文件共享',
    icon: 'uil:folder-network',
    route: '/file'
  },
  {
    name: '短链生成',
    icon: 'mingcute:link-line',
    route: '/short'
  },
  {
    name: '爬虫托管',
    icon: 'solar:minimalistic-magnifer-bug-line-duotone',
    route: '/spider'
  },
  {
    name: '定时任务',
    icon: 'ic:round-access-time',
    route: '/cron'
  },
  {
    name: '全网小说',
    icon: 'emojione-monotone:green-book',
    route: '/novel'
  },
  {
    name: '出证件照',
    icon: 'formkit:avatarman',
    route: '/avatar'
  }
]);

const route = useRoute();

const selectMenu = async (menu: MenuItem, index: number) => {
  await navigateTo({
    path: menu.route
  });
};

</script>
<style scoped>
.menu-container {
  @apply w-[200px] h-screen pt-[66px] py-[16px] px-[2px] overflow-y-scroll bg-[#f6f6f7] px-[16px] rounded-[4px];
  @apply dark:(bg-[#1e1e1e] text-white);
}

.menu-item {
  @apply flex justify-center items-center space-x-[4px];
  @apply ring-2 ring-gray-200 text-gray-400 rounded-[6px] text-[14px] p-[8px] cursor-pointer;
  @apply hover:(bg-[#FFFFFF50] backdrop-opacity-30 ring-dark-200 transition-all duration-100 text-dark-500);
  @apply dark:hover:(bg-dark-50 text-white ring-light-200);
}

.menu-item-active {
  @apply flex justify-center items-center space-x-[4px];
  @apply ring-2 rounded-[6px] p-[8px] cursor-pointer font-bold;
  @apply bg-[#FFFFFF50] backdrop-opacity-30 ring-blue-500 transition-all duration-100 text-blue-500 text-[15px];
  @apply dark:(bg-dark-50 text-white ring-light-200);
}
</style>