<template>
  <div>
    <div class="rightIcon">
      <div v-show="isFullScrren" v-for="(icon1, index1) of iconList_1" :key="icon1" class="iconList"
        @click="changeIoncIndex(index1)">
        <img :src="getImg(icon1)" class="img" />
      </div>
      <div class="line" v-show="isFullScrren">
        <div class="line_c"></div>
      </div>
      <div v-show="isFullScrren" v-for="(icon, index) of iconList_2" :key="icon" class="iconList"
        @click="changeIoncIndex(index + 3)">
        <img :src="getImg(icon)" class="img" :style="index==0?'transform:scale(1.2)':''" />
        <div class="detailPanel" v-show="UI.showDetail && index == 0">
          <div class="head">{{ !STATE.lang ? 'EVENT LOG' : '日志' }} </div>
          <template v-for="item in panelDetailList" :key="item.text">
            <panelDetail :lineStep="item.lineStep" :max="item.max" :title="!STATE.lang ? item.title2 : item.title"
              :text="!STATE.lang ? item.text2 : item.text" :icon="item.icon" />
          </template>
        </div>
      </div>
      <div class="out" v-show="!isFullScrren" @click="changeIoncIndex(4)">
        <img style="object-position: center;transform: scale(1.4);" :src="getImg('offscreentwo.png')" class="img" />
      </div>
    </div>
    <div class="rightIcon2">
      <div class="cameraOr" :style="{marginBottom: UI.showCam ? '400%' : '' }" v-show="isFullScrren">
        <div style="display: flex;align-items: center;">
          <img style="object-position: center;" :src="getImg('caemra_po.png')" class="img" @click="UI.showCam = !UI.showCam" />
        </div>
        <div class="range" v-if="UI.showCam">
          <input type="range" id="myRange" min="8" max="17" v-model="rangeData" @input="changeRangeData" />
        </div>
      </div>
      <div class="cameraPo" v-if="UI.showCam">
        <div class="linee" v-show="isFullScrren">
          <div class="line_cc"></div>
        </div>
        <div class="fk" v-for="item of cameraPosition" :key="item" @click="changeRangeData(item.position)"
          v-show="isFullScrren">
          <img :src="item.img" class="fk_img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import panelDetail from "./components/PanelDetail.vue";
import { defineProps, defineExpose, reactive } from "vue";
import { ref } from "vue";
import { useState } from '@/store/modules/home';

const STATE = useState();


const UI = reactive({  showDetail: false, showCam: false })
let iconList_1 = ["translate.png", "jc.png", "caution.png"];
let iconList_2 = ["menu-unfold-one-2.png", "full-screen-two-2.png"];


const emit = defineEmits(['full'])
function fullSC(bo) {
  emit('full',bo)
}


function getImg(name) {
  return new URL(`./assets/icon/${name}`, import.meta.url).href;
}
let data = defineProps({
  distanceChangeCamera: Function,
  loadArr: Function,
});
let cameraPosition = [
  {
    img: getImg("camera1.png"),
    position: { x: -6.84, y: 3.04, z: -10.34 },
  },
  {
    img: getImg("camera2.png"),
    position: { x: -9.34, y: 3.42, z: -14.13 },
  },
  {
    img: getImg("camera3.png"),
    position: { x: -1.99, y: 0.57, z: -10.38 },
  },
  {
    img: getImg("camera4.png"),
    position: { x: -8.58, y: 0.28, z: -6.1 },
  },
  {
    img: getImg("camera5.png"),
    position: { x: -4.2, y: 0.71, z: -6.01 },
  },
  {
    img: getImg("camera6.png"),
    position: { x: -6.52, y: 0.82, z: -4.19 },
  },
  {
    img: getImg("camera8.png"),
    position: { x: -2.39, y: 1.56, z: -2.11, x1: -1.24, y1: 1.61, z1: -1.83, max: 2.86, min: -1.8 },
  },
  {
    img: getImg("camera7.png"),
    position: {
      x: -0.35,
      y: -0.44,
      z: -0.57,
      x1: -0.35,
      y1: -0.53,
      z1: -0.24,
      max: 2.32,
      min: -1.45,
    },
  },
];

/* ------------------------- 分割线 ------------------------------------- */

