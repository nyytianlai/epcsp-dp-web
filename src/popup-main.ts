import { createApp } from "vue";
import { getUrlParam } from "@sutpc/zebra";

const com = getUrlParam('com');

const loadCom = comName => {
    return import(`./popup-views/${comName}/index.vue`)
}

loadCom(com).then(res => {
    createApp(res.default).mount('#app');
})