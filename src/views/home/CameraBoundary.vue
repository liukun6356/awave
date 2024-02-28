<template>
  <div class="CameraBoundary">
    <img :src="getImg(img.src)" class="img" />
  </div>
</template>

<script setup>
import { defineProps } from "vue";

let img = defineProps({
  src: String,
});
function getImg(name) {
  return new URL(`./assets/icon/${name}`, import.meta.url).href;
}
</script>

<style scoped>
.CameraBoundary {
  position: absolute;
  bottom: 10px;
  z-index: 6;
  left: 50%;
  transform: translateX(-50%);
}
.img {
  width: 3vw;
  height: 100%;
  user-select: none;
}
</style>
