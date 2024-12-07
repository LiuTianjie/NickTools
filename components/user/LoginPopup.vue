<template>

  <div class="login-box">
    <div class="flex items-center w-full border-solid border-0 border-b-1 pb-[10px] border-gray-200">
      <Icon name="fluent:math-formula-16-filled" size="18" class="text-dark-100 dark:text-light-100" />
      <div class="font-semibold text-[20px] top-title">NickTools</div>
      <div class="ml-auto"> {{ loginMode }}</div>
    </div>
    <div class="w-full mt-[10px]" v-if="loginMode == 'login'">
      <div class="w-full mb-[6px]" v-if="mode == 'email'">
        <div class="mb-[6px] text-[14px]">账户</div>
        <InputText class="w-full" type="text" v-model="email" placeholder="请输入邮箱"></InputText>
      </div>
      <div class="w-full mb-[6px]" v-if="mode == 'phone'">
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
      <div class="w-full mb-[6px]" v-if="mode == 'email'">
        <div class="mb-[6px] text-[14px]">账户</div>
        <InputText class="w-full" type="text" v-model="email" placeholder="请输入邮箱"></InputText>
      </div>
      <div class="w-full mb-[6px]" v-if="mode == 'phone'">
        <div class="mb-[6px] text-[14px]">账户</div>
        <InputText class="w-full" type="text" v-model="phone" placeholder="请输入手机号"></InputText>
      </div>
      <div class="w-full">
        <div class="mb-[6px] text-[14px]">密码</div>
        <InputText type="password" class="w-full" v-model="password" :feedback="false" placeholder="请输入密码">
        </InputText>
      </div>
    </div>
    <div class="flex items-center space-x-[20px] mt-[10px]">
      <div class="flex items-center gap-2">
        <RadioButton v-model="mode" inputId="email" name="email" value="email" size="small" />
        <Icon name="ic:outline-email" size="24" class="dark:text-light-100"
          :class="mode == 'email' ? 'text-blue-500' : ''">
        </Icon>
      </div>
      <div class="flex items-center gap-2">
        <RadioButton v-model="mode" inputId="phone" name="phone" value="phone" size="small" />
        <Icon name="proicons:phone" size="24" class="dark:text-light-100"
          :class="mode == 'phone' ? 'text-blue-500' : ''"></Icon>
      </div>
    </div>
    <div class="flex justify-between w-full space-x-[12px] mt-[10px]">
      <Button :pt:root:class="loginMode == 'register' ? 'btn-active' : 'btn-normal'"
        @click="changeLoginMode('register')">注册</Button>
      <Button :pt:root:class="loginMode == 'login' ? 'btn-active' : 'btn-normal'"
        @click="changeLoginMode('login')">登录</Button>
    </div>

  </div>
</template>

<script setup lang="ts">


const password = ref('');
const loginMode = ref('login');
const mode = ref('email')
const phone = ref('');
const email = ref('');
const codeType = ref('email');

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
  phone.value = '';
  email.value = '';
  password.value = '';
}

const register = () => {
  console.log('register');

}

const login = () => {
  console.log('login');
}

</script>

<style scoped>
.login-box {
  @apply bg-white box-shadow-md rounded-md flex flex-col gap-[6px] justify-center items-center py-[16px] px-[32px];
  @apply w-[380px] h-[350px];
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