<!--/**
* @author: liuk
* @date: 2024/01/17
* @describe: 登录页
* @email: 1229223630@qq.com
*/-->
<template>
  <div class="login-page root" ref="containerDiv" @click="filterShow = true">
    <div class="login-wrap" v-show="filterShow">
      <div class="content_box" ref="contentBoxRef">
        <!--        <div class="show-top">-->
        <!--          <div class="show-col"></div>-->
        <!--        </div>-->
        <el-carousel height="521px" @mouseleave="curTipIndex=null" @mouseenter="curTipIndex = 0">
          <el-carousel-item v-for="(item,index) in listImg" :key="index" autoplay :interval="500">
            <img :src="item.url" @click="openUrl(item.href)"/>
          </el-carousel-item>
        </el-carousel>
        <div class="show-center" @mouseleave="curTipIndex=null" @mouseenter="curTipIndex=1">
          <span class="title" style="font-size: 24px" data-sw-translate="" @click="register">CREATE ACCOUNT</span>
        </div>
        <el-form :model="formData" :rules="rules" ref="formRef">
          <el-form-item prop="userCode">
            <el-input v-model="formData.userCode" @mouseenter="curTipIndex=2" @mouseleave="curTipIndex=null"
                      placeholder="Account number" autocomplete="off"
                      data-sw-translate=""/>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="formData.password"
                      @mouseenter="curTipIndex=editType ===1 ?3:6" @mouseleave="curTipIndex=null"
                      :placeholder="editType ===1 ? 'Password':'NEW Password'" type="password"
                      show-password @keydown.enter="onSubmit"
                      data-sw-translate=""/>
          </el-form-item>
          <div class="forgot-box">
            <span data-sw-translate="" style="font-size: 18px;color: #232323" @mouseleave="curTipIndex=null"
                  @mouseenter="curTipIndex=4"
                  @click.self="forgotten">Forgotten password?</span>
            <div class="forgotten-box" v-show="editType === 2" @mouseleave="curTipIndex=null"
                 @mouseenter="curTipIndex = 5">
              <p data-sw-translate="">Please enter the verification</p>
              <el-input v-model="formData.vcode"/>
            </div>
          </div>
        </el-form>
        <div class="radio-box first" @mouseleave="curTipIndex=null" @mouseenter="curTipIndex=7">
          <bg-radio v-model="radioSelect1"/>
          <div class="radio-box-label" data-sw-translate="" style="font-size: 18px;color: #232323">Check this item to
            allow the browser to remember your
            account.
          </div>
        </div>
        <div class="radio-box" @mouseleave="curTipIndex=null" @mouseenter="curTipIndex=8">
          <bg-radio v-model="radioSelect2"/>
          <div class="radio-box-label" data-sw-translate="" style="font-size: 18px;color: #232323">No need to enter the
            password for the next seven days
          </div>
        </div>
        <div class="radio-box">
          <div class="radio-box-label sel" v-show="langCom==1" style="font-size: 18px;color: #232323">Please pay attention
            to your information security, carefully keep your accountnumber and password and other information, do not
            disclose it to strangers.
          </div>
          <div class="radio-box-label sel" v-show="langCom!=1" style="font-size: 18px;color: #232323">
            请注意您的信息安全，小心保管您的账号和密码等信息，切勿将其泄露给陌生人。
          </div>
        </div>
        <div class="login">
          <span class="title" data-sw-translate="" @mouseleave="curTipIndex=null"
                @mouseenter="curTipIndex=editType === 1 ?9:13"
                @click="onSubmit" style="font-size: 24px;color: #232323;font-weight: bold">{{
              editType === 1 ? 'ENTER THE MAIN PAGE' : 'CONFIRM AND ENTER THE MAIN PAGE'
            }}</span>
        </div>
      </div>
    </div>
    <HorseRaceLamp class="tip-info" v-show="filterShow" :style="{bottom:curTipIndex?'0':'-50px'}"
                   :text="getTipInfo(curTipIndex,langCom)"
    />

    <div class="filter-wrap" ref="filterShowRef"></div>
    <div class="togglelang-box" ref="householdDiv" v-show="filterShow">
      <div class="togglelang-box-top" @mouseleave="curTipIndex=null" @mouseenter="curTipIndex=10">
        <span @click.self="toggleLang" data-sw-translate="">切换成中文</span>
      </div>
      <ul>
        <li @click="helpShow=true" @mouseleave="curTipIndex=null" @mouseenter="curTipIndex=11" data-sw-translate="">
          Help
        </li>
        <li @click="richTextShow = true" @mouseleave="curTipIndex=null" @mouseenter="curTipIndex=12"
            data-sw-translate="">Contact
        </li>
      </ul>
    </div>
  </div>
  <Help v-show="helpShow" @close="helpShow=false" @toggleLang="toggleLang"/>
  <Private v-show="privateShow" @close="privateShow=false"/>
  <Feedback v-show="richTextShow" @close="richTextShow=false" @togglelang="toggleLang" @setTipIndex="(v)=> curTipIndex = v"/>
