<template>
  <div class="icon-wrap">
    <section>
      <h2>iconify在线图标</h2>
      <icon icon="ion:add-circle-sharp" class="special-font"/>
      <icon icon="material-symbols:24mp-sharp"/>
    </section>
    <section>
      <!-- svgs文件夹下的house图标 -->
      <h2>本地的svg图标</h2>
      <icon icon="svg-icon:house" style="font-size: 48px"/>
    </section>
    <section>
      <h2>icon park在线图标</h2>
      <i-arrow-left />
      <i-radar />
      <i-translate />
    </section>
  </div>
</template>

<script setup>
import Icon from '@sutpc/vue3-svg-icon';
</script> 

<style lang="less" scoped>
.icon-wrap {
  margin-left: 40px;
  @{deep} {
    .el-icon {
      font-size: 24px;
      color: red;
      cursor: pointer;
      + .el-icon {
        margin-left: 10px;
      }
      &:hover {
        font-size: 32px;
      }
    }
  }
  .special-font {
    color: blue;
  }
}
</style>