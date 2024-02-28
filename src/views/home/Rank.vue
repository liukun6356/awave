<script setup>
import { reactive } from 'vue';
import { getAllPlayer100 } from "@/api/home";
import { useState } from '@/store/modules/home';

const STATE = useState();

const UI = reactive({
  show: false,
  list: [
    { id: 0, name: '', color: '', action: 0, email: '', address: '' },
  ]
})

const refreshData = () => {
  getAllPlayer100((res) => {
    UI.list = res
  })
};
function showRank(lang) {
  STATE.setLang(lang)
  UI.show = true;
  refreshData()
}
defineExpose({ showRank })
</script>

<template>
  <div id="rank-view" v-if="UI.show">

    <div
      style="position: relative; padding: 40px; background-color: white; width: 70%;height: 80%;border-radius: 10px;box-shadow: 0px 0px 16px #22222250;pointer-events: auto;">
      <svg @click="UI.show = false"
        style="pointer-events: auto; cursor: pointer;z-index: 100; position: absolute;top: 8px;left: 8px;width: 28px;height: 28px;"
        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <path
          d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z"
          fill="#707070"></path>
      </svg>





      <el-table :data="UI.list" stripe border style="width: 100%;height: 100%;"
        :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }">
        <el-table-column prop="name" :label="STATE.lang ? '用户昵称' : 'Name'" width="180" />
        <el-table-column prop="color" :label="STATE.lang ? '预设颜色' : 'Color'" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center;justify-content: center;">
              <span
                :style="{ width: '24px', height: '24px', backgroundColor: scope.row.color, marginRight: '10px' }"></span>
              <span>{{ scope.row.color }}</span>
            </div>

          </template>
        </el-table-column>
        <el-table-column prop="action" sortable :label="STATE.lang ? '总涂色次数' : 'Filled total'" width="180" />
        <el-table-column prop="own" sortable :label="STATE.lang ? '当前拥有数量' : 'Filled now'" width="180" />
        <el-table-column prop="a" label="" />

      </el-table>
    </div>
  </div>
</template>

<style>
#rank-view {
  position: absolute;
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
