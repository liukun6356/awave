<!--/**
* @author: liuk
* @date: 2024/01/17
* @describe: 注册页
* @email: 1229223630@qq.com
*/-->
<template>
  <div class="login-page root" ref="containerDiv" style="overflow: hidden">
    <div class="login-wrap register-container">
      <div class="content_box" style="background: #fafafa">
        <div id="show-top" style="height: 450px;display: none;">
          <div id="show-col" style="background-color: #ff0000;text-align: center;height: 100%;"></div>
        </div>
        <div id="center-edit" class="flexCol">
          <div class="flexCol1">
            <div style="display: flex;align-items: center;">
              <div id="palette-circle"
                   style="border-radius: 50%;background-color: #ffffff;width: 37px;height: 37px;margin-left: -45px;margin-top: 16px;">
              </div>
              <div v-if="merge1Show" class="merge1"
                   style="background-color: #ffffff;width: 37px;height: 50px;position: absolute;"></div>

              <div style="margin-left: 10px;"></div>
              <h5 id="palette-tab" @mouseleave="curTipIndex = null" @mouseenter="curTipIndex = 14"
                  class="highlights active title" @click="(listType = 1,merge1Show=false,merge2Show=true)"
                  index="0" data-sw-translate="" style="font-size: 24px">
                1. Palette</h5>
            </div>
            <div class="flexCol2 tip-div" v-show="listType === 1" id="color-div">
              <div class="flexRow">
                <div id="pale-tab" class="title" @mouseleave="curTipIndex = null" @mouseenter="curTipIndex = 15"
                     @click="editType = 2"
                     :class="['text',editType===2?'active':'']"
                     style="margin-left: 2px;" index="1" data-sw-translate="">Colour Palettes
                </div>
                <div class="text1" style="margin-left: 2px;">&nbsp;\&nbsp;</div>
                <div :class="['text',editType===1?'active':'']" @mouseleave="curTipIndex = null"
                     @mouseenter="curTipIndex = 16" index="0" class="title"
                     @click="editType = 1" data-sw-translate="">Hue Cube
                </div>


                <div class="text1" style="margin-left: 2px;">\&nbsp;</div>
                <div id="drop-tab" :class="['text',editType===3?'active':'']" @mouseleave="curTipIndex = null"
                     @mouseenter="curTipIndex = 17"
                     @click="editType = 3" class="title"
                     style="margin-left: 2px;" index="2" data-sw-translate="">
                  Eyedropper
                </div>
                <div class="text1" style="margin-left: 2px;">\&nbsp;</div>
                <div id="num-tab" style="margin-left: 2px;" @click="editType = 4" @mouseleave="curTipIndex = null"
                     @mouseenter="curTipIndex = 18" class="title"
                     :class="['text',editType===4?'active':'']" index="3" data-sw-translate="">
                  Numbers
                </div>
                <div class="text1" style="margin-left: 2px;">\&nbsp;</div>
                <div style="margin-left: 2px;" @click="editType = 5" @mouseleave="curTipIndex = null"
                     @mouseenter="curTipIndex = 19" class="title"
                     :class="['text',editType===5?'active':'']" index="34" data-sw-translate="">
                  Cooperation
                </div>
              </div>
              <div id="palette-group" style="min-height: 450px;margin-top: 20px;">
                <div v-show="editType===1">
                  <div class="rect2">
                    <div class="color-pancel"
                         style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; background: rgb(255, 0, 0)">
                      <div class="saturation-white"
                           style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px;">
                        <div class="saturation-black" @mouseleave="curTipIndex = null" @mouseenter="curTipIndex=23"
                             style="position: absolute; top: 5px; right: 0px; bottom: 0px; left: 0px;">
                        </div>
                        <div class="pickerBtn"
                             style="position: absolute; top: 0%; left: 100%; cursor: default;">
                          <div
                              style="width: 12px; height: 12px; border-radius: 6px; box-shadow: rgb(255, 255, 255) 0px 0px 0px 1px inset; transform: translate(-6px, -6px);">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="rect3">
                    <div style="-webkit-box-flex: 1; flex: 1 1 0%;">
                      <div style="height: 20px; position: relative;">
                        <div
                            style="position: absolute; top: 0px;right: 0px; bottom: 0px; left: 0px;">
                          <div class="hue-horizontal"
                               @mouseleave="curTipIndex = null" @mouseenter="curTipIndex=24"
                               style="padding: 0px 2px; position: relative; height: 30px;">
                            <div id="color-select-bar" class="colorBar-color-picker"
                                 style="position: absolute; left: 0%;">
                              <div
                                  style="width: 12px; height: 34px;border: 2px solid black; transform: translate(0, -4px); ">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-show="editType===2">
                  <div id="palette-div" @mouseleave="curTipIndex = null" @mouseenter="curTipIndex=20"
                       style='height:580px;background: #f2f2f2;display: flex;flex-flow: row wrap;overflow-y: auto;justify-content: space-between;padding: 0 50px;border-top: 1px solid;border-bottom: 1px solid'
                       class='color-palette'>
                    <p v-for="color in palette" :key="color" class="colorblock" :style='{background:color}'
                       :class="[getSel(color)?'select':'']" @click="selectColor($event)">
                      <span>{{ color }}</span>
                    </p>
                  </div>
                </div>
                <div v-show="editType===3" style="margin-bottom: -40px">
                  <div class="rect2" style="height:440px;background-color: #f2f2f2;text-align: center;overflow:auto;">
                    <!--                    <div id="picture" class="color-pancel"-->
                    <!--                         style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; background: url(/img/add-picture.png) center no-repeat;">-->
                    <!--                    </div>-->
                    <div id="picture" class="color-pancel" @mouseleave="curTipIndex = null" @mouseenter="curTipIndex=25"
                         style="color:#fff;font-size: 20px;background: #232323;
                         position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px;display: flex;justify-content: center;align-items: center "
                         data-sw-translate="">
                      点击此处上传图片
                    </div>
                  </div>
                  <div class="rect3-wrap" style="font-size: 18px;color:#232323">
                    <div class="rect3-tit" data-sw-translate="" style="font-size: 16px;color: #232323">
                      单击黑色区城上传图片，支持png、jipg格式文件。
                    </div>
                    <div class="rect3-tit" v-if="langCom == 0" style="font-size: 16px;color: #232323">
                      长按鼠标抱动可调整图片选区，单击 “取色” 按讯并再次单击图片框内的任意区域选区对应的额色。
                    </div>
                    <div class="rect3-tit" v-else style="font-size: 16px;color: #232323">
                      Drag the cursor to aojust the imoge selection area, click the "Eyedropper" button and clickgny
                      point in the box ggain to select the oerrespenging oclour
                    </div>
                  </div>
                  <div class="rect3" style="display: flex;justify-content: center">
                    <!--                    <div id="zoomin" class="butten" style="margin-left: 20px;width: 50px;height: 50px;">-->
                    <!--                      <img src="/img/zoom-in.png" alt="alt text" width="50" height="50"/>-->
                    <!--                    </div>-->
                    <!--                    <div id="zoomout" class="butten" style="margin-left: 10px;width: 50px;height: 50px;">-->
                    <!--                      <img src="/img/zoom-out.png" alt="alt text" width="50" height="50"/>-->
                    <!--                    </div>-->
                    <div id="quse"
                         :style="{
                         position:'relative',
                         width:langCom ==0?'106px':'182px',
                         height:'52px',
                         background:'#232323',
                         color: '#fff',
                         'font-size': '25px',
                         'line-height': '50px',
                         'text-align': 'center',
                         'border-radius': '25px'}">
                      <span data-sw-translate="" style="font-size: 23px;color:#fafafa" class="title"
                            @mouseleave="curTipIndex = null" @mouseenter="curTipIndex=26">取 色</span>
                      <div class="forgot-box3">
                        <span data-sw-translate="" @mouseleave="curTipIndex = null" @mouseenter="curTipIndex=27"
                              style="font-size: 18px"
                              @click.self="$('.file-upload').click();">重新上传</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-show="editType===4">
                  <div id="num-col" style="background-color: #232323;text-align: center;height: 364px;">
                  </div>
                  <div style="height: 50px; margin-top: 60px;margin-bottom: 30px">
                    <div style="display: flex;justify-content: center">
                      <input id="hex_val" class="input"
                             @mouseenter="curTipIndex=28" @mouseleave="curTipIndex=null"
                             style="border: none;margin-bottom: 20px;font-size: 24px;width: auto;background: #fafafa"
                             placeholder="Please enter the value color" autocomplete="off" data-sw-translate=""
                             onKeyDown="onKeyDown(event)"/>
                    </div>
                  </div>
                  <div @mouseleave="curTipIndex = null" @mouseenter="curTipIndex = 29"
                       style="justify-content: center;display: flex;height: 50px;font-size: 24px;color:#232323">
                    <div style="margin-left: 10px;float: left;">
                      <span class="title">R</span>
                      <input id="r_val" class="input" style="background: #fafafa;width: 60px"
                             onkeydown="onKeyDown(event)"/>
                    </div>
                    <div style="margin-left: 10px;float: left;">
                      <span class="title">G</span>
                      <input id="g_val" class="input" style="background: #fafafa;width: 60px"
                             onkeydown="onKeyDown(event)"/>
                    </div>
                    <div style="margin-left: 10px;float: left;">
                      <span class="title">B</span>
                      <input id="b_val" class="input" style="background: #fafafa;width: 60px"
                             onkeydown="onKeyDown(event)"/>
                    </div>
                  </div>
                  <div @mouseleave="curTipIndex = null" @mouseenter="curTipIndex = 29"
                       style="justify-content: center;display: flex;height: 50px;font-size: 24px;color:#232323">
                    <div style="margin-left: 10px;float: left;">
                      <span class="title">H</span>
                      <input id="h_val" class="input" style="background: #fafafa;width: 60px"
                             onkeydown="onKeyDown(event)"/>
                    </div>
                    <div style="margin-left: 10px;float: left;">
                      <span class="title">S</span>
                      <input id="s_val" class="input" style="background: #fafafa;width: 60px"
                             onkeydown="onKeyDown(event)"/>
                    </div>
                    <div style="margin-left: 10px;float: left;">
                      <span class="title">B</span>
                      <input id="br_val" class="input" style="background: #fafafa;width: 60px"
                             onkeydown="onKeyDown(event)"/>
                    </div>
                  </div>

                </div>
                <div class="pixel-div" v-show="editType===5">
                  <div class="video-box" ref="videoBoxRef" data-sw-translate=""
                       :style="{backgroundColor:videoBoxColor}">
                    <video id="e_video" style="width:100%;height:100%" controls autoplay>
                      <source type="video/mp4" :src="cj">
                    </video>

                  </div>
                  <div class="tit-box" data-sw-translate="">
                    <img src="@/assets/img/hz.png"/>
                  </div>
                  <div class="input-box">
                    <el-input class="ccc" v-model="linkValue" @blur="forgotten" data-sw-translate=""
                              placeholder="Please your link"
                              @mouseenter="curTipIndex=30" @mouseleave="curTipIndex=null"/>
                    <div class="forgot-box">
                      <span data-sw-translate="" style="font-size: 18px" @mouseleave="curTipIndex = null"
                            @mouseenter="curTipIndex=31">Get link?</span>
                      <div class="forgot-box-tip">
                        <span class="tit" data-sw-translate="">在您自己的小像素点页面点击昵称旁边的"复制地址"</span>
                        <div class="img-wrap">
                          <img src="@/assets/img/tu1.png"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p class="info-box" style="font-size: 16px;margin-top:40px">
                    <span v-if="langCom==1">
                      if you have petted ary piels in "像素点.cn" at the same time, selecting the this channel cansave you time when picking colours. After posting your link to this poge, your colour informatlon and rickname wil be filed in automatically, and you can directly dick on "Statement8Confirmatien' to proceed to the final registration step.
                    </span>
                    <span v-else>
