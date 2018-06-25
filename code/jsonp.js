const http = require('http');
const urlObj = require('url');
const server = http.createServer();

server.on('request', function (req, res) {
    const { pathname: url, query } = urlObj.parse(req.url,true);
    if (url === '/getInfo') {
        var data = {
            name: '万晓丽',
            age: 30,
            gender: '男'
        };
        var scriptStr = `${query.callback}()`;
        res.end(scriptStr);
    } else {
        res.end('404');
    }
})

server.listen(3000, function () {
    console.log('running...');
})