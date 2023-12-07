<template>
  <div class="number-flip" :class="[`number-flip-${id}`]">
    <div v-if="typeof num === 'string'">{{ num }}</div>
    <div v-else class="number-item-flip" v-for="(item, index) in numberList" :key="index">
      {{ item }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, nextTick,onMounted,toRefs } from 'vue'
import gsap from 'gsap'
// import {getRemvalue} from '@/utils'
// import { emitChangeFn } from 'element-plus';

import { scale } from '@sutpc/config';

const HEIGHT_PER_NUMBER = ref(scale(42)) // 每个数字所占高度
const numberList = ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
const props = defineProps({
  num: {
    type: Number,
    default: 0
  },
  id: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['resize'])
const oldYp = ref(0)
const yp = ref(0)
const animation = (newVal = 0, oldVal = 0) => {
  const newValIndex = numberList.value.findIndex(i => i === newVal)
  const oldValIndex = numberList.value.findIndex(i => i === oldVal)
  yp.value = ((oldValIndex - newValIndex) * HEIGHT_PER_NUMBER.value)
  // console.log('yp'+props.id, yp.value)
  // console.log('oldYp'+props.id, oldYp.value)
  if (typeof newVal !== 'string') {
    gsap.fromTo(`.number-flip-${props.id}`,{
      y: oldYp.value
    },{
      duration: 1,
      y: oldYp.value+yp.value,
    })
    oldYp.value = oldYp.value+yp.value
  }

}
onMounted(()=>{
  window.addEventListener('resize', () => {
    emit('resize')
  })
})
watch(() =>props.num, (newVal, oldVal) => {
  console.log('newVal',newVal)
  console.log('oldVal',oldVal)
  nextTick(() => {
    animation(newVal, oldVal)
  })

}, {
  immediate: true
})
</script>
<style lang="less" scoped>
.number-flip {
  display: flex;
  flex-direction: column;

  .number-item-flip {
    font-family: 'DIN Condensed';
    font-style: normal;
    font-weight: 700;
    font-size: 42px;
    background: linear-gradient(180deg, #0080ff 0%, #ffffff 50%, #007cf8 100%), #59ffff;
    -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    letter-spacing: 0.1em;
    line-height: 42px;
  }
}
</style>