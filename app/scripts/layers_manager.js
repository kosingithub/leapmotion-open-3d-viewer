(function (exports) {
    'use strict';

    exports.LayersManager = function (viewer) {
        var _layerOpacityManager = viewer.layerOpacityManager_;
        var turn=false;

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

        this.setLayerUiVisibility = function () {
            if (turn) {
                $('div').show(300);
                $('#help').hide();
                $('#facebox').hide();
            }else{
                $('div').hide();
            }
            turn = !turn;
        };
        var layerStatus=0;
        this.toggleLayers = function (layers) {

            var layer;// 
            for (var i = 0; i < layers.length; i++) {
                layer = layers[i];
                _layerOpacityManager.setLayerOpacity(layer, layerStatus);//     
            }
            layerStatus = layerStatus === 0 ? 1 : 0;
        };
    };
})(window);

//this.layersManager = new LayersManager(this._viewer,options);
//the layersManager should have at least the following methods
//setLayerUiVisibility(:boolean)
//showLayers(layers:array)
//hideLayers(layers:array)