如果您同时在“像素点.cn”中认养过任何小像素点，在取色时选择“像素点”通道可以为您节省时间。将您的链接粘贴到此页面后，您的颜色信息和昵称将会被自动填写，您可以直接点击 “声明确认” 进入到最终的注册步骤。
                    </span>
                    <!--                    <span data-sw-translate="">After pasting your link to this page, your color information and nickname will be filled in automatically, and you can directly click on the statement to proceed to the final registration step</span>-->
                  </p>
                  <p class="info-box" style="font-size: 16px" data-sw-translate="">Now, your little pixels will come to
                    this platform, meet mcre
                    colcur frlends in a new way of sogglzngeng meke woves with us!</p>
                </div>
              </div>
            </div>
            <div id="adjustment-div" style="display: flex;align-items: center;">
              <div id="adjustment-circle"
                   style="border-radius: 50%;background-color: #ffffff;width: 37px;height: 37px;margin-left: -45px;margin-top: 16px;">
              </div>
              <div style="margin-left: 10px;"></div>
              <h5 class="highlights1 title" @mouseleave="curTipIndex = null" @mouseenter="curTipIndex = 21" index="1"
                  id="adjustment"
                  @click="(listType = 2,merge1Show=false,merge2Show=false)" style="font-size: 24px"
                  data-sw-translate="">
                2. Adjustment</h5>
            </div>
            <div class="flexCol2 flexCol22" :style="{height:listType === 2?'673px':0}" id="adj-div">
              <div class="flexCol3">
                <div id="adj-ori" @mouseleave="curTipIndex = null" @mouseenter="curTipIndex=33"
                     style="margin-bottom:40px;background-color: #ff0000;display: flex;justify-content: center;align-items: center; height: 405px;">
                  <div id="adj-cur" @mouseleave="curTipIndex = null" @mouseenter="curTipIndex=32"
                       style="background-color: #ff0000;width: 408px;height: 100%;"></div>
                </div>
                <div style="margin-top: 5px;" class="aajj" @mouseleave="curTipIndex = null"
                     @mouseenter="curTipIndex=34">
                  <div
                      style="margin-left: 13px;margin-bottom:7px;margin-top:10px;float:left;font-size: 20px;color:#232323"
                      data-sw-translate="">Hue
                  </div>
                  <div style="margin-right: 10px;float:right">
                    <input id="hue_ch" class="input"
                           style="opacity: 0;border:1px solid #c0c0c0;border-radius:5px;width: 50px;height: 10px;font-size: 10px;"/>
                  </div>
                </div>
                <div>
                  <input style=" width: 100%;" type="range" id="hue" value="0" min="0" max="360" step="1">

                </div>
                <div class="aajj" @mouseleave="curTipIndex = null" @mouseenter="curTipIndex=35">
                  <div
                      style="margin-left: 13px;margin-bottom:7px;margin-top:10px;float:left;font-size: 20px;color:#232323"
                      data-sw-translate="">
                    Saturation
                  </div>
                  <div style="margin-right: 10px;float:right"><input id="sat_ch" class="input"
                                                                     style="opacity: 0;border:1px solid #c0c0c0;border-radius:5px;width: 50px;height: 10px;font-size: 10px;"/>
                  </div>
                </div>
                <div><input style="width: 100%;" type="range" id="sat" value="0" min="0" max="100" step="1">
                </div>
                <div class="aajj" @mouseleave="curTipIndex = null" @mouseenter="curTipIndex=36">
                  <div
                      style="margin-left: 13px;margin-top:20px;margin-bottom:7px;float:left;font-size: 20px;color:#232323"
                      data-sw-translate="">
                    Brightness
                  </div>
                  <div style="margin-right: 10px;float:right">
                    <input id="bri_ch" class="input"
                           style="opacity: 0;border:1px solid #c0c0c0;border-radius:5px;width: 50px;height: 10px;font-size: 10px;"/>
                  </div>
                </div>
                <div><input style="width: 100%;" type="range" id="bri" value="0" min="0" max="100" step="1">
                </div>
              </div>
            </div>
            <div class="flexCol2" id="confirm-div" v-show="listType === 3">
              <div class="flexCol3">
                <div id="confirm-col" @mouseleave="curTipIndex = null" @mouseenter="curTipIndex=37"
                     style="background-color: #ff0000;text-align: center; height: 224px;"></div>
                <div class="form-box-1" v-show="setpShowType ===1">
                  <el-form :model="formData" :rules="rules" ref="formRef1">
                    <el-form-item prop="name">
                      <el-input v-model="formData.name" class="ddd"
                                @mouseenter="curTipIndex=38" @mouseleave="curTipIndex=null"
                                placeholder="Enter a name"
                                autocomplete="off"
                                data-sw-translate=""/>
                    </el-form-item>
                    <el-form-item prop="email">
                      <el-input v-model="formData.email" class="ddd"
                                @mouseenter="curTipIndex=39" @mouseleave="curTipIndex=null"
                                placeholder="E-mail address"
                                data-sw-translate=""/>
                    </el-form-item>
                  </el-form>
                  <div class="radio-box" @mouseleave="curTipIndex = null" @mouseenter="curTipIndex=40">
                    <bg-radio v-model="radioSelect"/>

                    <div style="font-size: 18px;text-align: left;">
                      <span data-sw-translate="" style="font-size: 18px">Please read the Users Agreement</span>
                      "<span id="private" class="title" style="font-weight: bold;cursor: pointer;"
                             data-sw-translate="">Users Agreement & Privacy Policy</span>"
                      <span data-sw-translate="">before completing registration. By checking this, you agree to its contents.</span>
                    </div>
                  </div>
                  <div class="radio-box" @mouseleave="curTipIndex = null" @mouseenter="curTipIndex= 41"
                       style="margin-bottom: 100px">
                    <bg-radio v-model="radioSelect"/>
                    <div style="font-size: 18px;text-align: left;height: 25px" v-if="langCom == 1">Please carefully
                      check whether
                      your emoll oddress is ooourate, an irwalid emal addresswil not help you register er retrieve your
                      password. After you confirm the infermationclick "Next" and complete the following operations.
                    </div>

                    <div style="font-size: 18px;text-align: left;height: 25px" v-else>
                      请仔细核对您的邮箱地址是否准确无误，正确的邮箱地址是保证您账号安全的重要保障；无效的邮箱地址将无法帮助您完成注册或找回密码。当您确认信息无误后点击“下一步”并完成后续操作。
                    </div>
                  </div>
                  <div class="btn-box" @mouseleave="curTipIndex = null" @mouseenter="curTipIndex= radioSelect?43:42">
                    <span :class="[radioSelect?'sel':'']" data-sw-translate="" @click="onSubmit1">下一步</span>
                  </div>
                </div>
                <div class="form-box-1 form-box-2" v-show="setpShowType !==1">
                  <el-form :model="formData" label-width="140px" label-position="left" ref="formRef" :rules="rules">
                    <el-form-item prop="userCode">
                      <template #label>
                        <div>
                          <span data-sw-translate="" style="font-size: 18px;color:#232323">Your account</span>
                          <div class="forgot-box2" @click.stop="copy" @mouseleave="curTipIndex = null"
                               @mouseenter="curTipIndex=45">
                            <span data-sw-translate="" style="font-size: 18px;color:#232323">拷贝</span>
                          </div>
                        </div>
                      </template>
                      <el-input class="aaa title" v-model="formData.userCode" disabled
                                @mouseenter="curTipIndex=44" @mouseleave="curTipIndex=null"/>
                    </el-form-item>
                    <el-form-item prop="password">
                      <template #label>
                        <div>
                          <span data-sw-translate="" style="font-size: 18px;color:#232323">Six digits +</span>
                          <div class="forgot-box1" @click.stop="sendCode" @mouseleave="curTipIndex = null"
                               @mouseenter="curTipIndex=48">
                            <span data-sw-translate="" style="font-size: 18px;color:#232323">重新发送</span>
                          </div>
                        </div>
                      </template>
                      <el-input v-model="formData.password"
                                @mouseenter="curTipIndex=46" @mouseleave="curTipIndex=null"
                                data-sw-translate="" type="password"
                                show-password
                                placeholder="请设置一个密码"/>
                    </el-form-item>
                    <el-form-item label="" prop="vcode">
                      <el-input v-model="formData.vcode"
                                @mouseenter="curTipIndex=47" @mouseleave="curTipIndex=null"
                                data-sw-translate=""
                                placeholder="请输入验证码"/>
                    </el-form-item>
                  </el-form>
                  <div class="radio-box" @mouseleave="curTipIndex = null" @mouseenter="curTipIndex=49">
                    <bg-radio v-model="radioSelect2"/>
                    <div class="radio-box-label" data-sw-translate="" style="font-size: 18px;color:#232323">
                      勾选此项目允许浏览器记录您的账号
                    </div>
                  </div>
                  <div class="radio-box">
                    <div class="radio-box-label sel" data-sw-translate=""
                         style="margin-left:40px;font-size: 18px;color:#232323">
                      请注意您的信息安全，小心保管您的账号和密码等信息，切勿将其泄露给陌生人。
                    </div>
                  </div>
                  <div class="btn-box" @mouseleave="curTipIndex = null" @mouseenter="curTipIndex=50">
                    <span :class="['sel']" @click="register" data-sw-translate="">确认</span>
                  </div>
                </div>
              </div>
            </div>
            <div style="display: flex;align-items: center;position: relative">
              <div id="confirm-circle"
                   style="border-radius: 50%;background-color: #ffffff;width: 37px;height: 37px;margin-left: -45px;margin-top: 16px;">
              </div>
              <div v-if="merge2Show" class="merge2"
                   style="background-color: #ffffff;width: 37px;height: 50px;position: absolute;"></div>

              <div style="margin-left: 10px;"></div>
              <h5 id="confirm-tab" @mouseleave="curTipIndex = null" @mouseenter="curTipIndex = 22"
                  class="highlights2 title" index="2"
                  @click="(listType = 3,merge1Show=true,merge2Show=false)" style="font-size: 24px"
                  data-sw-translate="">
                3. Statement&Confirmation
              </h5>
            </div>
          </div>
        </div>
        <div id="center-show" class="flexCol"
             style="text-align: center;font-size: xx-large;font-weight: bold;margin-top: 20px;display: none;"></div>
      </div>
      <div class="picker" id="color-picker" style="display: none;">请选择颜色</div>
      <input class="file-upload" type="file" accept="image/*" name="picture" style="display: none;"/>

      <div class="togglelang-box" ref="householdDiv">
        <div class="togglelang-box-top">
          <span @click.self="toggleLang" data-sw-translate="">切换成中文</span>
        </div>
        <ul>
          <li @click="helpShow=true" data-sw-translate="">Help</li>
          <li @click="richTextShow = true" data-sw-translate="">Contact</li>
        </ul>
      </div>
    </div>
    <HorseRaceLamp class="tip-info" :text="getTipInfo(curTipIndex,langCom)"/>
    <div class="filter-wrap"></div>
  </div>
  <Help v-show="helpShow" @close="helpShow=false" @toggleLang="toggleLang"></Help>
  <!--  <RichText v-if="richTextShow" @close="richTextShow=false"></RichText>-->
  <Feedback v-show="richTextShow" @togglelang="toggleLang" @close="richTextShow=false"
            @setTipIndex="(v)=> curTipIndex = v"/>
  <!--  <Private v-if="privateShow" @close="privateShow=false"></Private>-->
  <img ref="mapImgRef" :src="sctt" width="1125" height="633" style="position: fixed;top:0;left:-1125px;z-index: 9999"/>
