<template>
  <div id="Tree" ref="refTree">
    <header v-if="!isFullScreen" style="z-index:9999">
      <img src="/img/logo.png" alt="logo" @click="goHome">
    </header>
    <RightIcon v-show="loadend" @full="fullSC" :distanceChangeCamera="distanceChangeCamera" ref="rightIcon"
               :loadArr="loadArr"/>
    <transition v-show="loadend" name="fade">
      <CameraBoundary :src="imgUrl" v-if="imgIsShow"/>
    </transition>
    <MyAudio v-show="loadend && !isFullScreen"/>

    <canvas style="display: none;" width="1920" height="1080" ref="refCanvas"></canvas>
    <div style="display: none;position: fixed;z-index: 999;" ref="refRTT"></div>

    <video @click="tryStartRender0" @mousemove.stop="" @play="playVideo" v-if="showVideo"
           :src="!STATE.fromSpace ? 'https://awave.oss-cn-beijing.aliyuncs.com/video/person.m4v' : 'https://awave.oss-cn-beijing.aliyuncs.com/video/main2.m4v'"
           muted autoplay
           :style="`position: fixed;transition: opacity ${STATE.fromSpace?3:2}s;width: 100%;opacity:${videoOpacity};height: 100%;object-fit: cover; z-index: ${STATE.fromSpace?999:9999};`"></video>

  </div>
  <img src="/img/loading.png" v-if="!showVideo && !loadend" alt="loading"
       style="width: 50%; position: absolute; z-index: 999;left: 50%;top: 50%;transform: translate(-50% ,-50%);">
</template>

<script setup>
import * as THREE from "three";
import {onBeforeUnmount, onMounted, ref} from "vue";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {MeshoptDecoder} from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import gsap from "gsap";

import RightIcon from "./RightIcon.vue";
import CameraBoundary from "./CameraBoundary.vue";
import MyAudio from "./MyAudio.vue";

import {EffectComposer, RenderPass, BlurPass, KernelSize} from 'postprocessing'
import {Reflector} from "three/examples/jsm/objects/Reflector.js";
import {useState} from '@/store/modules/home';

const STATE = useState();

let composer, renderPass, blurPass;

const showVideo = ref(true);
const videoOpacity = ref(1);
const loadend = ref(false);

const refTree = ref(null)
const refCanvas = ref(null);
const refRTT = ref(null);
const isFullScreen = ref(false);

let raf;

const scene = new THREE.Scene();
const sceneRTT = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const cameraRTT = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
let rttObj;
let tex1024;
// const nightTexture = new THREE.TextureLoader().load('./img/dark.jpg')
// nightTexture.colorSpace = THREE.SRGBColorSpace;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  logarithmicDepthBuffer: true,
});

const renderer2 = new THREE.WebGLRenderer();


const light = new THREE.PointLight(0xdddddd, 3, 10);
light.position.set(-3.190, -0.170, 0.000);
scene.add(light);

const light1 = new THREE.PointLight(0xdddddd, 3, 10);
light1.position.set(0.050, -0.830, -2.640);
scene.add(light1);

const light2 = new THREE.PointLight(0xdddddd, 3, 10);
light2.position.set(1.140, 1.090, 2.180);
scene.add(light2);


// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.toneMappingExposure = 0.1;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer2.setSize(512, 256)
onMounted(() => {
  refTree.value.appendChild(renderer.domElement);
  refRTT.value.appendChild(renderer2.domElement);
  reCanvas();
  tex1024 = new THREE.CanvasTexture(refCanvas.value);
  tex1024.colorSpace = THREE.SRGBColorSpace;
  tex1024.needsUpdate = true
  rttObj = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), new THREE.MeshBasicMaterial({map: tex1024}))
  rttObj.position.set(0, 0, -6)
  // sceneRTT.background = nightTexture;
  sceneRTT.add(rttObj)


  // window.switchDay = switchDay
  // window.switchNight = switchNight
  window.updateTexture = updateTexture;


})
onBeforeUnmount(() => {
  window.cancelAnimationFrame(raf)

  scene.traverse(child => {
    if (child.type == 'Mesh') {
      child.geometry.dispose();
    }
  })
  renderer.dispose();
  renderer.forceContextLoss()
})

/* ------------------------- 加载模型 ------------------------------------- */

