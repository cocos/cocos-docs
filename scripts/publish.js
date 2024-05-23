import process from 'process';
import fs from 'fs';
import { exec } from 'child_process';

let spawnCommand = (command,targetVersion) => {
    return new Promise((resolve, reject) => {
        const child = exec(command);

        child.stdout.on('data', (data) => {
            process.stdout.write(`${targetVersion}: ${data}`);
        });

        child.stderr.on('data', (data) => {
            process.stderr.write(`${targetVersion}: ${data}`);
        });

        child.on('close', (code) => {
            if (code === 0) {
                resolve(code);
            } else {
                reject(new Error(`${targetVersion}: ${code}`));
            }
        });

        child.on('error', (err) => {
            reject(err);
        });
    });
};

async function publishTargetVersion(targetVersion){
    let bExist = fs.existsSync(targetVersion);
    if (!bExist) {
        console.log(targetVersion, 'does not exist.');
        return;
    }

    console.log('Generating SUMMARY.md -> summary.json',targetVersion);
    await spawnCommand(`node ./scripts/create-sidebar.js ${targetVersion}/en/SUMMARY.md`,targetVersion);
    await spawnCommand(`node ./scripts/create-sidebar.js ${targetVersion}/zh/SUMMARY.md`,targetVersion);
    console.log('Generating SUMMARY.md -> summary.json Complete',targetVersion);
    await spawnCommand(`npx vitepress build ${targetVersion}`,targetVersion);
}

(async () => {
    const args = process.argv.slice(2);

    // 打印所有参数
    console.log('命令行参数:', args);

    const cmds = {};
    args.forEach((arg, index) => {
        const arr = arg.split('=');
        cmds[arr[0]] = arr[1];
    });

    const targetVersion = cmds['--version'];
    if (!targetVersion) {
        console.log('--version could\'t be null');
        return;
    }

    if(targetVersion == 'versions/all'){
        let files = fs.readdirSync('versions');
        files.forEach(file=>{
            file = 'versions/'+file;
            if(fs.statSync(file).isDirectory()){
                publishTargetVersion(file);
            }
        });
    }
    else{
        publishTargetVersion(targetVersion);
    }

})();
