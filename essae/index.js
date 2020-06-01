const SerialPort = require('serialport')
const ffi = require('ffi')

var EssaeScaleDLL = ffi.Library('/Users/ifmruser/Documents/Works/research/WeighingScaleService/essae/EssaeScaleDLL.dll', {
    'SA_Scale_GetWeight': [ 'string', [ 'string', 'string', 'string', 'string' ] ]
})
var availablePorts = null
SerialPort.list().then((portMeta) => availablePorts = portMeta)

module.exports = {
    getWeight: function() {
        if (!availablePorts) {
            return {error: "ports not loaded"}
        } else {
            return availablePorts
        }
        // return EssaeScaleDLL.SA_Scale_GetWeight("COM", availablePorts[0].path, null, null);
    }
}