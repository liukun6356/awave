'use strict';

window.SwaggerTranslator = {
    words: {},
    words2: {},
    translate: function () {
        // 0  中文 1 英文
        const bo = window.localStorage.getItem("lang") == "1" ? true : false
        ;[...document.querySelectorAll('[data-sw-translate]')].forEach((dom) => {
            dom.innerHTML = this.tryTranslate(bo, dom.innerHTML)
            dom.placeholder = this.tryTranslate(bo, dom.placeholder)
            dom.title = this.tryTranslate(bo, dom.title)
            dom.value = this.tryTranslate(bo, dom.value)
            if (bo) {
                dom.className += ' engStr'
            } else {
                dom.className = dom.className.replace(' engStr', '')
            }
        })
    },

    tryTranslate: function (bo, word) {
        if (bo) {
            return this.words2[word?.trim?.()] !== undefined ? this.words2[word?.trim?.()] : word;
        } else {

            return this.words[word?.trim?.()] !== undefined ? this.words[word?.trim?.()] : word;
        }
    },

    learn: function (wordsMap) {
        this.words = wordsMap;
        this.words2 = Object.assign.apply(null, Object.entries(wordsMap).map(([k, v]) => ({[v]: k})))
    },
};

window.SwaggerTranslator.learn({
    "Click any where on the screen to skip the animation.": "点击屏幕任意位置以跳过动画。",
    "Enter a name": "请输入一个昵称",
    "E-mail address": "请输入电子邮箱",
    "Confirmation": "确认",
    "1. Palette": "1. 取色",
    "2. Adjustment": "2. 校色",
    "3. Statement&amp;Confirmation": "3. 声明&amp;确认",
    "Hue Cube": "色相立方体",
    "Colour Palettes": "取色版",
    "Eyedropper": "滴管工具",
    "Numbers": "数字",
    "Hue": "色相",
    "Saturation": "饱和度",
    "Brightness": "明度",
    "Go back": "返回",
    "Achievement": "成就",
    "Similar colour": "近色立方体",
    "Coordinate": "色彩坐标",
    "Community": "社区统计",
    "Operational statistics": "操作统计",
    "times": "次",
    "Statement & Gratitude": "声明 &amp; 致谢",
    "Please read the Users Agreement": "勾选此条款则代表您已阅读并同意",
    "Users Agreement &amp; Privacy Policy": "用户协议 &amp; 隐私条款",
    "before completing registration. By checking this, you agree to its contents.": "中的内容",
    "Please carefully check whether your emoll oddress is ooourate, an irwalid emal addresswil not help you register er retrieve your password. After you confirm the infermationclick \"Next\" and complete the following operations": "清仔细核对您的却馆地址是否准确无误，正确的部箱地址是保证您账号安全的重要保无效的邮箱地址将无法帮助您完成注册或找回密码。当您确认信息无误后点击并完成后续场作",
    "CREATE ACCOUNT": "注册新账号",
    "Account number": "请输入您的账号",
    "Password": "请输入您的密码",
    "NEW Password": "请输入新的密码",
    "Check this item to allow the browser to remember your account.": "勾选此项目允许浏览器记录您的账号",
    "No need to enter the password for the next seven days": "七天内免登录",
    "Please pay attention to your information security, carefully keep your accountnumber, password and other information, do not disclose them to strangers.": "请注意您的信息安全，小心保管您的账号和密码等信息，切勿将其泄露给陌生人。",
    "ENTER THE MAIN PAGE": "访问主页面",
    "CONFIRM AND ENTER THE MAIN PAGE": "确认密码并访问主页面",
    "Forgotten password?": "忘记密码?",
    "Then an email with a verification code wil be sent to the email address associated with your account within a few working days Please check it": "当您忘记密码时点击此处，之后，一封带有验证码的邮件将在几个工作日的时间内发送至您账号关联的邮箱中，请注意查收。",
    "when you forget your password, after which an email with a verification code will be sent to you in a few business days!": "当您忘记密码时点击此处，之后，一封带有验证码的邮件将在几个工作日发给您!",
    "切换成中文": "English Version",
    "Help": "帮助",
    "Contact": "反馈",
    "Next": "下一步",
    "Set a Password": "请设置一个密码",
    "Verification code": "请输入验证码",
    "Please enter the verification": "请输入您邮箱中的验证码",
    "Copy": "拷贝",
    "Resend": "重新发送",
    "Send": "发送",
    "ATT": "附",
    "Your account": "您的账号",
    "Six digits +": "至少六位数字",
    "Cooperation": "像素点",
    "Pixel ×": "像素点.cn ×",
    "Please your link": "请粘贴您的链接",
    "Get link?": "获取链接?",
    "If you have adopted any small pixels in \"像素点.cn\" at the same time, selecting the Pixel.cn channel can save you time when picking colors.": "如果您同时在“像素点.cn”中认养过任何小像素点，在取色时选择“像素点”通道可以为您节省时间。",
    "After pasting your link to this page, your color information and nickname will be filled in automatically, and you can directly click on the statement to proceed to the final registration step": "将您的链接粘贴到此页面后，您的颜色信息和昵称将会被自动填写，您可以直接点击 “声明确认” 进入到最终的注册步骤。",
    "Now, your little pixels will come to this platform, meet mcre colcur frlends in a new way of sogglzngeng meke woves with us!": "现在，您的小像素点将会串门来到这个平台，在全新的社交方式中认识更多的色彩朋友，与我们一起造浪!",
    "After clicking Next, the information you fill in will be recorded, you will enter the password setting stage, and you can not change the nickname and email address information, please click after confirming.": "点击“下一步”后您所填写对信息将被记录，您将进入密码设置阶段，且无法再对昵称与邮箱地址信息进行更改，请在确认后点击。",
    "Please enter your password first. The password is case insensitive and must be at least six characters long.": "请先输入您的密码信息，密码不区分大小写，密码长度至少六位字符。",
    "Instruction": "使用说明",
    "Skip": "跳过",
    "Click \"复制地址\" next to the nickname on your own little pixel page": "在您自己的小像素点页面点击昵称旁边的\"复制地址\"",
    "Please enter the value color": "请输入数值颜色",
    // "Color extraction": "取色",
    "Click here to upload images": "点击此处上传图片",
    "Re\-upload": "重新上传",
    "Cick in the black area to upload the image, png ipg and jpeg format supported.": "单击黑色区城上传图片，支持png、jipg格式文件。",
    "Drag the cursor to aojust the imoge selection area, click the \"Eyedropper\" button and clickgny point in the box ggain to select the oerrespenging oclour": "长按鼠标抱动可调整图片迭区，单击“取色”按讯并再次单击图片框内的任意区域选区对应的额色。",

    "Login Page": "登录系统",
    "Language Text": "网络问题",
    "Announcement": "语言&文字",
    "Tutorials": "成就系统",
    "List": "公告系统",
    "Inner Space": "画布&填色",
    "Personal Page": "教程系统",
    "lanet Map": "项目简历",
    "Web Server": "排行榜系统",
    "Achievement": "反馈系统",
    "Canvas Colour": "听潮",
    "Portfolio": "其他问题",
    "Feedback System": "个人资料",
    "Other Problems": "星球&定位",
    "Please select the labels that match the description of the problem you are experiencing \(mutiple options availatle\)": "请选择符合您遇到的问题描述的标签\(可多选\)",
    "Bugs Report": "漏洞反馈",
    "Enter a title here": "在此输入标题",
    "Attachment": "附件",
    "Eyedropner": "取 色",

    // 提示文本
    "Click here to the corresponding page.": "单击此处跳转到对应页面。",
    "Click here to register for a new account, please prepare a correct email address in advance.": "Click here to the corresponding page.",
    "Please enter the account number you obtained when you registered or your email address. The account number is usually composed of 9 digits.": "请在此处输入您注册时获得的账号或电子邮箱，账号通常是由9位数字组成。",
    "Please enter your password here. The password must be at least 6 characters.": "请在此处输入您注册时填写的密码，密码至少6位字符。",
    "Click here if you forget your password. Then, an email with a verification code will be sent to the email address associated with your account. Please check it.": "当您忘记密码时点击此处，之后，一封带有验证码的邮件将发送至您账号关联的邮箱中，请注意查收。",
    "Please fill in the box with the verification code you received.": "请在方框内填写您收到的验证码。",
    "Enter a new password here. The password must be at least six characters long. Please keep your information safe.": "在此处输入新的密码，密码至少六位字符。请妥善保管您的信息。",
    "Check this item if you would like not to have to enter your account again when you log in next time.": "如果您希望下次登录时不需要再次输入账号，请勾选此项目。",
    "Check this item if you want to skip the login step within the next seven days.": "如果您希望在未来七天内跳过登录步骤，请勾选此项目。",
    "Make sure you have entered the correct account and password and click here to access the main page of the website.": "确保您输入的账号和密码无误后点击此处访问网站的主要页面。",
    "点击此处网站的语言将被切换成中文。": "Click here to change the language of the website to English.",
    "Click here for a detailed illustrated tutorial of this page.": "点击此处查看此页面下详细的图文教程。",
    "If you encounter any issues and website bugs that need to be reported, click here to let us know.": "如果您遇到了任何需要报告的问题和网站的漏洞，点击此处进行让我们知道。",
    "At the beginning of everything you need to initially choose a colour to represent yourself in the game, we have provided you with five ways to do so.": "在一切的开始您需要初步选择一个颜色在游戏中代表自己，我们为您提供了五种方式供您选择。",
    "\“取色板\”是一个较为直观的选取颜色的方式，请在114个预设色彩中选择一个颜色。": "\“取色板\”是一个较为直观的选取颜色的方式，请在114个预设色彩中选择一个颜色。",
    "The \"Hue Cube\" provides a more professional way to choose colours, you can blend your favourite colour in this step.": "“色相立方体”提供了一个更专业的选取颜色的方式，它帮助您在第一阶段就能调配出心仪的色彩。",
    "The \"Eyedropper\" allows you to upload local pictures from your device and draw a colour from the picture.": "\“滴管工具”允许您上传本地的图片，并吸取图片中的色彩。",
    "If you have decided to choose a certain colour, you can quickly complete the colour selection step by entering the colour data here.": "如果您已经决定选择某一个颜色，可以在此处通过输入颜色的数据快速地完成选色。",
    "AWAVE has partnered with \“像素点..cn\”, and players from \“像素点..cn\”can register here by using information of the pixels.": "AWAVE和“像素点.cn”联合，来自“像素点.cn”的玩家们可以通过此通道使用小像素点的信息为自己注册。",
    "单击任一色彩方块即可选择对应的颜色。": "Click on any colour box to select the corresponding colour.",
    "如果您已经完成了初步的取色，点击此处进行更为细致地调整。": "If you have completed the initial colour extraction, click here to make more detailed adjustments.",
    "在所有关于色彩的抉择过后，点击此处进入到最终的信息采集阶段。": "After all the decisions for colour choosing, click here to proceed to the final information gathering stage.",
    "在此区域任意地拖拽光标完成色彩的提取。": "Drag the cursor arbitrarily in this area to complete the colour extraction.",
    "拖动此处的滑块调整顶部矩形区域的色相。": "Drag the slider here to adjust the hue of the top rectangular area.",
    "单击此处从本地选取一张图片上传，上传之后您可以拖动光标调整图片的选取。图片建议使用.png、.jpg或.jpeg格式。": "Click here to select an image from your device to upload. Images are recommended in.PNG,.JPG, or.JPEG format. After uploading, you can drag the cursor to adjust the zone of image.",
    "单击此按钮后，您的光标将会变成滴管工具。再次单击顶部矩形图片框内的任意位置退出滴管模式并完成颜色的吸取。": "After clicking this button, your cursor will become the eyedropper tool. Click anywhere in the top rectangular zone again to exit eyedropper mode and finish drawing the colour.",
});

