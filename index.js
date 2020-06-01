const http = require('http')
var inquirer = require('inquirer')
inquirer.prompt({
    
})


var vendor = 'essae'
const wsDevice = require('./'+vendor+'/index.js')

function getWeight() {
    return { weight: wsDevice.getWeight() }
}

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'})
    function writeJson(json) {
        res.write(JSON.stringify(json))
    }
    var url = req.url
    switch (url) {
        case '/getWeight':
            writeJson(getWeight())
            break;
        default:
            writeJson({"error": "No valid operation performed"})
    }
    res.end()
}).listen(3003, '127.0.0.1')
console.log('WSS server running on 127.0.0.1:3003')