</template>
<script setup>
import {reactive, toRefs, ref, onMounted, nextTick, watch} from "vue";
import Help from '@/components/Help.vue';
import RichText from '@/components/RichText.vue';
import Private from '@/components/Private.vue';
import HorseRaceLamp from "@/components/horseRaceLamp.vue"
import Feedback from "@/components/feedback.vue"
import {useUserStore} from "@/store/modules/user";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {getVcode, updateMpwd, getbanner} from "@/api/login";
import {useState} from "@/store/modules/home";
import {getTipInfo} from "@/utils/zh-cn.js"
import BgRadio from "@/components/bgRadio.vue"

const STATE = useState();

const userStore = useUserStore();
const router = useRouter();

const langCom = ref(null)
const formRef = ref(null)
const containerDiv = ref(null)
const householdDiv = ref(null)
const contentBoxRef = ref(null)
const filterShowRef = ref(null)
const model = reactive({
  editType: 1,//1登录 2修改密码
  filterShow: false,
  formData: {},
  radioSelect1: false,// 记住密码
  radioSelect2: false,// 自动登录
  helpShow: false,
  richTextShow: false,
  privateShow: false,
  curTipIndex: 0,
})
const {
  filterShow, formData, radioSelect1, radioSelect2, helpShow, richTextShow, privateShow, editType, curTipIndex
} = toRefs(model)

watch(() => model.filterShow, () => {
  nextTick(() => {
    doMouseFn()
    contentBoxRef.value.style.marginTop = 0
    filterShowRef.value.style.opacity = 0.6
  })
})

onMounted(() => {
  getlist()
  nextTick(() => {
    if (localStorage.getItem('lang') == 1) {
      toggleLang()
    } else {
      toggleLang()
      toggleLang()
    }
  })
  window.addEventListener('resize',()=>{
    doMouseFn()
  })
  langCom.value = window.localStorage.getItem("lang")
  const info = localStorage.getItem('awave-info')
  if (info) {
    const params = JSON.parse(info)
    // 7天免登录
    if (+new Date() - params.date >= 7 * 24 * 60 * 60 * 1000) return
    delete params.date
    model.formData = params
    if (!params.auto) return
    userStore.login(params).then(res => {
      const lang = localStorage.getItem('lang')
      if (res.success) {
        ElMessage.success(lang == 0 ? '登录成功' : "Login successful")
        const temp = {date: +new Date(), ...model.formData}
        localStorage.setItem('userCode', JSON.stringify(temp.userCode))
        router.push('/home')
      } else {
        ElMessage.error(lang == 0 ? '用户和密码错误' : "The user and password are incorrect")
      }
    })
  }
})

const listImg = ref(null)

const openUrl = (url) => {
  window.open(url, '_blank')
}

const getlist = () => {
  const params = {
    currentPage: 1,
    pageSize: 99,
    param: {}
  }
  getbanner(params).then(res => {
    listImg.value = res.data
  })
}

