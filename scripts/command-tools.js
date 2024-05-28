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