const ffi = require('ffi')

var EssaeScaleDLL = ffi.Library('/Users/ifmruser/Documents/Works/research/WeighingScaleService/essae/EssaeScaleDLL.dll', {
    'SA_Scale_GetWeight': [ 'string', [ 'string', 'string', 'string', 'string' ] ]
})
module.exports = function(config) {
    var config = config
    return {
        getWeight: function() {
            return EssaeScaleDLL.SA_Scale_GetWeight("COM", config.serialPortName, null, null);
        }
    }
}