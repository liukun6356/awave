<template>
  <div id="help-view">
    <div
        style=" position: relative;background-color: #fafafa; width: fit-content;height: 924px;box-shadow: 0px 0px 16px #22222250;">
      <svg @click="emit('close')"
           style="pointer-events: auto; cursor: pointer;z-index: 100; position: absolute;top: 8px;left: 8px;width: 28px;height: 28px;"
           viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <path
            d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z"
            fill="#707070"></path>
      </svg>

      <h1 class="title" style="heigt:41px;line-height:41px;text-align: center;font-size: 20px;font-weight:1;color:#fafafa;background:#232323;margin:0;">
        {{ !STATE.lang ? "Help - Login system" : "帮助 - 登录系统" }}</h1>

      <img
          style="position: relative; height: calc(100% - 44px);left: 30px;width:calc(100% - 60px); object-fit:fill;object-position: center;"
          :src="`https://awave.oss-cn-beijing.aliyuncs.com/help/${HELP.target}/${!STATE.lang?1:0}/${HELP.nowPage}.jpeg`"
          alt="help">

      <div
          style="position: absolute;left: 50%;transform: translateX(-50%);bottom: 1.5rem;width: 250px; display: flex;justify-content: space-between; height: 2rem;align-items: center;">
        <span @click="preClick" class="title"
              style="display:flex;justify-content:center;align-items:center;width:106px;height:51px;box-sizing:border-box;border-radius: 25px;background: #fafafa;border: 1px solid;
              pointer-events: auto; cursor: pointer;font-size:24px;color: #232323">{{
            !STATE.lang ? "Back" : "上页"
          }}</span>
        <span @click="nextClick" class="title"
              style="display:flex;justify-content:center;align-items:center;width:106px;height:51px;box-sizing:border-box;border-radius: 25px;background: #232323;
              pointer-events: auto; cursor: pointer;font-size:24px;color:#fafafa">{{
            !STATE.lang ? "Next" : "下页"
          }}</span>
        <!--        <span @click="skipClick"-->
        <!--              style="pointer-events: auto; cursor: pointer;height: 1rem;font-size: 1rem;line-height: 1em;">{{-->
        <!--            !STATE.lang ? "Skip" : "跳过" }}</span>-->
      </div>
      <div
          style="font-size:18px;position: absolute;right: 50px; bottom: 20px;color: white; width:51px;height:51px;background-color: #232323;border-radius: 50%;display: flex;justify-content: center;align-items: center">
        {{ HELP.nowPage + '/' + HELP.maxPage }}
      </div>
<!--      <div  class="close closeimg" @click="emit('toggleLang')">-->
<!--        <img src="@/assets/img/img.png" />-->
<!--      </div>-->
    </div>

  </div>
</template>
<script setup>
import {onMounted, reactive} from 'vue';
import {useState} from "@/store/modules/home";

const STATE = useState();

const emit = defineEmits(['close','toggleLang'])

onMounted(() => {
  window.showHelp = showHelp;
})


const HELP = reactive({
  show: false,
  nowPage: 1,
  maxPage: 18,
  target: 'main'
})


const nextClick = () => {
  HELP.nowPage++;
  if (HELP.nowPage > HELP.maxPage) {
    HELP.nowPage = HELP.maxPage
  }
};

const preClick = () => {
  HELP.nowPage--;
  if (HELP.nowPage < 1) {
    HELP.nowPage = 1
  }
}

const skipClick = () => {
  HELP.show = false;
  window.top.hideIframe && window.top.hideIframe()
  HELP.nowPage = 1
};

const close = () => {
  HELP.show = false;
  window.top.hideIframe && window.top.hideIframe()
};


const showHelp = (target, lang) => {
  HELP.show = true;
  HELP.target = target;
  HELP.nowPage = 1;
  STATE.initLang()

  switch (target) {
    case 'login':
      HELP.maxPage = 18
      break;
    case 'player':
      HELP.maxPage = 12
      break;
    case 'main':
      HELP.maxPage = 19
      break;
    case 'space':
      HELP.maxPage = 9
      break;
  }
};
</script>

<style lang="scss" scoped>
#help-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  background-color: rgba(0, 0, 0, 0.4);
}
.closeimg.close {
  position: absolute;
  top: 10px;
  left: 70px;
  width: 25px;
  height: 25px;
  img{
    display: block;
    width: 100%;
  }
}
</style>