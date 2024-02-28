<script setup>
import Circle from './components/Circle.vue'
import Help from './Help.vue';
import Private from './Private.vue';
import RichText from './RichText.vue';
import Notice from './Notice.vue';
import Tree from './Tree.vue';
import Rank from './Rank.vue';
import Player from './Player.vue';
import {onBeforeUnmount, onMounted, reactive, ref} from "vue";
import {drawLGR, drawR, isSimilar, clear, formatColor} from './drawLGR'
import {clickOne, getAllPlanet, getGameCd, share,clickOne1} from "@/api/home"
import swal from 'sweetalert'
import BScroll from '@better-scroll/core'
import Zoom from '@better-scroll/zoom'
import Indicators from '@better-scroll/indicators'
import html2canvas from 'html2canvas';
import {useState} from '@/store/modules/home'
import {useRouter} from "vue-router";


const router = useRouter();
BScroll.use(Indicators)
BScroll.use(Zoom)

let BS;
let x, s = false;
let targetClick = [];
let ctx = null;
let colorArray = []
let ws;
let interval, cdInterval;
const cd = reactive({time: 7, value: 0, cdNumber: 60})
window.cccLeft = 0;
window.cccTop = 0;
let authorization = localStorage.getItem("Authorization") || '';
const refMinimap = ref(null);
const refConfirm = ref(null);
const refCanvas = ref(null);
const refScroller = ref(null);
const refHelp = ref(null);
const refPrivate = ref(null);
const refRichText = ref(null);
const refNotice = ref(null);
const refTree = ref(null);

const refRank = ref(null);
const refPlayer = ref(null)

const STATE = useState();

const UI = reactive([
  true, true, true, false, false, false, false, false,
  true, true, true, false, false, false, false, false,
  false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false
])

const DM = reactive({
  playerColor: '',
  hexColor: '',
  online: 0,
  filled: 0,
  showNotice: false,
  pid: parseInt(localStorage.getItem("userid") || 0),
  hasNews: true,
  showPlayerInfo: false,
  showMore: false,
  showTree: false,
  fullScreen: false
})

const firstEnter = ref(true);//是否新用户第一次进入

const confirmShow = ref(false);


let count = 0;

/**
 * 点击圆弹框确认
 * @param {*} arr
 * @param {*} brr
 */
const showConfirm = (arr, brr) => {
  // if (clock.value != 0) {
  //     return
  // }
  refConfirm.value.style.left = arr[2] + 26 + 'px'
  refConfirm.value.style.top = arr[3] + 40 + 'px'
  confirmShow.value = true;
  targetClick[0] = arr[0]
  targetClick[1] = arr[1]
  targetClick[2] = brr
}

/**
 * 弹框确认点击后
 */
const confirm = () => {
  //如果是新用户首次进入并操作,取消新用户属性,
  if (firstEnter.value) {
    firstEnter.value = false;
    localStorage.setItem('oldPlayer', true)
  }

  if (updateCD()) {
    confirmShow.value = false;
    const index = (targetClick[0] + Math.floor(targetClick[2] / 8) * 12) * 104 + targetClick[1] + targetClick[2] % 8 * 13;
    // clickOne({id: index, color: DM.playerColor, pid: DM.pid}, authorization)
    const params = {
      id: index, color: DM.playerColor, pid: +localStorage.getItem('userid') || 0
    }
    clickOne1(params)
  }

}

