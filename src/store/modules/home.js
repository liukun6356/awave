import {defineStore} from 'pinia'

export const useState = defineStore({
    id: 'homeMap',
    state: () => ({
        lang: localStorage.getItem('lang'),
        fromSpace: true
    }),
    actions: {
        initLang() {
            this.lang = !!(window.localStorage.getItem("lang") == "0");
        },
        switchLang() {
            this.lang = !this.lang;
        },
        setLang(lang) {
            this.lang = lang;
        },
        setFromSpace(fromSpace) {
            this.fromSpace = fromSpace;
        }
    }
})