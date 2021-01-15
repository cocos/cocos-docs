const { renderGraphFromSource } = require('graphviz-cli');
const ps = require('path');
(async () => {
    for (const dotFileRelative of [
        'zh/engine/animation/playback-control.dot',
    ]) {
        const dotFile = ps.join(__dirname, '..', dotFileRelative);
        const outFile = ps.join(ps.dirname(dotFile), `${ps.basename(dotFile, ps.extname(dotFile))}.svg`);
        console.debug(`${dotFile} -> ${outFile}`);
        await renderGraphFromSource({ name: dotFile }, { format: 'svg', name: outFile });
    }
})();