import fs from 'fs';

import { spawnCommand, parseCommands,replaceAPIDOCbyUrl, formatAPIDOC } from './command-tools.js'

async function doJob(targetVersion) {
    let bExist = fs.existsSync(targetVersion);
    if (!bExist) {
        console.log(targetVersion, 'does not exist.');
        return;
    }

    await formatAPIDOC(targetVersion + '/en');
    await formatAPIDOC(targetVersion + '/zh');
}


(async () => {
    const cmds = parseCommands();

    const targetVersion = cmds['--version'];
    if (!targetVersion) {
        console.log('--version could\'t be null');
        return;
    }

    if (targetVersion == 'versions/all') {
        let files = fs.readdirSync('versions');
        files.forEach(file => {
            file = 'versions/' + file;
            if (fs.statSync(file).isDirectory()) {
                doJob(file);
            }
        });
    }
    else {
        doJob(targetVersion);
    }
})();