const ps = require('path');
const fs = require('fs-extra');
const dot2svg = require('@aduh95/viz.js/async');
(async () => {
    for (const dotFileRelative of [
        'zh/animation/animation-state/playback-control.dot',
        'en/animation/animation-state/playback-control.dot',
    ]) {
        const dotFile = ps.join(__dirname, '..', dotFileRelative);
        const outFile = ps.join(ps.dirname(dotFile), `${ps.basename(dotFile, ps.extname(dotFile))}.svg`);
        console.debug(`${dotFile} -> ${outFile}`);
        const source = await fs.readFile(dotFile, 'utf8');
        const svg = await dot2svg(source);
        await fs.writeFile(outFile, svg, { encoding: 'utf8' });
    }
})();