</template>

<script setup>
import "@/utils/colorpicker.js"
import {onMounted, toRefs, reactive, ref, computed, nextTick, watch} from "vue";
import $ from 'jquery'
import {useRouter} from 'vue-router';
import moment from "moment";
import {useUserStore} from "@/store/modules/user";
import {ElMessage} from "element-plus";
import {getVcode, getUserCode, getNameccc} from "@/api/login";
import sctt from '@/assets/img/sctt.png'
// 组件
import Help from '@/components/Help.vue';
import RichText from '@/components/RichText.vue';
import Private from '@/components/Private.vue';
import HorseRaceLamp from "@/components/horseRaceLamp.vue"
import Feedback from "@/components/feedback.vue"
import BgRadio from "@/components/bgRadio.vue"
import {getTipInfo} from "@/utils/zh-cn.js"

const containerDiv = ref(null)
const householdDiv = ref(null)
const langCom = ref(null)
const videoBoxRef = ref(null)
const mapImgRef = ref(null)
const router = useRouter();
const userStore = useUserStore();
const formRef1 = ref(null)

const model = reactive({
  helpShow: false,
  richTextShow: false,
  privateShow: false,
  formData: {},
  radioSelect2: false,
  radioSelect: false,
  setpShowType: 1,
  editType: 1,// 1 色相立方体\2 取色版\3 滴管工具\4 数字
  linkValue: '',
  listType: 1,// 1取色 2校色 3声明&确认
  videoBoxColor: '#1b1c1f',
  curTipIndex: 14,
  merge1Show: false,
  merge2Show: false,

})
const {
  merge1Show, merge2Show,
  helpShow,
  richTextShow,
  privateShow,
  formData,
  radioSelect,
  radioSelect2,
  setpShowType,
  editType,
  linkValue,
  listType,
  videoBoxColor,
  curTipIndex
} = toRefs(model)


