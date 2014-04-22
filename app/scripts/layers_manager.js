(function (exports) {
    'use strict';

    exports.LayersManager = function (viewer) {
        var _layerOpacityManager = viewer.layerOpacityManager_, //
            self = this;

        this.setLayerOpacity = function (layer, value, range) {
            _layerOpacityManager.setLayerOpacity(
                layer, value / range, function () {
                    console.log('change')
                });
        };
    }

})
    (window);