onMounted(() => {
  if(!localStorage.getItem('color')){
    router.push('/login')
    return
  }
  STATE.initLang();
  const helpMain = localStorage.getItem('helpMain');
  if (!helpMain) {
    refHelp.value.showHelp('main', STATE.lang)
  }
  localStorage.setItem('helpMain', '1');


  window.getBirdMax = function () {
    const precent = DM.filled / 124.8
    if (precent < 30) {
      return 2
    } else if (precent < 50) {
      return 3
    } else if (precent < 70) {
      return 4
    } else {
      return 5
    }
  }


  window.goHome = goHome;
  window.showSpace = function () {

    DM.showTree = true

  }
  ctx = refCanvas.value.getContext("2d");


  let color = localStorage.getItem("color");
  let oldPlayer = localStorage.getItem('oldPlayer')
  if (typeof (color) == "undefined" || color == null || color == "") {
    color = "#ccffcc";
  }
  if (oldPlayer) {
    firstEnter.value = false;
  }
  DM.hexColor = color;
  DM.playerColor = formatColor(color);

  BS = new BScroll("#wrapper", {
    probeType: 3,
    freeScroll: true,
    scrollX: true,
    scrollY: true,
    scrollbars: true,
    deceleration: 0.01,
    bounceTime: 200,
    zoom: {
      start: 1,
      min: window.innerWidth / 6270,
      max: 1.4
    },
    indicators: [
      {
        relationElement: refMinimap.value,
        relationElementHandleElementIndex: 0,
        // ratio:{
        //     x: 0.05,
        //     y: 0.05
        // }

      }
    ]


  })
  // console.log(BS.plugins.indicators.indicators[0].options)
  BS.on('scroll', updatePosition);
  initWebSocket();

  initCD()

  window.addEventListener('keydown', keyPressD)
  window.addEventListener('keyup', keyPressU)

})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', keyPressD)
  window.removeEventListener('keyup', keyPressU)
  ws && ws.close();
  interval && clearInterval(interval);
  cdInterval && clearInterval(cdInterval)
})

function updatePosition() {
  if (count > 5000) {
    count = 0
  }
  count++;
  if (count % 10 === 0) {
    const top = -this.y >> 0;
    const left = -this.x >> 0;

    window.cccTop = top;
    window.cccLeft = left;
  }
}


function scale(bool) {
  if (bool) {
    BS.zoomTo(BS.plugins.zoom.scale + 0.2, 0, 0, false)
  } else {
    if (BS.plugins.zoom.scale > 0.7) {
      BS.zoomTo(BS.plugins.zoom.scale - 0.2, 0, 0, false)
    }
  }
  refMinimap.value.children[0].style.width = `${70 / BS.plugins.zoom.scale}px`
  refMinimap.value.children[0].style.height = `${40 / BS.plugins.zoom.scale}px`
  BS.refresh()
}


function keyPressD(e) {

  if (e.key == 'x' || e.key == 'X') {
    x = true
  }
  if (e.key == 's' || e.key == 'S') {
    s = true
  }
  if (e.shiftKey && x && s) {
    swal("图片生成中...", {
      buttons: false,
      icon: "success",
    })
    window.removeEventListener('keydown', keyPressD)
    window.removeEventListener('keyup', keyPressU)
    html2canvas(refScroller.value).then((canvas) => {
      var link = document.createElement("a");
      link.download = "screenshot.jpg";
      link.href = canvas.toDataURL();
      link.click();
      window.addEventListener('keydown', keyPressD)
      window.addEventListener('keyup', keyPressU)
      swal.close();
    })

  }
}

function keyPressU() {
  x = false;
  s = false
}


function initWebSocket() {
  ws = new WebSocket(import.meta.env.VITE_APP_WebSocket_API);
  getAllPlanet(data => sync(data))
  ws.onmessage = function (msg) {

    if (msg.data.startsWith("online")) {
      const strValue = msg.data.slice(6)
      DM.online = strValue
    } else {
      const planet = msg.data.split("|");
      planet[0] = parseInt(planet[0]);
      const [group, div, span] = getGDS(planet[0]);
      refScroller.value.children[group + 1].children[div].children[span].style.backgroundColor = planet[1]
      colorArray[planet[0]] = planet[1];
      reDraw();
    }
  }
}

function pd() {
  window.clickMoved = false;
  confirmShow.value && (confirmShow.value = false)
}

function pm() {
  window.clickMoved = true
}

function getGDS(index) {
  const row = Math.floor(index / 104)
  const col = index % 104
  const rr = Math.floor(row / 12)
  const cc = Math.floor(col / 13)
  return [rr * 8 + cc, row % 12, col % 13]
}

