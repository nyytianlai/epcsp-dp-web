<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-26 16:10:49
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-10 09:24:16
 * @FilePath: \epcsp-dp-web\src\views\station-detail\components\pile-dialog\video-palyer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <video width="320" height="240" controls id="camera-video" autoplay muted>
        <source :src="videoUrl" type="video/mp4">
        <source :src="videoUrl" type="video/ogg">
        <source :src="videoUrl" type="video/webm">
      </video>
</template>
<script setup>
import { toRefs } from 'vue';
const props = defineProps({
    videoUrl: {
        type:String,
        default:''
    }
})
const {videoUrl} = toRefs(props)
</script>
<style lang="less" scoped>
#camera-video{
    width:100%;
    height:346px;
}
</style>