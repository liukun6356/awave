<script setup>
import { onMounted, reactive } from 'vue';
import { useState } from '@/store/modules/home';

const STATE = useState();

onMounted(() => {
    window.showPrivate = showPrivate;
})


const UI = reactive({
    show: false,
 
    activeIndex: 2,
    nowPage: 1
})

const modPage = (flag) => {
    if (flag) {
        UI.nowPage++;
        if (UI.nowPage > 22) {
            UI.nowPage = 22
        }
    } else {
        UI.nowPage--;
        if (UI.nowPage < 1) {
            UI.nowPage = 1
        }
    }
};

const close = () => {
    UI.show = false;
    window.top.hideIframe && window.top.hideIframe()
};


const showPrivate = (lang) => {
    UI.show = true;
    STATE.setLang(lang)
};

</script>
<template>
    <div id="private-view" v-if="UI.show">
        <div
            style="position: relative; background-color: white;width: 80%;height: 90%;border-radius: 10px;box-shadow: 0px 0px 16px #22222250;">
            <svg @click="close"
                style="pointer-events: auto; cursor: pointer;z-index: 100; position: absolute;top: 8px;left: 8px;width: 28px;height: 28px;"
                viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
                <path
                    d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z"
                    fill="#707070"></path>
            </svg>
            <div
                style="position: absolute; left: 30px;right: 30px;top: 60px;display: flex;align-items: center;justify-content:space-between;">
                <div style="display: flex;align-items: center;">
                    <div @click="UI.activeIndex = 0" :class="UI.activeIndex == 0 ? `btn active` : `btn`">{{ STATE.lang ? `合作伙伴`
                        :
                        `Acknowledgements` }}</div>
                    <div @click="UI.activeIndex = 1" :class="UI.activeIndex == 1 ? `btn active` : `btn`">{{ STATE.lang ? `声明文件`
                        :
                        `Statement` }}</div>
                    <svg @click="STATE.switchLang" style="" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" width="28" height="28">
                        <path
                            d="M863.288889 861.866667c22.755556 0 38.4-24.177778 29.866667-45.511111L743.822222 465.066667c-14.222222-34.133333-64-34.133333-78.222222 0L516.266667 816.355556c-8.533333 21.333333 7.111111 45.511111 29.866666 45.511111 12.8 0 25.6-8.533333 29.866667-19.911111l38.4-96.711112h179.2l38.4 96.711112c5.688889 11.377778 17.066667 19.911111 31.288889 19.911111zM637.155556 686.933333l66.844444-169.244444 66.844444 169.244444h-133.688888zM583.111111 291.555556h85.333333c15.644444 0 28.444444-12.8 28.444445-28.444445s-12.8-28.444444-28.444445-28.444444H440.888889v-44.088889c0-15.644444-12.8-28.444444-28.444445-28.444445s-28.444444 12.8-28.444444 28.444445v44.088889H156.444444c-15.644444 0-28.444444 12.8-28.444444 28.444444s12.8 28.444444 28.444444 28.444445h366.933334c-9.955556 32.711111-22.755556 64-38.4 95.288888-19.911111 38.4-45.511111 72.533333-73.955556 103.822223h-5.688889c-9.955556-11.377778-29.866667-31.288889-51.2-62.577778-8.533333-12.8-17.066667-25.6-24.177777-39.822222-5.688889-9.955556-14.222222-15.644444-25.6-15.644445-21.333333 0-35.555556 22.755556-25.6 42.666667 8.533333 15.644444 17.066667 31.288889 27.022222 45.511111 19.911111 29.866667 38.4 49.777778 52.622222 65.422222l8.533333 8.533334-157.866666 159.288888c-11.377778 11.377778-11.377778 28.444444 0 39.822223 11.377778 11.377778 28.444444 11.377778 39.822222 0l157.866667-157.866667c24.177778 25.6 51.2 52.622222 79.644444 79.644444 14.222222 14.222222 39.822222 8.533333 46.933333-9.955555 4.266667-9.955556 1.422222-22.755556-7.111111-31.288889-28.444444-27.022222-54.044444-54.044444-78.222222-79.644444 34.133333-36.977778 64-78.222222 88.177778-122.311112 19.911111-38.4 35.555556-78.222222 46.933333-120.888888z"
                            fill="#707070"></path>
                    </svg>
                </div>
                <div @click="UI.activeIndex = 2" style="margin-right: 0;"
                    :class="UI.activeIndex == 2 ? `btn active` : `btn`">
                    {{ STATE.lang ? `作品灵感` : `Inspirations` }}</div>
            </div>





            <h1 style="text-align: center;font-size: 1rem;">{{ STATE.lang ? "致谢 & 灵感" : "Acknowledgements & Inspirations"
            }}</h1>

            <div v-if="UI.activeIndex == 1"
                style="position: absolute;overflow-y: scroll; padding: 2rem; top: 120px;bottom: 30px;right: 30px;left: 30px;border-radius: 5px ;border:1px solid black;">


                <h2>{{ STATE.lang ? `用户协议 & 隐私条款` : `Users Agreement & Privacy Policy` }}</h2>
                <p>{{ STATE.lang ?
                    `此处，您将详细了解到我们于何时在何地记录了您的哪些数据、我们对这些数据做了哪些处理、我们须将这些数据传递于何处。除此之外，您需要了解您在活动过程中的责任与义务。首先，也是最重要的是：我们，即A
                    WAVE项目创作者和合作伙伴列表上的组织或个人，非常重视数据保护。因此，我们用您称呼每一位客户。` : `This document contains everything you need to know
                    about how we process your information and data, i.e., when and where we collect data, what we do with
                    it, who we are required to give it to. In addition, it also asks you to understand your responsibilities
                    in the process. ( We / us / our: the creator of A WAVE and organisations or individuals on the list of
                    partners. )` }}</p>

                <p style="display: flex;justify-content: start;align-items: center;">{{ STATE.lang ?
                    `如果您有任何问题或需要投诉，请联系我们，通过“` : `If you have any questions or need to complain,
                    please contact us via the "` }}

                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                        <path
                            d="M514.844444 617.244444c-19.911111 0-31.288889-8.533333-31.288888-28.444444v-199.111111c0-19.911111 8.533333-28.444444 28.444444-28.444445s28.444444 8.533333 28.444444 28.444445v199.111111c0 14.222222-5.688889 28.444444-25.6 28.444444z m0 142.222223c-25.6 0-45.511111-19.911111-45.511111-45.511111 0-25.6 19.911111-45.511111 45.511111-45.511112 25.6 0 45.511111 19.911111 45.511112 45.511112 0 25.6-19.911111 45.511111-45.511112 45.511111z m472.177778 170.666666H31.288889c-11.377778 0-19.911111-5.688889-25.6-19.911111-5.688889-14.222222-5.688889-19.911111 0-31.288889L426.666667 133.688889c11.377778-22.755556 31.288889-51.2 42.666666-65.422222 25.6-34.133333 56.888889-28.444444 76.8-8.533334 14.222222 14.222222 31.288889 42.666667 51.2 73.955556l420.977778 736.711111c5.688889 5.688889 5.688889 14.222222 5.688889 19.911111-5.688889 28.444444-19.911111 39.822222-36.977778 39.822222zM509.155556 116.622222L85.333333 876.088889h853.333334L509.155556 116.622222z"
                            fill="#8a8a8a"></path>
                    </svg>

                    {{ STATE.lang ? `”按钮进行反馈，或邮箱: awave2023@163.com` : ` "button, or email: awave2023@163.com` }}
                </p>

                <h3>{{ STATE.lang ? `1. 数据与应用` : `1. Information and Data` }}</h3>
                <h4>{{ STATE.lang ? `1.1 我们将储存哪些数据？` : `1.1 What Data Do We Store?` }}</h4>

                <p>{{ STATE.lang ? `我们尽可能少地获取您的信息，尽可能少地打扰您。尽管如此，我们仍需要不时收集一些您的个人数据，以便为您提供一流的在线信息体验。我们可能会收集以下类型的数据：` : `We do our
                    best to store as little data as possible about you and to bother you as little as possible. We do
                    occasionally still need to collect some personal data in order to be able to provide you with the best
                    experience. We may therefore collect the following types of data:` }}</p>

                <h5>{{ STATE.lang ? `1.1.1 信息` : `1.1.1 Information` }}</h5>

                <div class="wrap">{{ STATE.lang ? `以下情况，您将向我们提供信息：
-创建或管理您的帐户时
-通过电话、电子邮件或其他方式与我们沟通时
-填写问卷、填写反馈或其他信息请求表时
此类信息有哪些呢？举例说明如下：
-您的昵称、电子邮件地址
-IP所在笼统的位置信息
-在主页面互动时的操作数据
-反馈、推荐、查询、支持请求、反馈会话以及与我们的电子邮件往来或者发给我们的的电子邮件的内容` : `The information you provide to us when you:
-Create or manage your account;
-Communicate with us by telephone, email or any other method;
-Fill out a questionnaire survey, feedback or other information request form;

Examples of information that you can provide are:
-The nick name and email address you gave us;
-General Internet Protocol (IP) address;
-Operations data when interacting on the main page;
-Information within feedback, inquiries, chat sessions and emails with us or to us;` }}</div>

                <h5>{{ STATE.lang ? `1.1.2 自动信息` : `1.1.2 Automatic Information` }}</h5>

                <div class="wrap">{{ STATE.lang ? `以下情况，我们将自动收集信息：
-网络和连接信息，例如：为将您的计算机或其他设备连接到网络而使用的互联网协议(IP)地址以及有关您的互联网服务提供商的信息
-您的设备或电脑的位置
-用于联系我们的邮件地址
-您访问并通过了注册页面后，在线人数信息、总填色数据信息
-以填色的方式参与主页面的游戏互动时` : `We automatically collect information when you:
-Network and connection information, such as the Internet Protocol (IP) address used to connect your
computer or other device to the Internet, and information about your internet service provider;
-The location of your computer or device;
-Email addresses and telephone numbers used to contact us;
-Visited and passed the registration page;
-Participate in the interaction on the main page by filling in colours;` }}</div>

                <h4>{{ STATE.lang ? `1.2 我们将如何处理这些数据？` : `1.2 How We Process Your Information and Data` }}</h4>

                <h5>{{ STATE.lang ? `1.2.1 个人身份信息` : `1.2.1 Personally Identifiable Information` }}</h5>
                <p>{{ STATE.lang ?
                    `此处，个人身份信息是指包括但不限于昵称、电子邮箱地址（以上数据，来源用户填写的文本）、互联网IP地址等信息。以上可能涉及真实的个人身份的数据，AWAVE方不会与任何合作者分享或公布在任何开放环境中。（当您登上排行榜时，会显示您的昵称和ID）如果您确认了通过电子邮件接收资讯的条款，将有可能通过电子邮箱接收有关活动的新闻和推广。否则，以上个人数据将仅应用在仅您个人可见的个人信息页面。`
                    : `Personally identifiable information refers to information including but not limited to nickname,
                    email address (the above data from the text filled in by the user), Internet Protocol (IP) address, etc.
                    The above data, which may involve a real personal identity, will not be shared with any partner or
                    published in any open environment. (When you are on the leaderboard, your nickname and ID will be
                    displayed). If you confirm the terms of receiving information via email, it will be possible to receive
                    news and promotions about the event by email. Otherwise, the above personal data will only be applied to
                    the personal information page that is only visible to you personally.` }}</p>
                <h5>{{ STATE.lang ? `1.2.2 交互数据` : `1.2.2 Data from Interaction` }}</h5>
                <p>{{ STATE.lang ? `当您完成注册流程进入到正式的活动主页后，将被收集各种交互数据。数据包括但不限于：实时在线人数统计、个人操作次数统计、保有圆圈数量统计、个人色彩信息、调查问卷等数据。` : `When
                    you complete the registration process and enter the official event homepage, various interactive data
                    will be collected. Data include but are not limited to: real-time online population statistics, personal
                    operation statistics, number of retained circles statistics, personal colour information, questionnaires
                    and other data.` }}
                </p>
                <p>{{ STATE.lang ? `交互数据作为研究数据会被保留并可能与相关的合作伙伴分享（合作伙伴列表见《致谢 &
                    灵感》），当涉及对个体数据的研究时将会使用系统自动生成的数字ID作为代称，代替昵称、电子邮箱、IP等个人身份信息。` : `Interactive data will be retained as
                    research data and may be shared with relevant partners (see "Acknowledgements & Inspirations" for a list
                    of partners). When it comes to research on individual data, a digital ID automatically generated by the
                    system will be used as a proxy instead of personally identifiable information such as nicknames, email
                    addresses, IP addresses, etc.` }}</p>


                <h3>{{ STATE.lang ? `2. 用户的责任与义务` : `2. User's Responsibilities` }}</h3>
                <p>{{ STATE.lang ? `2.1 尽管AWAVE鼓励个人自由地创作，但希望您遵守普遍的道德和法律规定，避免以下内容的出现。如不幸地，您创作了相关的内容，我们有权利视情况做出相应处理。` : `2.1
                    Although AWAVE encourages individuals to create freely, we encourage you to abide by the general ethical
                    and legal requirements and avoid the following contents. If, unfortunately, you create relevant content,
                    we have the right to deal with the situation accordingly.` }}</p>
                <div class="wrap">{{ STATE.lang ?
`-宣扬恐怖主义、极端主义或者煽动实施恐怖活动、极端主义活动的；
-煽动民族、人群或地域的仇恨、歧视的；
-散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；
-可能引发未成年人模仿不安全行为和违反社会公德行为、诱导未成年人不良嗜好等的；
-含有敏感字眼、标识的；` : `-Advocating terrorism or extremism or inciting the implementation of terrorist or
extremist activities;
-Inciting hatred or discrimination against a nation, group of people or region;
-Spreading obscenity, pornography, gambling, violence, terror or inciting crimes;
-Content that may cause minors to imitate unsafe behaviours and behaviours that violate social morality,
induce minors' bad habits, etc；
-Content containing sensitive images and logos;` }}</div>
                <p>{{ STATE.lang ? `2.2
                    您须知悉，出于在线体验考量，网站没有采用通过使用第三方的账号密码作为网站的登录方式，而采用更轻松便捷的IP信息。因此，您须做到自觉文明地使用本网站。在任何情况下请勿使用计算机脚本恶意破坏网站秩序。` :
                    `2.2 You should be aware that, for the sake of online experience, the Website does not use a third-party
                    account & password as the login method of the website, but uses the more convenient IP information.
                    Therefore, you must use this website in a civilised manner. Do not use computer scripts to maliciously
                    disrupt the order of the website under any circumstances.`
                }}</p>
                <h3>{{ STATE.lang ? `3. 免责声明` : `3. Disclaimer` }}</h3>
                <p>{{ STATE.lang ? `3.1 AWAVE对于用户经本服务上的广告、展示而购买、取得的任何产品、信息或资料，AWAVE不负保证责任。用户应评估其风险并与服务的直接提供方协商。` : `3.1 AWAVE
                    is not responsible or liable for any products, information or materials purchased or obtained by Users
                    as a result of advertisements or displays linked to the website. Users need to assess its risks and
                    consult with the direct provider of the products.` }}</p>

                <p>{{ STATE.lang ? `3.2 AWAVE对如下事项不做担保（包括但不限于）：` : `3.2 AWAVE makes no warranties (including but not limited
                    to) regarding:` }}</p>
                <p>{{ STATE.lang ? `3.2.1
                    我们的网站虽然均已经过测试，但由于技术本身的局限性，不能保证其与其他软硬件、系统完全兼容。如果出现不兼容的情况，用户可将情况报告给我们，以获得技术支持。如果无法解决问题，用户可以选择停止使用本服务。` :
                    `3.2.1 Although our website has been tested, but due to the limitations of the technology, it cannot be
                    guaranteed that it is fully compatible with other software, hardware and systems. In case of
                    incompatibility, the user can report the situation to us for technical support. If the problem cannot be
                    solved, the user can choose to stop using the Service.` }}</p>
                <p>{{ STATE.lang ? `3.2.2
                    使用AWAVE服务涉及到Internet服务，可能会受到各个环节不稳定因素的影响。因不可抗力、黑客攻击、系统不稳定、网络中断、用户关机、通信线路等原因，均可能造成服务中断或不能满足用户要求的情况。我们不保证服务适合用户的使用要求。`
                    : `3.2.2 The use of AWAVE services involves Internet services and may be affected by various unstable
                    factors. Due to hacker attacks, system instability, network interruption, user shutdown, communication
                    lines and other reasons, may cause service interruption or failure to meet user requirements.` }}</p>
                <p>{{ STATE.lang ? `3.3
                    AWAVE方将仅通过邮箱（awave2023@163.com）、YouTube官方账号（A-WAVE23）或bilibili官方账号（A-WAVE23）发布活动信息，其他合作伙伴可能会通过各自的渠道发布相关消息，请注意识别是否是正确的账号。除此之外，警惕非官方或不处于合作伙伴列表中的其他信息来源。`
                    : `3.3 AWAVE will only release the event information via email (awave2023@163.com), the official YouTube
                    account (A-WAVE23) or the official bilibili account (A-WAVE23). Other partners may release relevant
                    information through their own channels, please note that it is the correct account. Beyond that, be wary
                    of other sources of information that are unofficial or not on the partner list.` }}</p>


                <h3>{{ STATE.lang ? `4. 协议的修改与通知` : `4. Modification and Notification of The Agreement` }}</h3>

                <p>{{ STATE.lang ? `4.1 AWAVE有权依据国家政策、技术条件、产品功能等变化需要而对本协议进行修改并将修改后的协议予以发布。` : `4.1 AWAVE has the right to
                    modify this agreement and publish the revised agreement according to the changing needs of national
                    policies, technical conditions, product functions, etc.` }}</p>
                <p>{{ STATE.lang ? `4.2 前述内容一经正式发布，我们将以适当的方式（包括但不限于公告提醒、邮件等）提醒您更新的内容，以便您及时了解本协议的最新版本。` : `4.2 Once the above
                    content is officially released, we will remind you of the updated content in an appropriate way
                    (including but not limited to announcement reminders, emails, etc.) so that you can keep abreast of the
                    latest version of this Agreement.` }}</p>

                <p>{{ STATE.lang ? `4.3
                    修改后的内容将构成本协议不可分割的组成部分，您应同样遵守。您对修改后的协议有异议的，请立即停止使用相关服务，否则视为您已充分阅读、理解并接受更新后的本协议并愿意受更新后的本协议的约束。` : `4.3 The
                    modified content will form an integral part of this Agreement and you need to comply with it. If you
                    have any objection to the revised Agreement, please immediately stop using the relevant services,
                    otherwise it is deemed that you have fully read, understood and accepted the updated Agreement and are
                    willing to be bound by the updated Agreement.` }}
                </p>

            </div>

            <div v-if="UI.activeIndex == 0"
                style="position: absolute;overflow-y: scroll; padding: 2rem; top: 120px;bottom: 30px;right: 30px;left: 30px;border-radius: 5px ;border:1px solid black;">

            </div>
            <div v-if="UI.activeIndex == 2"
                style="position: absolute; top: 120px;bottom: 30px;right: 30px;left: 30px;border-radius: 5px ;border:1px solid black;display: flex;justify-content: center;align-items: center;">
                <img style="position: relative; height: calc(100% - 20px);width:calc(100% - 20px); object-fit:contain;object-position: center;"
                    :src="`https://awave.oss-cn-beijing.aliyuncs.com/ins/${UI.nowPage}.jpeg`" alt="Ins">

                <svg @click="modPage(0)" v-if="UI.nowPage != 1"
                    style="position: absolute;top: calc(50% - 24px); left: 20px;cursor: pointer;" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" width="48" height="48">
                    <path
                        d="M687.04 942.272 273.088 552.832c-22.848-21.504-22.848-60.224 0-81.728l413.952-389.44C718.848 51.84 768 63.36 768 109.312l0 805.312C768 960.64 718.848 972.16 687.04 942.272z">
                    </path>
                </svg>



                <svg @click="modPage(1)" v-if="UI.nowPage != 22"
                    style="position: absolute;top: calc(50% - 24px); right: 20px;cursor: pointer;" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" width="48" height="48">
                    <path
                        d="M336.448 943.424l415.04-390.464c22.912-21.504 22.912-60.416 0-81.92L336.448 80.576C304.576 50.56 255.296 62.144 255.296 108.288l0 807.488C255.296 961.856 304.576 973.44 336.448 943.424z"
                        fill="#2c2c2c"></path>
                </svg>
            </div>
        </div>
    </div>
</template>
<style scoped>
#private-view {
    position: absolute;
    width: 100vw;
    height: 100vh;

    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;

}

.btn {
    padding: 0.4rem 0.8rem;
    border: 1px solid black;
    margin-right: 10px;
    font-size: 0.8rem;
    color: #000;
}

.active {
    background-color: black;
    color: white;
}

h2 {
    font-size: 1.5rem;
    line-height: 1.2rem;
}

h3 {
    font-size: 1.2rem;
    line-height: 1.2rem;
}



.wrap {
    white-space: pre-wrap;
}
</style>