const isDragging = ref(true)
const doMouseFn = () => {

  // let offsetX, offsetY;
  // 水平方向最大偏移量
  const MaxOffsetWidth = Math.abs(containerDiv.value.getBoundingClientRect().width - householdDiv.value.getBoundingClientRect().width - 3);
  // 竖直方向最大偏移量
  const MaxOffsetHeight = Math.abs(containerDiv.value.getBoundingClientRect().height - householdDiv.value.getBoundingClientRect().height - 14);
  // 屏幕
  const bodyW = document.querySelector('body').getBoundingClientRect().width
  const tipL = (bodyW - 832)/2 -210
  const tipR = (bodyW - 832)/2 + 832
  console.log(11111,tipL,tipR)
  householdDiv.value.addEventListener('click', (event) => {
    // const path = event.path?.map(dom => dom.className) || (event.composedPath && event.composedPath())?.map(dom => dom.className) || [];
    // if (path.indexOf('content_box') !== -1) return

    // event.preventDefault()
    // event.stopPropagation()
    // console.log(isDragging.value)
    isDragging.value = !isDragging.value;
    if (!isDragging.value) {
      householdDiv.value && (householdDiv.value.style.cursor = "default");
    }
    // offsetX = event.clientX - householdDiv.value.offsetLeft;
    // offsetY = event.clientY - householdDiv.value.offsetTop;
  });

  containerDiv.value.addEventListener('mousemove', (event) => {
    if (!isDragging.value) return
    const path = event.path?.map(dom => dom.className) || (event.composedPath && event.composedPath())?.map(dom => dom.className) || [];
    if (path.indexOf('content_box') !== -1) return
    householdDiv.value && (householdDiv.value.style.cursor = "move");
    let x = event.clientX - 5
    let y = event.clientY - 5
    if (Math.abs(x) > tipL && Math.abs(x) < tipR) {
      x = Math.abs(x - tipL) < Math.abs(x - tipR) ? tipL : tipR;
    } else if (x <= 0) {
      x = 3;
    } else if (x > MaxOffsetWidth) {
      x = MaxOffsetWidth
    }
    if (Math.abs(y) > MaxOffsetHeight) {
      y = MaxOffsetHeight;
    } else if (y <= 0) {
      y = 3;
    }
    householdDiv.value.style.left = x + 'px';
    householdDiv.value.style.top = y + 'px';
    // }
  });

  // document.addEventListener('mouseup', () => {
  //   containerDiv.value && (containerDiv.value.style.cursor = "default");
  //   isDragging.value = false;
  // });
}

const register = () => {
  router.push('/register')
}

const forgotten = () => {
  if (!model.formData.userCode) {
    const str = localStorage.getItem('lang') == 0 ? "请填写正确的账号" : "Please fill in the correct account number";
    ElMessage.error(str)
    return
  }
  model.editType = 2
  nextTick(() => {
    toggleLang()
    toggleLang()
  })
  const params = {
    userCode: model.formData.userCode
  }
  getVcode(params).then(res => {
    if (res.success) {
      model.formData.vid = res.data.vid
      const str = localStorage.getItem('lang') == 0 ? "已发送至您邮箱" : "It has been sent to your email";
      ElMessage.success(str)
    } else {
      const str = localStorage.getItem('lang') == 0 ? "请填写正确的账号" : "Please fill in the correct account number";
      ElMessage.error(str)
    }
  })
}

const onSubmit = () => {
  const lang = localStorage.getItem('lang')
  formRef.value.validate(valid => {
    if (valid) {
      if (model.editType === 1) { // 登录
        const params = {
          ...model.formData
        }
        userStore.login(params).then(res => {
          if (res.success) {
            ElMessage.success(lang == 0 ? '登录成功' : "Login successful")
            router.push('/home')
            localStorage.removeItem('awave-info')
            const temp = {date: +new Date(), ...model.formData}
            localStorage.setItem('userCode', temp.userCode)
            model.radioSelect1 && localStorage.setItem('awave-info', JSON.stringify({date: +new Date(),userCode:temp.userCode}))
            model.radioSelect2 && localStorage.setItem('awave-info', JSON.stringify({auto: true, ...temp}))
          } else {
            ElMessage.error(lang == 0 ? '用户和密码错误' : "The user and password are incorrect")
          }
        })
      } else { // 修改密码
        const params = {
          ...model.formData
        }
        updateMpwd(params).then(res => {
          if (res.success) {
            ElMessage.success(lang == 0 ? '修改密码成功' : "Password changed successfully")
            model.editType = 1
            userStore.login(params).then(res => {
              if (res.success) {
                router.push('/home')
                localStorage.removeItem('awave-info')
                const temp = {date: +new Date(), ...model.formData}
                model.radioSelect1 && localStorage.setItem('awave-info', JSON.stringify(temp))
                model.radioSelect2 && localStorage.setItem('awave-info', JSON.stringify({auto: true, ...temp}))
              } else {
                ElMessage.error(lang == 0 ? '用户和密码错误' : "The user and password are incorrect")
              }
            })
          } else {
            ElMessage.error(lang == 0 ? '修改密码失败' : "Failed to change the password")
          }
        })
      }
    }
  });
}

