<template>
  <div class="flex">
    <div class="flex flex-col">
      <BaseTopMenu></BaseTopMenu>
    </div>
    <div class="flex flex-grow">
      <div class="flex-shrink-0">
        <BaseLeftMenu></BaseLeftMenu>
      </div>
      <div class="pt-[66px] pb-[16px] w-full h-screen flex-grow overflow-y-scroll">
        <slot></slot>
      </div>
    </div>
  </div>

</template>