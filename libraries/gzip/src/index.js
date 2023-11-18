/**
 * 对目录中所有文件以递归方式进行gzip压缩
 */
const fs = require('fs');
const path = require('path');
const { createGzip } = require('zlib');
const { pipeline } = require('stream');
 
const gzip = function (dir) {
    const gzipDir = function (dir) {
        const list = fs.readdirSync(dir);
        list.forEach((file) => {
            const filePath = path.resolve(dir, file);
            const stat = fs.lstatSync(filePath);
            // 如果是否，则对该目录所有文件继续做gzip压缩
            if (stat.isDirectory()) {
                gzipDir(filePath);
            } else {
                // 源文件绝对路径
                const srcPath = path.resolve(dir, file);
                // 目标文件绝对路径
                const destPath = `${srcPath}.tar.gz`;
                const gzip = createGzip();
                const rs = fs.createReadStream(srcPath);
                const ws = fs.createWriteStream(destPath);
                pipeline(rs, gzip, ws, (err) => {
                    if (err) {
                        console.error(err);
                        process.exitCode = 1;
                    } else {
                        // 将文件名改回去
                        fs.renameSync(destPath, srcPath);
                    }
                });
            }
        });
    };
    // 触发执行对dir目录下所有文件进行gzip压缩
    gzipDir(dir);
};
 
module.exports = gzip;