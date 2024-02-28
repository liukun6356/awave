<template>
  <div class="panelDetail">
    <div class="top">
      <div
        v-for="(item, index) in data.lineStep"
        :key="index"
        class="table"
        :style="{ width: item + '%', backgroundColor: index + 1 <= data.max ? '#232323' : 'white' }"
      ></div>
      <img :src="data.icon" class="img" />
    </div>
    <div class="center">
      {{ data.title }}
    </div>
    <div class="bottom">
      {{ data.text }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
let data = defineProps({
  lineStep: Array,
  max: Number,
  title: String,
  text: String,
  icon: String,
});
</script>

<style scoped>
.panelDetail {
  width: 100%;
  padding: 10px 0;
}
.top {
  display: flex;
  position: relative;
}
.img {
  position: absolute;
  width: 2.5vh;
  left: -2.5vh;
  top: -0.25vh;
  object-position: center;
}
.table {
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  border-top: 1px solid black;
  height: 1.7vh;
}

.table:last-of-type {
  border-right: none;
}
.center {
  padding: 5px 0;
  font-weight: 600;
}
.bottom {
  font-weight: normal;
  font-size: 0.7vw;
}
</style>