function initCD() {
  let timeDelta;
  const timeNow = Date.now();
  const saveTime = localStorage.getItem('time');
  if (saveTime) {
    timeDelta = Math.abs(Math.round((timeNow - saveTime) / 1000))
  } else {
    timeDelta = 1000
  }


  getGameCd((cdNumber) => {
    cd.time = Math.floor(timeDelta / cdNumber)
    cd.value = timeDelta % cdNumber;
    cd.cdNumber = cdNumber;
    if (cd.time >= 7) {
      cd.time = 7;
      cd.value = cd.cdNumber
    }

    cdInterval && clearInterval(cdInterval)
    cdInterval = setInterval(() => {
      intFun();
    }, 1000)
  })
}

function updateCD() {
  if (cd.time == 0) {
    return false
  } else {
    cd.time -= 1;
    cdInterval && clearInterval(cdInterval)
    cdInterval = setInterval(() => {
      intFun();
    }, 1000)
    return true;
  }

}

function intFun() {
  if (cd.time >= 7) {
    cd.value = cd.cdNumber
    cdInterval && clearInterval(cdInterval)
  } else {
    cd.value -= 1;
    if (cd.value < 0) {
      cd.time += 1;
      cd.value = cd.cdNumber;
    }
  }
  localStorage.setItem("time", Date.now() - (cd.time * cd.cdNumber + cd.value) * 1000)
}

function drawAround(index) {

  //计算行数和列数
  const row = Math.floor(index / 104)
  const col = index % 104
  const startX = col * 60 + (row % 2 == 0 ? 30 : 60);
  const startY = row * 52 + 26;
  const around = []

  around[0] = col == 103 ? undefined : index + 1;
  around[3] = col == 0 ? undefined : index - 1;
  if (row % 2 == 0) {
    around[1] = (row + 1) * 104 + col;
    around[2] = col == 0 ? undefined : ((row + 1) * 104 + col - 1)
    around[4] = col == 0 || row == 0 ? undefined : ((row - 1) * 104 + col - 1)
    around[5] = row == 0 ? undefined : (row - 1) * 104 + col
  } else {
    around[1] = col == 103 ? undefined : ((row + 1) * 104 + col + 1)
    around[2] = (row + 1) * 104 + col
    around[4] = (row - 1) * 104 + col
    around[5] = col == 103 ? undefined : (row - 1) * 104 + col + 1
  }

  const similarArray = [];
  around.forEach((item, idx) => {
    similarArray[idx] = isSimilar(colorArray[index], colorArray[item])
  })
  /**
   *     4  5
   *   3      0
   *     2  1
   **/


  around.forEach((item, idx) => {

    if (similarArray[idx]) {
      drawLGR(ctx, startX, startY, colorArray[index], colorArray[item], idx)
    } else {
      similarArray[idx + 1 > 5 ? 0 : idx + 1] && similarArray[idx - 1 < 0 ? 5 : idx - 1] && drawR(ctx, startX, startY, colorArray[index], idx)
    }
  })

}

function sync(data, up = false) {
  colorArray = [];
  clear(ctx);
  ctx.fillStyle = '#F7F7F7';
  ctx.fillRect(0, 0, 6270, 6240);
  for (let i = 1; i < refScroller.value.children.length - 1; i++) {
    for (let j = 0; j < refScroller.value.children[i].children.length; j++) {
      for (let k = 0; k < refScroller.value.children[i].children[j].children.length; k++) {
        refScroller.value.children[i].children[j].children[k].style.backgroundColor = ""
      }
    }
  }

  data.forEach(planet => colorArray[planet.id] = planet.color)
  colorArray.forEach((item, index) => {
    if (item != undefined) {
      drawAround(index)
      const [group, div, span] = getGDS(index);
      refScroller.value.children[group + 1].children[div].children[span].style.backgroundColor = item
    }
  })

  DM.filled = data.length

  up && window.updateTexture && window.updateTexture();
}

function reDraw() {
  clear(ctx);
  ctx.fillStyle = '#F7F7F7';
  ctx.fillRect(0, 0, 6270, 6240);

  let filled = 0
  colorArray.forEach((item, index) => {
    if (item != undefined) {
      filled++;
      drawAround(index)
      const [group, div, span] = getGDS(index);
      refScroller.value.children[group + 1].children[div].children[span].style.backgroundColor = item
    }
  })

  DM.filled = filled
  window.updateTexture && window.updateTexture()
}


