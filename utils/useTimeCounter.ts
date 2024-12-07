import { ref } from "vue";
import { useIntervalFn } from "@vueuse/core";
export const useTimeCounter = () => {
  const count = ref(0);

  // resume - 继续，pause - 暂停， isActive - 是否执行中(isActive.value)
  const { resume, pause, isActive } = useIntervalFn(
    () => {
      count.value--;
      if (count.value === 0) {
        pause();
      }
    },
    1000,
    { immediate: false }
  );

  const stopCount = pause;

  const startCount = (startTime = 60) => {
    if (isActive.value) return;
    // 因为初始值已经重置,所以继续执行,可以理解为 重新开始
    count.value = startTime;
    resume();
  };

  // 页面要用到的数据，都返回
  return { count, resume, stopCount, isActive, startCount };
};
