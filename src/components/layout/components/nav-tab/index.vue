<template>
  <div>
    <div class="nav-tab-wrap">
      <div class="tab-header">
        <!-- <img class="mock-btn" src="@/assets/images/education/mock-btn.png" alt="mock-btn" /> -->
        <div
          v-for="(item, index) in navDropList"
          :key="item.name"
          class="nav-item"
          @click="handleCurrentTab(item)"
          @mouseover="handleHover(item)"
          @mouseout="handleOut(item)"
          :style="{marginRight:index === 1?'652px':'31px'}"
          :class="[{ active: activeTitle === item.path }]"
        >
          <div
            :class="[
              { active: activeTitle === item.path },
              { hasDrop: item.meta.isDropChildren },
              { disabled: item.meta.disabled },
              'tab-nav'
            ]"
            :data-disabled="item.meta.disabled"
          >
            <div class="left-top-dot corner" />
            <div class="right-top-dot corner" />
            <div class="left-bottom-dot corner" />
            <div class="right-bottom-dot corner" />
            <div>
              {{ item.meta.title }}
            </div>
          </div>
          <div
            class="drop-down"
            v-if="item.children?.length && item.meta?.isDropChildren"
            :style="{
              height: `${
                item.isHover && item.children?.length ? item.children?.length * 0.48 + 0.02 : 0
              }rem`
            }"
          >
            <div
              :class="[
                'drop-item',
                { active: activeDrop === child.realPath },
                { disabled: child.meta.disabled }
              ]"
              v-for="child in item.children"
              :key="child.realPath"
              @click="handleDrop(item, child)"
            >
              {{ child.meta.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    activeName: {
      type: String,
      default: ''
    },
    // 下拉菜单
    navDropList: {
      type: Array,
      default: () => []
    },
    // 自定义nav按钮宽度
    tabNavWidth: {
      type: Number,
      default: 160
    }
  },
  data() {
    return {
      marginLeft: false,
      subMenuList: []
    };
  },
  computed: {
    activeTitle() {
      return this.$route.matched[0].path;
    },
    activeDrop() {
      const isDropChildren = this.$route.matched[0].meta?.isDropChildren;
      return isDropChildren ? this.$route.matched[1].path : '';
    },
    activeSubTitle() {
      const isDropChildren = this.$route.matched[0].meta?.isDropChildren;
      return this.$route.matched[isDropChildren ? 2 : 1]?.path;
    }
  },
  watch: {
    activeTitle: {
      handler() {
        const isDropChildren = this.$route.matched[0].meta?.isDropChildren;
        this.subMenuList = this.$route.matched[isDropChildren ? 1 : 0].children || [];
      },
      immediate: true
    },
    activeDrop: {
      handler() {
        const isDropChildren = this.$route.matched[0].meta?.isDropChildren;
        this.subMenuList = this.$route.matched[isDropChildren ? 1 : 0].children || [];
      },
      immediate: true
    }
  },
  methods: {
    handleCurrentTab(data) {
      if (
        (Object.prototype.hasOwnProperty.call(data.meta, 'disabled') && data.meta.disabled) ||
        data.meta.isDropChildren
      ) {
        return;
      }
      let path = data.children?.length ? data.children[0].realPath : data.realPath || data.path;
      if (path === this.$route.fullPath) return;
      console.log('path',path);
      this.$router.push(path);
    },
    handleSubTab(data) {
      if (Object.prototype.hasOwnProperty.call(data.meta, 'disabled') && data.meta.disabled) {
        return;
      }
      if (data.realPath === this.$route.fullPath) return;
      this.$router.push(data.realPath);
    },
    handleHover(tab) {
      tab.isHover = true;
    },
    handleOut(tab) {
      tab.isHover = false;
    },
    handleDrop(tab, child) {
      let path = child.realPath;
      if (child.children?.length) {
        path = child.children[0].realPath;
      }
      if (path === this.$route.fullPath || child.meta.disabled) return;
      tab.isHover = false;
      this.$router.push(path);
    }
  }
};
</script>

<style lang="less" scoped>
.tab-header {
  display: flex;
  justify-content: center;
  .nav-item {
    width: 145px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
    background: rgba(84, 181, 255, 0.1);
    border: 1px solid rgba(84, 181, 255, 0.3);
    position: relative;
    color: #BBE1FF;
    &.active{
      background: rgba(84, 181, 255, 0.3);
      border: 1px solid #54B5FF;
      color: #FFFFFF;
    }
    &:first-of-type,
    &:nth-child(3) {
      margin-right: 31px;
    }
    &:nth-child(2) {
      margin-right: 652px;
    }
    .corner {
      position: absolute;
      width: .02rem;
      height: .02rem;
      background: #3CD4FA;
    }
  
    .left-top-dot {
      top: -1px;
      left: -1px;
    }
  
    .left-bottom-dot {
      bottom: -1px;
      left: -1px;
    }
  
    .right-top-dot {
      top: -1px;
      right: -1px;
    }
  
    .right-bottom-dot {
      right: -1px;
      bottom: -1px;
    }
  }
}
</style>
