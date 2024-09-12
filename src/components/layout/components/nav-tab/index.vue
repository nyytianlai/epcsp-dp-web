<template>
  <div>
    <div class="nav-tab-wrap">
      <div class="tab-header">
        <!-- <img class="mock-btn" src="@/assets/images/education/mock-btn.png" alt="mock-btn" /> -->
        <div
          v-for="(item, index) in navDropList"
          :key="item.name"
          :class="[
            { active: activeTitle === item.path },
            { hasDrop: item.meta.isDropChildren },
            { disabled: item.meta.disabled },
            'nav-item'
          ]"
          @click="handleCurrentTab(item)"
          @mouseover="handleHover(item)"
          @mouseout="handleOut(item)"
          :style="getNavItemStyle(index)"
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
              <!-- {{ item.meta.title }} -->
              <!-- :is-inline="true" -->
              <tooltip-over
                class="top-tab-name"
                :className="['top-tab-name-tooltip']"
                :content="item.meta.title"
                :ref-name="item.meta.title"
              />
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
                { active: activeDrop === child.path },
                { disabled: child.meta.disabled }
              ]"
              v-for="child in item.children"
              :key="child.path"
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
import config from '@sutpc/config';
import TooltipOver from '@/components/tooltip-over.vue';
import { getHashParam, getUrlParam } from '@sutpc/zebra';

export default {
  components: {
    TooltipOver
  },
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
    getNavItemStyle(index) {
      let marginRightValue = 31 * config.sizeScale;
      if (index === 1) {
        marginRightValue = 652 * config.sizeScale;
      }
      return {
        marginRight: marginRightValue + 'px'
      };
    },
    handleCurrentTab(data) {
      if (
        (Object.prototype.hasOwnProperty.call(data.meta, 'disabled') && data.meta.disabled) ||
        data.meta.isDropChildren
      ) {
        return;
      }
      let path = data.children?.length ? data.children[0].path : data.path;
      if (data.children && data.children[0]?.meta.disabled) return;
      if (path === this.$route.fullPath) return;
      this.$router.push({ path, query: { h: getHashParam('h') || getUrlParam('h') } });
    },
    handleSubTab(data) {
      if (Object.prototype.hasOwnProperty.call(data.meta, 'disabled') && data.meta.disabled) {
        return;
      }
      if (data.path === this.$route.fullPath) return;
      // this.$router.push(data.path);
      this.$router.push({ path: data.path, query: { h: getHashParam('h') || getUrlParam('h') } });
    },
    handleHover(tab) {
      tab.isHover = true;
    },
    handleOut(tab) {
      tab.isHover = false;
    },
    handleDrop(tab, child) {
      let path = child.path;
      if (child.children?.length) {
        path = child.children[0].path;
      }
      if (path === this.$route.fullPath || child.meta.disabled) return;
      tab.isHover = false;
      // this.$router.push(path);
      this.$router.push({ path, query: { h: getHashParam('h') || getUrlParam('h') } });
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
    color: #bbe1ff;

    .tab-nav {
      width: 100%;
    }

    &.disabled {
      cursor: not-allowed;
      color: #999999;
    }

    &.active {
      background: rgba(84, 181, 255, 0.3);
      border: 1px solid #54b5ff;
      color: #ffffff;
    }
    &:last-of-type {
      margin-right: 0 !important;
    }
    .corner {
      position: absolute;
      width: 0.02rem;
      height: 0.02rem;
      background: #3cd4fa;
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
