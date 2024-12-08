<template>
  <div class="login-box">
    <div class="flex items-center w-full border-solid border-0 border-b-1 pb-[10px] border-gray-200">
      <Icon name="fluent:math-formula-16-filled" size="18" class="text-dark-100 dark:text-light-100" />
      <div class="font-semibold text-[20px] top-title">NickTools</div>
      <div class="ml-auto text-[12px]"> {{ isLogin ? '登录' : '注册' }}</div>
    </div>
    <div class="w-full mt-[10px]" v-if="isLogin">
      <div class="w-full mb-[6px]" v-if="mode == 'EMAIL'">
        <div class="mb-[6px] text-[14px]">账户</div>
        <InputText class="w-full" type="text" v-model="email" placeholder="请输入邮箱"></InputText>
      </div>
      <div class="w-full mb-[6px]" v-if="mode == 'PHONE'">
        <div class="mb-[6px] text-[14px]">账户</div>
        <InputText class="w-full" type="text" v-model="phone" placeholder="请输入手机号"></InputText>
      </div>
      <div class="w-full">
        <div class="mb-[6px] text-[14px]">密码</div>
        <InputText type="password" class="w-full" v-model="password" :feedback="false" placeholder="请输入密码">
        </InputText>
      </div>
    </div>
    <div class="w-full mt-[10px]" v-if="loginMode == 'register'">
      <div class="w-full mb-[6px]" v-if="mode == 'EMAIL'">
        <div class="mb-[6px] text-[14px]">账户</div>
        <InputText class="w-full" type="text" v-model="email" placeholder="请输入邮箱"></InputText>
      </div>
      <div class="w-full mb-[6px]" v-if="mode == 'PHONE'">
        <div class="mb-[6px] text-[14px]">账户</div>
        <InputText class="w-full" type="text" v-model="phone" placeholder="请输入手机号"></InputText>
      </div>
      <div class="w-full">
        <div class="mb-[6px] text-[14px]">密码</div>
        <InputText type="password" class="w-full" v-model="password" :feedback="false" placeholder="请输入密码">
        </InputText>
      </div>
      <div class="w-full mt-[10px] ">
        <div class="mb-[6px] text-[14px]">验证码</div>
        <div class="flex items-center space-x-[10px]">
          <InputText type="password" class="w-full" v-model="code" :feedback="false" placeholder="验证码">
          </InputText>
          <Button pt:root:class="!bg-dark-50 !text-light-50 !border-none" class="flex-shrink-0 w-[100px] h-[40px]"
            type="button" size="small" :loading="isActive" :label="!isActive ? '获取验证码' : `剩余${count}s`"
            @click.stop="getCode" />
        </div>
      </div>
    </div>
    <div class="flex items-center space-x-[20px] mt-[10px]">
      <div class="flex items-center gap-2">
        <RadioButton v-model="mode" inputId="email" name="email" value="EMAIL" size="small" />
        <Icon name="ic:outline-email" size="24" class="dark:text-light-100"
          :class="mode == 'EMAIL' ? 'text-blue-500' : ''">
        </Icon>
      </div>
      <div class="flex items-center gap-2">
        <RadioButton v-model="mode" inputId="phone" name="phone" value="PHONE" size="small" />
        <Icon name="proicons:phone" size="24" class="dark:text-light-100"
          :class="mode == 'PHONE' ? 'text-blue-500' : ''"></Icon>
      </div>
    </div>
    <div class="flex justify-between w-full space-x-[12px] mt-[10px]">
      <Button type="button" :pt:root:class="isLogin ? 'btn-normal' : 'btn-active'" @click="changeLoginMode('register')"
        :loading="isLogin ? false : btnLoading" label="注册" />
      <Button type="button" :pt:root:class="isLogin ? 'btn-active' : 'btn-normal'" @click="changeLoginMode('login')"
        :loading="isLogin ? btnLoading : false" label="登录" />
    </div>
  </div>
