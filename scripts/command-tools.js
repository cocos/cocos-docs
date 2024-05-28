import { exec } from 'child_process';
import process from 'process';
import fs, { linkSync } from 'fs';
import path from 'path';
import { dir } from 'console';

export const spawnCommand = (command, targetVersion) => {
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

export const parseCommands = () => {
    const args = process.argv.slice(2);

    // 打印所有参数
    console.log('命令行参数:', args);

    const cmds = {};
    args.forEach((arg, index) => {
        const arr = arg.split('=');
        cmds[arr[0]] = arr[1];
    });

    return cmds;
}

function readDirSync(directoryPath) {
    return new Promise((resolve, reject) => {
        // 读取文件夹内容
        fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
            if (err) {
                console.error(`Failed to list contents of directory: ${err}`);
                reject();
                return;
            }
            resolve(files);
        });
    });
}

function readFileSync(fullPath) {
    return new Promise((resolve, reject) => {
        fs.readFile(fullPath, (err, data) => {
            if (err) {
                reject();
                return;
            }
            resolve(data);
        });
    });
}

function writeFileSync(fullPath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fullPath, data, (err) => {
            if (err) {
                console.log(err);
                reject();
            }
            resolve(true);
        });
    });
}

export const replaceAPIDOCbyUrl = async (directoryPath, url) => {
    let files = await readDirSync(directoryPath);
    if (!files) {
        return false;
    }

    for (let i = 0; i < files.length; ++i) {
        let file = files[i];
        const fullPath = path.join(directoryPath, file.name);
        if (file.isDirectory()) {
            let ret = await replaceAPIDOCbyUrl(fullPath, url);
            if (!ret) {
                return false;
            }
        }
        else if (fullPath.indexOf('.js') != -1 || fullPath.indexOf('.html') != -1) {
            let data = await readFileSync(fullPath);
            if (!data) {
                console.log(fullPath);
                return false;
            }

            data = data.toString();
            let dirty = false;
            let KEY = './__APIDOC__';
            while (true) {
                let index = data.indexOf(KEY);
                if (index == -1) {
                    break;
                }
                data = data.replace(KEY, url);
                dirty = true;
            }

            if (dirty) {
                console.log(`File: ${fullPath}`);
                let ret = await writeFileSync(fullPath, data);
                if (!ret) {
                    return false;
                }
            }
        }
    }
    return true;
}

export const formatAPIDOC = async (directoryPath) => {
    let files = await readDirSync(directoryPath);
    if (!files) {
        return false;
    }
    for (let i = 0; i < files.length; ++i) {
        let file = files[i];
        const fullPath = path.join(directoryPath, file.name);
        if (file.isDirectory()) {
            let ret = await formatAPIDOC(fullPath);
            if (!ret) {
                return false;
            }
        }
        else if (fullPath.indexOf('.md') != -1 ) {
            let data = await readFileSync(fullPath);
            if (!data) {
                console.log('can not read',fullPath);
                break;
            }

            data = data.toString();
            let dirty = false;
            let KEY = '__APIDOC__';
            let lines = data.split('\n');
            for(let i = 0; i < lines.length; ++i){
                let line = lines[i];
                let index = line.indexOf(KEY);
                if (index != -1 && line[index -1] == '(') {
                    line = line.replace(KEY, '%__APIDOC__%');
                    lines[i] = line;
                    dirty = true;
                }
            }

            if (dirty) {
                console.log(`File: ${fullPath}`);
                data = lines.join('\n');
                let ret = await writeFileSync(fullPath, data);
                if (!ret) {
                    console.log('write failed:',fullPath);
                    return false;
                }
            }
        }
    }
    return true;
}