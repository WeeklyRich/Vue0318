import ElementPlus, {ElMessage} from 'element-plus';

import { createApp } from 'vue'

/*
import router from './routes/routes.js'
import store from './store/index.js'

import zhCn from 'element-plus/es/locale/lang/zh-cn'
const app=createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
app.use(ElementPlus,{locale: zhCn}).use(router).use(store).mount('#app')
*/


import './style.css'
import App from './App.vue'
import { createRouter, createWebHashHistory} from 'vue-router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import login from './components/login.vue'
import index from "./components/index.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path:'/login',component:login,name:'login'},

        {path: '/index' , component: index , name: 'index',
            children: [

               ]},
    ]
})


//全局导航守卫:
router.beforeEach(( to , from ) => {
    //to为跳转的路由对象 , from 为离开的路由对象
    //可以增加登录状态校验
    var toPath = to.path;
    var ac = sessionStorage.getItem("login_token");
    if( toPath === '/login' || toPath === '/personalRegistration' || ac != null ){
        return true;
    }else{
        ElMessage.error("请先登录后访问资源")
        return { name: "login" };
    }
})

var app = createApp(App)

//加载路由:
app.use( router )

//加载axios:
app.use( VueAxios , axios )

app.use(ElementPlus);

app.mount('#app')

