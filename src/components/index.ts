/*
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-12 17:23:22
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-09 19:21:20
 * @FilePath: \epcsp-dp-web\src\components\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { Component } from 'vue'
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
import LineTimeChart from '@/components/line-time-chart.vue'
import Panel from '@/components/panel/index.vue'
import PageNum from '@/components/page-num/index.vue';
import CustomDialog from '@/components/custom-dialog/index.vue'
import LegendList from '@/components/legend-list.vue'
import noData from '@/components/no-data/index.vue'
import numTileCard from '@/components/num-tile-card.vue'
import LineTimeChartBoth from '@/components/line-time-chart-both.vue'
import rightSlide from '@/components/right-slide/index.vue'
import numberFlipping from '@/components/number-flipping.vue'


const components: {
    [propName: string]: Component //字面量类型，每个属性值类型为组件的类型
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
}
  
   
  export default components