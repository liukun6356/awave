<template>
  <div :class="['horse', classNames]"
       :style="{ width: width + 'px','--speed': speed, }">
    <p :text="props.text" class="horse_words" :style="{ paddingLeft: paddingLeft + 'px'}">
      <span  data-sw-translate="">{{ text }}</span>
      <span class="aaa" data-sw-translate="">
          {{ text }}
      </span>
      <span class="bbb" data-sw-translate="">
          {{ text }}
      </span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, watch,computed} from "vue";

/**
 * 获取文本px宽度
 * @param font{String}: 字体样式
 * @return {Number} 文本宽度
 **/
String.prototype.getWidth = function (font: string) {
  // re-use canvas object for better performance
  const canvas =
          String.prototype.getWidth.canvas ||
          (String.prototype.getWidth.canvas = document.createElement('canvas')),
      context = canvas.getContext('2d');
  canvas['data-sw-translate'] = ''
  font && (context.font = font);
  const metrics = context.measureText(this);
  let width = metrics.width;
  if (props.letterSpacing && props.text && props.text.length > 1) {
    width = metrics.width + props.letterSpacing * text.length;
  }

  return width;
};

const props = defineProps({
  // 元素DOM的最大宽度，超过此宽度将滚动
  width: {
    type: Number,
    required: false,
    default: 1920
  },
  // 文本内容
  text: {
    type: String,
    required: false,
  },
  // 文本字体、大小等 示例：'21px SourceHanSansCN-Normal'
  font: {
    type: String,
    required: false,
    default: "14px SourceHanSansCN-Normal"
  },
  // 元素class类名，需要设置其他的样式
  classNames: {
    type: String,
    default: '',
  },
  // 滚动速度，单位s
  speed: {
    type: Number,
    default: 20,
  },
  // paddingLeft，需要滚动的元素的初始paddingLeft，为了防止初次滚动而看不见前面几个字
  paddingLeft: {
    type: Number,
    default: 20,
  },
  // 文本字体之间间距
  letterSpacing: {
    type: Number,
    default: 0,
  },
})

const lang= computed(()=>localStorage.getItem('lang'))



</script>

<style lang="scss" scoped>
.horse {
  white-space: nowrap;
  overflow: hidden;

  &_words {
    display: flex;
    align-items: center;
    position: relative;
    width: fit-content;
    animation: move calc(var(--speed) * 1s) linear infinite;

    .aaa {
      position: absolute;
      right: -100%;
    }
    .bbb{
      position: absolute;
      right: -200%;
      content: attr(text);
    }
  }
}

@keyframes move {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}
.horse_words{
  span{
    min-width: 800px;
  }
}
</style>