let isFullScrren = ref(true);
let iconIndex = ref(0);
function changeIoncIndex(index) {
  iconIndex.value = index;


  switch (index) {
    case 0:
      STATE.switchLang()
      break;
    case 1:
      window.showHelp('space', STATE.lang)
      break;
    case 2:
    window.showRich(STATE.lang)
      break;
    case 3:
      UI.showDetail = !UI.showDetail
      break;
    //4为切换全屏
    case 4:
      isFullScrren.value = !isFullScrren.value;
      fullSC(!isFullScrren.value)
      break;


  }

}
let panelDetailList = [
  {
    lineStep: [33.3, 33.3, 33.3],
    max: getTreeMax(),
    title: "播种",
    title2: "Seeding",
    text: "2023/07/12我们播种下这一颗榕树树苗，看起来这里是一个不错的地方。我听到了鸽子平和的低语和水鸟的叫声，或许这颗树也能为它们提供庇护。",
    text2: "2023/07/12, we planted this banyan sapling. It looks like a good place. I heard the peaceful murmurs of doves and the calls of aquatic birds, perhaps they are talking this tree could provide shelter for them too.",
    icon: getImg("01.png"),
  },
  {
    lineStep: [10, 20, 20, 20, 30],
    max: window.getBirdMax && window.getBirdMax()||2,
    title: "鸟类天堂",
    title2: "Bird’s Paradise",
    text: `“起初四周非常清静。后来忽然起了一声鸟叫。朋友陈把手一拍，我们便看见一只大鸟飞起来，接着又看见第二只，第三只。我们继续拍掌。很快地这个树林变得很热闹了。到处都是鸟声，到处都是鸟影。大的，小的，花的，黑的，有的站在枝上叫，有的飞起来，有的在扑翅膀。”`,
    text2: `"At first it was very quiet. Then suddenly there was a bird's cry. My friend Chen clapped his hand and we saw a big bird fly, then the second, then the third. We kept clapping. Soon the woods became very lively. Birds are everywhere. Sounds are everywhere. Big ones, small ones, colourful ones, black ones, some were standing on the branches and crying, some were flying up, some were fluttering their wings.”`,
    icon: getImg("02.png"),
  },
  {
    lineStep: [33.3, 33.3, 33.3],
    max: parseInt(window.localStorage.getItem("cj") || "1"),
    title: "陪伴",
    title2: 'Accompanying',
    text: "这里变得更热闹了，时时刻刻有人坐在树下乘凉，有的人双手搭在树皮上，头靠在树上闭目呢喃。我看到有的人带来丝带，将自己的经历和期待系在榕树宽阔的树根和枝桠上。鸟的天堂也是人类天堂。",
    text2: `This space became more lively with the time past, people come here and sit under the tree, some people put their hands on the bark, head against the tree and close their eyes whispering. I saw people bringing ribbons to tie their experiences and expectations to the broad roots and branches of the banyan tree. A bird's paradise is also a human paradise.`,
    icon: getImg("03.png"),
  },
  {
    lineStep: [100],
    max: parseInt(window.localStorage.getItem("ring") || "0"),
    title: "环",
    title2: `The Ring`,
    text: "不同的语言不同的文化的人手拉着手，围绕着大树旋转着跳舞。我并不认识这些人，但是在这一刻我就是感觉我们是一体的，这是一股前所未有的力量感。",
    text2: `People of different languages and cultures hold hands and dance around the tree. I didn't know any of these people, but at this moment I just felt that we were one, and this was a sense of power that I had never felt before.`,
    icon: getImg("04.png"),
  },
  {
    lineStep: [100],
    max: parseInt(window.localStorage.getItem("island") || "0"),
    title: "岛",
    title2: `The Island`,
    text: "大树的成长速度超乎我想象。很快地，它开始结出种子，小鸟喜欢吃种子，它们将代替我把新的故事种到更远的其他地方。",
    text2: `The tree grew faster than my imagination. Soon it began to produce seeds. Birds loved to eat them, and they would take my place in planting new stories to other places.`,
    icon: getImg("05.png"),
  },
];



function getTreeMax() {

  let localtime = new Date();

  let localmesc = localtime.getTime();

  let localOffset = localtime.getTimezoneOffset() * 60000;

  let utc = localOffset + localmesc;

  let calctime = utc + (3600000);
  let nd = new Date(calctime);

  const month = nd.getMonth()
  const day = nd.getDate()
  if (month == 6 && day < 13) {
    return 1
  } else if (month == 6 && day == 13) {
    return 2
  } else {
    return 3
  }
}