let loader = new GLTFLoader();
const dracoLoader = new DRACOLoader(); //
dracoLoader.setDecoderPath("https://awave.oss-cn-beijing.aliyuncs.com/draco/"); //设置解压库文件路径
dracoLoader.setDecoderConfig({type: "js"}); //使用js方式解压
dracoLoader.preload(); //初始化_initDecoder 解码器
loader.setDRACOLoader(dracoLoader); //gltfloader使用dracoLoader

loader.setMeshoptDecoder(MeshoptDecoder);


loader.load("https://awave.oss-cn-beijing.aliyuncs.com/model/tree-plane.glb", (res) => {
  let mesh = res.scene.children[0];

  res.scene.position.set(0.14, -1.1, -0.02)
  res.scene.scale.set(0.01, 0.01, 0.01);
  res.scene.name = "tree-plane"
  scene.add(res.scene);

  let groundMirror = new Reflector(mesh.geometry, {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0xb5b5b5,
  });

  groundMirror.position.set(0.14, -1.05, -0.02)
  groundMirror.scale.set(0.01, 0.01, 0.01);

  // groundMirror.position.set(0.14, -0.94, -0.02);
  groundMirror.rotateX(-Math.PI / 2);
  scene.add(groundMirror);

});


loader.load("https://awave.oss-cn-beijing.aliyuncs.com/model/yz.glb", (res) => {

  res.scene.position.y = -1.13
  scene.add(res.scene)


  if (!composer) {
    composer = new EffectComposer(renderer2);
    composer.setSize(512, 256);
    renderPass = new RenderPass(sceneRTT, cameraRTT)
    composer.addPass(renderPass)
    blurPass = new BlurPass({
      kernelSize: KernelSize.HUGE
    })
    composer.addPass(blurPass);
  }


  const texture = new THREE.CanvasTexture(renderer2.domElement);
  texture.colorSpace = THREE.SRGBColorSpace;
  res.scene.children[0].material.emissiveMap = texture;

  const texture2 = texture.clone();
  texture2.colorSpace = THREE.SRGBColorSpace;
  texture2.needsUpdate = true
  texture2.mapping = THREE.EquirectangularRefractionMapping


  scene.background = texture

  setTimeout(() => {
    res.scene.children[0].material.emissiveMap.needsUpdate = true;
    updateYzMap();
    texture2.needsUpdate = true;
    scene.environment = texture2

  }, 200)

});


THREE.DefaultLoadingManager.onLoad = function () {
  loadend.value = true;
  // console.log('Loading Complete!');
  tryStartRender();
};


function updateYzMap() {
  composer.render();
}

//地面
const geometry2 = new THREE.CircleGeometry(1000, 32);
let groundMirror2 = new Reflector(geometry2, {
  clipBias: 0.01,
  textureWidth: 1024,
  textureHeight: 1024,
  color: 0xb5b5b5,
});

groundMirror2.position.set(0, -1.13, 0);
groundMirror2.rotateX(-Math.PI / 2);
groundMirror2.name = "地面镜反"
scene.add(groundMirror2);


const material22 = new THREE.MeshBasicMaterial({
  color: 0x000000,
  transparent: true,
  opacity: 0.2,
});


const circle2 = new THREE.Mesh(geometry2, material22);
circle2.position.set(0, -1.12, 0);
circle2.rotateX(-Math.PI / 2);
circle2.name = "地面"
scene.add(circle2);


async function loadModel(path, name) {
  return new Promise((resolve, reject) => {
    loader.load(path, (res) => {
      res.scene.rotation.y = 2.16;
      res.scene.scale.set(0.01, 0.01, 0.01);
      res.scene.name = name;
      scene.add(res.scene);
      return resolve(true);
    });
  });
}


function reCanvas() {

  const canvas = document.querySelector('#canvas')

  const ctx = canvas.getContext('2d')

  const data = ctx.getImageData(window.cccLeft, window.cccTop, 1920, 1080)

  const ctx512 = refCanvas.value.getContext('2d')
  ctx512.putImageData(data, 0, 0)

}


function updateTexture() {
  reCanvas()
  setTimeout(() => {
    tex1024.needsUpdate = true;
    updateYzMap()
  }, 1000);

  window.niaoMusic();
  // scene.background.needsUpdate = true
}


