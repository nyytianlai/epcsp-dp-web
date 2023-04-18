<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-18 10:47:38
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-18 14:35:00
 * @FilePath: \epcsp-dp-web\src\components\dialog-table.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-dialog v-model="visible" title="Shipping address" class="custom-dialog" width="15.58rem" @close="emit('update:visible',false)">
      <icon icon="svg-icon:corner-top" class="top-left corner" />
      <icon icon="svg-icon:corner-bottom" class="bottom-left corner"  />
      <icon icon="svg-icon:corner-top" class="top-right corner" />
      <icon icon="svg-icon:corner-bottom" class="bottom-right corner"  />
        <el-table :data="data"  height="6.34rem" style="width: 100%">
          <el-table-column v-for="(item,index) in columnData" :key="index" v-bind="item" />
        </el-table>
        <el-pagination layout="prev, pager, next" :total="50" :background="true" />
      </el-dialog>
</template>
<script setup>
import Icon from '@sutpc/vue3-svg-icon';
const props = defineProps({
    visible: {
    type: Boolean,
    default:false
  },
  columnData: {
    type: [],
    default: () => [
      {
        prop: '运营商名称',
        label: '运营商名称',
        width:'100'
      },
      {
        prop: '告警总数',
        label: '告警总数',
        width:'100'
      },
      {
        prop: '未确认',
        label: '未确认',
        width:'100'
      },
      {
        prop: '已确认',
        label: '已确认',
        width:'100'
      },
      {
        prop: '已恢复',
        label: '已恢复',
        width:''
      },
    ]
  },
  data: {
    type: [],
    default:()=>[]
  }
})
const emit = defineEmits(['update:visible'])
const { visible,columnData,data } = toRefs(props);
</script>
<style lang="less">
.el-overlay{
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(8px);
}
    .custom-dialog{
        background: rgba(4, 19, 43, 0.65);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25), inset 0px 0px 20px rgba(10, 167, 255, 0.5);
        border-radius: 2px;
        position: relative;
        height: 790px;
        .corner{
          font-size: 40px;
          position: absolute;
          pointer-events: none;
          &.top-left{
            top: -1px;
            left: -1px;
          }
          &.bottom-left{
            bottom: -1px;
            left: -1px;
          }
          &.top-right{
            top: -1px;
            right: -1px;
            transform: rotateY(180deg);
          }
          &.bottom-right{
            bottom: -1px;
            right: -1px;
            transform: rotateY(180deg);
          }
        }
        .el-dialog__header{
          border-bottom: 1px solid rgba(84, 181, 255, 0.4);
          margin-left: 20px;
          padding-left: 0;
        }
        .el-dialog__title{
          font-size: 20px;
          font-weight: 600px;
        }
        .el-dialog__body{
          padding: 18px 20px 28px;
        }
        .el-table{
          .el-table__inner-wrapper{
            &::before{
              height: 0;
            }
          }
          tr{
            th{
              &:first-of-type{
                padding-left: 16px !important;
              }
            }
            td{
              &:first-of-type{
                padding-left: 16px !important;
              }
            }
          }
          td.el-table__cell,th.el-table__cell.is-leaf{
            border-bottom:0 ;
          }
          td.el-table__cell{
            background: rgba(84, 181, 255, 0.15);
            border-bottom: 1px solid #081219;
            padding: 24px 0;
            .cell{
              font-size: 16px;
              line-height: 24px;
              color: #FFFFFF;
            }
          }
          .el-table__body tr:hover>td.el-table__cell{
            background: #4391CC;
            border-bottom: 1px solid #081219;
          }
          .el-table__header{
            .el-table__cell{
              padding: 4px 0;
              background: rgba(84, 181, 255, 0.3);
              .cell{
                line-height: 24px;
                font-size: 14px;
                font-weight: 400;
                position: relative;
                &::before{
                  content: '';
                  position: absolute;
                  left: 0;
                  top: 50%;
                  transform: translateY(-50%);
                  width: 1px;
                  height: 14px;
                  background-color: #fff;
                }
              }
            }
          }
        }
        .el-pagination{
          margin-top: 20px;
          float: right;
        }
    }
</style>