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
    document.querySelector('.VPContent')?.classList.add('no-select');
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
            document.querySelector('.VPContent')?.classList.remove('no-select');
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
    left: var(--vp-sidebar-width);
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
/* 拖动分隔线调整导航宽度时，防止正文有文字选中的效果，在拖动时动态给正文容器添加这个 class */
.no-select {
    user-select: none;
}
</style>