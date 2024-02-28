import axios from 'axios';
import {ElMessage} from 'element-plus';
import { useUserStore } from '@/store/modules/user';
import {TokenKey} from '@/utils/auth';

// 创建 axios 实例
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 50000,
    headers: {'Content-Type': 'application/json;charset=utf-8'}
});

// 请求拦截器
service.interceptors.request.use(
    (config) => {//: AxiosRequestConfig
        if (!config.headers) {
            throw new Error(
                `Expected 'config' and 'config.headers' not to be undefined`
            );
        }
        const userStore = useUserStore();
        config.headers[TokenKey] = userStore.token
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use((response) => {
        const {status} = response;
        if (status === 200) {
            return response.data;
        }
    },
    (error) => {
        if (error.response.data) {
            const { error_msg} = error.response.data;
            ElMessage({
                message: error_msg,
                type: 'error'
            });
        }
        return Promise.reject(error.message);
    }
);

// 导出 axios 实例
export default service;
