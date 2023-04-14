<template>
  <div class="echarts-wrap">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="常规echarts" name="common">
        <common />
      </el-tab-pane>
      <el-tab-pane label="水晶球liquidfill" name="liquidfill">
        <liquidfill />
      </el-tab-pane>
      <el-tab-pane label="3d gl" name="gl">
        <gl />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Common from './components/common.vue';
import Liquidfill from './components/liquidfill.vue';
import Gl from './components/gl.vue';

const activeName = ref('common');

</script>
