<template>
    <div class="feedback-area">
        <button @click="click">{{ label }}</button>
    </div>
</template>

<script lang="js" setup>

import { useData } from 'vitepress'
import { computed } from 'vue'
import { langLabelMap } from '../config';

const props = defineProps({
    repo: String,
    branch: {
        type: String,
        default: 'master'
    },
    version: String
})

const { page, lang } = useData()


const label = computed(() => {
    return langLabelMap[lang.value]
})         

function click() {
    const title = encodeURIComponent('docs issue at: ' + page.value.title);

    // 文件地址
    const filePathInRepo = `${props.repo}/blob/${props.branch}/versions/${props.version}/${page.value.filePath}`;
    const filePath = `**filePath:** [${page.value.filePath}](${filePathInRepo})`;

    // 有错误的内容（光标选择的文本范围）
    const content = `**content:** ${window.getSelection()}`
    const body = encodeURIComponent([filePath, content].join('\n'));

    const link =  `${props.repo}/issues/new?title=${title}&body=${body}`;
    window.open(link);
}
</script>

<style>
.feedback-area {
    padding-left: 16px;
    & button {
        border: 1px solid var(--vp-c-divider);
        padding: 0 8px;
        border-radius: 4px;
    }
}
</style>