/**
 ----修饰器
 * @description 绝对定位元素实现可拖动效果
 * @param {string} moveTarget  需要拖拽的元素id
 * @param {string} clickTarget 拖拽总区域元素id
 * @param {string} currentArea 左键按下触发拖拽事件的元素id
 */
export default function TragTools(moveTarget, clickTarget, current) {
    const target = document.getElementById(moveTarget);
    const title = document.getElementById(clickTarget);
    const currentArea = document.getElementById(current);
    title.style.userSelect = "none"; // 防止文字选中
    currentArea.onmousedown = function (el) {
        if (el.target !== currentArea) return//实现.self修饰符，跳过冒泡事件
        el.stopPropagation()
        const event1 = el || window.event;
        document.onmousemove = function (e) {
            target.style.cursor = "move";
            const event2 = e || window.event;
            if (Math.abs(event2.pageX - event1.pageX) > 2 || Math.abs(event2.pageY - event1.pageY) > 2) {
                target.style.left = (event2.pageX - event1.offsetX) + "px";
                target.style.top = (event2.pageY - event1.offsetY) + "px";
                target.style.right = -1;
                target.style.bottom = -1;
                if (target.style.top.slice(0, -2) < 0) {
                    target.style.top = 0 + "px"
                }
                if (target.style.left.slice(0, -2) < 0) {
                    target.style.left = 0;
                }
                if (target.style.top.slice(0, -2) > (document.documentElement.offsetHeight - target.offsetHeight)) {
                    target.style.top = document.documentElement.offsetHeight - target.offsetHeight + "px";
                }
                if (target.style.left.slice(0, -2) > (document.documentElement.offsetWidth - target.offsetWidth)) {
                    target.style.left = document.documentElement.offsetWidth - target.offsetWidth + "px";
                }
            }
        }
        document.onmouseup = function () {
            target.style.cursor = "default";
            document.onmousemove = null;
        }
    }
}