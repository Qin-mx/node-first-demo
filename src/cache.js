const {cache} = require('./defaultConfig');
function init(stats , res){
    // 初始化
    const {maxAge, expires, cacheControl,lastModified, etag} = cache;

    if( expires ){
        res.setHeader('Expires',new Date((Date.now() + maxAge * 1000)).toUTCString() )
    }

    if( cacheControl ){
        res.setHeader('Cache-Control',`public, max-age=${maxAge}` )
    }

    if( lastModified ){
        res.setHeader('Last-Modified', stats.mtime.toUTCString() )
    }
    if( etag ){
        res.setHeader('ETag', `${stats.size}` )
    }

}

module.exports = function isFresh(stats,req,res){
    init(stats,res);
    const lasrModified = req.headers['if-modified-since'];
    const etag = req.headers['if-none-match'];
    if(!lasrModified && !etag){
        return false
    }

    if(lasrModified && lasrModified !== res.getHeader('Last-Modified')){
        return false
    }

    if(etag && etag !== res.getHeader('ETag')){
        return false
    }

    return true;
}
