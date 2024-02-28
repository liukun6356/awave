<!--/**
* @author: liuk
* @date: 2024/01/17
* @describe: 漏洞反馈
* @email: 1229223630@qq.com
*/-->
<template>
  <div class="container">
    <div class="title"
         style="heigt:41px;line-height:41px;box-sizing: border-box;text-align: center;font-size: 20px;font-weight:1;color:#fafafa;background:#232323;margin:0;"
         data-sw-translate="">漏洞反馈
    </div>
    <el-form :model="formData" :rules="rules" ref="formRef">
      <el-form-item prop="title" style="height: 68px;">
        <el-input class="aaa1" placeholder="在此输入标题"
          @mouseenter="emit('setTipIndex',51)"
                  @mouseleave="emit('setTipIndex',null)"

                  data-sw-translate="" v-model="formData.title"/>
      </el-form-item>
      <el-form-item prop="tag" style="height: 34px;">
        <el-input class="bbb1" v-model="formData.tag"

                  @mouseenter="emit('setTipIndex',52)"
                  @mouseleave="emit('setTipIndex',null)"
                  data-sw-translate=""
                  placeholder="请选择符合您遇到的问题描述的标签(可多选)"/>
      </el-form-item>
    </el-form>
    <div @mouseleave="emit('setTipIndex',null)" @mouseenter="emit('setTipIndex',53)"
         style="height: 122px;border-left:2px solid;border-right: 2px solid">
      <el-checkbox-group v-model="formData.tag" size="large">
        <el-checkbox-button v-for="item in options" :key="item.id" :label="item.label">
          <span data-sw-translate="">{{ item.label }}</span>
        </el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div class="info-tit" data-sw-translate="" @mouseleave="emit('setTipIndex',null)"
         @mouseenter="emit('setTipIndex',54)">附件
    </div>
    <Editor @mouseleave="emit('setTipIndex',null)" @mouseenter="emit('setTipIndex',56)"
            style="flex: auto; overflow-y: hidden;" v-model="formData.text" :defaultConfig="editorConfig"
            mode='simple' @onCreated="handleCreated"/>
    <Toolbar style="" :editor="editorRef" :defaultConfig="toolbarConfig" mode='simple'/>
    <div class="operate-wrap">
      <div class="submit" @click="submit" data-sw-translate="" @mouseleave="emit('setTipIndex',null)"
           @mouseenter="emit('setTipIndex',57)">发送
      </div>
      <div class="dais" @click="imgsss" data-sw-translate="" @mouseleave="emit('setTipIndex',null)"
           @mouseenter="emit('setTipIndex',54)">附
      </div>
    </div>
    <div class="close" @click="emit('close')">
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <path
            d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z"
            fill="#707070"></path>
      </svg>
    </div>
    <!--    <div  class="close closeimg" @click="emit('togglelang')">-->
    <!--      <img src="@/assets/img/img.png" />-->
    <!--    </div>-->
    <div class="tip" v-if="formData.text==='<p><br></p>' ||formData.text==='' ">在此处输入正文</div>
  </div>
</template>

<script setup>
import {reactive, toRefs, ref} from "vue"
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {addMsg} from "../api/login";
import {ElMessage} from "element-plus";

const emit = defineEmits(['close', 'setTipIndex', 'togglelang'])

const editorRef = ref(null)
const formRef = ref(null)
const model = reactive({
  formData: {}
})
const {formData} = toRefs(model)

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const submit = () => {
  formRef.value.validate(valid => {
    if (valid) {
      addMsg(model.formData).then((res) => {
        if (res) {
          const str = localStorage.getItem('lang') == 0 ? "反馈成功" : "Feedback success";
          ElMessage.success(str)
        } else {
          const str = localStorage.getItem('lang') == 0 ? "反馈失败" : "Feedback failure";
          ElMessage.error(str)
        }
      })
    }
  })
}

const imgsss = () => {
  const dom = document.querySelector("button[data-menu-key='uploadImage']")
  dom.click()
}

