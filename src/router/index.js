import {createRouter, createWebHashHistory} from 'vue-router';
import Home from "@/views/home/index.vue"
// 静态路由
export const constantRoutes = [
    {
        path: '/home',
        component: Home,
    },
    {
        path: '/register',
        component: () => import('@/views/register/index.vue'),
        meta: {hidden: true}
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        meta: {hidden: true}
    },
    { // 匹配不到跳到首页
        path: "/:pathMatch(.*)*",
        redirect: "/login",
        meta: {
            hidden: true
        },
    },
]
// 创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
    // 刷新时，滚动条位置还原
    scrollBehavior: () => ({left: 0, top: 0})
});

export default router;