/* ------------------------- 是否加载冠军环或者岛 ------------------------------------- */
function isLoadGuanJunHuan(isLoad, name_1, name_2) {
  let model_1 = scene.getObjectByName(name_1);
  let model_2 = scene.getObjectByName(name_2);
  if (isLoad) {
    if (model_1 == null) loadModel(`https://awave.oss-cn-beijing.aliyuncs.com/model/${name_1}.glb`, name_1,);
    if (model_2 == null) loadModel(`https://awave.oss-cn-beijing.aliyuncs.com/model/${name_2}.glb`, name_2,);
  } else {
    if (model_1 != null) deleteModel(model_1.uuid);
    if (model_2 != null) deleteModel(model_2.uuid);
  }
}

let oldName = [];
let treeArr = ["tree1", "tree2", "tree3"];
let birdArr = ["bird1", "bird2", "bird3", "bird4", "bird5"];
let peibanArr = ["accompany1", "accompany2", "accompany3"];

async function loadArr(arr) {
  //删除之前的模型
  function isDelete(name) {
    let isClu = oldName.indexOf(name.slice(0, -1));
    if (isClu != -1 && oldName[isClu] !== name) {
      deleteModel(scene.getObjectByName(oldName[isClu]).uuid);
      oldName.splice(isClu, 1);
    }
  }

  arr.forEach((item, index) => {
    switch (index) {
      case 0:
        let treeName = treeArr[item - 1];
        isDelete("大树成长");
        if (treeName == null) return;
        loadModel(`https://awave.oss-cn-beijing.aliyuncs.com/model/${treeName}.glb`, treeName);
        oldName.push(treeName);
        break;
      case 1:
        let birdName = birdArr[item - 1];
        if (birdName == "鸟类天堂1") return;
        isDelete("鸟类天堂");
        if (birdName == null) return;
        loadModel(`https://awave.oss-cn-beijing.aliyuncs.com/model/${birdName}.glb`, birdName);
        oldName.push(birdName);
        break;
      case 2:
        let peibanName = peibanArr[item - 1];
        isDelete("陪伴");
        if (peibanName == null) return;
        loadModel(`https://awave.oss-cn-beijing.aliyuncs.com/model/${peibanName}.glb`, peibanName);
        oldName.push(peibanName);
        break;
      case 3:
        let isLoaderHuan = item == 1 ? true : false;
        isLoadGuanJunHuan(isLoaderHuan, "ring-in", "ring-out");
      case 4:
        let isLoaderDao = item == 1 ? true : false;
        isLoadGuanJunHuan(isLoaderDao, "island-up", "island-down");
    }
  });
  let isLoadLO = scene.getObjectByName("logo");
  if (isLoadLO == null) {
    let res = await loadModel(`https://awave.oss-cn-beijing.aliyuncs.com/model/logo.glb`, "logo",);
    let logoModel = scene.getObjectByName("logo");
    let yP = logoModel.position.y;
    gsap.fromTo(
        logoModel.position,
        {
          y: yP - 0.1,
        },
        {
          y: yP + 0.1,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        }
    );
  }
}

//删除模型
function deleteModel(uuid, deleteSelf = true) {
  return new Promise((resolve, reject) => {
    let model = scene.getObjectByProperty("uuid", uuid);
    if (model != null) removeModelGroup(model);

    function removeModelGroup(model) {
      if (model.children.length > 0) {
        model.children.forEach((item) => {
          if (item.isGroup || item.isObject3D) {
            removeModelGroup(item);
          } else if (item.isMesh) {
            removeModelMesh(item);
          }
        });
        //是否删除uuid自身
        if (model.uuid != uuid || deleteSelf) {
          model.removeFromParent();
        }
      } else {
        removeModelMesh(model);
      }
    }

    function removeModelMesh(model) {
      if (!model.isMesh) return;
      if (Array.isArray(model.material)) {
        model.material.forEach((material) => {
          material.dispose();
        });
      } else {
        model.material.dispose();
      }
      model.geometry.dispose();
      model.removeFromParent();
    }

    resolve(true);
  });
}

/* ------------------------- 互动程度不强烈 ------------------------------------- */
// function switchNight() {
//     //添加雾
//     light.visible = false
//     light1.visible = false
//     rttObj.visible = false;
//     scene.background.needsUpdate = true
//     updateYzMap();

