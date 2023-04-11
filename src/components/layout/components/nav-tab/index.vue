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
            <!-- <div class="left-top-dot corner" />
            <div class="right-top-dot corner" />
            <div class="left-bottom-dot corner" />
            <div class="right-bottom-dot corner" /> -->
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
    <!-- <div class="sub-menu-wrapper">
      <div
        :class="{
          'subMenu-item': true,
          actived: activeSubTitle === item.realPath,
          disabled: item.meta.disabled
        }"
        v-for="item in subMenuList"
        :key="item.realPath"
        @click="handleSubTab(item)"
      >
        <div class="left-circle"></div>
        <div class="sub-title">{{ item.meta.title }}</div>
      </div>
    </div> -->
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
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:first-of-type,
    &:nth-child(3) {
      margin-right: 31px;
    }
    &:first-of-type,
    &:nth-child(2) {
      background: url(@/assets/images/layout/menu-btn-left.png) no-repeat;
      background-size: 100% 100%;
      &.active {
        height: 47px;
        background-image: url(@/assets/images/layout/menu-btn-left-active.png);
      }
    }
    &:last-of-type,
    &:nth-child(3) {
      background: url(@/assets/images/layout/menu-btn-right.png) no-repeat;
      background-size: 100% 100%;
      &.active {
        height: 47px;
        background-image: url(@/assets/images/layout/menu-btn-right-active.png);
      }
    }
    &:nth-child(2) {
      margin-right: 889px;
    }
  }
}
</style>
