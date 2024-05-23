import { symlink , readdir, stat, lstat} from 'node:fs/promises';
import { existsSync } from 'node:fs'
import { resolve, } from 'node:path'

const root = process.cwd();
const source = resolve(root, 'public');

const versions = await readdir(resolve(root, './versions'));

for (const version of versions) {
    const _stat = await stat(resolve(root, './versions', version));
    if(_stat.isDirectory() && /^\d+(\.\d+){1,2}$/.test(version)) {
        const target = resolve(root, './versions', version, 'public');
        if(existsSync(target)) {
            // lstat 才会判断软连接本身， stat 会判断软连接对应的目标
            if((await lstat(target)).isSymbolicLink()) {
                console.log(target + ': is a symbolicLikn.')
            } else {
                console.log(target + ': is already exist.')
            }
        } else {
            symlink(source, target, 'dir');
        }
    }
}

// 废弃软连接的方式，因为 gitignore 无法忽略软连接，会增加使用的理解成本。