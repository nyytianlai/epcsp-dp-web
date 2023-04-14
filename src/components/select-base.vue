<template>
    <select v-model="selected" @change="handleSelect" >
        <option v-for="(item) in options" :value="item.value" :key="item.value">{{item.label}}</option>
    </select>
</template>
<script setup lang="ts">

interface IOptions {
  value: string|number;
  label: string;
}
type Itype = 'top-down' | 'left-right';
interface Props {
    options: IOptions[];
    selected:string
}
const props = withDefaults(defineProps<Props>(), {
});
const emit = defineEmits(['change','update:selected'])
const { options, selected } = toRefs(props);
const handleSelect = (e) => {        
    emit('update:selected',e.target.value)
    emit('change')
}
</script>