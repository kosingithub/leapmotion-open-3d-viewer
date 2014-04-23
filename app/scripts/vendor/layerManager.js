(function(exports){
   exports.layerManager = function(viewer, options){
       var viewerNavigator = viewer.navigator_, //
           move = viewerNavigator.drag.bind(viewerNavigator);

           this.setLayerUiVisibility = function(:boolean)
                 this.showLayers = function(layers:array)
                 this.hideLayers = function(layers:array)
       this.moveLeft = function (){
           //TODO move the MOVE_FACTOR to the app configs
           move(-exports.o3v.navUI.MOVE_FACTOR, 0);
       }
   }
})(window);