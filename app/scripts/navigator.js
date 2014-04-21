(function(exports){
   exports.Navigator = function(viewer, options){
       var viewerNavigator = viewer.navigator_, //
           move = viewerNavigator.drag.bind(viewerNavigator);


       this.moveLeft = function (){
           //TODO move the MOVE_FACTOR to the app configs
           move(-exports.o3v.navUI.MOVE_FACTOR, 0);
       }
   }
})(window);