// ship
import cj from "@/assets/video/cj.mp4"
import cls from "@/assets/video/cls.mp4"
import dg from "@/assets/video/dg.mp4"
import gd from "@/assets/video/gd.mp4"
import gsr from "@/assets/video/gsr.mp4"
import pbu from "@/assets/video/pbu.mp4"
import wdn from "@/assets/video/wdn.mp4"
import ywqz from "@/assets/video/ywqz.mp4"
import videojs from "video.js";
import "video.js/dist/video-js.css";

watch(() => model.editType, () => {
  if (model.editType === 5) {
    nextTick(() => {
      const list = [cj, cls, dg, gd, gsr, pbu, wdn, ywqz]
      let curr = 0
      let myVid = videojs('e_video', {}, function onPlayerReady() {
        this.play();
        this.on('ended', function () {
          videojs.log('Awww...over so soon?!');
          if (curr >= list.length) {
            curr = 0; //重新循环播放
          }
          myVid.src(list[curr]);
          myVid.load();
          // console.log("curr1: " + curr);
          curr++;
          // console.log("curr2: " + curr);
        });
      })
      curr++;
    })
  }
})

// 取色板颜色
const palette = ["#fff799", "#f2e39a", "#f6d400", "#f2ec65", "#eae955", "#d0db00", "#c9c832", "#c2ba8a", "#afa66f", "#a89223", "#8f7f1c", "#ccfe29", "#cde777", "#8eb61a", "#8e9216", "#706e2c", "#8eda4d", "#cce198", "#acd598", "#85c159", "#6cb042", "#659b40", "#5b8839", "#567638", "#a3e1c1", "#8ad9b0", "#89c997", "#57c68d", "#2dad69", "#44af52", "#307a51", "#316646", "#2a4935", "#a1dfd2", "#81d5c5", "#57c6b1", "#23b099", "#00ac84", "#2c9481", "#267a6a", "#2d4f46", "#8ccdc8", "#50b1a8", "#008671", "#2a4f48", "#c7e7e5", "#7ecdd4", "#0099a4", "#0e7379", "#173447", "#94d3e2", "#7ecef4", "#88abda", "#567dd7", "#3473cb", "#304fb8", "#001ea3", "#002891", "#0d2b61", "#8c97cb", "#525cc0", "#b3b4da", "#9091cb", "#7577bc", "#615ac0", "#836bcc", "#d7cee7", "#42119c", "#6432a1", "#c089c5", "#aa89bd", "#967e97", "#7b5f7d", "#c85bba", "#ba31ac", "#7b28ae", "#602b78", "#562a65", "#4b2c4f", "#9d37b6", "#c02996", "#ff3eb5", "#be4a7c", "#c01549", "#ffe4e7", "#ffb4ca", "#f19ec2", "#e7808b", "#ff7276", "#eeb5ad", "#f29c9f", "#b5848d", "#c28294", "#764d55", "#cc2d3b", "#ca2c3b", "#8f1f33", "#ff002a", "#d6423d", "#843528", "#facd89", "#f6b37f", "#f29b76", "#ea8e71", "#eca018", "#e9874e", "#ff6200", "#e05800", "#d19a6e", "#6c4b3d", "#232323", "#6f6f6f", "#b2b2b2", "#f1f1f1"]
let colorHex = localStorage.getItem("color");
let confirmed = false;
let userid = 0;
let username = "";
let showed = false;