function loadArrFn() {
  let arr = [];
  panelDetailList.forEach((item, index) => {
    arr.push(item.max);
  });
  data.loadArr(arr);
}
loadArrFn();




/* ------------------------- 滑动条 ------------------------------------- */
let rangeData = ref(8);
function changeRangeData(value) {
  if (value.x != null) {
    data.distanceChangeCamera(value);
  } else if (value.type == null) {
    rangeData.value = value;
  } else {
    let tt = data.distanceChangeCamera(rangeData.value);
    if (tt === false) rangeData.value = 8;
  }
}

//全屏



defineExpose({
  changeRangeData,
});


</script>

<style scoped>
.rightIcon {
  top: 100px;
  right: 0;
  position: absolute;
  z-index: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 0 10px #00000050;
}
.rightIcon2{
  top: 340px;
  right: 0;
  position: absolute;
  z-index: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 0 10px #00000050;
}
.iconList {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  flex-direction: column;
}

.iconList:hover {
  background-color: #bababb;
}

.detailPanel {
  font-size: 1vw;
  font-weight: 666 !important;
  position: absolute;
  right: 3vw;
  top: 0;

  width: 17vw;
  overflow-y: scroll;
  height: 70vh;
  background-color: white;
  padding: 0 20px 0 30px;

  clip-path: polygon(100% 0, 100% 1%, 95% 2.5%, 100% 4%, 100% 100%, 0 100%, 0 0);
}

.head {
  display: flex;
  align-items: center;
  padding: 9px 0 0px 0;
}

.line {
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.line_c {
  margin: 1px 0;
  width: 1.7vw;
  height: 2px;
  background-color: #cbcbcc;
}

.linee {
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
}

.line_cc {
  margin: 1px 0;
  width: 1.7vw;
  height: 2px;
  background-color: #cbcbcc;
}

.img {
  width: 1vw;
  height: 1vw;
  flex: 1;
  padding: 10px;
}

.out {
  position: fixed;
  background-color: white;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
}

.out:hover {
  background-color: #bababb;
}

.cameraOr {
  /* margin-top: 2vh; */
  width: 100%;
  background-color: #232323;
  position: relative;
  /* height: 100px; */
}

.range {
  position: absolute;
  top: 254%;
  height: 91%;
  background-color: white;
  overflow: hidden;
  transform: scaleY(4) rotateZ(90deg);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2px;
  margin: 0;
  height: 100%;
}

#myRange {

  display: inline-block;
    margin: 0;
    padding: 0;



  -webkit-appearance: none;
  /* 隐藏默认的样式 */
  width: 100%;
  /* 设置宽度 */
  height: 10px;
  /* 设置高度 */
  background: #ddd;
  /* 设置背景 */
  outline: none;
  /* 去掉外边框 */
  -webkit-transition: 0.2s;
  /* 添加过渡效果 */
  transition: opacity 0.2s;
}

/* 滑块 */
#myRange::-webkit-slider-thumb {
  -webkit-appearance: none;
  /* 隐藏默认的样式 */
  appearance: none;
  width: 2px;
  /* 设置滑块的宽度 */
  height: 20px;
  /* 设置滑块的高度 */
  background: #232323;
  /* 设置滑块的背景 */
  cursor: pointer;
  /* 添加手形光标 */
}
#myRange::-moz-range-thumb {
  -webkit-appearance: none;
  /* 隐藏默认的样式 */
  appearance: none;
  width: 2px;
  /* 设置滑块的宽度 */
  height: 20px;
  /* 设置滑块的高度 */
  background: #232323;
  /* 设置滑块的背景 */
  cursor: pointer;
  /* 添加手形光标 */
  padding: 0;
  margin: 0;
  border: none;
}

#myRange:hover::-webkit-slider-thumb {
  background: #443e3e;
}








.cameraPo {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
}

.fk {
  width: 1.5vw;
  height: 2.8vh;
  margin: 0.2vh 0;
  box-shadow: -1px 0px 2px 1px rgba(0, 0, 0, 0.2);
  position: relative;
}

.fk:hover {
  box-shadow: -1px 0px 2px 1px rgba(0, 0, 0, 0.5);
}

.fk_img {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
