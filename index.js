const yargs = require('yargs')
const Server = require('./app.js');
const argv = yargs
    .usage('anywhere [options]')
    .option('p',{
        alias: 'port',
        describe: '端口号',
        default: 9527
    })
    .option('h',{
        alias: 'hostname',
        describe: 'host',
    })
    .option('d',{
        alias: 'root',
        describe: 'root',
        default: process.cwd()
    })
    .version()
    .alias('v','version')
    .help()
    .argv;

    const server = new Server(argv);
    server.start()