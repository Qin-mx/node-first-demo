const http = require('http');
const chalk = require('chalk'); // 让文字好看点
const path = require('path');
const route = require('./src/router.js');
const conf = require('./src/defaultConfig.js');
const openUrl = require('./src/openUrl')

class Server {
    constructor (config) {
        console.log(config)
        this.conf = Object.assign( {}, conf,config);
        // console.log(this.conf)
    }

    start() {
        const server = http.createServer( (req,res)=>{
            const filePath = path.join(this.conf.root,req.url); // 当前目录
            route(req,res,filePath,this.conf)
        
        })
        
        server.listen(this.conf.port,this.conf.hostnmae,()=>{
            const addr = `http://${this.conf.hostname}:${this.conf.port}`;
            console.info(`Server started at ${chalk.green(addr)}`)
            openUrl(addr)
        })
    }
}

module.exports = Server