const isDragging = ref(true)
const doMouseFn = () => {
  // let offsetX, offsetY;
  // 水平方向最大偏移量
  const MaxOffsetWidth = Math.abs(containerDiv.value.getBoundingClientRect().width - householdDiv.value.getBoundingClientRect().width - 3);
  // 竖直方向最大偏移量
  const MaxOffsetHeight = Math.abs(containerDiv.value.getBoundingClientRect().height - householdDiv.value.getBoundingClientRect().height - 14);
  // 屏幕
  const bodyW = document.querySelector('body').getBoundingClientRect().width
  const tipL = (bodyW - 832) / 2 - 210
  const tipR = (bodyW - 832) / 2 + 832
  householdDiv.value.addEventListener('click', (event) => {
    // const path = event.path?.map(dom => dom.className) || (event.composedPath && event.composedPath())?.map(dom => dom.className) || [];
    // if (path.indexOf('content_box') !== -1) return

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
const forgotten = () => {
  if (!/像素点.cn/.test(model.linkValue)) {
    const str = localStorage.getItem('lang') == 0 ? "请输入正确的网站" : "Please enter the correct website";
    ElMessage.warning(str)
    model.linkValue = ''
    return
  }
  const params = {
    color: model.linkValue.split("/").pop()
  }
  getNameccc(params).then(res => {
    model.formData.name = res.data
    colorHex = `#${model.linkValue.split("/").pop()}`
    model.videoBoxColor = `#${model.linkValue}`
    $("#adj-ori").css("background-color", colorHex);
    $("#adj-cur").css("background-color", colorHex);
    $("#confirm-col").css("background-color", colorHex);
  })
}

const register = () => {
  model.radioSelect2 && localStorage.setItem('awave-info', JSON.stringify({
    date: +new Date(),
    userCode: model.formData.userCode
  }))
  confirmed = true;
  localStorage.setItem("color", colorHex);
  localStorage.setItem("username", model.formData.name);
  const pos = getColorBandValue(colorHex)
  // console.log(pos, 'Postion')
  const params = {
    color: colorHex, ...model.formData, position: JSON.stringify(pos)
  }
  userStore.register(params).then(res => {
    if (res.success) {
      const str = localStorage.getItem('lang') == 0 ? "注册成功" : "Registered successfully";
      ElMessage.success(str)
      const params1 = {
        userCode: model.formData.userCode,
        password: model.formData.password
      }
      userStore.login(params1).then(res => {
        if (res.success) {
          localStorage.setItem('userCode', model.formData.userCode)
          ElMessage.success(localStorage.getItem('lang') == 0 ? '登录成功' : "Login successful")
          router.push('/home')
        } else {
          ElMessage.error(localStorage.getItem('lang') == 0 ? '用户和密码错误' : "The user and password are incorrect")
        }
      })

    } else {
      const str = localStorage.getItem('lang') == 0 ? res.msg : "Verification code error";
      ElMessage.error(str)
    }
  })
}

const onSubmit1 = () => {
  if (!model.radioSelect) return
  formRef1.value.validate(valid => {
    if (valid) {
      nextTick(() => {
        toggleLang()
        toggleLang()
      })
      getUserCode().then(res => {
        model.formData.userCode = res.data
      })
      const params = {
        email: model.formData.email
      }
      getVcode(params).then(res => {
        if (res.success) {
          model.setpShowType = 2
          model.formData.vid = res.data.vid
          const str = localStorage.getItem('lang') == 0 ? "已发送至您邮箱" : "It has been sent to your email";
          ElMessage.success(str)
        } else {
          const str = localStorage.getItem('lang') == 0 ? "请填写正确的邮箱" : "Please fill in the correct email address";
          ElMessage.error(str)
        }
      })
    }
  })
}

const sendCode = () => {
  const params = {
    email: model.formData.email
  }
  getVcode(params).then(res => {
    if (res.success) {
      model.formData.vid = res.data.vid
      const str = localStorage.getItem('lang') == 0 ? "已发送至您邮箱" : "It has been sent to your email";
      ElMessage.success(str)
    } else {
      const str = localStorage.getItem('lang') == 0 ? "请填写正确的邮箱" : "Please fill in the correct email address";
      ElMessage.error(str)
    }
  })
}

const copy = () => {
  let inputDom = document.createElement('input');  // 创建一个input元素
  inputDom.setAttribute('readonly', 'readonly'); // 防止手机上弹出软键盘
  inputDom.value = model.formData.userCode; // 给input元素赋值
  document.body.appendChild(inputDom); // 添加到body
  inputDom.select(); //选中input元素的内容
  document.execCommand('Copy'); // 执行浏览器复制命令
  inputDom.style.display = 'none';
  inputDom.remove(); // 移除input元素
  const str = localStorage.getItem('lang') == 0 ? "拷贝成功" : "Copy successfully";
  ElMessage.success(str)
}

const getColorBandValue = (color) => {
  const image = mapImgRef.value;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const targetColor = hexToRGB(color) //[red, green, blue, alpha]
  // 设置canvas的宽度和高度与图片一致
  canvas.width = image.width;
  canvas.height = image.height;

  // 将图片绘制到canvas上
  context.drawImage(image, 0, 0, image.width, image.height);

  // 获取每个像素的颜色
  let referenceValue = 9999999999, curObj

  for (let y = 0; y < Math.ceil(image.height / 10); y++) {
    for (let x = 0; x < Math.ceil(image.width / 10); x++) {
      const pixelData = context.getImageData(x * 10, y * 10, 10, 10).data;
      const red = pixelData[0];
      const green = pixelData[1];
      const blue = pixelData[2];
      const alpha = pixelData[3];
      const temp = {pos: [x, y], colors: [red, green, blue, alpha]}
      // 采用 欧几里德定理获取最相近的值
      const value = Math.sqrt(
          Math.pow(targetColor[0] - pixelData[0], 2) +
          Math.pow(targetColor[1] - pixelData[1], 2) +
          Math.pow(targetColor[2] - pixelData[2], 2) +
          Math.pow(targetColor[3] - pixelData[3], 2)
      );
      if (referenceValue >= value) {
        referenceValue = value;
        curObj = temp;
      }
    }
  }
  // console.log([curObj.pos[0] * 10 * 100 / image.width + '%', curObj.pos[1] * 10 * 100 / image.height + '%'])
  return [curObj.pos[0] * 10 * 100 / image.width + '%', curObj.pos[1] * 10 * 100 / image.height + '%']
};

const rules = {
  name: [{required: true, trigger: "blur", message: ""}],
  email: [{required: true, trigger: "blur", message: ""}],
  password: [
    {required: true, trigger: "blur", message: ""},
    {
      pattern: /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])\S*$/,
      required: true,
      message: "",
      trigger: "blur"
    },
  ],

}
import {useState} from "@/store/modules/home";
const STATE = useState();
const toggleLang = () => {
  // console.log(11112222)
  const lang = window.localStorage.getItem("lang")
  window.localStorage.setItem("lang", lang == 1 ? 0 : 1);
  langCom.value = window.localStorage.getItem("lang")
  window.SwaggerTranslator.translate()
  STATE.initLang()
}

const hexToRGB = hex => {
  let alpha = false,
      h = hex.slice(hex.startsWith('#') ? 1 : 0);
  if (h.length === 3) h = [...h].map(x => x + x).join('');
  else if (h.length === 8) alpha = true;
  h = parseInt(h, 16);
  return JSON.parse(
      '[' +
      (h >>> (alpha ? 24 : 16)) +
      ',' +
      ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
      ',' +
      ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
      (alpha ? `, ${h & 0x000000ff}` : ',255') +
      ']'
  );
};

onMounted(() => {
  if (typeof (colorHex) == "undefined" || colorHex == null || colorHex == "") {
    colorHex = "";
  }
  nextTick(() => {
    doMouseFn()
    if (localStorage.getItem('lang') == 1) {
      toggleLang()
    } else {
      toggleLang()
      toggleLang()
    }
  })
  window.addEventListener('resize', () => {
    doMouseFn()
  })
  langCom.value = window.localStorage.getItem("lang")
  setTimeout(() => {
    model.editType = 2
  }, 500)
  var lang = window.localStorage.getItem("lang") == "1" ? true : false
  window.localStorage.setItem("lang", lang ? "1" : "0")
  var cp = Colorpicker.create({
    el: "color-picker", //元素id
    color: "#000", //默认颜色
    change: function (elem, hex) {
      // console.log(elem, hex, 2222)
      //选中颜色发生改变时事件
      elem.style.backgroundColor = hex;
      colorHex = hex;
    }
  });

  var div = document.getElementById("color-div");
  cp.elem_barPicker1 = div.getElementsByClassName("colorBar-color-picker")[0];
  cp.elem_colorPancel = div.getElementsByClassName("color-pancel")[0];
  cp.elem_picker = div.getElementsByClassName("pickerBtn")[0];

  cp.pancel_width = cp.elem_colorPancel.offsetWidth;
  cp.pancel_height = cp.elem_colorPancel.offsetHeight;

  cp.bindMove(cp.elem_colorPancel, cp.setPosition, true);
  cp.bindMove(cp.elem_barPicker1.parentNode, cp.setBar, false);

  $(function () {

    $("h5").click(function () {
      var i = $(this).attr('index')
      $("h5").each(function (index, item) {
        if (index == i) {
          $(item).addClass("active");
        } else {
          $(item).removeClass("active");
        }
      });
    });
    onResize();//缩放
    //拾取颜色
    if ('EyeDropper' in window) {
      // console.log('取色器可以使用');
      const eyeDropper = new EyeDropper();
      const btn = document.getElementById('quse');
      btn.addEventListener('click', async () => {
        try {
          const result = await eyeDropper.open();
          // console.log(result);
          colorHex = result.sRGBHex;
          // document.querySelector('#color').innerHTML = result.sRGBHex;
        } catch (e) {
          // console.log('用户取消了取色');
        }
      });
    }
    /*
    * 点击图片，上传新图片
    * */
    var scale = 1;
    $("#picture").click(function () {
      $("#picture")[0].innerText = ''
      scale = 1;
      // 点击图片的同时，点击上传文件的input
      $('.file-upload').click();
      // 将上传的图片显示到页面上
      $(document).on("change", ".file-upload", function () {
        var fileObj = $(".file-upload")[0];
        var img = document.getElementById('picture'); //获得用户上传的图片节点
        var reader = new FileReader();
        // 转换成功后的操作，img.src即为转换后的DataURL
        reader.onload = function (e) {
          if (reader.readyState === 2) { //加载完毕后赋值
            img.style.backgroundImage = "url(" + e.target.result + ")";
            img.style.backgroundSize = "contain";
            // console.log(e.target.result);
          }
        }
        if (fileObj.files[0]) {
          reader.readAsDataURL(fileObj.files[0]);
        }
      });
    });

    //图片缩放
    $("#zoomin").click(function () {
      scale -= 0.1;
      document.getElementById('picture').style.transform = "scale(" + scale + ")";
    });
    $("#zoomout").click(function () {
      scale += 0.1;
      document.getElementById('picture').style.transform = "scale(" + scale + ")";
    });
    //颜色输入
    $("#num-tab").click(function () {
      colorChanged();
    });
    $("#hex_val").on('blur', function () {
      var reg = /^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
      var color = $(this).val();
      if (reg.test(color)) {
        colorHex = "#" + color;
        colorChanged();
      } else {
        $(this).val("");
      }
    });
    $("#h_val").on('blur', function () {
      colorBind_hsb(this, 360)
    });
    $("#s_val").on('blur', function () {
      colorBind_hsb(this, 100)
    });
    $("#br_val").on('blur', function () {
      colorBind_hsb(this, 100)
    });
    $("#r_val").on('blur', function () {
      colorBind_rgb(this, 255)
    });
    $("#g_val").on('blur', function () {
      colorBind_rgb(this, 255)
    });
    $("#b_val").on('blur', function () {
      colorBind_rgb(this, 255)
    });
    //颜色调整
    var oldColor = cp.hexToHsb(colorHex);
    $("#adjustment").click(function () {
      $("#adj-ori").css("background-color", colorHex);
      $("#adj-cur").css("background-color", colorHex);
      var colorHsb = cp.hexToHsb(colorHex);
      $("#hue").val(colorHsb.h);
      $("#sat").val(colorHsb.s);
      $("#bri").val(colorHsb.b);
      oldColor = cp.hexToHsb(colorHex);
      $("#merge").offset({top: 0, left: 0});
      $("#merge").hide();
    });
    $("#hue").on('change', function () {
      var colorHsb = cp.hexToHsb(colorHex);
      colorHsb.h = $(this).val();
      var ch = parseInt(colorHsb.h - oldColor.h);
      ch = ch > 0 ? "+" + ch : ch;
      colorHex = "#" + cp.hsbToHex(colorHsb);
      $("#hue_ch").val(ch);
      $("#adj-cur").css("background-color", colorHex);
    });
    $("#sat").on('change', function () {
      var colorHsb = cp.hexToHsb(colorHex);
      colorHsb.s = $(this).val();
      var ch = parseInt(colorHsb.s - oldColor.s);
      ch = ch > 0 ? "+" + ch : ch;
      colorHex = "#" + cp.hsbToHex(colorHsb);
      $("#sat_ch").val(ch);
      $("#adj-cur").css("background-color", colorHex);
    });
    $("#bri").on('change', function () {
      var colorHsb = cp.hexToHsb(colorHex);
      colorHsb.b = $(this).val();
      var ch = parseInt(colorHsb.b - oldColor.b);
      ch = ch > 0 ? "+" + ch : ch;
      colorHex = "#" + cp.hsbToHex(colorHsb);
      $("#bri_ch").val(ch);
      $("#adj-cur").css("background-color", colorHex);
    });
    //颜色确认
    $("#confirm-tab").click(function () {
      $("#confirm-col").css("background-color", colorHex);
      var offset = $("#palette-circle").offset();
      // $("#merge").offset({top: offset.top + 12 + 10, left: offset.left});
      // $("#merge").show();
    });
    //取色
    $("#palette-tab").click(function () {
      var offset = $("#confirm-circle").offset();
      // $("#merge").offset({top: offset.top - 27 - 4, left: offset.left});
      // $("#merge").show();
    });
    //选择框 确认按钮
    $("#statement-cb").change(function () {
      if ($(this).is(':checked')) {
        $("#confirm-btn").show();
      } else {
        $("#confirm-btn").hide();
      }
    });
  });


  function onResize() {
    //计算y坐标
    var actualTop = cp.elem_colorPancel.offsetTop;
    var actualLeft = cp.elem_colorPancel.offsetLeft;
    var current = cp.elem_colorPancel.offsetParent;
    while (current !== null) {
      actualTop += (current.offsetTop + current.clientTop);
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }
    cp.pancelLeft = actualLeft;
    cp.pancelTop = actualTop;
    if ($("#palette-tab").hasClass("active")) {
      var offset = $("#confirm-circle").offset();
      // $("#merge").offset({top: offset.top - 27 - 4 + 124, left: offset.left});
      // $("#merge").show();
    } else if ($("#confirm-tab").hasClass("active")) {
      var offset = $("#palette-circle").offset();
      // $("#merge").offset({top: offset.top + 12 + 20, left: offset.left});
      // $("#merge").show();
    }
  }


  function colorBind_rgb(item, max) {
    if (checkNum($(item).val(), max)) {
      if ($("#r_val").val() != "" && $("#g_val").val() != "" && $("#b_val").val() != "") {
        var rgb = {r: parseInt($("#r_val").val()), g: parseInt($("#g_val").val()), b: parseInt($("#b_val").val())};
        colorHex = "#" + cp.rgbToHex(rgb);
        colorChanged();
      }
    } else {
      $(item).val("");
    }
  }

  function colorBind_hsb(item, max) {
    if (checkNum($(item).val(), max)) {
      if ($("#h_val").val() != "" && $("#s_val").val() != "" && $("#br_val").val() != "") {
        var hsb = {h: parseInt($("#h_val").val()), s: parseInt($("#s_val").val()), b: parseInt($("#br_val").val())};
        colorHex = "#" + cp.hsbToHex(hsb);
        colorChanged();
      }
    } else {
      $(item).val("");
    }
  }

  function colorChanged() {
    $("#num-col").css("background-color", colorHex);
    var hsb = cp.hexToHsb(colorHex);
    var rgb = cp.hexToRgb(colorHex);
    $("#hex_val").val(colorHex.replace("#", ""));
    $("#h_val").val(hsb.h);
    $("#s_val").val(hsb.s);
    $("#br_val").val(hsb.b);
    $("#r_val").val(rgb.r);
    $("#g_val").val(rgb.g);
    $("#b_val").val(rgb.b);
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.target.blur(); // 当按下enter时，手动触发blur事件
    }
  };

  String.prototype.colorHex = function () {
    // RGB颜色值的正则
    var reg = /^(rgb|RGB)/;
    var color = this;
    if (reg.test(color)) {
      var strHex = "#";
      // 把RGB的3个数值变成数组
      var colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      // 转成16进制
      for (var i = 0; i < colorArr.length; i++) {
        var hex = Number(colorArr[i]).toString(16);
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      return strHex;
    } else {
      return String(color);
    }
  };

  function checkNum(num, max) {
    if (num && isInteger(num) && num >= 0 && num <= max) {
      return true;
    }
    return false;
  }

  function isInteger(obj) {
    return obj % 1 === 0
  }

  window.addEventListener('resize', onResize);

//获取MAP中元素属性

  var findColor = (img) => {
    const w = img.width;
    const h = img.height;
    // 创建画布
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    // 绘制图片在画布上
    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    let imageData = context.getImageData(0, 0, w, h).data;
    for (var i = 0; i < h; i++) {
      for (var j = 0; j < w; j++) {
        var idx = i * w + j;
        var rgb = {r: imageData[4 * idx], g: imageData[4 * idx + 1], b: imageData[4 * idx + 2]};
        var hsb = cp.rgbToHsb(rgb);
        var colorHsb = cp.hexToHsb(colorHex);
        if (Math.abs(colorHsb.h - hsb.h) <= 5 && Math.abs(colorHsb.s - hsb.s) <= 5) {
          // alert("找到了！");
          const offset = {x: j, y: i};
          $.ajax({
            type: "post",
            url: "/user/update",
            dataType: "json",
            data: {"userid": userid, "coord": offset.x + ":" + offset.y},
            success: function (data, textStatus) {

              if (data.code == 200) {
              }
            },
            error: function () {
              //请求出错处理 
            }
          });
          return;
        }
      }
    }
  }
})

function selectColor(e) {
  const item = e.target
  $(item).addClass("selected").siblings().removeClass("selected");
  colorHex = $(item).css("background-color").colorHex();
}


const getSel = (color) => {
  return colorHex === color
}
</script>

<style lang="scss" scoped>
@import "@/styles/login.css";
@import "@/styles/font.css";

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
    }
  }

}

