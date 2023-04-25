<template>
    <div class="bottom-tabs">
        <div class="tab" 
                v-for="(item,index) in dataR" 
                :key="index"
                @mouseover="handleHover(item)"
                @mouseout="handleOut(item)"
                @click="handleClick(item)"
            >
            <icon :icon="`svg-icon:${item.icon}`" />
            <span class="label">{{ item.label }}</span>
            <div class="sub-tab" 
                v-if="item.children && item.children?.length"
                :class="[
                    {
                        active:item.isHover
                    }
                ]"
                >
                <div class="sub-item" @click="handleClick(item,sub)" v-for="(sub,ii) in item.children" :key="ii">
                    {{ sub.label }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref,toRefs,toRef} from 'vue'
import Icon from '@sutpc/vue3-svg-icon';
const props = defineProps({
    data:{
        type:Array,
        default:()=>[
            {
                label:'视角漫游',
                value:'1',
                icon:'camera',
                isHover:false,
                children:[
                    {
                        label:'休息区',
                        value:'1-1'
                    },
                    {
                        label:'车行视角',
                        value:'1-2'
                    },{
                        label:'停车场入口',
                        value:'1-3'
                    },{
                        label:'停车场出口',
                        value:'1-4'
                    },
                ]
            },
            {
                label:'站内设施',
                value:'2',
                icon:'device'
            },
            {
                label:'车辆充电',
                value:'3',
                icon:'charting'
            },
            {
                label:'电流流转',
                value:'4',
                icon:'electric'
            },
            {
                label:'运营商分布',
                value:'5',
                icon:'operator'
            },
        ]
    }
})
const emit = defineEmits('handleSelect')
const {data} = toRefs(props)
const dataR = ref(data.value)
const handleHover = (tab)=> {
    tab.isHover = true;
}
const handleOut = (tab)=> {
    tab.isHover = false;
}
const handleClick = (item,sub)=>{
    console.log(item,sub);
    if(sub){
        item.isHover = false
        emit('handleSelect',sub)
    }else{
        emit('handleSelect',item)
    }
}
</script>
<style lang="less" scoped>
.bottom-tabs {
  width: 1537px;
  height: 57px;
  background: url(./images/bottom-bgc.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  .tab {
    display: flex;
    align-items: center;
    margin-right: 34px;
    position: relative;
    cursor: pointer;
    &:last-of-type {
      margin-right: 0;
    }
    .el-icon {
      font-size: 24px;
    }
    .label {
      margin-left: 6px;
      font-size: 18px;
      line-height: 20px;
      color: rgba(255, 255, 255, 0.6);
    }
    .sub-tab {
      position: absolute;
      width: 144px;
      bottom: 57px;
      left: 50%;
      transform: translateX(-50%);
      height: 0;
      overflow: hidden;
      opacity: 0;
      transition: opacity 0.3s;
      &.active {
        height: auto;
        opacity: 1;
        background: rgba(18, 40, 73, 0.85);
        box-shadow: inset 0px 0px 8px rgba(10, 167, 255, 0.8);
        border-radius: 2px;
        border: 2px solid;
        border-image: linear-gradient(
            360deg,
            rgba(75, 179, 255, 0.53) -12.24%,
            rgba(75, 222, 255, 0) 111.61%
          )
          2;
        padding: 8px 0;
      }
      .sub-item {
        line-height: 32px;
        padding-left: 14px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        &:hover {
          background: rgba(84, 181, 255, 0.7);
        }
      }
    }
  }
}
</style>