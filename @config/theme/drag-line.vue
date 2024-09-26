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
    position: absolute;
    width: 3px;
    right: 0px;
    top:0;
    bottom:0;
    cursor: col-resize;
    z-index: 200;
    &::after {
        display: block;
        content: '';
        position: absolute;
        width: 1px;
        left: 1px;
        top: 0;
        bottom: 0;
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