:deep(.el-input__inner) {
  height: 50px;
  text-align: center;
  font-size: 24px;
  font-weight: 10;
  user-select: none;
  background: #fafafa;

  &::placeholder {
    color: #232323;
    text-align: center;
  }
}

:deep(.el-form-item__label) {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 19px;
  font-weight: 10;
  user-select: none;

  &::placeholder {
    color: #0a0a0a;
    text-align: center;
  }
}

.flexCol3 {
  .form-box-1 {
    width: 616px;
    max-height: 450px;
    margin-top: 70px;
    margin-left: 108px;
    margin-bottom: 20px;

    &.form-box-2 {
      min-height: 350px;
    }

    .btn-box {
      margin-top: 20px;
      text-align: center;

      span {
        color: #cbcbcb;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;

        &.sel {
          color: #232323;
          padding-bottom: 1px;
          border-bottom: 1px solid;
        }
      }
    }
  }
}


.login-wrap {
  position: relative;
  height: 100%;

  .togglelang-box {
    position: absolute;
    top: 50px;
    right: 50px;
    width: 200px;
    height: 180px;

    .togglelang-box-top {
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      font-weight: 1;
      font-size: 22px;
      background: #0a0a0a;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      text-align: center;
      background: #fff;

      li {
        height: 50px;
        line-height: 50px;
        font-size: 22px;
        font-weight: normal;
        cursor: default;
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
  background-color: rgba(203, 203, 203, .7);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}

.radio-box {
  margin-top: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  font-weight: 1;

  .input {
    width: 15px;
    height: 15px;
    align-self: flex-start;
  }

  .radio-box-label {
    position: relative;
    top: -2px;
    width: 100%;
    margin-left: 10px;
    color: #666;
    font-size: 13px;
    text-align: left;

    &.sel {
      margin-left: 35px;
    }
  }
}

.forgot-box1 {
  position: absolute;
  left: 600px;
  top: 70px;
  width: 200px;
  height: 50px;
  cursor: pointer;

  span {
    padding-bottom: 1px;
    border-bottom: 1px solid;
  }
}

.forgot-box2 {
  width:200px;
  height:50px;
  position: absolute;
  left: 600px;
  top: 0px;
  cursor: pointer;

  span {
    padding-bottom: 1px;
    border-bottom: 1px solid;
  }
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
  font-size: 14px;
  color: #888;
  z-index: 999;
  box-sizing: border-box;
  background: #131111;
}

.tip-div {
  margin-bottom: 35px;

  > div {
    cursor: pointer;
  }
}

.pixel-div {
  .video-box {
    width: 100%;
    height: 326px;
    background: #1b1c1f;
  }

  .input-box {
    position: relative;

    .forgot-box {
      position: absolute;
      right: 64px;
      bottom: 10px;
      cursor: pointer;

      &:hover {
        .forgot-box-tip {
          display: block;
        }
      }

      span {
        padding-bottom: 1px;
        border-bottom: 1px solid;
        color: #555;
      }

      .forgot-box-tip {
        display: none;
        position: fixed;
        left: 1320px;
        top: 550px;
        padding: 15px;
        width: 547px;
        height: 300px;
        box-sizing: border-box;
        background: #0a0a0a;

        .tit {
          display: inline-block;
          color: #fafafa;
          font-size: 18px;
          border: 0;
          margin-bottom: 10px;
        }

        .img-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          width: 100%;
          padding: 7px;
          border: 1px solid #fafafa;

          img {
            display: block;
            width: 514px;
          }
        }
      }
    }
  }

  .tit-box {
    display: flex;
    justify-content: center;
    margin: 30px 0 40px 0;
    font-size: 25px;
    font-width: bold;
  }

  .info-box {
    padding: 0 90px;
    box-sizing: border-box;
    font-weight: 1;
  }
}

.content_box {
  /*滚动条样式*/
  *::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 16px;
    background: #7a7a7a;
    /*高宽分别对应横 竖滚动条的尺寸*/
    /* height: $scrollbarWidth; */
    height: 0;
  }

  *::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #fff;
    border: 1px solid;
    border-radius: 0;
    /*rgba(32, 127, 255, 0.7);*/
  }

  *::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 0;
    border: 1px solid #232323;
    //border-right: 1px solid #232323;
    //background: transparent;
  }
}