function iconClick(key) {
  switch (key) {
    case 0:
      DM.showNotice = !DM.showNotice;
      DM.hasNews = false;

      refNotice.value.showAnim(DM.showNotice);
      DM.showPlayerInfo = false;

      DM.showMore = false
      break;
    case 1:
      DM.showNotice = false;
      refNotice.value.showAnim(false);
      DM.showMore = false;
      DM.showPlayerInfo = false;

      break;
    case 2:
      refHelp.value.showHelp('main', STATE.lang)
      break;
    case 3:
      refRank.value.showRank(STATE.lang);
      DM.showNotice = false;
      DM.showMore = false;
      DM.showHelp = false;
      break;
    case 4:
      DM.showPlayerInfo = false
      DM.showMore = !DM.showMore;

      break;

    case 5:
      DM.showMore = false;
      DM.showPlayerInfo = !DM.showPlayerInfo;
      break;
    case 44:
      handleCopyValue(window.location.host)
          .then(() => {
            swal("Sucess", {
              buttons: false,
              timer: 1000,
              icon: "success",
            })
          })

      share(authorization)


    function handleCopyValue(text) {
      //浏览器禁用了非安全域的 navigator.clipboard 对象
      //在线上环境会报错 TypeError: Cannot read properties of undefined (reading 'writeText')
      if (!navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text)
      } else {
        // 判断是否支持拷贝
        if (!document.execCommand('copy')) return Promise.reject()
        // 创建标签，并隐藏
        const textArea = document.createElement('textarea')
        textArea.style.position = 'fixed'
        textArea.style.top = textArea.style.left = '-100vh'
        textArea.style.opacity = '0'
        textArea.value = text
        document.body.appendChild(textArea)
        // 聚焦、复制
        textArea.focus()
        textArea.select()
        return new Promise((resolve, reject) => {
          document.execCommand('copy') ? resolve() : reject()
          textArea.remove()
        })
      }
    }

      break;

    case 43:
      refRichText.value.showNotice(STATE.lang)
      break;
    case 42:
      window.showPrivate && window.showPrivate(STATE.lang)
      break;
    case 41:
      STATE.switchLang();

      break;

    case 51:
      refPlayer.value.showPlayer(STATE.lang, DM.hexColor, DM.online)
      break
    case 52:
      STATE.setFromSpace(true)
      DM.showTree = true
      break
  }
}

function goHome() {
  DM.showTree = false
}


function fullSCR() {
  if (BS.plugins.zoom.scale > (window.innerWidth / 6270)) {
    BS.zoomTo(window.innerWidth / 6270, 0, 0, false)
    DM.fullScreen = true
  } else {
    BS.zoomTo(1, 0, 0, false)
    DM.fullScreen = false
  }
  setTimeout(() => {
    refMinimap.value.children[0].style.width = `${70 / BS.plugins.zoom.scale}px`
    refMinimap.value.children[0].style.height = `${40 / BS.plugins.zoom.scale}px`
    BS.refresh()
  }, 100)
}
</script>

