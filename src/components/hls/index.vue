<template>
  <div class="hls_video" style="position: relative">
    <video
      :id="id"
      ref="videoRef"
      :autoplay="true"
      :muted="muted"
      :controls="controls"
      :loop="loop"
      :style="{ width, height }"
    />
    <slot></slot>
  </div>
</template>
<script setup>
import {ref,watch,onMounted,onBeforeUnmount  } from 'vue'
import Hls from 'hls.js'
const props = defineProps({
  play: {
    type: Boolean,
    default: false,
    require: false
  },
  width: {
    type: String,
    default: '',
    require: false
  },
  height: {
    type: String,
    default: '',
    require: false
  },
  autoplay: {
    type: Boolean,
    default: false,
    require: false
  },
  loop: {
    type: Boolean,
    default: false,
    require: false
  },
  muted: {
    type: Boolean,
    default: false,
    require: false
  },
  controls: {
    type: Boolean,
    default: false,
    require: false
  },
  url: {
    type: String,
    default: '',
    require: false
  },
  maxErrorNum: {
    type: Number,
    default: 10
  }
})
const emit = defineEmits(['update:onError'])
const id = `${new Date().getTime() + Math.floor(Math.random() * 1000)}Flv`

const hls = ref(null)
const videoRef = ref(null)
let errNum = 0
const loadVideoFn = () => {
  if (Hls.isSupported() && props.url && hls.value === null) {
    hls.value = new Hls()
    hls.value.loadSource(props.url)
    hls.value.attachMedia(videoRef.value)
    hls.value.on(Hls.Events.MANIFEST_PARSED, () => {
      errNum = 0
      nextTick(() => {
        setTimeout(() => {
          if (videoRef.value) {
            videoRef.value.play()
          }
        }, 500)
      })
    })
    hls.value.on(Hls.Events.ERROR, (event, data) => {
      // 监听出错事件
      errNum++
      console.log('加载失败', errNum, event, data)
      // 超出最大错误重连次数，重新获取视频链接
      if (errNum >= props.maxErrorNum || data.type === 'networkError') {
        destroyHls()
        emit('onError', data)
      }
    })
  }
}
const destroyHls = () => {
  if (hls.value) {
    videoRef.value.pause()
    hls.value.destroy()
    hls.value = null
  }
}

watch(
  () => props.play,
  (val) => {
    if (!val) {
      destroyHls()
    }
  }
)
watch(
  () => props.url,
  (val) => {
    if (val) {
      destroyHls()
      loadVideoFn()
    } else {
      destroyHls()
    }
  }
)

onMounted(() => {
  loadVideoFn()
})

onBeforeUnmount(() => {
  destroyHls()
})
</script>
<style lang="less" scoped></style>