.color-palette {

  .colorblock {
    position: relative;
    width: 106px;
    height: 137px;
    box-sizing: border-box;
    margin: 0;
    margin-bottom: 28px;

    &:hover {
      border: 2px solid #232323;
    }

    &.select {
      border: 2px solid #232323;
    }

    span {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 31px;
      line-height: 31px;
      background: #0a0a0a;
      color: #fff;
      text-align: center;
    }
  }
}


:deep(.el-input__wrapper) {
  box-shadow: none;
  user-select: none;
  background: #fafafa;

  .el-input__inner {
    height: 50px;
    text-align: center;
    font-size: 24px !important;
    font-weight: 10;
    user-select: none;
    background: #fafafa;

    &::placeholder {
      color: #232323;
      text-align: center;
      font-weight: 1;
    }
  }

}

.forgot-box3 {
  position: absolute;
  top: 0;
  left: 315px;
  width: 150px;
  height: 50px;
  cursor: pointer;

  &:hover {
    .forgot-box-tip {
      display: block;
    }
  }

  span {
    padding-bottom: 1px;
    border-bottom: 1px solid;
    color: #555;
  }
}

.rect3-wrap {
  padding: 0 20px;
  font-size: 14px;
  margin-top: 20px;
}

:deep(.vjs-control-bar) {
  display: none;
}