const toggleLang = () => {
  const lang = window.localStorage.getItem("lang")
  window.localStorage.setItem("lang", lang == 1 ? 0 : 1);
  langCom.value = window.localStorage.getItem("lang")
  window.SwaggerTranslator.translate()
  STATE.initLang()
}

const rules = {
  userCode: [{required: true, trigger: "blur", message: ""}],
  password: [{required: true, trigger: "blur", message: ""}],
}
</script>

<style lang="scss" scoped>
:deep(.el-form) {
  position: relative;
}

:deep(.el-form-item) {
  margin-bottom: 0;
}

:deep(.el-input__wrapper) {
  box-shadow: none;
  user-select: none;
  background: #fafafa;

  .el-input__inner {
    height: 50px;
    text-align: center;
    font-size: 24px;
    font-weight: 10;
    user-select: none;

    &::placeholder {
      color: #232323;
      text-align: center;
      font-weight: 1;
    }
  }

}

.login-page {
  position: relative;
  height: 100%;
  user-select: none;
  overflow: hidden;

  .login-wrap {
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;

    .content_box {
      display: inline-block;
      width: 832px;
      //height: calc(100vh - 40px);
      background-color: #fafafa;
      user-select: none;
      overflow-y: auto;
      transition: all 0.5s linear;
      margin-top: 100%;


      .show-top {
        height: 521px;

        .show-col {
          background-color: #2F5190;
          text-align: center;
          height: 100%;
        }
      }

      .show-center {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 87px;
        margin-bottom: 30px;
        font-size: 24px;
        color: #fff;
        background: #232323;

        span {
          cursor: pointer;
        }
      }

      .radio-box {
        &.first {
          margin-top: 60px;
        }

        margin-top: 10px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;

        .input {
          width: 15px;
          height: 15px;
          align-self: flex-start;
        }

        .radio-box-label {
          position: relative;
          top: -2px;
          width: 70%;
          margin-left: 10px;
          color: #666;
          font-size: 13px;
          text-align: left;

          &.sel {
            margin-left: 35px;
          }
        }
      }

      .login {
        margin-top: 40px;
        font-size: 25px;
        text-align: center;
        cursor: pointer;

        span {
          padding-bottom: 2px;
          border-bottom: 2px solid;
        }
      }

      .forgot-box {
        position: absolute;
        right: 50px;
        bottom: 15px;
        cursor: pointer;

        span {
          padding-bottom: 1px;
          border-bottom: 1px solid;
          color: #555;
        }

        .forgotten-box {
          position: fixed;
          top: 700px;
          left: 1350px;
          width: 334px;
          height: 117px;
          background: #1b1c1f;
          font-size: 13px;
          color: #fff;
          padding: 5px;
          border-radius: 5px;
          box-sizing: border-box;

          :deep(.el-input) {
            border: 1px solid #fff;
            height: 62px;

            .el-input__wrapper {
              background: #1b1c1f;
            }
          }
        }
      }
    }
  }

  .filter-wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0;
    background-color: rgba(203, 203, 203, .7);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }

  .tip-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40px;
    padding: 0 30px;
    font-size: 16px;
    color: #fafafa;
    z-index: 999;
    box-sizing: border-box;
    background: #232323;
    transition: all 0.3s 0.2s;
  }

  .togglelang-box {
    position: absolute;
    top: 50px;
    left: 1600px;
    width: 197px;
    height: 162px;

    .togglelang-box-top {
      height: 54px;
      line-height: 54px;
      text-align: center;
      color: #fafafa;
      font-weight: 1;
      font-size: 24px;
      background: #232323;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      text-align: center;
      background: #fafafa;

      li {
        height: 50px;
        line-height: 50px;
        font-size: 24px;
        font-weight: normal;
        cursor: default;
      }
    }
  }

}

.marquee-container {
  width: 12rem;
  border: 1px solid gainsboro;
  overflow: hidden;
}

.marquee-wrap {
  white-space: nowrap;
  -webkit-animation: marquee 10s linear infinite;
  animation: marquee 10s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-12rem);
  }
}

:deep(.el-carousel__indicators) {
  display: none;
}

:deep(.el-carousel__arrow) {
  display: none;
}

@media  (max-height: 1080px) {
  .highlights{
    margin:100px auto 0!important;
    background: red;
  }
}
@media  (max-height: 1000px) {
  .show-center{
    height: 47px !important;
    margin-bottom: 10px !important;
  }
  .radio-box.first{
    margin-top: 5px !important;
  }
  .login{
    margin-top: 10px !important;
  }
}
</style>



