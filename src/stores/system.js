/*
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-05-10 10:39:51
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-10 11:04:08
 * @FilePath: \epcsp-dp-web\src\stores\system.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ref } from 'vue';
import { defineStore } from 'pinia'

export const useSystemStore = defineStore('system', () => {
  const rootFontSize = ref(100)
  const vHeight = ref(1080)
  function changeRootFontSize({ fontSize, height }) {
    rootFontSize.value = fontSize;
    vHeight.value = height;
  }

  return { rootFontSize, vHeight,changeRootFontSize }
})