const editorConfig = {
  MENU_CONF: {},
}
editorConfig.MENU_CONF['uploadImage'] = {
  server: import.meta.env.VITE_APP_Server_API,
  maxFileSize: 10 * 1024 * 1024, // 1M
  maxNumberOfFiles: 1,
  allowedFileTypes: ['image/*'],
}
const toolbarConfig = {
  showMenuTooltips: false,
  toolbarKeys: ['bold', 'italic', 'underline', 'uploadImage', "insertLink"]
}

const rules = {
  title: [{required: true, trigger: "blur", message: ""}],
  tag: [{required: true, trigger: "blur", message: ""}],
}

const options = [
  {id: 1, label: "登录系统"},
  {id: 2, label: "网络问题"},
  {id: 3, label: "语言&文字"},
  {id: 4, label: "成就系统"},
  {id: 5, label: "公告系统"},
  {id: 6, label: "画布&填色"},
  {id: 7, label: "教程系统"},
  {id: 8, label: "项目简历"},
  {id: 9, label: "排行榜系统"},
  {id: 10, label: "反馈系统"},
  {id: 11, label: "听潮"},
  {id: 12, label: "其他问题"},
  {id: 13, label: "个人资料"},
  {id: 14, label: "星球&定位"},
]
</script>

<style lang="scss">
.w-e-bar-show.w-e-toolbar {
  opacity: 0;
  pointer-events: none;
}

.w-e-text-container {
  /*滚动条样式*/
  *::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 16px;

    /*高宽分别对应横竖滚动条的尺寸*/
    /* height: $scrollbarWidth; */
    height: 0;
  }

  *::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #7a7a7a;
    border-radius: 0;
    /*rgba(32, 127, 255, 0.7);*/
  }

  *::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 0;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: transparent;
  }
}
</style>

<style lang="scss" scoped>
:deep(.el-checkbox-group) {
  .el-checkbox-button__inner {
    line-height: 30px;
    width: 11.22vw;
    height: 61px;
    color: #fafafa;
    font-size: 16px;
    background: #232323;
    border: none;
    border-radius: 0;
  }

  .el-checkbox-button.is-checked .el-checkbox-button__inner {
    background: #fff;
    color: #0a0a0a;
  }
}

:deep(.el-form-item--default) {
  margin-bottom: 0;
  border-left: 2px solid;
  border-right: 2px solid;

  .el-input {
    border-bottom: 2px solid;
    margin-bottom: 4px;
  }
}


.container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 90vw;
  height: 90vh;
  margin: auto;
  z-index: 99;
  background: #fff;

  .title {
    text-align: center;
    font-size: 16px;
    font-weight: 1;
    color: #fff;
    background: #232323;
    margin: 0;
  }

  div[data-w-e-textarea] {
    height: calc(100% - 420px) !important;
  }


  .info-tit {
    height: 46px;
    text-align: center;
    background: #eee;
    font-size: 20px;
    line-height: 46px;
    border: 2px solid #232323;
  }

  .operate-wrap {
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 50%;
    bottom: 30px;
    width: 180px;
    transform: translateX(-50%);

    .submit {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 106px;
      height: 51px;
      background: #232323;
      color: #fafafa;
      font-size: 20px;
      border-radius: 25px;
    }

    .dais {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      width: 51px;
      height: 51px;
      border-radius: 50%;
      box-sizing: border-box;
      border: 2px solid #232323;
    }
  }

  .close {
    pointer-events: auto;
    cursor: pointer;
    z-index: 100;
    position: absolute;
    top: 8px;
    left: 8px;
    width: 28px;
    height: 28px;
  }
}

:deep(.aaa1) {
  .el-input__inner {
    font-size: 24px !important;
    color: #232323;
  }
}

:deep(.bbb1) {
  .el-input__wrapper {
    .el-input__inner {
      font-size: 16px !important;
      line-height: 34px;
      height: 34px;
      position: relative;
      top: -10px;
    }
  }

}

.tip {
  position: absolute;
  top: 500px;
  left: 50%;
  font-size: 24px;
  color: #232323;
  transform: translateX(-50%);
}

.closeimg.close {
  left: 50px;
  width: 25px;
  height: 25px;

  img {
    display: block;
    width: 100%;
  }
}
</style>