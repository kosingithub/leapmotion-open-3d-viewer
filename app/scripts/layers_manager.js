(function (exports) {
    'use strict';
    var layers;
    exports.LayersManager = function (viewer) {
        var _layerOpacityManager = viewer.layerOpacityManager_, //
            self = this;

        this.setLayerOpacity = function (layer, value, range) {
            _layerOpacityManager.setLayerOpacity(
                layer, value / range, function () {
                    console.log('change')
                });
        };

        layers =  {6:{hide:{capa:6},        //SKIN
                      show:{capa:6, value:10000, range:10000}},
                   5:{hide:{capa:5, value:0, range:10000},       //MUSCLE
                      show:{capa:5, value:10000, range:10000}},
                   4:{hide:{capa:4, value:0, range:10000},      //BONES
                      show:{capa:4, value:10000, range:10000}},
                   3:{hide:{capa:3, value:0, range:10000},       //ORGANS
                      show:{capa:3, value:10000, range:10000}},
                   2:{hide:{capa:2, value:0, range:10000},      //CIRCULATORY SYSTEM
                      show:{capa:2, value:10000, range:10000}},
                   1:{hide:{capa:1, value:0, range:10000},      //LYMPHATIC SYSTEM
                      show:{capa:1, value:10000, range:10000}},
                   0:{hide:{capa:0, value:0, range:10000},      //NERVOUS SYSTEM
                      show:{capa:0, value:10000, range:10000}}};

         this.hideLayers = function(layer){
                for(var i=0; i<=layer.length; i++){
                    //if statement goes here, validates  param has undefined  or unmatched element
                    var turnOff = layers[layer[i]].hide;
                    _layerOpacityManager.setLayerOpacity(turnOff.capa, 0, 10000);
                }
             };
         this.showLayer = function(layer){
             for(var i=0; i<=layer.length; i++){

                 var turnOn = layers[layer[i]].show;
                 _layerOpacityManager.setLayerOpacity(turnOn.capa, 10000,10000);
             }
         };


    }

})

    (window);

        //this.layersManager = new LayersManager(this._viewer,options);
        //the layersManager should have at least the following methods
        //setLayerUiVisibility(:boolean)
        //showLayers(layers:array)
        //hideLayers(layers:array)