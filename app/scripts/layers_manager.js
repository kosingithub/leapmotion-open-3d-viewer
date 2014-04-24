(function (exports) {
    'use strict';

    exports.LayersManager = function (viewer) {
        var _layerOpacityManager = viewer.layerOpacityManager_;
        var _layers = {
            SKIN:   6,
            MUSCLE: 5,
            BONES:  4,
            ORGANS: 3,
            CIRCULATORY_SYSTEM: 2,
            LYMPHATIC_SYSTEM:   1,
            NERVOUS_SYSTEM:     0
        };
        this.getLayer = function (layer) {
            return _layers[layer];
        };

        this.setLayerUiVisibility = function (isVisible) {
            if (isVisible) {
                //set visibility to ALL
            }
        };

        this.hideLayers = function (layers)
        {
            var layer, //
                updateCallback = function () {
                    console.log('hidden layer : ' + layer);
                };
            for (var i = 0; i < layers.length; i++) {
                layer = layers[i];
                _layerOpacityManager.setLayerOpacity(layer, 0 / 10000, updateCallback);
            }
        };

        this.showLayers = function (layers) {
            var layer,  //
                updateCallback = function () {
                    console.log('hidden layer : ' + layer);
                };
            //TODO implement this loop only once, this code is similar to the hide layers
            for (var i = 0; i < layers.length; i++) {
                layer = layers[i];
                _layerOpacityManager.setLayerOpacity(layer, 10000 / 10000, updateCallback);
            }
        };
    };
})(window);

//this.layersManager = new LayersManager(this._viewer,options);
//the layersManager should have at least the following methods
//setLayerUiVisibility(:boolean)
//showLayers(layers:array)
//hideLayers(layers:array)