//     scene.children.forEach(child => {
//         if (child.name.startsWith("tree")
//             || child.name.startsWith("ring")
//             || child.name.startsWith("island")
//             || child.name.startsWith("bird")
//             || child.name.startsWith("ac")
//         ) {
//             child.traverse(mesh => {
//                 if (mesh.type == "Mesh") {

//                     mesh.material.needsUpdate = true;
//                     gsap.to(mesh.material, {
//                         envMapIntensity: 0,
//                         emissiveIntensity: 0,
//                         duration: 1.5
//                     })


//                 }
//             })
//         } else if (child.name == "logo") {
//             child.traverse(mesh => {
//                 if (mesh.type == "Mesh") {

//                     gsap.to(mesh.material.emissive, {
//                         r: 1,
//                         g: 1,
//                         b: 1,
//                         duration: 1.5
//                     })

//                 }
//             })

//         }
//     })

// }
// 互动程度强烈时还原
// function switchDay() {

//     if (light.visible) {
//         return
//     } else {

//         light.visible = true
//         light1.visible = true
//         rttObj.visible = true;
//         scene.background.needsUpdate = true
//         updateYzMap();


//         scene.children.forEach(child => {
//             if (child.name.startsWith("tree")
//                 || child.name.startsWith("ring")
//                 || child.name.startsWith("island")
//                 || child.name.startsWith("bird")
//                 || child.name.startsWith("ac")
//             ) {
//                 child.traverse(mesh => {
//                     if (mesh.type == "Mesh") {

//                         mesh.material.needsUpdate = true;
//                         gsap.to(mesh.material, {
//                             envMapIntensity: 0.8,
//                             emissiveIntensity: 1,
//                             duration: 1.5
//                         })


//                     }
//                 })
//             } else if (child.name == "logo") {
//                 child.traverse(mesh => {
//                     if (mesh.type == "Mesh") {

//                         gsap.to(mesh.material.emissive, {
//                             r: 0,
//                             g: 0,
//                             b: 0,
//                             duration: 1.5
//                         })

//                     }
//                 })

//             }
//         })


//     }


// }

function goHome() {
  window.goHome();
  window.muteAll();
}

/* ------------------------- 控制器参数 ------------------------------------- */
camera.position.set(-7.6, 3.7, -9.7);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.maxPolarAngle = (Math.PI / 180) * 104;
controls.minPolarAngle = 1;
controls.minAzimuthAngle = 2.94;
controls.maxAzimuthAngle = -1.42;
controls.maxDistance = 15;
controls.minDistance = 5;
controls.target.set(0, 2.5, 0);
/* ------------------------- 相机触碰到边缘，图片提示 ------------------------------------- */
let imgIsShow = ref(true);
let imgUrl = ref("camera_bottom.png");
let timmer;
//监听controls的change事件
let maxPolarAngle = controls.maxPolarAngle.toFixed(5);
let minPolarAngle = controls.minPolarAngle.toFixed(5);
let maxAzimuthAngle = -1.42;
let minAzimuthAngle = 2.94;
//记录distance
let rightIcon = ref(null);

