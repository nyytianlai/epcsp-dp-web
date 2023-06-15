<template>
  <div class="honglixi">
    <PopBox v-if="showPop" @close="()=>{showPop = false}"></PopBox>
  </div>
</template>
<script lang="ts" setup>
import PopBox from './pop-box.vue'
import {ref} from 'vue'

const showPop = ref(true)
</script>
<style lang="less" scoped>

</style>