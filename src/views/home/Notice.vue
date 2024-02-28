<script setup>

import { onMounted, onBeforeUnmount, reactive, ref } from 'vue';

import gsap from 'gsap';

import { getAllNotice } from "@/api/home"
const UI = reactive({
  list: [],
  show: false,
  active: 0,
  mainScale: 1,
  mainShow: false
})

const refMainView = ref(null)


onMounted(() => {
  UI.mainScale = (window.innerWidth * 0.8 - 10) / 720

})

function itemClick(index) {
  UI.active = index;
  UI.mainShow = true;
  UI.mainScale = (window.innerWidth * 0.8 - 10) / 720

}


function showAnim(show) {

  if (UI.list.length == 0) {
    getAllNotice(res => {
      UI.list = []
      res.forEach(child => UI.list.push({ id: child.id, valueHtml: child.text, editorRef: null }));

      setTimeout(() => {
        if (show) {
        UI.show = true;
        gsap.to('#noticeList', { duration: 0.35, ease: "power1.inOut", left: 0 });
        UI.list.forEach((child, index) => {
          gsap.fromTo('.ed' + index, { opacity: 0 }, { duration: 0.5, ease: "power1.inOut", opacity: 1, delay: index * 0.25 });
        })
      } else {
        gsap.to('#noticeList', { duration: 0.35, ease: "power1.inOut", left: "-500px" });
      }
      }, 200);
   


    })
  } else {

    if (show) {
      UI.show = true;
      gsap.to('#noticeList', { duration: 0.35, ease: "power1.inOut", left: 0 });
      UI.list.forEach((child, index) => {
        gsap.fromTo('.ed' + index, { opacity: 0 }, { duration: 0.5, ease: "power1.inOut", opacity: 1, delay: index * 0.25 });
      })
    } else {
      gsap.to('#noticeList', { duration: 0.35, ease: "power1.inOut", left: "-500px" });
    }



  }





}
defineExpose({ showAnim })

</script>

<template>
  <div id="noticeList" v-show="UI.show">
    <div v-for="item, index in UI.list" class="item">
      <div :class="'ed' + index" v-html="item.valueHtml" @click="itemClick(index)"></div>
    </div>
  </div>
  <div ref="refMainView" id="mainView" v-if="UI.mainShow">
    <svg @click="UI.mainShow = false"
      style="pointer-events: auto; cursor: pointer;z-index: 100; position: fixed;top:calc(5% + 8px);left:calc(10% + 8px);width: 28px;height: 28px;"
      viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
      <path
        d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z"
        fill="#707070"></path>
    </svg>
    <div
      :style="`height: 520px;width: 720px;transform: scale(${UI.mainScale});transform-origin: left top;margin-top:40px`"
      v-html="UI.list[UI.active].valueHtml"></div>
  </div>
</template>

<style >
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(147, 147, 153, 0.5);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

#noticeList {
  position: absolute;
  left: -500px;
  top: 70px;
  bottom: 0;
  width: 410px;
  overflow: hidden scroll;
  z-index: 10;
}

#mainView {
  position: absolute;
  background-color: white;
  width: 80%;
  height: 90%;
  border-radius: 10px;
  box-shadow: 0px 0px 16px #22222250;
  pointer-events: auto;

  left: 10%;
  top: 5%;
  z-index: 999;
  overflow: scroll;
}

.item {
  position: relative;
  left: 10px;
  margin: 10px;
  height: 280px;
  width: 380px;

}

.item>div {
  position: relative;


  height: 540px;
  width: 720px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 15px #00000050;
  transform: scale(0.5);
  transform-origin: 0% 0%;
  opacity: 0;
  overflow: hidden;
}
</style>