</template>

<script setup lang="ts">
const toast = useToastService();
const { count, isActive, startCount } = useCutDownCounter()
const password = ref('');
const loginMode = ref('login');
const isLogin = computed(() => loginMode.value == 'login')
const mode = ref('EMAIL')
const phone = ref('');
const email = ref('');
const code = ref()
const traceId = ref('')
const btnLoading = ref(false)
const { setUserInfo } = useUserInfoStore()
const emit = defineEmits(['close'])

const changeLoginMode = (mode: string) => {
  if (loginMode.value == mode && mode == 'register') {
    register();
    return
  }
  if (loginMode.value == mode && mode == 'login') {
    login();
    return
  }
  loginMode.value = mode;
  clearForm()
}

const register = () => {
  const account = email.value || phone.value;
  if (!account || !password.value || !code.value || !traceId.value) {
    toast.add({ severity: 'error', summary: '错误', detail: '参数缺失', life: 3000 });
    return
  } else {
    btnLoading.value = true
    useApi().register({ email: email.value, phone: phone.value, password: password.value, code: Number(code.value), codeType: mode.value, traceId: traceId.value }).then(() => {
      toast.add({ severity: 'success', summary: '成功', detail: '注册成功', life: 3000 });
      changeLoginMode('login')
    }).catch(() => {
      toast.add({ severity: 'error', summary: '错误', detail: '注册失败', life: 3000 });
    }).finally(() => {
      btnLoading.value = false
    })
  }
}

const getCode = useDebounceFn(() => {
  const account = email.value || phone.value;
  if (!account) {
    toast.add({ severity: 'error', summary: '错误', detail: '请先输入账户', life: 3000 });
    return
  }
  useApi().getCode({
    email: email.value,
    phone: phone.value,
    codeType: mode.value,
  }).then((res: any) => {
    toast.add({ severity: 'success', summary: '成功', detail: '验证码发送成功', life: 3000 });
    traceId.value = res.data.traceId
    startCount()
  }).catch((err) => {
    toast.add({ severity: 'error', summary: '错误', detail: err, life: 3000 });
  })
}, 300)


const login = useDebounceFn(() => {
  const account = email.value || phone.value;
  if (!account || !password.value) {
    toast.add({ severity: 'error', summary: '错误', detail: '参数缺失', life: 3000 });
    return
  } else {
    btnLoading.value = true
    useApi().login({ account, password: password.value }).then((res: any) => {
      toast.add({ severity: 'success', summary: '成功', detail: '登录成功', life: 3000 });
      setUserInfo(res.data)
      emit('close')
    }).catch(() => {
      toast.add({ severity: 'error', summary: '错误', detail: '登录失败', life: 3000 });
    }).finally(() => {
      clearForm()
      btnLoading.value = false
    })
  }
}, 300)

const clearForm = () => {
  phone.value = '';
  email.value = '';
  password.value = '';
}

</script>

<style scoped>
.login-box {
  @apply bg-white box-shadow-md rounded-md flex flex-col gap-[6px] justify-center items-center py-[16px] px-[32px];
  @apply w-[380px] h-[400px];
  @apply dark:(bg-dark-300 box-shadow-lg);
}

.top-title {
  font-family: PT Sans Caption;
}

.btn-normal {
  @apply bg-white text-gray-300 w-[30%] border-gray-300 transform transition-all duration-300;
  @apply dark:( !bg-dark-50 border-dark-50) dark:hover:( !bg-dark-100 !text-light-100 font-semibold);
  @apply hover:( !bg-gray-100 !border-dark-100 !text-dark-100);
}

.btn-active {
  @apply text-light-100 bg-dark-100 w-[70%] !border-dark-100 transform transition-all duration-300;
  @apply dark:(bg-light-200 !text-dark-200) dark:hover:( !bg-light-400 !text-dark-400 font-semibold);
  @apply hover:( !bg-dark-100 !border-dark-100);
}
</style>