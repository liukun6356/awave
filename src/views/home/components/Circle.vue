<script setup>
import { ref, onMounted, reactive } from 'vue'

const UI = reactive({
    data: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
})

const refGroup = ref(null)

const emit = defineEmits(['confirm'])


   


const pu = (event,index,idx) => {
    if (!window.clickMoved) {
        const pos = event.target.getBoundingClientRect(); 
        emit('confirm', [index, idx, pos.left, pos.top,refGroup.value.children[index].children[idx]]);
        // console.log(refGroup.value.children[index].children[idx])
        // refGroup.value.children[index].children[idx].style.backgroundColor = '#0000ff'
    }
};
onMounted(() => {


})
</script>

<template>
    <div class="group" ref="refGroup">
        <div v-for="(item, index) in UI.data">
            <span v-for="(ele, idx) in item" @pointerup="event=>pu(event,index,idx)"></span>
        </div>
    </div>
</template>

<style>
.group {
    position: absolute;
    width: 780px;
    height: 780px;
    pointer-events: none;
}
.group>div {
    width: fit-content;
    line-height: 0;
    pointer-events: auto;
}

.group>div:nth-child(even) {
    position: relative;
    left: 30px;
    overflow: visible;
}

.group span {
    display: inline-block;
    width: 52px;
    height: 52px;
    border: 1px solid rgba(40, 40, 40, 0.4);
    border-radius: 50%;
    margin: 0 4px;
    background-color: white;
    box-sizing: border-box
}

.group span:hover {
    -webkit-box-shadow: 0 0 6px #000;
    box-shadow: 0 0 6px #000;
}
</style>
