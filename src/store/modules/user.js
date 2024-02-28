import {getToken, setToken, removeToken} from '@/utils/auth';
import {ref} from 'vue';
import {defineStore} from 'pinia'
import {registerSingUp, getPlayer,loginApi} from "@/api/login";
import {registerApi} from "../../api/login";

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        token: ref(getToken() || ''),
    }),
    actions: {
        loginTokenApi(data) {
            return new Promise((resolve, reject) => {
                registerSingUp(data).then(res => {
                    localStorage.setItem("userid", res.id);
                    setToken(res.code)
                    resolve(res);
                })
            })
        },
        getInfo() {
            return new Promise((resolve, reject) => {
                getPlayer().then((res) => {
                    resolve(res);
                })
            });
        },
        login(data1){
            return new Promise((resolve, reject) => {
                loginApi(data1).then((res) => {
                    const data = res.data || {}
                    localStorage.setItem("username", data.name);
                    localStorage.setItem("userid", data.id);
                    localStorage.setItem("color", data.color);
                    setToken(data.code)
                    resolve(res);
                })
            });
        },
        register(data){
            return new Promise((resolve, reject) => {
                registerApi(data).then((res) => {
                    // debugger
                    // const data = res.data || {}
                    // localStorage.setItem("username", data.name);
                    // localStorage.setItem("userid", data.id);
                    // // localStorage.setItem("color", data.color);
                    // localStorage.setItem("color", "#7fb89b");
                    // setToken(data.code)
                    resolve(res);
                })
            });
        }
    }
})