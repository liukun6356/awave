<template>

  <el-config-provider size='default'>
    <router-view/>

  </el-config-provider>
  <video autoplay loop muted
         style="width:1920px;position: absolute;top:0;left: 0;z-index: -999;object-fit:fill">
    <source src="https://awave.oss-cn-beijing.aliyuncs.com/video/video.m4v">
  </video>
</template>

<script setup></script>