function distanceChangeCamera(num) {
  if (num.x1 != null) {
    controls.minDistance = 0;
    controls.enableZoom = false;
    gsap.to(camera.position, {
      duration: 0.6,
      ease: "expo.out2",
      x: num.x,
      y: num.y,
      z: num.z,
      onUpdate: () => {
        controls.update();
      },
      onComplete: () => {
        controls.minAzimuthAngle = num.max;
        controls.maxAzimuthAngle = num.min;
        maxAzimuthAngle = num.max;
        minAzimuthAngle = num.min;
      },
    });
    gsap.to(controls.target, {
      duration: 0.5,
      ease: "expo.out2",
      x: num.x1,
      y: num.y1,
      z: num.z1,
      onUpdate: () => {
        controls.update();
      },
    });
    return;
  }
  if (num.x != null) {
    controls.minDistance = 5;
    controls.enableZoom = true;
    gsap.to(camera.position, {
      duration: 0.5,
      ease: "expo.out2",
      x: num.x,
      y: num.y,
      z: num.z,
      onUpdate: () => {
        controls.update();
      },
      onComplete: () => {
        controls.minAzimuthAngle = 2.94;
        controls.maxAzimuthAngle = -1.42;
        maxAzimuthAngle = 2.94;
        minAzimuthAngle = -1.42;
      },
    });
    gsap.to(controls.target, {
      duration: 0.4,
      ease: "expo.out2",
      x: 0,
      y: 2,
      z: 0,
      onUpdate: () => {
        controls.update();
      },
    });
    return;
  }
  if (maxAzimuthAngle === 2.86 || maxAzimuthAngle === 2.32) return false;
  let startPosition = camera.position.clone();
  let cameraDirection = camera.getWorldDirection(new THREE.Vector3());
  let cameraDirectionNegate = cameraDirection.clone().negate();
  let distance = camera.position.distanceTo(new THREE.Vector3(0, 2, 0));
  if (num < distance) {
    let endPosition = startPosition.add(cameraDirection.multiplyScalar(distance - num));
    gsap.to(camera.position, {
      duration: 0.1,
      ease: "linear",
      x: endPosition.x,
      y: endPosition.y,
      z: endPosition.z,
    });
  }
  if (num > distance) {
    let endPosition = startPosition.add(cameraDirectionNegate.multiplyScalar(num - distance));
    gsap.to(camera.position, {
      duration: 0.1,
      ease: "linear",
      x: endPosition.x,
      y: endPosition.y,
      z: endPosition.z,
    });
  }
}

setTimeout(() => {
  rightIcon.value?.changeRangeData(controls.getDistance());
}, 100);


controls.addEventListener("change", () => {
  rightIcon.value?.changeRangeData(controls.getDistance());
  let polar = controls.getPolarAngle().toFixed(5);
  let azimuth = controls.getAzimuthalAngle();
  if (polar == minPolarAngle) {
    imgUrl.value = "camera_top.png";
    imgIsShow.value = true;
    timmer && clearTimeout(timmer)
    timmer = setTimeout(() => {
      imgIsShow.value = false;
    }, 1000)
    return;
  }
  if (polar == maxPolarAngle) {
    imgUrl.value = "camera_bottom.png";
    imgIsShow.value = true;
    timmer && clearTimeout(timmer)
    timmer = setTimeout(() => {
      imgIsShow.value = false;
    }, 1000)
    return;
  }
  if (azimuth == minAzimuthAngle) {
    imgUrl.value = "camera_left.png";
    imgIsShow.value = true;
    timmer && clearTimeout(timmer)
    timmer = setTimeout(() => {
      imgIsShow.value = false;
    }, 1000)
    return;
  }
  if (azimuth == maxAzimuthAngle) {
    imgUrl.value = "camera_right.png";
    imgIsShow.value = true;
    timmer && clearTimeout(timmer)
    timmer = setTimeout(() => {
      imgIsShow.value = false;
    }, 1000)
    return;
  }

  imgIsShow.value = false;
});


/* ------------------------- 渲染 ------------------------------------- */
function animate() {
  raf = requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);

  let model = scene.getObjectByName("ring-out");
  if (model != null) {
    model = model.children[0];
    model.rotateX(Math.PI / 1800)
  }

}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", resize);


function tryStartRender0() {
  videoOpacity.value = 0

  setTimeout(() => {
    showVideo.value = false;
  }, 3000);

  const helpSpace = localStorage.getItem('helpSpace');
  if (!helpSpace) {
    window.showHelp('space', STATE.lang)
  }
  localStorage.setItem('helpSpace', '1');


  tryStartRender();
}

function tryStartRender() {
  if (loadend.value && videoOpacity.value == 0 && !raf) {
    animate();
  }
}

function playVideo() {
  setTimeout(() => {
    tryStartRender0()
  }, STATE.fromSpace ? 10000 : 12000);
}


//fullsc
function fullSC(key) {
  const element = refTree.value;
  isFullScreen.value = key
  if (key) {
    if (element.requestFullscreen) {
      element.requestFullscreen();

    } else if (element.mozRequestFullScreen) {   // 兼容火狐
      element.mozRequestFullScreen();

    } else if (element.webkitRequestFullscreen) {    // 兼容谷歌
      element.webkitRequestFullscreen();

    } else if (element.msRequestFullscreen) {   // 兼容IE
      element.msRequestFullscreen();

    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }


  }

}


</script>

<style>
#Tree {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 888;
  background-color: white;

}
</style>
  
