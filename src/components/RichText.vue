<script setup>

import swal from 'sweetalert'
import {onBeforeUnmount, ref, reactive, shallowRef, onMounted, nextTick} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {i18nChangeLanguage} from '@wangeditor/editor'
import {addMsg, addQA, a2} from '@/api/home'
import {useState} from "@/store/modules/home";

const STATE = useState();

const emit = defineEmits(['close'])
const editorRef = shallowRef()
const valueHtml = ref('')
const UI = reactive({
  tabs: [['Feedback', '留言'], ['Bugs Report', '漏洞反馈']],
  tabActive: 1,
  tags: [['login part', '登录步骤'], ['language', '语言'], ['announcement', '公告系统'], ['circles & colours', '画布 & 填色'], ['map', '小地图'], ['achievement  system', '成就系统'], ['bio', '个人信息'], ['planet', '星球 & 定位'], ['space', '空间页面'], ['other', '其它漏洞']],
  tagActive: 8,
  title: '',
  show: false,
})


const QA = reactive(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''])

const mode = 'simple';
const toolbarConfig = {
  showMenuTooltips: false,
  toolbarKeys: ['bold', 'italic', 'underline', 'uploadImage', "insertLink"]
}
const toolbarConfigQA = {
  showMenuTooltips: false,
  toolbarKeys: ['bold', 'italic', 'underline']
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


onMounted(() => {
  window.showRich = showNotice
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

function Send() {

  if (UI.tabActive < 2) {

    const msg = {title: '', tag: 8, show: false, text: '', player: ''};
    msg.text = valueHtml.value;
    if (UI.tabActive == 1) {
      msg.show = true;
      msg.tag = UI.tagActive;
    } else {
      msg.title = UI.title;
      msg.show = false;
    }
    msg.player = localStorage.getItem('userid')
    if (!msg.player) {
      msg.player = ""
    }
    addMsg(msg, (ok) => {
      swal("AWAVE", ok ? 'Sucess' : 'Error', ok ? 'success' : 'error')
      close()
    })
  } else {

    const question = {text: '', player: ''};

    let str = "";
    QA.forEach((item, index) => {
      str = (index == 0 ? "" : "|") + item
      question.text = question.text + str
    })

    question.player = localStorage.getItem('userid')
    if (!question.player) {
      question.player = ""
    }


    addQA(question, (ok) => {
      swal("AWAVE", ok ? 'Sucess' : 'Error', ok ? 'success' : 'error')
      close()
      a2(localStorage.getItem('Authorization'))

    })

  }


}

function close() {
  emit('close')
  // UI.show = false;
  // window.top.hideIframe && window.top.hideIframe()
}

function showNotice(lang) {

  UI.show = true;
  STATE.setLang(lang)
  i18nChangeLanguage(lang ? 'zh-CN' : 'en')
}

defineExpose({showNotice})
</script>

<template>
  <div style="width: 80%;height: 90%;left: 10%;top: 5%;position: fixed;background-color: white;z-index: 999;border-radius: 12px;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, .2)">
    <svg @click="close"
         style="cursor: pointer;z-index: 100; position: absolute;top: 8px;left: 8px;width: 28px;height: 28px;"
         viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
      <path
          d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z"
          fill="#707070"></path>
    </svg>

    <h1 style="position: absolute;width: 100%;text-align: center;font-weight: bold;color: black;font-size: 26px;">
      {{ !STATE.lang ? 'Contact' : '反馈' }}</h1>
    <div style="margin-left: 50px;margin-top: 2rem;margin-bottom: 10px; width: fit-content;display: flex;">

      <div style="width: fit-content;display: flex;flex-direction: column;justify-content:space-between;">
                <span @click="UI.tabActive = index" style="padding:5px 32px;font-size: 17px;"
                      :class="UI.tabActive == index ? 'contact-item contact-active' : 'contact-item'"
                      v-for="(item, index) in UI.tabs">{{ !STATE.lang ? item[0] : item[1] }}</span>
      </div>
      <svg @click="STATE.switchLang" style="margin-top: 10px;" viewBox="0 0 1024 1024" version="1.1"
           xmlns="http://www.w3.org/2000/svg" width="36" height="36">
        <path
            d="M863.288889 861.866667c22.755556 0 38.4-24.177778 29.866667-45.511111L743.822222 465.066667c-14.222222-34.133333-64-34.133333-78.222222 0L516.266667 816.355556c-8.533333 21.333333 7.111111 45.511111 29.866666 45.511111 12.8 0 25.6-8.533333 29.866667-19.911111l38.4-96.711112h179.2l38.4 96.711112c5.688889 11.377778 17.066667 19.911111 31.288889 19.911111zM637.155556 686.933333l66.844444-169.244444 66.844444 169.244444h-133.688888zM583.111111 291.555556h85.333333c15.644444 0 28.444444-12.8 28.444445-28.444445s-12.8-28.444444-28.444445-28.444444H440.888889v-44.088889c0-15.644444-12.8-28.444444-28.444445-28.444445s-28.444444 12.8-28.444444 28.444445v44.088889H156.444444c-15.644444 0-28.444444 12.8-28.444444 28.444444s12.8 28.444444 28.444444 28.444445h366.933334c-9.955556 32.711111-22.755556 64-38.4 95.288888-19.911111 38.4-45.511111 72.533333-73.955556 103.822223h-5.688889c-9.955556-11.377778-29.866667-31.288889-51.2-62.577778-8.533333-12.8-17.066667-25.6-24.177777-39.822222-5.688889-9.955556-14.222222-15.644444-25.6-15.644445-21.333333 0-35.555556 22.755556-25.6 42.666667 8.533333 15.644444 17.066667 31.288889 27.022222 45.511111 19.911111 29.866667 38.4 49.777778 52.622222 65.422222l8.533333 8.533334-157.866666 159.288888c-11.377778 11.377778-11.377778 28.444444 0 39.822223 11.377778 11.377778 28.444444 11.377778 39.822222 0l157.866667-157.866667c24.177778 25.6 51.2 52.622222 79.644444 79.644444 14.222222 14.222222 39.822222 8.533333 46.933333-9.955555 4.266667-9.955556 1.422222-22.755556-7.111111-31.288889-28.444444-27.022222-54.044444-54.044444-78.222222-79.644444 34.133333-36.977778 64-78.222222 88.177778-122.311112 19.911111-38.4 35.555556-78.222222 46.933333-120.888888z"
            fill="#707070"></path>
      </svg>
    </div>
    <div v-if="UI.tabActive < 2"
         style=" position: relative; display: flex;flex-direction: column; border: 1px solid black;box-sizing: border-box; border-radius: 6px;margin-left:50px;margin-right: 50px;height: calc(100% - 12rem);">
      <div v-if="UI.tabActive == 1"
           style="display: flex; margin-left: 90px;margin-top: 15px; justify-content: left;height:fit-content;   flex-flow: wrap">
        <span style="position: absolute; padding: 4px 4px;left: 20px;"
              class="contact-item no-border bold">{{ !STATE.lang ? 'Tags#' : '标签#' }}</span>
        <span @click="UI.tagActive = index"
              :class="UI.tagActive == index ? 'contact-item contact-active ' : 'contact-item'"
              :style="!STATE.lang?'font-style: italic;font-weight: 100;':'font-weight: 100;' "
              v-for="(item, index) in UI.tags">{{ !STATE.lang ? item[0] : item[1] }}</span>
      </div>
      <div v-if="UI.tabActive == 0"
           style="position: relative; border-bottom: 1px solid black;width: 96%;height: 2rem; left: 2%;font-weight: bold; margin-top: 20px;">
        {{ !STATE.lang ? 'Subject:' : '主题:' }}
        <input v-model="UI.title"
               style="font-size: 1rem;font-weight: bold;text-align: center; border: none;height: 100%; outline: none;padding: 0;width: calc(100% - 8rem);"/>
      </div>

      <Editor style="flex: auto;margin: 0 20px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
              :mode="mode" @onCreated="handleCreated"/>
      <Toolbar style="" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode"/>
    </div>
    <div v-if="UI.tabActive > 1"
         style=" position: relative; margin-left:50px;margin-right: 50px;height: calc(100% - 11rem);overflow: hidden scroll;">
      <div>{{
          !STATE.lang ? `You don't have to answer all the questions, but do NOT forget to click the "send" button at
                the bottom to submit your answer.` : `您不必回答所有的问题，但是请不要忘记点击下方的“发送”按钮提交您的答案。`
        }}
      </div>

      <h5>{{ !STATE.lang ? `Section 1:` : `第一部分：` }}</h5>

      <div>{{ !STATE.lang ? `How would you describe the whole activity in one sentence?` : `您如何用一句话描述这整个活动？` }}</div>
      <textarea v-model="QA[0]" class="textarea60"></textarea>
      <div>{{
          !STATE.lang ? `How would you describe your experience in the game? (Maybe thinking from the relationship
                with the group,
                cooperation and competition)` : `您如何描述您的经历？（可以考虑从与群体的关系或合作与竞争等角度出发）`
        }}
      </div>
      <textarea v-model="QA[1]" class="textarea60"></textarea>
      <div>{{
          !STATE.lang ? `Did you feel the sense of existing in the group in the process? If not, can you tell me where
                does it happen?` : `您是否在活动中感受到在群体中的存在感？如果没有，请描述在哪部分感到缺失这种感觉。`
        }}
      </div>
      <textarea v-model="QA[2]" class="textarea60"></textarea>
      <div>{{
          !STATE.lang ? `Did you feel social pressure in the process? If so, where does this appear?` :
              `您是否在过程中感受到社交压力？如何有，请描述在哪部分出现了这种压力。`
        }}
      </div>
      <textarea v-model="QA[3]" class="textarea60"></textarea>
      <div>{{ !STATE.lang ? `Where did you hear about this event?` : `您从哪里得到这个活动的消息？` }}</div>
      <textarea v-model="QA[4]" class="textarea60"></textarea>

      <h5>{{ !STATE.lang ? `Section 2:` : `第二部分：` }}</h5>

      <div class="qa-select">
        <div class="qa-title">{{
            !STATE.lang ? `To what extent do you agree that this is a collective game? (Realising
                    the existing of group)` : `您多大程度上同意这是一个关于群体的游戏？（意识到自己在群体中存在）`
          }}
        </div>
        <div class="qa-group">
                    <span :class="QA[5] == item ? 'qa-circle qa-clicked' : 'qa-circle'" @click="QA[5] = item"
                          v-for="item in 10">{{ item }}</span>
        </div>
      </div>


      <div class="qa-select">
        <div class="qa-title">{{
            !STATE.lang ? `To what extent do you feel connected with the other participants?` :
                `您多大程度上感到和其他人有关联？`
          }}
        </div>
        <div class="qa-group">
                    <span :class="QA[6] == item ? 'qa-circle qa-clicked' : 'qa-circle'" @click="QA[6] = item"
                          v-for="item in 10">{{ item }}</span>
        </div>
      </div>

      <div class="qa-select">
        <div class="qa-title">{{
            !STATE.lang ? `To what extent do you enjoy thinking and operating around a group?` :
                `您多大程度上在游玩过程中享受围绕群体思考和操作？`
          }}
        </div>
        <div class="qa-group">
                    <span :class="QA[7] == item ? 'qa-circle qa-clicked' : 'qa-circle'" @click="QA[7] = item"
                          v-for="item in 10">{{ item }}</span>
        </div>
      </div>


      <div class="qa-select">
        <div class="qa-title">{{
            !STATE.lang ? `To what extent do you feel that the experience in the game is like
                    experiencing being a bird in a flock of birds?` : `您多大程度上感受到自己在游戏中的经历与自己是鸟群中的一只的相似性？`
          }}
        </div>
        <div class="qa-group">
                    <span :class="QA[8] == item ? 'qa-circle qa-clicked' : 'qa-circle'" @click="QA[8] = item"
                          v-for="item in 10">{{ item }}</span>
        </div>
      </div>


      <div class="qa-select">
        <div class="qa-title">{{
            !STATE.lang ? `To what extent do you feel that what you're doing in the game is
                    purposeful?` : `您多大程度上感受到您在游戏中所做的操作是有目的的？`
          }}
        </div>
        <div class="qa-group">
                    <span :class="QA[9] == item ? 'qa-circle qa-clicked' : 'qa-circle'" @click="QA[9] = item"
                          v-for="item in 10">{{ item }}</span>
        </div>
      </div>


      <div class="qa-select">
        <div class="qa-title">{{
            !STATE.lang ? `To what extent do you feel less pressure to socialise with other people
                    during the activity, compared to other online games?` : `您多大程度上感受到参与这个社交游戏比起参与其他的线上游戏或社交活动有更少的社交压力？`
          }}
        </div>
        <div class="qa-group">
                    <span :class="QA[10] == item ? 'qa-circle qa-clicked' : 'qa-circle'" @click="QA[10] = item"
                          v-for="item in 10">{{ item }}</span>
        </div>
      </div>


      <div class="qa-select">
        <div class="qa-title">{{
            !STATE.lang ? `To what extent do you derive a sense of relaxing, belonging,
                    accompanying or achievement from the whole process?` : `您多大程度上在活动中感受到放松、归属感、陪伴感或成就感？`
          }}
        </div>
        <div class="qa-group">
                    <span :class="QA[11] == item ? 'qa-circle qa-clicked' : 'qa-circle'" @click="QA[11] = item"
                          v-for="item in 10">{{ item }}</span>
        </div>
      </div>


      <div class="qa-select">
        <div class="qa-title">{{
            !STATE.lang ? `To what extent do you feel that your objective identity (nationality,
                    culture, occupation, age) affects your interactions with others?` :
                `您多大程度上感受到你的客观身份（国籍、职业、年龄等）影响着您与其他人的互动？`
          }}
        </div>
        <div class="qa-group">
                    <span :class="QA[12] == item ? 'qa-circle qa-clicked' : 'qa-circle'" @click="QA[12] = item"
                          v-for="item in 10">{{ item }}</span>
        </div>
      </div>


      <div class="qa-select">
        <div class="qa-title">{{
            !STATE.lang ? `To what extent do you think colouring games relate closely to colour
                    planet and The Space?` : `您多大程度上认同活动中的填色部分与“色彩星球”部分和“空间”部分的关联性？`
          }}
        </div>
        <div class="qa-group">
                    <span :class="QA[13] == item ? 'qa-circle qa-clicked' : 'qa-circle'" @click="QA[13] = item"
                          v-for="item in 10">{{ item }}</span>
        </div>
      </div>

      <h5>{{ !STATE.lang ? `Section 3:` : `第三部分：` }}</h5>

      <div class="qa-select">
        <div class="qa-title">{{
            !STATE.lang ? `Based on your actual participation process, did you do more cooperation
                    or game during the activity? The score tends to 0, tends to more cooperation; the score tends to 10,
                    tends to more game.` : `基于您实际的参与过程，您做了更多的合作还是博弈？数字越倾向于0，答案更倾向于合作；数字越倾向于10，答案更倾向于博弈。`
          }}
        </div>
        <div class="qa-group">
                    <span :class="QA[14] == item ? 'qa-circle qa-clicked' : 'qa-circle'" @click="QA[14] = item"
                          v-for="item in 10">{{ item }}</span>
        </div>
      </div>

      <div class="qa-select">
        <div class="qa-title">{{
            !STATE.lang ? `Based on your personal experience, do you think the key of this activity
                    is more like a drawing board, a way of creation; Or more like a board game, a way of competition? The
                    score tends to 0, tends to creation; the score tends to 10, tends to competition.` :
                `基于您的个人经历和直觉，您认为这个活动的核心部分更像是一个画板，一个创作的工具；还是一个棋盘游戏，一种对抗与博弈？数字越倾向于0，答案更倾向于画板；数字越倾向于10，答案更倾向于棋盘。`
          }}
        </div>
        <div class="qa-group">
                    <span :class="QA[15] == item ? 'qa-circle qa-clicked' : 'qa-circle'" @click="QA[15] = item"
                          v-for="item in 10">{{ item }}</span>
        </div>
      </div>

      <div class="qa-select">
        <div class="qa-title">{{
            !STATE.lang ? `Based on your personal experience, do you feel like you've experienced
                    most of the content in this project? The score tends to 0, tends to less; the score tends to 10, tends
                    to more.` :
                `基于您参与的实际情况，您觉得您是否已经体验了大部分的内容？数字越倾向于0，答案更倾向于更少的参与度；数字越倾向于10，答案更倾向于更高的参与度。`
          }}
        </div>
        <div class="qa-group">
                    <span :class="QA[16] == item ? 'qa-circle qa-clicked' : 'qa-circle'" @click="QA[16] = item"
                          v-for="item in 10">{{ item }}</span>
        </div>
      </div>

      <h5>{{ !STATE.lang ? `Section 4:` : `第四部分：` }}</h5>

      <div class="qa-select">
        <div class="qa-title">{{ !STATE.lang ? `Please rate the whole experience.` : `请为整个活动打分。` }}</div>
        <div class="qa-group">
                    <span :class="QA[17] == item ? 'qa-circle qa-clicked' : 'qa-circle'" @click="QA[17] = item"
                          v-for="item in 10">{{ item }}</span>
        </div>
      </div>
      <div class="qa-select">
        <div class="qa-title">{{
            !STATE.lang ? `Please rate the operating system and the web server.` : `请为操作系统与服务器打分。`
          }}
        </div>
        <div class="qa-group">
                    <span :class="QA[18] == item ? 'qa-circle qa-clicked' : 'qa-circle'" @click="QA[18] = item"
                          v-for="item in 10">{{ item }}</span>
        </div>
      </div>
      <div class="qa-select">
        <div class="qa-title">{{
            !STATE.lang ? `Please rate the visual style of the website, including the interface
                    style and animation effects.` : `请为视觉元素和视觉效果打分。`
          }}
        </div>
        <div class="qa-group">
                    <span :class="QA[19] == item ? 'qa-circle qa-clicked' : 'qa-circle'" @click="QA[19] = item"
                          v-for="item in 10">{{ item }}</span>
        </div>
      </div>
      <div class="qa-select">
        <div class="qa-title">{{ !STATE.lang ? `Please rate the The Space.` : `请为“空间”系统的体验打分。` }}</div>
        <div class="qa-group">
                    <span :class="QA[20] == item ? 'qa-circle qa-clicked' : 'qa-circle'" @click="QA[20] = item"
                          v-for="item in 10">{{ item }}</span>
        </div>
      </div>
      <div class="qa-select">
        <div class="qa-title">{{ !STATE.lang ? `Please rate the personal page.` : `请为个人页面的体验打分。` }}</div>
        <div class="qa-group">
                    <span :class="QA[21] == item ? 'qa-circle qa-clicked' : 'qa-circle'" @click="QA[21] = item"
                          v-for="item in 10">{{ item }}</span>
        </div>
      </div>

      <h5>{{ !STATE.lang ? `Suggestions & Feedback:` : `建议 & 评论：` }}</h5>
      <div style="width:100%;border: 1px solid gray;border-radius: 5px;box-sizing: border-box;">
        <Editor style="width: 100%; height: 200px;  overflow-y: hidden;" v-model="QA[22]"
                :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated"/>
        <Toolbar style="" :editor="editorRef" :defaultConfig="toolbarConfigQA" :mode="mode"/>
      </div>

    </div>
    <a @click="UI.tabActive = 2"
       :style="{ color: UI.tabActive == 2 ? ' red' : 'black', textDecoration: 'underline', cursor: 'pointer', position: 'absolute', right: '50px', top: '64px' }">
      {{ !STATE.lang ? ' Q&A Survey' : '填写问卷' }}
    </a>
    <footer v-if="UI.tabActive < 2"
            style="width: 100%;text-align: center;font-size: 0.8rem;font-weight: lighter; height: 1rem;">{{
        !STATE.lang ? '*If you expect a reply,please leave your email address at the bottom of the text* ' : '*如果您期望收到回复, 请在文本末尾留下电子邮箱地址*'
      }}
    </footer>
    <div @click="Send"
         style="user-select: none;cursor: pointer; position: absolute;bottom: 0;left: 50%;transform: translateX(-50%);background-color: black;color: white;padding: 5px 34px;border-top-left-radius: 5px;border-top-right-radius: 5px;">
      {{ !STATE.lang ? 'Send' : '发送' }}
    </div>
  </div>
</template>

<style>
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(147, 147, 153, 0.5);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}


.contact-item {
  border: 1px solid black;
  text-align: center;
  border-radius: 5px;
  padding: 4px 24px;
  margin-top: 0.5rem;
  margin-right: 0.8rem;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  font-weight: lighter;
  font-size: 16px;

}

.contact-active {
  background-color: rgb(216, 216, 216);
}

.no-border {
  border: none;
}

.bold {
  font-weight: bold;
}

.textarea60 {
  height: 60px;
  width: 100%;
  border-radius: 5px;
  box-sizing: border-box;
}

.qa-select {
  border: 1px solid gray;
  border-radius: 5px;
  height: fit-content;
  margin-bottom: 10px;
  user-select: none;
}

.qa-title {
  margin: 5px;
}

.qa-group {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.qa-circle {
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid gray;
  text-align: center;
  line-height: 32px;
  margin: 5px;
  font-weight: bold;
  cursor: pointer;
}

.qa-clicked {
  background-color: #e9e9e9;
}
</style>
