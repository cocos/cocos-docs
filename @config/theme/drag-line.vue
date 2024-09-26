<template>
    <div @mousedown="mousedownHandle" class="drag-line"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

let val: number | null = null;

const key = '--vp-sidebar-width';

function getRootStyle(): string {
    return getComputedStyle(document.documentElement).getPropertyValue(key).trim();
}

function setRootStyle(value: string) {
    document.documentElement.style.setProperty(key, value);
}

function mousedownHandle(e: MouseEvent) {
    val = e.clientX;
    document.addEventListener('mousemove',dragIng)
    document.querySelector('body')?.classList.add('is-darging');
}

function dragIng(e: MouseEvent) {
    if(val === null) return;

    const disdance = e.clientX - val;
    const newVal = parseInt(getRootStyle(), 10) + disdance;
    if(newVal <= 200 || newVal >= 500) return;
    setRootStyle(`${newVal}px`)
    val = e.clientX;
}

onMounted(() => {
    // 从缓存中获取设置过的值
    const cachevalue = localStorage.getItem(key);
    if(cachevalue) {
        setRootStyle(cachevalue);
    }
    

    document.addEventListener('mouseup', () => {
        if(val !== null) {
            document.removeEventListener('mousemove', dragIng);
            document.querySelector('body')?.classList.remove('is-darging');
            localStorage.setItem(key, getRootStyle());
            val = null;
        }
    })
})
</script>

<style>
.drag-line {
    position: fixed;
    width: 3px;
    /* 因为线条是在 3px 的中间，所以 left - 1 视觉效果才是线条刚好在侧边栏旁边，否则有1px 空隙 */
    left: calc(var(--vp-sidebar-width) - 1px); 
    top:0;
    right: 0;
    bottom:0;
    cursor: col-resize;
    &::after {
        display: block;
        content: '';
        position: absolute;
        width: 1px;
        left: 1px;
        top: 0;
        bottom: 0;
        background-color: var(--vp-c-divider);
    }
    &:hover::after {
        background-color:var(--vp-c-brand-1, blue);
    }
}

/* 为了让拖动的时候鼠标标识不闪烁变动 且不要有文字选中的效果 */
.is-darging {
    cursor: col-resize;
    user-select: none;
}

@media (max-width: 480px) {
    .drag-line {
        display: none;
    }
}
</style>