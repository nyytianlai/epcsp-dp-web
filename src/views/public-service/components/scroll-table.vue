<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-17 09:12:44
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-17 14:28:07
 * @FilePath: \epcsp-dp-web\src\views\safety-supervision\components\scroll-table.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <ScrollTable
    :style="styleWrap"
    :autoScroll="false"
    :interval="5000"
    :data="gridInfo.data"
    :highlight-current-row="false"
    v-model="currentIndex"
    @current-change="currentChange"
    class="custom-table"
  >
    <el-table-column
      v-for="(item, index) in gridInfo.columnKeyList"
      :key="index"
      :prop="item.prop"
      align="left"
      :label="item.label"
      :min-width="item.width"
    ></el-table-column>
  </ScrollTable>
</template>

<script setup lang="ts">
  import { ref, toRefs,reactive } from 'vue';
import type { CSSProperties } from 'vue';
import ScrollTable from '@sutpc/vue3-scroll-table';
interface Props {
  styleWrap: CSSProperties;
}
const props = withDefaults(defineProps<Props>(), {
  styleWrap: () => ({
    width: '100%',
    height: '3.44rem'
  })
});
const { styleWrap } = toRefs(props);
let gridInfo = reactive({
  columnKeyList: [
    { prop: 'pro', label: '序号', width: 2 },
    { prop: 'pro1', label: '问题类型', width: 3 },
    { prop: 'pro2', label: '相关描述', width: 6 },
    { prop: 'pro3', label: '数量（个）', width: 3 }
  ],
  data: [
    { pro: '1', pro1: '问题类型', pro2: '400', pro3: '200' },
    { pro: '2', pro1: '问题类型', pro2: '400', pro3: '200' },
    { pro: '3', pro1: '问题类型', pro2: '400', pro3: '200' },
    { pro: '4', pro1: '问题类型', pro2: '400', pro3: '200' },
    { pro: '5', pro1: '问题类型', pro2: '400', pro3: '200' },
    { pro: '6', pro1: '问题类型', pro2: '400', pro3: '200' },
    { pro: '7', pro1: '问题类型', pro2: '400', pro3: '200' },
    { pro: '8', pro1: '问题类型', pro2: '400', pro3: '200' },
    { pro: '9', pro1: '问题类型', pro2: '400', pro3: '200' },
    { pro: '10', pro1: '问题类型', pro2: '400', pro3: '200' },
    { pro: '11', pro1: '问题类型', pro2: '400', pro3: '200' },
    { pro: '12', pro1: '问题类型', pro2: '400', pro3: '200' }
  ]
});
let currentIndex = ref(0);
let currentChange = (row) => {
  // 这里是选中的那一行数据
};
</script>

<style lang="less"></style>
