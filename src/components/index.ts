import type { Component } from 'vue';
import NumCard from '@/components/num-card.vue';
import RankList from '@/components/rank-list/index.vue';
import TitleColumn from '@/components/title-column/index.vue';
import Tabs from '@/components/tabs/index.vue';
import ButtonBase from '@/components/button-base.vue';
import WarningList from '@/components/warning-list.vue';
import SelectBase from '@/components/select-base.vue';
import BottomMenuTabs from '@/components/bottom-menu-tabs/index.vue';
import WarningTabs from '@/components/warning-tabs/index.vue';
import AreaRankList from '@/components/area-rank-list.vue';
import PieChart from '@/components/pie-chart/index.vue';
import LineTimeChart from '@/components/line-time-chart.vue';
import Panel from '@/components/panel/index.vue';
import PageNum from '@/components/page-num/index.vue';
import CustomDialog from '@/components/custom-dialog/index.vue';
import LegendList from '@/components/legend-list.vue';
import noData from '@/components/no-data/index.vue';
import numTileCard from '@/components/num-tile-card.vue';
import LineTimeChartBoth from '@/components/line-time-chart-both.vue';
import rightSlide from '@/components/right-slide/index.vue';
import numberFlipping from '@/components/number-flipping.vue';

const components: {
  [propName: string]: Component; //字面量类型，每个属性值类型为组件的类型
} = {
  NumCard,
  RankList,
  TitleColumn,
  Tabs,
  ButtonBase,
  WarningList,
  SelectBase,
  BottomMenuTabs,
  WarningTabs,
  AreaRankList,
  PieChart,
  LineTimeChart,
  Panel,
  PageNum,
  CustomDialog,
  LegendList,
  noData,
  numTileCard,
  LineTimeChartBoth,
  rightSlide,
  numberFlipping
};

export default components;
