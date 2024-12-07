export const useUserInfoStore = defineStore(
  "userInfo",
  () => {
    const data = ref<UserInfo | null>();
    const setUserInfo = (info: UserInfo) => {
      data.value = info;
    };
    const clearUserInfo = () => {
      data.value = null;
    };
    return {
      data,
      setUserInfo,
      clearUserInfo,
    };
  },
  {
    persist: true,
  }
);
