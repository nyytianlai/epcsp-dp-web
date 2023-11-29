<template>
    <div class="backBox" v-show="currentPosition === '深圳市' && isShowMenu">
        <img src="./images/back.png" alt="" @click="emits('click')" />
    </div>
</template>

<script setup>
const emits = defineEmits(['click']);
</script>

<style lang="less" scoped>
.backBox {
  position: absolute;
  height: 19.5px;
  left: 86px;
  top: var(--header-height);
  transform: translateY(35px);
  display: flex;
  background: rgba(4, 22, 43, 0.4);
  color: #ffffff;
  z-index: 20;

  img {
    height: 24px;
    width: 24px;
    border-radius: 1px;
    cursor: pointer;
  }
}
</style>