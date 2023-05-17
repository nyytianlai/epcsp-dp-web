<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-17 09:12:44
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-05 09:42:57
 * @FilePath: \epcsp-dp-web\src\views\safety-supervision\components\scroll-table.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <ScrollTable
    style="width: 100%; height: 3.44rem"
    :autoScroll="false"
    :interval="5000"
    :data="scrollTableData"
    :highlight-current-row="false"
    v-model="currentIndex"
    @current-change="currentChange"
    class="custom-table"
  >
    <el-table-column
      v-for="(item, index) in columnKeyList"
      :key="index"
      :prop="item.prop"
      align="left"
      :label="item.label"
      :min-width="item.width"
      :show-overflow-tooltip="true"
      :formatter="tableColumnFun" 
    ></el-table-column>
  </ScrollTable>
</template>

<script setup >
import { ref, onMounted, reactive,watch } from 'vue';
import ScrollTable from '@sutpc/vue3-scroll-table';
import {tableColumnFun} from '@/global/commonFun.js'
const props = defineProps({
  scrollTableData:{
    type: Array,
    default: ()=> {
      return []
    }
  },
  columnKeyList: {
    type: Array,
    default: ()=> {
      return []
    }
  }
})
let currentIndex = ref(0);
let currentChange = (row) => {
  // 这里是选中的那一行数据
};
</script>

<style lang="less"></style>
