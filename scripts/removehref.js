import fs from 'fs';
import path from 'path';

function traverseDirectory(directoryPath) {
    // 读取文件夹内容
    fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error(`Failed to list contents of directory: ${err}`);
            return;
        }

        // 遍历每个文件或文件夹
        files.forEach((file) => {
            const fullPath = path.join(directoryPath, file.name);

            if (file.isDirectory()) {
                // 如果是文件夹，递归遍历
                console.log(`Directory: ${fullPath}`);
                traverseDirectory(fullPath);
            } else {
                if (fullPath.indexOf('.md') != -1) {
                    fs.readFile(fullPath, (err, data) => {
                        let lines = data.toString().split("\n");
                        let dirty = false;
                        for (let i = 0; i < lines.length; ++i) {
                            let line = lines[i];
                            let index = line.indexOf('><img src=');
                            if (index != -1) {
                                line = line.substring(index + 1, line.length - 4);
                                lines[i] = line;
                                dirty = true;
                            }
                        }
                        if (dirty) {
                            let newStr = lines.join('\n');
                            console.log(newStr);
                            console.log(`File: ${fullPath}`);
                            fs.writeFile(fullPath, newStr,(err)=>{
                                if(err){
                                    console.log(err);
                                }
                            });
                        }
                    });
                }
            }
        });
    });
}

// 指定要遍历的文件夹路径
const directoryPath = path.join('./', './versions/2.4');

// 调用函数遍历指定文件夹
traverseDirectory(directoryPath);