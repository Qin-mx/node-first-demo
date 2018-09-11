const promisify = require('util').promisify;
const fs = require('fs')
const path = require('path')
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const Handlebars = require('handlebars');
const tplPath = path.join(__dirname,'../src/template/dir.tpl'); 
const source = fs.readFileSync(tplPath,'utf8'); // 因为只需要一次，就可以使用缓存了
const template = Handlebars.compile(source);
const mime = require('./mime.js');
const compress = require('./compress.js')
const range = require('./range.js');
const isFresh = require('./cache.js')

module.exports = async function(req,res,filePath,config){
    try{
        const status = await stat(filePath);
        if( status.isFile()){
            const contentTpe = mime(filePath)
            
            res.setHeader('Content-Type',contentTpe);
            console.log(isFresh(status, req, res))
            if(isFresh(status, req, res)) {
                res.statusCode = 304;
                res.end();
                return;
            }

            // res.statusCode = 200;
            let rs;
            const {code ,start ,end} = range( status.size, req, res);

            if(code == 200 ){
                rs = fs.createReadStream( filePath );
            }else{
                rs = fs.createReadStream( filePath ,{start,end}); // 获得部分
            }
            
            if(filePath.match(config.compress)){
                rs = compress(rs,req,res)
            }
            rs.pipe(res)
        }else if(status.isDirectory){
            // 如果是文件目录
                const files = await readdir(filePath)
                res.statusCode = 200;
                res.setHeader('Content-Type','text/html');
                // 处理路径
                const dir = path.relative(config.root,filePath)
                const data = {
                    title: path.basename(filePath),
                    dir: dir ? `/${dir}`: '',
                    files: files.map(file => {
                        return {
                            file,
                            icon: mime(file)
                        }
                    }),
                }
                res.end(template(data))
        }
    }catch(err){
        res.statusCode = 400;
        res.setHeader('Content-Type','text/plain');
        res.end(`${filePath} is Error \n ${err.toString()}`)
    }
}