export const getTipInfo = (index, lang) => {
    if (!index) return
    return strList[index][lang]
} // 0  中文 1 英文}

// 提示文本
const strList = [
    ['单击此处跳转到对应页面。', 'Click here to the corresponding page.'],
    ['如果你还没有账号，点击此处注册新的账号，请提前准备好一个可用的电子邮箱地址。', 'Click here to register for a new account, please prepare a correct email address in advance.'],
    ['请在此处输入您注册时获得的账号或电子邮箱，账号通常是由9位数字组成。', 'Please enter the account number you obtained when you registered or your email address. The account number is usually composed of 9 digits.'],
    ['请在此处输入您注册时填写的密码，密码至少6位字符。', 'Please enter your password here. The password must be at least 6 characters.'],
    ['当您忘记密码时点击此处，之后，一封带有验证码的邮件将发送至您账号关联的邮箱中，请注意查收。', 'Click here if you forget your password. Then, an email with a verification code will be sent to the email address associated with your account. Please check it.'],
    ['请在方框内填写您收到的验证码。', 'Please fill in the box with the verification code you received.'],
    ['在此处输入新的密码，密码至少六位字符。请妥善保管您的信息。', 'Enter a new password here. The password must be at least six characters long. Please keep your information safe.'],
    ['如果您希望下次登录时不需要再次输入账号，请勾选此项目。', 'Check this item if you would like not to have to enter your account again when you log in next time.'],
    ['如果您希望在未来七天内跳过登录步骤，请勾选此项目。', 'Check this item if you want to skip the login step within the next seven days.'],
    ['确保您输入的账号和密码无误后点击此处访问网站的主要页面。', 'Make sure you have entered the correct account and password and click here to access the main page of the website.'],
    ['Click here to change the language of the website to English.', '点击此处网站的语言将被切换成中文。'],
    ['点击此处查看此页面下详细的图文教程。', 'Click here for a detailed illustrated tutorial of this page.'],
    ['如果您遇到了任何需要报告的问题和网站的漏洞，点击此处进行让我们知道。', 'If you encounter any issues and website bugs that need to be reported, click here to let us know.'],
    ['确保您输入的账号和密码无误后点击此处访问网站的主要页面。', 'Make sure you have entered the correct account and password and click here to access the main page of the website.'],
    ['在一切的开始您需要初步选择一个颜色在游戏中代表自己，我们为您提供了五种方式供您选择。', 'At the beginning of everything you need to initially choose a colour to represent yourself in the game, we have provided you with five ways to do so.'],
    ['“取色板”是一个较为直观的选取颜色的方式，请在114个预设色彩中选择一个颜色。', '"Colour Palettes" is a more intuitive way to choose a colour, please select one from 114 preset colours.'],
    ['“色相立方体”提供了一个更专业的选取颜色的方式，它帮助您在第一阶段就能调配出心仪的色彩。', 'The "Hue Cube" provides a more professional way to choose colours, you can blend your favourite colour in this step.'],
    ['“滴管工具”允许您上传本地的图片，并吸取图片中的色彩。', 'The "Eyedropper" allows you to upload local pictures from your device and draw a colour from the picture.'],
    ['如果您已经决定选择某一个颜色，可以在此处通过输入颜色的数据快速地完成选色。', 'If you have decided to choose a certain colour, you can quickly complete the colour selection step by entering the colour data here.'],
    ['AWAVE和“像素点.cn”联合，来自“像素点.cn”的玩家们可以通过此通道使用小像素点的信息为自己注册。', 'AWAVE has partnered with “像素点..cn”, and players from“像素点..cn”can register here by using information of the pixels.'],
    ['单击任一色彩方块即可选择对应的颜色。', 'Click on any colour box to select the corresponding colour.'],
    ['如果您已经完成了初步的取色，点击此处进行更为细致地调整。', 'If you have completed the initial colour extraction, click here to make more detailed adjustments.'],
    ['在所有关于色彩的抉择过后，点击此处进入到最终的信息采集阶段。', 'After all the decisions for colour choosing, click here to proceed to the final information gathering stage.'],
    ['在此区域任意地拖拽光标完成色彩的提取。', 'Drag the cursor arbitrarily in this area to complete the colour extraction.'],
    ['拖动此处的滑块调整顶部矩形区域的色相。', 'Drag the slider here to adjust the hue of the top rectangular area.'],
    ['单击此处从本地选取一张图片上传，上传之后您可以拖动光标调整图片的选取。图片建议使用.png、.jpg或.jpeg格式。', 'Click here to select an image from your device to upload. Images are recommended in.PNG,.JPG, or.JPEG format. After uploading, you can drag the cursor to adjust the zone of image.'],
    ['单击此按钮后，您的光标将会变成滴管工具。再次单击顶部矩形图片框内的任意位置退出滴管模式并完成颜色的吸取。', 'After clicking this button, your cursor will become the eyedropper tool. Click anywhere in the top rectangular zone again to exit eyedropper mode and finish drawing the colour.'],
    ['单击此处重新从本地选取图片。图片建议使用.png、.jpg或.jpeg格式。', 'Click here to re-select the picture from the device. Images are recommended in.PNG,.JPG, or.JPEG format.'],
    ['请在此处输入六位数颜色的数值。', 'Please enter a six-digit code of the colour here.'],
    ['请在此处输入颜色的数值。', 'Please enter the code or value of the colour here.'],
    ['请在此处粘贴您在“像素点.cn”中的地址链接。链接以六位数的颜色代码结尾。', 'Please paste here the link of your address in "像素点.cn ". Links end with a six-digit colour code.'],
    ['单击此处查看关于获取链接的图片教程。', 'Click here for an image tutorial on getting links.'],
    ['中心处的方形内显示的是经过校色后最终得到的颜色。', 'The square in the centre shows the final colour after adjustment.'],
    ['此处的矩形区域显示的是校色前色彩的样子。', 'The rectangular area here shows what the colour looked like before the adjustment.'],
    ['拖动此处的滑块只调整色彩的色相数值，滑块向右数值增大，滑块向左数值减小。', 'Drag the slider here to adjust only the hue value of the colour, the slider to the right value increases, the slider to the left value decreases.'],
    ['拖动此处的滑块只调整色彩的饱和度数值，滑块向右颜色更鲜艳，滑块向左数颜色更偏向灰色。', 'Drag the slider here to adjust only the saturation value of the colour, the slider to the right value increases, the slider to the left value decreases.'],
    ['拖动此处的滑块只调整色彩的明度数值，滑块向右颜色更亮，滑块向左颜色更暗。', 'Drag the slider here to adjust only the brightness value of the colour, the slider to the right value increases, the slider to the left value decreases.'],
    ['此处的矩形区域显示的是您最终获得的色彩，一旦完成注册，颜色将无法更改。', 'The rectangular area here shows the final colour you will get, and the colour cannot be changed once registration is complete.'],
    ['请在此处输入一个昵称，昵称将显示在游戏的众多地方，昵称请勿为空。', 'Please enter a nickname here, the nickname will be displayed in many places in the game, the nickname should not be empty.'],
    ['请输入您的电子邮箱，电子邮箱是认证您账号信息的唯一方式，请确保您填写的邮箱地址有效。', 'Please enter your email address, email is the only way to authenticate your account information, please make sure that your email address is available.'],
    ['请确保您同意“用户协议&隐私条款”中的内容后再勾选此项目。', 'Please ensure that you agree to the User Agreement & Privacy Policy before checking this item.'],
    ['请仔细阅读并检查您输入的信息无误，两处条款都被勾选的情况下才可以进入到下一步。', 'Please read carefully and check that the information you entered is correct. Only when both terms are checked can you proceed to the next step.'],
    ['请先填写您的昵称和电子邮件信息，并仔细阅读并勾选以上两处条款。', 'Please fill in your nickname and email information, and carefully read and check the above two terms.'],
    ['点击“下一步”后您所填写的信息将被记录，您将进入设置密码的阶段，为了节约您的时间请再次确认电子邮箱的地址是可用的。', 'After clicking this, the information you filled in will be recorded, and you will enter the stage of setting password. In order to save your time, please reconfirm that the email address is available.'],
    ['这串9位字符的数字是您的账号，请妥善保管。为了方便记忆，账号的规则为：年年月月日日以及您获取的顺序（UTC+8）。', 'This 9-character-number is your account, please keep it safe. In order to facilitate memory, the rule of the account is: year year, month month, day day, and the order you get it (UTC+8).'],
    ['单击此处将您的账号复制到剪切板上。', 'Click here to copy your account to the clipboard.'],
    ['在此处设置您的密码，密码至少六位字符。请妥善保管您的信息。', 'Set your password here. The password must be at least six characters long. Please keep your information safe.'],
    ['请在此处填写您收到的验证码，验证码已发送至您的邮箱。', 'Please fill in the verification code you received, the verification code has been sent to your email.'],
    ['如果您没收到验证码，点击此处，我们将重新向您的邮箱发送一封信件。', 'If you do not receive the verification code, click here and we will send you a new email.'],
    ['如果您希望下次登录时不需要再次输入账号，请勾选此项目。', 'Check this item if you would like not to have to enter your account again when you log in next time.'],
    ['请仔细确认您是否输入了您所希望的密码，确保您已经记住了您的账号信息。', 'Please carefully confirm that you have entered your desired password and make sure that you have remembered your account information.'],
    ['请在此处输入您的标题，请尽量保证标题内容简明扼要。', 'Please enter your title here, and try to keep it short and to the point.'],
    ['请在下方的黑色矩形区域选择与您遇到的问题相符合的描述，方便我们快速定位您所遇到的问题，词条可多选。', 'Please select descriptions that match your problem in the black rectangular areas below, so that we can quickly locate your problem. Multiple entries can be selected.'],
    ['单击与您遇到的问题相符合的描述词条，方便我们快速定位您所遇到的问题，词条可多选。', 'Click the descriptions that match the problem you are experiencing, so that we can quickly locate the problem you are experiencing. Multiple entries can be selected.'],
    ['单击此处上传图片附件。图片建议使用.png、.jpg或.jpeg格式。', 'Click here to upload the image attachment. Images are recommended in.PNG,.JPG, or.JPEG format.'],
    ['单击此处上传图片附件。图片建议使用.png、.jpg或.jpeg格式。', 'Click here to upload the image attachment. Images are recommended in.PNG,.JPG, or.JPEG format.'],
    ['请在此处输入您的正文，描述您所遇到的问题。您的反馈对我们的改进来说十分重要。', 'Please enter your text here describing the problem you are experiencing. Your feedback is very important to our improvement.'],
    ['当一切就绪后，点击此处将报告发送给我们。非常感谢您花时间向我们报告您所遇到的问题，这对于我们寻找问题和提升自我十分重要。', 'When everything is ready, click here to send us the report. Thank you very much for taking the time to report your problems to us, it is very important for us to find problems and improve ourselves.']
]
