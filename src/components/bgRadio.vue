<!--/**
* @author: liuk
* @date: 2024/01/25
* @describe: 背景单选框
* @email: 1229223630@qq.com
*/-->
<template>
  <div class="radio-wrap">
    <label class="radio-label" :for="modelValue" @click.prevent="radioValue = !radioValue">
      <input type="radio" :id="modelValue"  :checked="radioValue" />
      <i></i>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props=  defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const radioValue = computed({
  get() {
    console.log(props.modelValue,333)
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
})
</script>

<style lang="scss" scoped>
.radio-wrap {
  display: inline-block;

  .radio-label {
    position: relative;
    top: 5px;
    display: inline-block;
    height: 25px;
    padding-left: 25px;
    cursor: pointer;
    font-size: 13px;
    margin-right: 5px;
    font-weight: normal;

    &.select {
      color: #dfae64;
    }

    input {
      position: absolute;
      left: -1px;
      top: 6px;
      z-index: -1;
      /*给与input标签相邻的i标签设置伪元素*/
      & + i::after {
        position: absolute;
        content: '';
        top: 3px;
        left: 8px;
        width: 13px;
        height: 13px;
      }

      & + i::before {
        position: absolute;
        content: '';
        top: 3px;
        left: 8px;
        width: 13px;
        height: 13px;
        border: 1px solid #0a0a0a;
        box-sizing: border-box;
        background: #fff;
      }

      /*input radio被选中后，给它相邻的i::after 设置样式*/
      &:checked + i::after {
        //background: url('@/assets/images/login/check.png') no-repeat center/cover;
        background: #0a0a0a;
      }
    }
  }
}
</style>
