const http = require('http')
const SerialPort = require('serialport')
var inquirer = require('inquirer')

// config
var httpPort = 3003
var vendor = 'essae'
var availablePorts = null
var config = {
    serialPortName: null
}

SerialPort.list().then((portMeta) => {
    availablePorts = portMeta
    inquirer.prompt({
        type: 'list',
        name: 'serialPortName',
        message: 'Weighing scale serial port:',
        default: availablePorts[0].path,
        choices: availablePorts.map(p => { return {name: p.path} })
    }).then(result => {
        config.serialPortName = result.serialPortName
        console.log('WSS server running on http://127.0.0.1:'+httpPort)
    })
})

const wsDevice = require('./'+vendor+'/index.js')(config)
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
            writeJson({"message": "Weighing scale connected on serial port: " + config.serialPortName})
    }
    res.end()
}).listen(httpPort, '127.0.0.1')