const { createGzip, createdDeflate} = require('zlib');
module.exports = (rs, req, res ) => {
    const acceptEncoding = req.headers['accept-encoding']; // 支持哪几种压缩模式
    if(!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
        // 不支持
        return rs 
    } else if(acceptEncoding.match(/\bgzip\b/)) {
        res.setHeader('Content-Encoding','gzip');
        return rs.pipe(createGzip())
    }else if(acceptEncoding.match(/\deflate\b/)){
        res.setHeader('Content-Encoding','deflate');
        return rs.pipe(createdDeflate())
    }
}