(function (exports) {
    'use strict';

    exports.LayersManager = function (viewer) {
        var _layerOpacityManager = viewer.layerOpacityManager_;

        this.SKIN = 6;
        this.MUSCLE = 5;
        this.BONES = 4;
        this.ORGANS = 3;
        this.CIRCULATORY_SYSTEM = 2;
        this.LYMPHATIC_SYSTEM = 1;
        this.NERVOUS_SYSTEM = 0;

        this.hideLayers = function (layers) {
            var layer,  //
                updateCallback = function () {
                    console.log('hidden layer : ' + layer);
                };
            for (var i = 0; i < layers.length; i++) {
                layer = layers[i];
                _layerOpacityManager.setLayerOpacity(
                    layer, 0 / 10000,updateCallback);

            }
        };
        this.showLayers = function (layers) {
            var layer,  //
                updateCallback = function () {
                    console.log('hidden layer : ' + layer);
                };
            //TODO implemnt this loop only once, this code is similar to the hide layers
            for (var i = 0; i < layers.length; i++) {
                layer = layers[i];
                _layerOpacityManager.setLayerOpacity(
                    layer, 10000 / 10000, updateCallback);
            }
        };
    };
})

    (window);

//this.layersManager = new LayersManager(this._viewer,options);
//the layersManager should have at least the following methods
//setLayerUiVisibility(:boolean)
//showLayers(layers:array)
//hideLayers(layers:array)