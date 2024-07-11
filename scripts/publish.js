import fs from 'fs';

import { spawnCommand, parseCommands } from './command-tools.js'

async function publishTargetVersion(targetVersion) {
    let bExist = fs.existsSync(targetVersion);
    if (!bExist) {
        console.log(targetVersion, 'does not exist.');
        return;
    }

    console.log('Generating SUMMARY.md -> summary.json', targetVersion);
    await spawnCommand(`node ./scripts/create-sidebar.js ${targetVersion}/en/SUMMARY.md`, targetVersion);
    await spawnCommand(`node ./scripts/create-sidebar.js ${targetVersion}/zh/SUMMARY.md`, targetVersion);
    console.log('Generating SUMMARY.md -> summary.json Complete', targetVersion);
    let versionNumber = targetVersion.split('/')[1];
    await spawnCommand(`npx cross-env __APIDOC__=https://docs.cocos.com/creator/${versionNumber}/api npx vitepress build ${targetVersion}`, targetVersion);
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
                publishTargetVersion(file);
            }
        });
    }
    else {
        publishTargetVersion(targetVersion);
    }

})();
