<template>
  <div class="MyAudio">
    <div class="top_canvas">
      <div
        :style="{ position: 'relative', left: UI.left + '%', top: UI.top + '%', width: '29%', height: '13%', backgroundColor: 'white', outline: '1px solid gray' }">
      </div>
    </div>
    <div class="bottom_canvas">
      <div class="bottom_canvas_top">
        <div class="title">{{STATE.lang?'Position':'空间定位'}}</div>
        <div class="x_title">
          <input type="checkbox" v-model="isSelect" />
          <div class="font">{{STATE.lang?'Sound on':'启用声音'}}</div>
        </div>
      </div>
      <div class="bottom_canvas_center">
        <canvas id="video_bx"></canvas>
      </div>
      <div class="bottom_canvas_bottom">{{STATE.lang?'Wearing a headphone for better experience.':'推荐佩戴耳机以获得最佳体验'}}</div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { gsap } from "gsap";
import { useState } from "@/store/modules/home";
const STATE = useState();
let isSelect = ref(true);


let interval2min;
const UI = reactive({
  left: window.cccLeft / 62.40,
  top: window.cccTop / 62.40
})

onMounted(() => {
  window.muteAll = function () {
    isSelect.value = false
  }

  let canvas = document.getElementById("video_bx");
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  let ctx = canvas.getContext("2d");
  let WIDTH = canvas.clientWidth;
  let HEIGHT = canvas.clientHeight;
  let barWidth,
    barHeight = 0,
    bufferLength;
  let dataArr = new Map();
  let audioArr = new Map();
  function createdataArray(name, url, loop = false) {
    let oAudio = new Audio();
    oAudio.crossOrigin = "anonymous";
    oAudio.src = url;
    oAudio.loop = loop;
    oAudio.volume = 0.5;
    oAudio.name = name;
    oAudio.onended = function () {
      if (oAudio.name.startsWith("中部鸟叫")) {
        niaoMusicNum--;
        hailangJJ();
      } else if (oAudio.name == "顶部钟声") {
        window.switchNight && window.switchNight()
      }
    };
    audioArr.set(name, oAudio);
    let oCtx = new AudioContext();
    let audioSrc = oCtx.createMediaElementSource(oAudio);
    let analyser = oCtx.createAnalyser();
    audioSrc.connect(analyser);
    analyser.connect(oCtx.destination);
    analyser.fftSize = 256;
    bufferLength = analyser.frequencyBinCount;
    barWidth = WIDTH / bufferLength - 1;
    let dataArray = new Uint8Array(bufferLength);
    dataArr.set(analyser, dataArray);
  }
  createdataArray("底部声音", "https://awave.oss-cn-beijing.aliyuncs.com/audio/dbsy.m4a", true);
  createdataArray("顶部海浪", "https://awave.oss-cn-beijing.aliyuncs.com/audio/dbhl.m4a", true);
  createdataArray("顶部钟声", "https://awave.oss-cn-beijing.aliyuncs.com/audio/dbzs.m4a");
  createdataArray("中部鸟叫1", "https://awave.oss-cn-beijing.aliyuncs.com/audio/bird1.m4a");
  createdataArray("中部鸟叫2", "https://awave.oss-cn-beijing.aliyuncs.com/audio/bird2.m4a");
  createdataArray("中部鸟叫3", "https://awave.oss-cn-beijing.aliyuncs.com/audio/bird3.m4a");
  createdataArray("中部鸟叫4", "https://awave.oss-cn-beijing.aliyuncs.com/audio/bird4.m4a");
  function draw() {
    let entries = dataArr.entries();
    for (let [key, value] of entries) {
      key.getByteFrequencyData(value);
    }
    let x = 0;
    barHeight = 0;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (let i = 0; i < bufferLength; i++) {
      barHeight = 0;
      let values = dataArr.values();
      for (let value of values) {
        barHeight += value[i];
      }
      barHeight *= 0.03;
      let color = Math.random() * 240;
      //   ctx.fillStyle = `rgb(${Math.random() * 156},${Math.random() * 156},${Math.random() * 156}))`;
      ctx.fillStyle = `rgb(${color},${color},${color}))`;
      ctx.fillRect(WIDTH / 2 + x, HEIGHT / 2, barWidth, -barHeight);
      ctx.fillRect(WIDTH / 2 - x, HEIGHT / 2, barWidth, -barHeight);
      ctx.fillRect(WIDTH / 2 + x, HEIGHT / 2, barWidth, barHeight);
      ctx.fillRect(WIDTH / 2 - x, HEIGHT / 2, barWidth, barHeight);
      x += barWidth + 4;
    }
    window.requestAnimationFrame(draw);
  }
  draw();
  function autoPlay() {
    audioArr.get("底部声音").play();
    audioArr.get("顶部海浪").play();
    audioArr.get("顶部海浪").volume = 0;
    window.removeEventListener("mousemove", autoPlay);
  }
  window.addEventListener("mousemove", autoPlay);

  //互动不强烈时，播放钟声
  function zs() {
    let audio = audioArr.get("顶部钟声");
    if (audio.paused) {
      audio.play();
    }
  }

  //随机鸟叫
  let niaoMusicNum = 0;
  function niaoMusic() {
    window.switchDay && window.switchDay()
    let name = ["中部鸟叫1", "中部鸟叫2", "中部鸟叫3", "中部鸟叫4"];
    let audio = audioArr.get(`${name[Math.round(Math.random() * 3)]}`);
    if (audio.paused) {
      audio.play();
      niaoMusicNum++;

    }
    hailangJJ();

    interval2min && clearInterval(interval2min)
    interval2min = setInterval(() => {
      zs();
    }, 120 * 1000)
  }

  window.niaoMusic = niaoMusic;


  //海浪渐进和渐隐
  function hailangJJ() {
    let audio = audioArr.get("顶部海浪");
    if (niaoMusicNum >= 3) {
      gsap.to(audio, {
        volume: 1,
        duration: 3,
      });
    } else {
      gsap.to(audio, {
        volume: 0,
        duration: 3,
      });
    }

  }

  interval2min = setInterval(() => {
    zs();
  }, 120 * 1000)

  watch(
    isSelect,
    (value) => {
      if (!value) {
        for (let audio of audioArr.values()) {
          audio.muted = true;
        }
      } else {
        for (let audio of audioArr.values()) {
          audio.muted = false;
        }
      }
    },
    {
      immediate: true,
    }
  );
});

onBeforeUnmount(() => {
  interval2min && clearInterval(interval2min)
})
</script>

<style scoped>
.MyAudio {
  background-color: white;
  position: absolute;
  width: 16vw;
  height: 47vh;
  top: 100px;
  left: 3vw;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 0 10px #00000050;

}

.top_canvas {
  height: 27vh;
  width: 100%;
  background-color: #e5e4e5;
}

.bottom_canvas {
  width: 90%;
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: bolder;
}

.bottom_canvas_top {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.title {
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.x_title {
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
}

.font {
  margin-left: 0.2vw;
}

.bottom_canvas_center {
  width: 100%;
  flex: 1;
  position: relative;
  box-shadow: inset -2px 1px 3px 0px rgba(0, 0, 0, 0.5);
}

.bottom_canvas_bottom {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 100;
  font-size: 12px;

}

#video_bx {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99999;
}
</style>