<template>
  <header>
    <svg @click="iconClick(0)"
         :style="{ transform: DM.showNotice ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)' }"
         class="header-pop border" width="36" height="36" viewBox="-5 -5.75 32 32" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M0.752869 0.75L22.7529 0.75M0.752869 7.75L22.7529 7.75M0.752869 19.75L11.7529 11.75L22.7529 19.75"
            stroke="#737373" stroke-width="1.5"/>
    </svg>
    <div v-if="DM.hasNews"
         style="width: 10px;height: 10px;background-color: red;border-radius: 50%;position: absolute;left: 50px;top: 12px;">
    </div>

    <img @click="iconClick(1)" src="/img/logo.png" alt="alt text" class="image1"/>
    <div class="header-flex">
      <div class="clock border">
        <div :style="{ left: '14px', top: '6px', backgroundColor: cd.time > 6 ? '#6a6a6a' : 'white' }"
             class="clock-spot"></div>
        <div :style="{ left: '24px', top: '6px', backgroundColor: cd.time > 5 ? '#6a6a6a' : 'white' }"
             class="clock-spot"></div>
        <div :style="{ left: '9px', top: '15px', backgroundColor: cd.time > 4 ? '#6a6a6a' : 'white' }"
             class="clock-spot"></div>
        <div :style="{ left: '19px', top: '15px', backgroundColor: cd.time > 3 ? '#6a6a6a' : 'white' }"
             class="clock-spot"></div>
        <div :style="{ left: '29px', top: '15px', backgroundColor: cd.time > 2 ? '#6a6a6a' : 'white' }"
             class="clock-spot"></div>
        <div :style="{ left: '14px', bottom: '6px', backgroundColor: cd.time > 1 ? '#6a6a6a' : 'white' }"
             class="clock-spot">
        </div>
        <div :style="{ left: '24px', bottom: '6px', backgroundColor: cd.time > 0 ? '#6a6a6a' : 'white' }"
             class="clock-spot">
        </div>

        <div style="position: absolute;right: 7px;top: 5px; ">{{
            cd.value
            < 10 ? ('00' + cd.value) : cd.value < 100 ? ('0' + cd.value) : cd.value
          }}
        </div>

      </div>
      <svg @click="iconClick(2)" class="border" width="36" height="36" viewBox="-5.75 -5.75 32 32" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path
            d="M9.52541 6.19873C9.12697 6.19873 8.74651 6.24716 8.38405 6.34399C8.02158 6.43808 7.64251 6.59302 7.24684 6.80884L6.66994 5.22754C7.08775 4.98959 7.56504 4.80005 8.10182 4.65894C8.64137 4.51782 9.19476 4.44727 9.76198 4.44727C10.4426 4.44727 11.0029 4.54135 11.4429 4.72949C11.8856 4.91489 12.237 5.15005 12.4971 5.43506C12.7599 5.71729 12.9412 6.02856 13.0408 6.3689C13.1432 6.70923 13.1944 7.03711 13.1944 7.35254C13.1944 7.7399 13.1238 8.08716 12.9827 8.39429C12.8416 8.69864 12.6631 8.98087 12.4473 9.24097C12.2315 9.50107 11.999 9.74731 11.75 9.97974C11.501 10.2122 11.2686 10.4501 11.0527 10.6936C10.8369 10.9371 10.6585 11.1958 10.5173 11.4697C10.3762 11.7409 10.3057 12.0466 10.3057 12.387C10.3057 12.4423 10.3057 12.5073 10.3057 12.582C10.3057 12.654 10.3112 12.7245 10.3223 12.7937L8.55421 12.7937C8.53208 12.6803 8.51548 12.5585 8.50441 12.4285C8.49334 12.2984 8.48781 12.1767 8.48781 12.0632C8.48781 11.6897 8.55006 11.3563 8.67458 11.063C8.79909 10.7669 8.9568 10.4944 9.14772 10.2454C9.3414 9.99634 9.54892 9.76392 9.77028 9.5481C9.99163 9.33228 10.1978 9.11646 10.3887 8.90063C10.5824 8.68481 10.7415 8.46347 10.866 8.23657C10.9905 8.00967 11.0527 7.76065 11.0527 7.4895C11.0527 7.11597 10.9255 6.80746 10.6709 6.56396C10.4164 6.32047 10.0345 6.19873 9.52541 6.19873ZM10.8494 15.3794C10.8494 15.7751 10.7193 16.0974 10.4592 16.3464C10.1992 16.5955 9.87542 16.72 9.48805 16.72C9.11452 16.72 8.79494 16.5955 8.52931 16.3464C8.26369 16.0974 8.13087 15.7751 8.13087 15.3794C8.13087 14.981 8.26369 14.6544 8.52931 14.3999C8.79494 14.1454 9.11452 14.0181 9.48805 14.0181C9.87542 14.0181 10.1992 14.1454 10.4592 14.3999C10.7193 14.6544 10.8494 14.981 10.8494 15.3794Z"
            fill-rule="nonzero" fill="#737373"/>
        <path
            d="M8.75001 20.75L12.75 20.75M20.75 12.75L20.75 8.75M0.75 12.75L0.75 8.75M20.75 4.90283L20.75 0.902832M16.75 20.75L20.75 20.75L20.75 16.75M8.75 0.75L12.75 0.75M16.75 0.75L20.75 0.75M0.75 16.75L0.75 20.75L4.75 20.75M0.75 4.75L0.75 0.75L4.75 0.75"
            stroke="#737373" stroke-width="1.5"/>
      </svg>
      <img @click="iconClick(3)" style="width:36px;height: 36px;object-fit: none;" class="border"
           src="/img/data.png" alt="data">

      <svg @click="iconClick(4)" class="border" width="36" height="36" viewBox="-6 -7.25 32 32" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M0.75 0.75L20.75 0.75M0.75 8.75L20.75 8.75M0.75 16.75L20.75 16.75" stroke="#737373"
              stroke-width="1.5"/>
      </svg>

    </div>
    <div @click="iconClick(5)" class="header-color border" :style="`background-color:${DM.playerColor}`"></div>
  </header>

  <div v-show="!DM.fullScreen"
       style="user-select: none; position: absolute;bottom: 40px;right:110px;z-index: 10; padding: 5px 20px;border: 1px solid rgba(128, 128, 128, 0.5);border-radius: 10px;background-color: white;box-shadow: 0 0 8px #00000040;display: flex;justify-content: center;align-items: center;">
    <svg @click="scale(true)" style="cursor: pointer;" viewBox="0 0 1024 1024" version="1.1"
         xmlns="http://www.w3.org/2000/svg" width="30" height="30">
      <path
          d="M960.031235 159.921913v703.656418c0 52.974134-42.979014 95.953148-95.953148 95.953148h-703.656418c-52.974134 0-95.953148-42.979014-95.953148-95.953148v-703.656418c0-52.974134 42.979014-95.953148 95.953148-95.953148h703.656418c52.974134 0 95.953148 42.979014 95.953148 95.953148z m-831.593949-159.921913C57.771791 0 0.499756 57.272035 0.499756 127.937531v767.625183c0 70.665495 57.272035 127.937531 127.93753 127.93753h767.625183c70.665495 0 127.937531-57.272035 127.937531-127.93753v-767.625183c0-70.665495-57.272035-127.937531-127.937531-127.937531h-767.625183z"
          p-id="12724" fill="#8a8a8a"></path>
      <path
          d="M831.593948 513.149439c-0.499756 17.391508-15.192582 31.084822-32.684041 31.084822H559.726696c-8.795705 0-15.992191 7.196486-15.992191 15.992191v239.183211c0 17.391508-13.693314 32.184285-31.084822 32.684041-18.091166 0.499756-32.883943-13.993167-32.883944-31.984382V560.226452c0-8.795705-7.196486-15.992191-15.992191-15.992191H224.590337c-17.391508 0-32.184285-13.693314-32.684041-31.084822-0.499756-18.091166 13.993167-32.883943 31.984382-32.883944h239.88287c8.795705 0 15.992191-7.196486 15.992191-15.992191V225.090093c0-17.391508 13.693314-32.184285 31.084822-32.684041 18.091166-0.499756 32.883943 13.993167 32.883944 31.984382v239.88287c0 8.795705 7.196486 15.992191 15.992191 15.992191h239.88287c17.991215 0 32.484139 14.792777 31.984382 32.883944z"
          p-id="12725" fill="#8a8a8a"></path>
    </svg>
    <div style="width: 2px;height: 40px;margin: 0 20px; background-color: rgba(128, 128, 128, 0.5);"></div>
    <svg @click="scale(false)" style="cursor: pointer;" viewBox="0 0 1024 1024" version="1.1"
         xmlns="http://www.w3.org/2000/svg" width="30" height="30">
      <path
          d="M960.031235 159.921913v703.656418c0 52.974134-42.979014 95.953148-95.953148 95.953148h-703.656418c-52.974134 0-95.953148-42.979014-95.953148-95.953148v-703.656418c0-52.974134 42.979014-95.953148 95.953148-95.953148h703.656418c52.974134 0 95.953148 42.979014 95.953148 95.953148z m-831.593949-159.921913C57.771791 0 0.499756 57.272035 0.499756 127.937531v767.625183c0 70.665495 57.272035 127.937531 127.93753 127.93753h767.625183c70.665495 0 127.937531-57.272035 127.937531-127.93753v-767.625183c0-70.665495-57.272035-127.937531-127.937531-127.937531h-767.625183z"
          p-id="13105" fill="#8a8a8a"></path>
      <path
          d="M799.609566 544.234261H223.890678c-17.691362 0-31.984383-14.293021-31.984382-31.984383s14.293021-31.984383 31.984382-31.984383h575.718888c17.691362 0 31.984383 14.293021 31.984382 31.984383s-14.293021 31.984383-31.984382 31.984383z"
          p-id="13106" fill="#8a8a8a"></path>
    </svg>
  </div>
  <div @click="fullSCR"
       style="display: flex;align-items: center;justify-content: center; position: absolute;bottom: 40px;right: 40px;z-index: 10;border-radius: 10px; padding: 9px;background-color: white;box-shadow: 0 0 8px #00000040;">
    <img width="34" height="34" style="object-position: center;cursor: pointer;"
         :src="DM.fullScreen ? ` /img/cfs.png` : ` /img/fs.png`" alt="">
  </div>
  <!-- show more -->
  <div
      :style="{ zIndex: 50, position: 'absolute', top: DM.showMore ? '70px' : 0, width: '100%', height: '50px', backgroundColor: 'white', transition: 'top 0.25s', display: 'flex', alignItems: 'center' }">
    <img class="more-info-img" style="height: 19px;" src="/img/peoples.png" alt="peoples">

    <div style=" font-size: 0.8rem;margin-left: -16px;white-space: nowrap;">{{ ': ' + DM.online }}</div>
    <img class="more-info-img" style="height: 19px;" src="/img/circles-seven.png" alt="circles-seven">
    <div style="font-size: 0.8rem; margin-left: -16px;white-space: nowrap;">{{ `: ${DM.filled}/12480` }}</div>
    <div
        style="cursor: pointer; position: absolute; height: 22px; width: fit-content; left: 50%;transform: translateX(-50%);">
      <img @click="iconClick(41)" class="more-info-img" src="/img/translate.png" alt="translate">
      <img @click="iconClick(42)" class="more-info-img" src="/img/statement.png" alt="statement">
      <img @click="iconClick(43)" class="more-info-img" src="/img/caution.png" alt="caution">
      <img @click="iconClick(44)" class="more-info-img" src="/img/share.png" alt="share">
    </div>


  </div>

  <!-- player more -->
  <div
      :style="{ zIndex: 50, position: 'absolute', top: DM.showPlayerInfo ? '70px' : 0, width: '100%', height: '50px', backgroundColor: 'white', transition: 'top 0.25s', display: 'flex', alignItems: 'center' }">
    <div
        :style="{ width: DM.showPlayerInfo ? 'calc(100% - 160px)' : '0px', backgroundColor: DM.playerColor, height: '100%', transition: 'width 0.7s linear 0.5s' }">
    </div>
    <div
        :style="{ position: 'absolute', right: '17px', height: '26px', cursor: 'pointer', opacity: DM.showPlayerInfo ? 1 : 0, transition: 'opacity 0.4s linear 1.2s' }">
      <img @click="iconClick(51)" style="margin-right: 10px; height: 26px;" class="more-info-img"
           src="/img/person.png" alt="person">
      <img @click="iconClick(52)" style="height: 26px;" class="more-info-img" src="/img/space.png" alt="space">
    </div>
  </div>

  <Help ref="refHelp"></Help>
  <Private ref="refPrivate"></Private>
  <RichText ref="refRichText"></RichText>
  <Notice ref="refNotice"></Notice>
  <Rank ref="refRank"></Rank>
  <Player ref="refPlayer"></Player>
  <div id="wrapper" @pointerdown="pd" @pointermove="pm">
    <div id="scroller" ref="refScroller" :class="firstEnter ? 'gray' : ''">
      <canvas id="canvas" width="6270" height="6240" ref="refCanvas"></canvas>
      <Circle v-for="(item, index) in UI" @confirm="args => showConfirm(args, index)"
              :style="{ left: 780 * (index % 8) + 'px', top: 624 * Math.floor(index / 8) + 'px' }"></Circle>
    </div>
  </div>
  <div v-show="!DM.fullScreen" id="minimap" :style="{ marginTop: DM.showPlayerInfo ||DM.showMore ? '50px' : 0 }"
       ref="refMinimap">
    <div id="minimap-indicator"></div>
  </div>
  <div id="confirm" v-show="confirmShow && !DM.fullScreen" ref="refConfirm" @click="confirm">
    {{ STATE.lang ? `确 认` : 'Confirm' }}
  </div>

  <Tree ref="refTree" v-if="DM.showTree"></Tree>
