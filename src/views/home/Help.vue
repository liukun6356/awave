<script setup>
import {onMounted, reactive} from 'vue';
import {useState} from '@/store/modules/home';

const STATE = useState();
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
  STATE.setLang(lang)

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


defineExpose({showHelp})
</script>
<template>
  <div id="help-view" v-if="HELP.show">
    <div
        style=" position: relative;background-color: white; width: fit-content;height: 90%;border-radius: 10px;box-shadow: 0px 0px 16px #22222250;">
      <svg @click="close"
           style="pointer-events: auto; cursor: pointer;z-index: 100; position: absolute;top: 8px;left: 8px;width: 28px;height: 28px;"
           viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <path
            d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z"
            fill="#707070"></path>
      </svg>
      <svg @click="STATE.switchLang"
           style="pointer-events: auto; cursor: pointer;z-index: 100; position:absolute; left: 10px;bottom: 10px;"
           viewBox="0 0 1024 1024" version="1.1"
           xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <path
            d="M863.288889 861.866667c22.755556 0 38.4-24.177778 29.866667-45.511111L743.822222 465.066667c-14.222222-34.133333-64-34.133333-78.222222 0L516.266667 816.355556c-8.533333 21.333333 7.111111 45.511111 29.866666 45.511111 12.8 0 25.6-8.533333 29.866667-19.911111l38.4-96.711112h179.2l38.4 96.711112c5.688889 11.377778 17.066667 19.911111 31.288889 19.911111zM637.155556 686.933333l66.844444-169.244444 66.844444 169.244444h-133.688888zM583.111111 291.555556h85.333333c15.644444 0 28.444444-12.8 28.444445-28.444445s-12.8-28.444444-28.444445-28.444444H440.888889v-44.088889c0-15.644444-12.8-28.444444-28.444445-28.444445s-28.444444 12.8-28.444444 28.444445v44.088889H156.444444c-15.644444 0-28.444444 12.8-28.444444 28.444444s12.8 28.444444 28.444444 28.444445h366.933334c-9.955556 32.711111-22.755556 64-38.4 95.288888-19.911111 38.4-45.511111 72.533333-73.955556 103.822223h-5.688889c-9.955556-11.377778-29.866667-31.288889-51.2-62.577778-8.533333-12.8-17.066667-25.6-24.177777-39.822222-5.688889-9.955556-14.222222-15.644444-25.6-15.644445-21.333333 0-35.555556 22.755556-25.6 42.666667 8.533333 15.644444 17.066667 31.288889 27.022222 45.511111 19.911111 29.866667 38.4 49.777778 52.622222 65.422222l8.533333 8.533334-157.866666 159.288888c-11.377778 11.377778-11.377778 28.444444 0 39.822223 11.377778 11.377778 28.444444 11.377778 39.822222 0l157.866667-157.866667c24.177778 25.6 51.2 52.622222 79.644444 79.644444 14.222222 14.222222 39.822222 8.533333 46.933333-9.955555 4.266667-9.955556 1.422222-22.755556-7.111111-31.288889-28.444444-27.022222-54.044444-54.044444-78.222222-79.644444 34.133333-36.977778 64-78.222222 88.177778-122.311112 19.911111-38.4 35.555556-78.222222 46.933333-120.888888z"
            fill="#707070"></path>
      </svg>
      <h1 style="text-align: center;font-size: 1rem;">{{ !STATE.lang ? "Instruction" : "使用说明" }}</h1>

      <img
          style="position: relative; height: calc(100% - 6rem);left: 10px;width:calc(100% - 20px); object-fit:fill;object-position: center;"
          :src="`https://awave.oss-cn-beijing.aliyuncs.com/help/${HELP.target}/${!STATE.lang?1:0}/${HELP.nowPage}.jpeg`"
          alt="help">

      <div style="position: absolute;right: 5px;bottom: 1.5rem; display: flex;height: 2rem;align-items: center;">
                <span @click="nextClick"
                      style="pointer-events: auto; cursor: pointer; height: 1rem;font-size: 1rem;line-height: 1em;">{{
                    !STATE.lang ? "Next Step" : "下一步"
                  }}</span>
        <img @click="nextClick"
             style="pointer-events: auto; cursor: pointer;height: 1.8rem;margin-right: 1.5rem; object-fit: contain;object-position: center;"
             src="/img/next.png" alt="next">
        <span @click="skipClick"
              style="pointer-events: auto; cursor: pointer;height: 1rem;font-size: 1rem;line-height: 1em;">{{
            !STATE.lang ? "Skip" : "跳过"
          }}</span>
        <img @click="skipClick"
             style="pointer-events: auto; cursor: pointer;height: 1.8rem; object-fit: contain;object-position: center;"
             src="/img/skip.png" alt="next">
      </div>
      <div
          style="position: absolute;left: 50%;transform: translateX(-50%); bottom: 0;color: white; padding: 0.36rem 1.5rem;background-color: black;border-top-left-radius: 5px;border-top-right-radius: 5px;">
        {{ HELP.nowPage + ' / ' + HELP.maxPage }}
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#help-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>