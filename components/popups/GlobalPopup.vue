<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="global-popup" :id="props.id" v-if="show" @click="close">
        <div ref="content" @click.stop>
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    default: "global-popup"
  }
})

const show = ref(true)

onMounted(() => {
  show.value = true
})

const content = ref(null)

const close = (event: MouseEvent) => {
  show.value = false
  event.stopPropagation()
}



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