</template>

<style lang="scss" scoped>
html,
body {
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: 'Lantinghei SC', 'Microsoft Yahei', Courier;
}

:root {
  --border: rgba(168, 168, 168, 0.61);
}

#wrapper {
  position: absolute;
  z-index: 1;
  top: 60px;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #f7f7f7;
  overflow: hidden;
}

#scroller {
  position: absolute;
  z-index: 1;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  width: 6270px;
  height: 6240px;
  transform: translateZ(0);
  user-select: none;
}

.gray {
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  -webkit-filter: grayscale(100%);
}

.border {
  transition: box-shadow 0.2s;
  border-radius: 3px;
  outline: 0.5px solid var(--border);
  outline-offset: -0.25px;
  cursor: pointer;
}

.border:hover {
  box-shadow: 0 0 5px #000;
}

#confirm {
  position: fixed;
  background-color: rgb(0, 0, 0);
  border-radius: 4px;
  color: #f7f7f7;
  width: fit-content;
  padding: 4px 20px;
  z-index: 10;
  user-select: none;
  white-space: pre-wrap;
}

#canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(1px);

}

#minimap {
  position: absolute;
  z-index: 1;
  width: 240px;
  height: 240px;
  top: 120px;
  right: 20px;
  border-radius: 6px;
  outline: 2px solid rgb(35, 35, 35);
  outline-offset: -2px;
  transition: margin-top 0.25s;
}