:deep(.aaa) {
  .el-input__wrapper{
    box-shadow:none !important;
    .el-input__inner{
      font-size: 48px !important;
      color: #232323 !important;
      background: #fafafa !important;
      -webkit-text-fill-color: #232323 !important;
    }
  }

}

:deep(.ccc) {
  .el-input__inner {
    font-size: 24px !important;
    color: #232323;
    background: #fafafa;

    &::placeholder {
      //color: red;
    }
  }
}

:deep(.ddd) {
  .el-input__inner {
    font-size: 24px !important;
    color: #232323;
    background: #fafafa;

    &::placeholder {
      //color: red;
    }
  }
}

/* 用有-webkit-这样的属性，要在-webkit-前定义标准属性。如下面的-webkit-box-shadow和-webkit-appearance */
/* 轨道样式  下面的杠杠*/

/* 但是这里的-webkit-appearance和-webkit-box-shadow不需要在上一行定义标准属性，
   是因为::-webkit-slider-thumb是 type 为 range 的 input 标签内的一种伪类样式，用于设置
   滑块的具体样式。
   这里的标准属性就相当于是系统的内置属性了，吧。
*/
/* 滑块样式  圆形*/
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  cursor: default;
  position: relative;
  top: 2px;
  height: 26px; /*滑块大小*/
  width: 50px;
  transform: translateY(-2px); /*在y轴上数值微调  用来修改滑块和杆杆相对位置*/
  background: none repeat scroll 0 0 #232323; /*为什么要这样写？*/
  -webkit-box-shadow: 0 -1px 1px black inset;
}

@media (max-width: 479px) {
  .flexRow {
    width: 100%;
  }
}

@media (max-height: 1080px) {
  .highlights {
    margin: 100px auto 0 !important;
  }
}

@media (max-height: 1000px) {
  .highlights {
    margin: 0 auto 0 !important;
  }
  .flexCol3 .form-box-1 {
    margin-top: 20px !important;
  }
  .flexCol {
    margin-top: 10px;
  }
}

.flexCol22 {
  height: 0;
  overflow: hidden;
  transition: all .5s;
}

.merge1 {
  left: -45px;
  top: 35px;
}

.merge2 {
  left: -45px;
  top: -30px;
  height: 62px !important;
}

:deep(.form-box-2) {
  .el-form-item__label {
    position: relative;
    left: -65px;

    &:before {
      content: '' !important;
    }
  }

  .el-input {
    position: relative;
    left: -70px;
  }
}
</style>

<style lang="scss">
.vjs-control-text {
  display: none;
}
</style>