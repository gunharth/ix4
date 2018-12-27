const http = require('http')
const port = 3001
const fs = require('fs');

const urls = [
    'hello-world.html'
];

const requestHandler = (req, res) => {
    console.log(req.url)
    if (urls.includes(req.url.substr(1))) {
        fs.readFile(req.url.substr(1), 'utf-8', function (error, data) {
            if (error) {
                console.error('Ouch:', error);
            } else {
                res.setHeader("content-type", "text/html");
                res.write(data);
                res.end();
            }
        });
    } else {
        res.statusCode = 404;
        // res.writeHead('404');
        res.write('404');
        res.end();
    }
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})
