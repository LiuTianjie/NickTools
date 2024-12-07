<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="global-popup" :id="id" v-if="show" @click="close">
        <div class="popup-content" @click.stop>
          <!-- 动态渲染传入的组件，并监听其 emit 的事件 -->
          <component :is="component" v-bind="data" @close="handleChildClose" @custom-event="handleCustomEvent">
          </component>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    default: 'global-popup',
  },
  component: {
    type: [Object, Function],
    required: true,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
});

const show = ref(true)

onMounted(() => {
  show.value = true
})


const close = (event?: MouseEvent) => {
  show.value = false
  event?.stopPropagation()
}

const handleChildClose = () => {
  close();
};

const handleCustomEvent = (payload: any) => {
  console.log('收到子组件的自定义事件，数据为：', payload);
};

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.global-popup {
  @apply fixed inset-0 z-999 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm;
}
</style>