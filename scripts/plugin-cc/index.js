
module.exports = {
    blocks: {
        ['ccProperty']: {
            process(block) {
                return `属性 ${block}`;
            },
        },
        ['poseGraphNodeInput']: {
            process({ args }) {
                return `输入 ${block}`;
            },
        },
    }
};