#minimap-indicator {
  position: absolute;
  z-index: 1;
  outline: 2px solid rgb(35, 35, 35);
  outline-offset: -2px;
  width: 70px;
  height: 40px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.15);
  transform: translateZ(0);
}

.circle {
  position: absolute;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  /* background-color: #f7f7f7; */
  transition: all 0.2s;
}

header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: rgb(255, 255, 255);
  z-index: 100;
  box-shadow: 0 5px 5px #88888848;
  user-select: none;
}

header > img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  height: auto;
  object-fit: cover;
  object-position: center center;
}

.more-info-img {
  height: 22px;
  margin-left: 20px;
  margin-right: 20px;
  object-fit: contain;
  object-position: center;
}

.header-pop {
  position: absolute;
  left: 20px;
  top: 50%;
  transform-origin: center;
  transition: transform 0.35s;
}

.header-flex {
  position: absolute;
  top: 0;
  right: 100px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-flex > * {
  margin: 0 8px;
}

@font-face {
  font-family: number;
  src: url("../public/1.ttf");
}

.clock {
  position: relative;
  height: 36px;
  width: 110px;
  font-family: number;
  color: #6a6a6a;
  font-size: 32px;
  line-height: 32px;
  text-align: center;
}

.clock-spot {
  position: absolute;
  width: 6px;
  height: 6px;
  /* background-color: rgb(255, 255, 255); */
  border-radius: 50%;
  outline: 0.5px solid var(--border);

}

.header-color {
  width: 46px;
  height: 46px;
  border-radius: 5px;
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
}

.header-color::before {
  content: "";
  position: relative;
  display: block;
  width: 2px;
  top: 2px;
  height: 44px;
  left: -18px;
  background-color: var(--border);
}
</style>
