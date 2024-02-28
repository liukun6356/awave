<template>
  <div v-if="UI.show" @wheel.once="UI.showDown = false"
       style="user-select: none; position: absolute;left:0;width: 100%;height: 100%;overflow-y: scroll; z-index: 200;background-color: #f2f2f2;">
    <header style=" box-shadow: 0 5px 5px #88888848;background: #fff;align-items:center;height:70px;position: fixed;z-index: 999;top:0px;width:100%;display: flex;justify-content: center">
      <img @click="UI.show = false" style="cursor: pointer;width: 90px;height: 30px" src="/img/logo.png" alt="alt text" class="image1"/>
    </header>
    <div
        style="position: fixed;z-index: 888; top: 70px;width:calc(100% - 20px);height: 60px; background-color: white;display: flex;justify-content:space-between; align-items: center;padding: 0 10px;">
      <div @click="iconClick(4)"
           style="cursor: pointer;font-weight: 500; ">{{ STATE.lang ? "返回" : "Go Back" }}
      </div>
      <div style="height: 100%; display: flex;justify-content: center;align-items: center;cursor: pointer;">
        <img @click="iconClick(0)"
             style="height: 30px;margin-right: 10px; object-fit: contain;object-position: center;"
             src="/img/translate.png" alt="translate">
        <svg @click="iconClick(1)" width="40" height="40" viewBox="-5.75 -5.75 32 32" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path
              d="M9.52541 6.19873C9.12697 6.19873 8.74651 6.24716 8.38405 6.34399C8.02158 6.43808 7.64251 6.59302 7.24684 6.80884L6.66994 5.22754C7.08775 4.98959 7.56504 4.80005 8.10182 4.65894C8.64137 4.51782 9.19476 4.44727 9.76198 4.44727C10.4426 4.44727 11.0029 4.54135 11.4429 4.72949C11.8856 4.91489 12.237 5.15005 12.4971 5.43506C12.7599 5.71729 12.9412 6.02856 13.0408 6.3689C13.1432 6.70923 13.1944 7.03711 13.1944 7.35254C13.1944 7.7399 13.1238 8.08716 12.9827 8.39429C12.8416 8.69864 12.6631 8.98087 12.4473 9.24097C12.2315 9.50107 11.999 9.74731 11.75 9.97974C11.501 10.2122 11.2686 10.4501 11.0527 10.6936C10.8369 10.9371 10.6585 11.1958 10.5173 11.4697C10.3762 11.7409 10.3057 12.0466 10.3057 12.387C10.3057 12.4423 10.3057 12.5073 10.3057 12.582C10.3057 12.654 10.3112 12.7245 10.3223 12.7937L8.55421 12.7937C8.53208 12.6803 8.51548 12.5585 8.50441 12.4285C8.49334 12.2984 8.48781 12.1767 8.48781 12.0632C8.48781 11.6897 8.55006 11.3563 8.67458 11.063C8.79909 10.7669 8.9568 10.4944 9.14772 10.2454C9.3414 9.99634 9.54892 9.76392 9.77028 9.5481C9.99163 9.33228 10.1978 9.11646 10.3887 8.90063C10.5824 8.68481 10.7415 8.46347 10.866 8.23657C10.9905 8.00967 11.0527 7.76065 11.0527 7.4895C11.0527 7.11597 10.9255 6.80746 10.6709 6.56396C10.4164 6.32047 10.0345 6.19873 9.52541 6.19873ZM10.8494 15.3794C10.8494 15.7751 10.7193 16.0974 10.4592 16.3464C10.1992 16.5955 9.87542 16.72 9.48805 16.72C9.11452 16.72 8.79494 16.5955 8.52931 16.3464C8.26369 16.0974 8.13087 15.7751 8.13087 15.3794C8.13087 14.981 8.26369 14.6544 8.52931 14.3999C8.79494 14.1454 9.11452 14.0181 9.48805 14.0181C9.87542 14.0181 10.1992 14.1454 10.4592 14.3999C10.7193 14.6544 10.8494 14.981 10.8494 15.3794Z"
              fill-rule="nonzero" fill="#737373"/>
          <path
              d="M8.75001 20.75L12.75 20.75M20.75 12.75L20.75 8.75M0.75 12.75L0.75 8.75M20.75 4.90283L20.75 0.902832M16.75 20.75L20.75 20.75L20.75 16.75M8.75 0.75L12.75 0.75M16.75 0.75L20.75 0.75M0.75 16.75L0.75 20.75L4.75 20.75M0.75 4.75L0.75 0.75L4.75 0.75"
              stroke="#737373" stroke-width="1.5"/>
        </svg>
        <img @click="iconClick(2)"
             style=" height: 30px;margin-left: 10px; object-fit: contain;object-position: center;"
             src="/img/caution.png" alt="caution">
      </div>
      <div @click="iconClick(5)"
           style="cursor: pointer;font-weight: 500;">{{
          STATE.lang ? `空间>>` : `The
                        Space>>`
        }}
      </div>
    </div>


    <div style="position: absolute; top: 130px; width: 100%; height: 60vh; background-color: white ">
      <div :style="{ width: '90%', height: '100%', backgroundColor: UI.color }"></div>

    </div>
    <div style=" position: absolute; top: calc(60vh + 130px); width: 100%;height: calc(40vh - 130px);">
      <div
          style="position: absolute;right:80px;top:10px; font-size: 36px;  font-style: italic;white-space: pre-wrap;">
        {{ UI.colorHSB + ` ` + UI.colorRGB }}
      </div>
      <img v-if="UI.showDown"
           style="position: absolute;bottom: 20px;left: calc(50% - 30px) ; width: 60px;object-fit: contain;object-position: center;"
           src="https://awave.oss-cn-beijing.aliyuncs.com/img/down.gif" alt="down">
    </div>
    <div
        style="position: absolute;width: 626px;height: 184px; top: calc(60vh + 38px); display: flex; background-image:url('./img/yaowan.png');align-items: center;justify-content: center;">
      <div style="color: white;font-size: 80px;font-style: italic;font-weight: bold;">{{ UI.color }}</div>
    </div>


    <div
        style="position: absolute;top: 100vh; width:100%;height: 200px;background-color: white;display: flex;box-shadow:  0 0 5px #00000050;">
      <div
          style="width: 25%;height: 100% ;display:flex;flex-direction: column;justify-content: center;align-items: start;">
        <div
            style="font-size: 40px;margin-left: 20px;font-weight: bold;">
          {{ UI.playerName }}
        </div>
        <div
            style="font-size: 20px;margin-left: 20px;font-style: italic;">
          ID: {{  UI.playerId?.replace(/"/g,"") }}
        </div>
      </div>
      <!-- achieve -->
      <div style="position: relative; width: 75%;height: 100%;z-index: 10;">
        <div
            style=" position: relative;right: 20px; width:100% ;height: 50%; display: flex;justify-content:end;align-items: end;">
          <img @click="cdkey(index)" @pointerover="UI.hoverIndex = index" @pointerout="UI.hoverIndex = 2"
               v-for="(item, index) in UI.svgs"
               :class="item.svg ? (item.own ? 'achieve own' : 'achieve') : 'separate'"
               :src="item.svg ? (item.own ? (item.url + ' copy.svg') : (item.url + '.svg')) : './img/separate.png'"
               alt="svg">

          <div v-if="UI.progress > 1"
               :style="`position: absolute;right: ${832 - UI.progress * 64}px;top: 42px; background-color: black;border-radius: 26px;height:52px;width: ${UI.progress * 64 - 14}px;`">
            <img style="position: absolute;right: 6px;top: 6px; width: 40px;;"
                 :src="UI.svgs[UI.progress + 4].url + ' copy.svg'"/>
          </div>


          <div v-if="UI.showCode"
               style="position: absolute;font-size: 0.8rem;z-index: 10; background-color: white;box-shadow: 0 0 8px #00000050;padding: 10px 26px;border-radius: 8px; right: 784px;top: 120%; height: fit-content;width: fit-content;">

            <svg @click="UI.showCode = false"
                 style="pointer-events: auto; cursor: pointer;z-index: 100; position: absolute;top: 4px;left: 4px;width: 24px;height: 24px;"
                 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28"
                 height="28">
              <path
                  d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z"
                  fill="#707070"></path>
            </svg>

            <div style="text-align: center;width: 100%; margin-bottom: 15px;">
              {{ STATE.lang ? '输入兑换码' : `Enter the code` }}
            </div>
            <div style="display: flex;margin-bottom: 10px;">
              <input style="width: 200px;" v-model="UI.code" type="text">
              <div @click="submitCdk"
                   style="background-color: black;white-space: nowrap; color: white;text-align: center;padding: 0.2rem 1rem;border-radius: 5px;margin-left: 10px;">
                {{ STATE.lang ? '确认' : 'Confirm' }}
              </div>
            </div>

          </div>


        </div>
        <div style=" position: relative; text-align: center; width:100%; padding-top:20px ;;height: 50%;">{{
            STATE.lang ?
                UI.svgs[UI.hoverIndex].cn : UI.svgs[UI.hoverIndex].en
          }}
        </div>
      </div>
    </div>

    <div
        style="position: absolute;top: calc(100vh + 200px) ;left: 0; width:25%;height:calc(100vh - 320px);display: flex;align-items: center;flex-direction: column;justify-content:space-around;">

      <div
          style="position: relative;border-radius: 5px; width:80%;aspect-ratio: 1;background-color: white;box-shadow: 0 0 8px #00000040;">

        <div style="position: absolute;top: 5%;left: 5%;font-size:1vw;z-index: 10;"> {{
            STATE.lang ? `近色立方体` :
                `Similar colour`
          }}
        </div>
        <img style="position: absolute;left: 15%;top: 12%; width: 70%;aspect-ratio: 1.2;object-fit: contain;"
             src="/img/hsb.jpg" alt="hsb">

        <div class="cre" :style="`left: 31%;top: 12%;background-color:#${UI.colors[0]}`"></div>
        <div class="cre" :style="`left: 56%;top: 12%;background-color:#${UI.colors[1]}`"></div>
        <div class="cre" :style="`left: 18%;top: 34%;background-color:#${UI.colors[2]}`"></div>
        <div class="cre" :style="`left: 43.5%;top: 34%;background-color:${UI.colors[3]}`"></div>
        <div class="cre" :style="`left: 68%;top: 34%;background-color:#${UI.colors[4]}`"></div>
        <div class="cre" :style="`left: 31%;top: 56%;background-color:#${UI.colors[5]}`"></div>
        <div class="cre" :style="`left: 56%;top: 56%;background-color:#${UI.colors[6]}`"></div>
        <div style="position: absolute;top: 75%;left: 5%;font-size:1vw;z-index: 10;">{{
            STATE.lang ? '色彩坐标' :
                'Coordinate'
          }}
        </div>
        <div
            style="position: absolute;bottom: 5%;left: 0;width: 100%;text-align: center;font-style: italic; font-size:1.5vw;z-index: 10;">
          51°30',0.1°5',+6h24m
        </div>
      </div>
      <div
          style="position: relative;border-radius: 5px;  width:80%;aspect-ratio: 2.5;background-color: white;box-shadow: 0 0 8px #00000040;">
        <div
            style="position: absolute;left: 0;padding: 10px; width: 50% ;height: 100%;display: flex;flex-direction: column;justify-content: center;">
          <div>{{ STATE.lang ? `操作统计` : `Operation note` }}</div>
          <div>
            <span style="font-size: 2vw;margin: 0 5px; font-weight: bold;font-style: italic;">{{ UI.optTimes }}</span>{{
              STATE.lang ? `次` : `times`
            }}
          </div>
        </div>
        <div
            style="position: absolute;left: 50%; width: 50% ;padding: 10px;height: 100%;display: flex;flex-direction: column;justify-content: center;">
          <div>{{ STATE.lang ? `社区统计` : `Community` }}</div>
          <div>
            <span
                style="font-size: 2vw;margin: 0 5px;font-weight: bold;font-style: italic;">{{
                UI.comTimes
              }}</span>{{ STATE.lang ? `次` : `times` }}
          </div>
        </div>
      </div>
    </div>
    <div
        style="position: absolute;top: calc(100vh + 200px) ;right: 0;display: flex; width:75%;height:calc(100vh - 320px) ;background-color: white;">

      <div v-if="UI.showVideo" ref="refVideo"
           style="position: relative; width:calc(100% - 100px);height: 100%;margin-right: 10px; background-color: #000000;">
        <video autoplay loop muted :src="'https://awave.oss-cn-beijing.aliyuncs.com/video/planet.m4v'"
               style="width:100%;height:100%;position: absolute;top:0;left: 0;object-fit:contain">
          <!-- <source src="/video/planet.m4v" type="video/mp4"> -->
        </video>

        <img style="cursor: pointer; position: absolute;left: 20px;top:20px;" src="/img/planet-icon.png"
             alt="icon">
        <img @click="switchFull" style="cursor: pointer; position: absolute;right: 20px;top:20px;"
             src="/img/fulls.png" alt="icon">
      </div>
      <div style="position: relative; width:90px;height: 100%;background-color: #000000;"
      >
        <img style="cursor: pointer; position: absolute;left: 20px;top:20px;" @click="UI.showVideo=!UI.showVideo"
             :src="UI.showVideo ? `./img/map-icon.png` : `./img/planet-icon.png`" alt="icon">
      </div>
      <div v-show="!UI.showVideo" ref="refImg"
           style="display:flex;justify-content: center;position: relative; width:calc(100% - 100px);height: 100%;margin-left: 10px; background-color: #000000;">
        <div class="mapImg-wrap" ref="containerDiv"
             :style="{width:!UI.fullScreen?'1125px':'1920px',height:!UI.fullScreen?'663px':'1080px'}">
          <img class="mapImg1" src="@/assets/img/jwbcwy.png" alt="icon">
          <div style="position: relative;margin-left:4%;width: 85%;height:100%;overflow: hidden">
            <img class="mapImg2" ref="householdDiv" src="@/assets/img/mdtcwy.png" alt="icon">
          </div>
          <img class="mapImg" id="source-image" ref="mapImgRef" src="@/assets/img/sctt.png" alt="icon">

          <div class="img-container" v-for="(item,index) in listData" :key="index"
               @mouseenter.self="imgEnter(item)" @mouseleave="imgOut"
               :style="{width:UI.playerId===item.userCode?'60px':'20px',height:UI.playerId===item.userCode?'60px':'20px',position:'absolute',zIndex:999,
               left:'calc(' + item.position[0] +' - '+(UI.playerId==item.userCode?30:10)+'px)',
               top:'calc('+ item.position[1] +' - '+(UI.playerId==item.userCode?30:10)+'px)' }">
            <img class="locationImg" :src="UI.playerId===item.userCode?grdwd:trdwd" alt="icon">
          </div>
          <div class="tip-box" v-if="curInfo.name"
               :style="{left:'calc(' + curInfo.position[0] +' + 20px)',top:'calc('+ curInfo.position[1] +' - 50px)'}">
            <div class="color" :style="{backgroundColor:curInfo.color}"></div>
            <div class="tit">{{ curInfo.name }}</div>
          </div>
          <div class="video-wrap" v-if="videoShow && !curInfo.name"
               :style="{left:'calc(' + curFixPos[0] +'px - 740px)',top:'calc('+ curFixPos[1] +'px - 450px)'}">
            <video autoplay loop muted  ref="videoRef" src="@/assets/video/44.webm"

                   style="width:100%;height:100%;position: absolute;top:0;left: 0;object-fit:contain">
            </video>
          </div>
        </div>
        <img style="cursor: pointer; position: absolute;right: 20px;top:20px;" src="/img/map-icon.png"
             alt="icon">
        <img @click="switchFull" style="cursor: pointer; position: absolute;left: 20px;top:20px;z-index:5"
             src="/img/fulls.png" alt="icon">
      </div>
    </div>

  </div>

</template>
<script setup>
import {nextTick, reactive, ref, watch, onMounted} from 'vue';
import {getPlayer, getCommunity, submitCode, getAllPlayer} from "@/api/home"
import {hexToHsb, hexToRgb, hsbToHex} from './colorUtil'
import {useState} from '@/store/modules/home';
import TragTools from "@/utils/trag.js"
import {getUsers} from "@/api/home";
import trdwd from "@/assets/img/trdwd1.png"
import grdwd from "@/assets/img/grdwd1.gif"

const STATE = useState();
const refImg = ref(null)
const refVideo = ref(null)
const mapImgRef = ref(null)
const containerDiv = ref(null)
const householdDiv = ref(null)
const videoRef = ref(null)
const curFixPos = ref([])
const UI = reactive({
  show: false,
  color: '',
  colorHSB: '',
  colorRGB: '',
  showDown: true,
  playerName: 'sfafsafasfsa',
  playerId: 'asfasfasd',
  colors: ['', '', '', '', '', '', ''],
  optTimes: 0,
  comTimes: 0,
  showVideo: true,
  fullScreen: false,
  code: '',
  showCode: false,
  rank: 999,
  svgs: [
    {
      url: './svg/0',
      svg: true,
      own: false,
      cn: `完成前期的问卷调查。（提示：点击输入兑换码获得）`,
      en: `Complete the preliminary survey. (Tip: Click to enter the code)`
    },
    {
      url: './svg/1',
      svg: true,
      own: false,
      cn: `完成问卷调查。（提示：点击上方“!”图标,然后点击右上角的链接进入问卷，完成问卷调查后获得成就。）`,
      en: `Complete the survey. (Tip: Click “!” above and then click the link in the upper right corner to enter the survey, and get the achievement after completing the survey.)`
    },
    {url: '', svg: false, own: false, cn: ``, en: ``},
    {url: './svg/2', svg: true, own: false, cn: `将网站分享给身边的人。`, en: `Share us.`},
    {url: '', svg: false, own: false},
    {url: './svg/3', svg: true, own: false, cn: `完成第一次的填涂。`, en: `Complete the first fill.`},
    {url: './svg/4', svg: true, own: false, cn: `累计填涂10次圆圈。`, en: `Fill in circles 10 times.`},
    {url: './svg/5', svg: true, own: false, cn: `累计填涂40次圆圈。`, en: `Fill in circles 40 times.`},
    {url: './svg/6', svg: true, own: false, cn: `累计填涂80次圆圈。`, en: `Fill in circles 80 times.`},
    {url: './svg/7', svg: true, own: false, cn: `累计填涂120次圆圈。`, en: `Fill in circles 120 times.`},
    {url: './svg/8', svg: true, own: false, cn: `累计填涂200次圆圈。`, en: `Fill in circles 200 times.`},
    {url: './svg/9', svg: true, own: false, cn: `累计填涂500次圆圈。`, en: `Fill in circles 500 times.`},
    {url: '', svg: false, own: false},
    {
      url: './svg/10',
      svg: true,
      own: false,
      cn: `当在线人数大于50人`,
      en: `When the current number of online users is greater than 50`
    },
    {url: '', svg: false, own: false},
    {
      url: './svg/13',
      svg: true,
      own: false,
      cn: `成为画布上占有圆圈前百名的用户获得，但当条件不满足时会失去此成就。`,
      en: `Become the top 100 users who occupy the circle on the canvas. This achievement will be lost when conditions are not met.`
    },
    {
      url: './svg/12',
      svg: true,
      own: false,
      cn: `成为画布上占有圆圈前十名的用户获得，但当条件不满足时会失去此成就。`,
      en: `Become the top 10 users who occupy the circle on the canvas. This achievement will be lost when conditions are not met.`
    },
    {
      url: './svg/11',
      svg: true,
      own: false,
      cn: `成为画布上占有圆圈第一名的用户获得，但当条件不满足时会失去此成就。`,
      en: `Become the top ONE users who occupy the circle on the canvas. This achievement will be lost when conditions are not met.`
    },
  ],
  hoverIndex: 2,
  progress: 1
})
const listData = ref([])
const curInfo = ref({
  color: '#2a4935',
  position: ["59.55555555555556%", "56.872037914691944%"],
  name: "",
})
const videoShow = ref(false)

onMounted(() => {
  document.onfullscreenchange = () => {
    if (!UI.showVideo && UI.show) {
      setTimeout(() => {
        getlist()
        doMouseFn()
      }, 600)
    }
  }
})

watch(()=>UI.show,()=>{
  setTimeout(() => {
    UI.showVideo = false
  }, 1000)
})

watch(() => UI.showVideo, () => {
  UI.playerId = localStorage.getItem('userCode') || 0;
  if (!UI.showVideo && UI.show) {
    nextTick(() => {
      getlist()
      doMouseFn()
    })
  }
})

const imgEnter = (row) => {
  curInfo.value = JSON.parse(JSON.stringify(row))
}
const imgOut = () => {
  curInfo.value.name = ''
}

const doMouseFn = () => {
  let offsetX, offsetY, isDragging;
  // 水平方向最大偏移量
  const MaxOffsetWidth = householdDiv.value.getBoundingClientRect().width - containerDiv.value.getBoundingClientRect().width - 10;
  // 竖直方向最大偏移量
  const MaxOffsetHeight = householdDiv.value.getBoundingClientRect().height - containerDiv.value.getBoundingClientRect().height;
  const maxobj = getElementPosition(containerDiv.value)
  containerDiv.value.addEventListener('mouseenter',()=>{
    setTimeout(()=>{
      if(!videoShow.value)videoShow.value= true
    },1000)
  })
  containerDiv.value.addEventListener('mouseleave',()=>{
      if(videoShow.value)videoShow.value= false
  })
  containerDiv.value.addEventListener('mousedown', (event) => {
    event.preventDefault()
    // event.stopPropagation()
    isDragging = true;
    offsetX = event.clientX - householdDiv.value.offsetLeft;
    offsetY = event.clientY - householdDiv.value.offsetTop;
  });
  containerDiv.value.addEventListener('mousemove', (event) => {
    curFixPos.value = [event.clientX,event.clientY]
    if (isDragging) {
      containerDiv.value && (containerDiv.value.style.cursor = "move");
      let x = event.clientX - offsetX;
      let y = event.clientY - offsetY;
      if (Math.abs(x) > MaxOffsetWidth) {
        x = -MaxOffsetWidth;
      } else if (x >= 0) {
        x = 0;
      }
      if (Math.abs(y) > MaxOffsetHeight) {
        y = -MaxOffsetHeight;
      } else if (y >= 0) {
        y = 0;
      }
      const bottom = y === -MaxOffsetHeight ? 0 : -(MaxOffsetHeight - Math.abs(y));
      if (householdDiv.value.offsetWidth >= containerDiv.value.offsetWidth) {
        householdDiv.value.style.left = x + 'px';
        videoRef.value.currentTime = Math.abs(x/MaxOffsetWidth) * videoRef.value.duration
          // console.log(event.clientX,event.offsetX,event.pageX,event.target,event.target.width,x/MaxOffsetWidth)

        // console.log((event.clientX -maxobj.left)/containerDiv.value.getBoundingClientRect().width,
        //     // (event.clientY -maxobj.top)/containerDiv.value.getBoundingClientRect().height
        //     event.clientY
        // )
        // debugger
        // curInfo.value
      }
      // if (householdDiv.value.offsetHeight >= containerDiv.value.offsetHeight) {
      //   householdDiv.value.style.bottom = bottom + 'px';
      // }


    }
  });
  // document.addEventListener('mouse',(event)=>{
  //
  // })

  document.addEventListener('mouseup', () => {
    containerDiv.value && (containerDiv.value.style.cursor = "default");
    householdDiv.value.style.zIndex = 2
    isDragging = false;
  });
}


const getlist = () => {
  getUsers().then(res => {
    listData.value = res.data.filter(item => item.position && /%/g.test(item.position)).map(item => ({
      ...item,
      position: JSON.parse(item.position)
    }))
    // res.data.filter(item => item.position && isJSON(item.position)).map(item => JSON.parse(item.position))
  })
}

function getElementPosition(elem) {
  var parent = elem.offsetParent,
      offsetLeft = elem.offsetLeft,
      offsetTop = elem.offsetTop;
  while (parent) {
    offsetLeft += parent.offsetLeft;
    offsetTop += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return {
    left: offsetLeft,
    top: offsetTop,
  };
}

function isJSON(str) {
  if (typeof str != 'string') { // 1、传入值必须是 字符串
    // console.log('It is not a string! [' + str + ']')
    return false;
  }

  try {
    var obj = JSON.parse(str); // 2、仅仅通过 JSON.parse(str)，不能完全检验一个字符串是JSON格式的字符串
    if (typeof obj == 'object' && obj) {  //3、还必须是 object 类型
      // console.log('转换成功：' + str);
      return true;
    } else {
      // console.log('转换失败：' + str);
      return false;
    }

  } catch (e) {
    // console.log('error：[' + str + '] !!! ' + e);
    return false;
  }
  return false;
}

function iconClick(key) {
  switch (key) {
    case 0:
      STATE.switchLang();
      break;
    case 1:
      window.showHelp('player', STATE.lang)
      break;
      4
    case 2:
      window.showRich(STATE.lang)
      break;
    case 4:

      UI.show = false
      break;
    case 5:
      UI.show = false;
      STATE.setFromSpace(false)
      window.showSpace()
      break;
  }
}

function switchFull() {
  const element = UI.showVideo ? refVideo.value : refImg.value
  if (UI.fullScreen) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    UI.fullScreen = false
  } else {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
    UI.fullScreen = true

  }
}


function cdkey(index) {
  if (index == 0) {
    UI.showCode = true
  }
}

function submitCdk() {

  UI.showCode = false;
  submitCode(localStorage.getItem("Authorization"), UI.code, (res) => {
    if (res) {
      UI.svgs[0].own = true;
    }
  })
}

function showPlayer(lang, color, online) {
  let chengjiushu = 0;
  UI.showDown = true

  UI.show = true;
  STATE.setLang(lang)
  UI.color = color;
  UI.playerName = localStorage.getItem('username') || "";
  UI.playerId = localStorage.getItem('userCode') || 0;

  const helpMain = localStorage.getItem('helpPlayer');
  if (!helpMain) {
    window.showHelp('player', STATE.lang)
  }
  localStorage.setItem('helpPlayer', '1');


  UI.svgs[13].own = online >= 50
  if (UI.svgs[13].own) {
    chengjiushu++;
  }
  window.localStorage.setItem("cj", "1")
  const hsb = hexToHsb(UI.color);
  UI.colorHSB = `H${hsb.h}'S${hsb.s}'B${hsb.b}`;
  let {r, g, b} = hexToRgb(UI.color);
  UI.colorRGB = `R${r}'G${g}'B${b}`;

  //4 3 1 2 5 6 7
  UI.colors[3] = UI.color;
  let hhssbb = {h: hsb.h + 30 < 360 ? hsb.h + 30 : 360, s: hsb.s, b: hsb.b};

  UI.colors[2] = hsbToHex(hhssbb)
  hhssbb = {h: hsb.h - 30 > 0 ? hsb.h - 30 : 0, s: hsb.s, b: hsb.b};
  UI.colors[0] = hsbToHex(hhssbb)
  hhssbb = {h: hsb.h, s: hsb.s + 40 < 100 ? hsb.s + 40 : 100, b: hsb.b};
  UI.colors[1] = hsbToHex(hhssbb)
  hhssbb = {h: hsb.h, s: hsb.s - 40 > 0 ? hsb.s - 40 : 0, b: hsb.b};
  UI.colors[4] = hsbToHex(hhssbb)
  hhssbb = {h: hsb.h, s: hsb.s, b: hsb.b - 40 > 0 ? hsb.b - 40 : 0};
  UI.colors[5] = hsbToHex(hhssbb)
  hhssbb = {h: hsb.h, s: hsb.s, b: hsb.b + 40 < 100 ? hsb.b + 40 : 100};
  UI.colors[6] = hsbToHex(hhssbb)


  getPlayer(window.localStorage.getItem('Authorization') || '', (res) => {

    UI.optTimes = res.action || 0;
    UI.svgs[0].own = res.a1;
    UI.svgs[1].own = res.a2;
    UI.svgs[3].own = res.a3;

    if (UI.svgs[0].own) {
      chengjiushu++;
    }
    if (UI.svgs[1].own) {
      chengjiushu++;
    }
    if (UI.svgs[3].own) {
      chengjiushu++;
    }


    if (UI.optTimes >= 500) {
      UI.progress = 7;

    } else if (UI.optTimes >= 200) {
      UI.progress = 6
    } else if (UI.optTimes >= 120) {
      UI.progress = 5
    } else if (UI.optTimes >= 80) {
      UI.progress = 4
    } else if (UI.optTimes >= 40) {
      UI.progress = 3
    } else if (UI.optTimes >= 10) {
      UI.progress = 2
    } else if (UI.optTimes >= 1) {
      UI.progress = 1;
      UI.svgs[5].own = true
    }
    chengjiushu = chengjiushu + UI.progress;

    if (chengjiushu < 5) {
      window.localStorage.setItem("cj", "1")
    } else if (chengjiushu < 10) {
      window.localStorage.setItem("cj", "2")
    } else {
      window.localStorage.setItem("cj", "3")
    }


  })
  getCommunity((res) => {
    UI.comTimes = res || 0;
  })
  getAllPlayer(res => {
    res.sort((a, b) => b.own - a.own)
    const index = res.findIndex(item => item.id == UI.playerId)
    if (index > -1) {
      UI.svgs[15].own = index < 99
      UI.svgs[16].own = index < 9
      UI.svgs[17].own = index < 1
    }

    if (UI.svgs[15].own) {
      chengjiushu++;
      window.localStorage.setItem("island", "1")
    }
    if (UI.svgs[16].own) {
      chengjiushu++;
      window.localStorage.setItem("ring", "1")
    }
    if (UI.svgs[17].own) {
      chengjiushu++;
    }

    if (chengjiushu < 5) {
      window.localStorage.setItem("cj", "1")
    } else if (chengjiushu < 10) {
      window.localStorage.setItem("cj", "2")
    } else {
      window.localStorage.setItem("cj", "3")
    }
  })

}


defineExpose({showPlayer})

</script>

<style lang="scss" scoped>
.cre {
  position: absolute;
  width: 13.5%;
  height: 13.5%;
  border-radius: 50%;
}

.achieve {
  padding: 10px;
  margin: 0px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid black;
  transform: scale(0.8);
  transform-origin: center;
  overflow: visible;
  cursor: pointer;
}

.separate {
  padding: 10px;
  width: 40px;
  height: 40px;
  object-fit: contain;
  object-position: center;

}

.own {
  background-color: black;
}

.mapImg-wrap {
  position: relative;
  width: 1125px;
  height: 633px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/*@media screen  and (min-height: 1000px) {*/
/*  .mapImg-wrap {*/
/*    width: 1920px;*/
/*    height: 1080px;*/
/*  }*/
/*}*/

@media screen and (max-height: 1000px) {
  .mapImg-wrap {
    width: 1125px;
    height: 633px;
  }
}

.mapImg {
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 1;
  pointer-events: none;
}

.mapImg1 {
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 3;
  pointer-events: none;
}

.mapImg2 {
  position: absolute;
  height: 100%;
  left: -1000px;
  top: 0;
  opacity: 1;
  z-index: 2;
}

.locationImg {
  aspect-ratio: 1;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 999;
  object-fit: contain;
  object-position: center;
  pointer-events: none;
}

.tip-box {
  position: absolute;
  display: flex;
  height: 38px;
  border: 1px solid;
  box-sizing: border-box;
  z-index: 999;

  .color {
    width: 38px;
    height: 38px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  .tit {
    height: 38px;
    min-width: 100px;
    line-height: 38px;
    color: #fafafa;
    padding: 0 20px;
    border: 1px solid #ccc;
    background: #232323;
    box-sizing: border-box;
  }
}

.video-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 713px;
  height: 410px;
  box-sizing: border-box;
  z-index: 999;
  background: #232323;

  video {
    margin-top: 10px;
    margin-left: 10px;
    width: 693px !important;
    height: 390px !important;
    border: 1px solid #fafafa;
    box-sizing: border-box;
    //height: 426px;
  }
}
</style>