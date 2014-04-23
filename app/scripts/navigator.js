/* jshint unused: false */
// TODO - tony - This line silences "options is defined but never used" warning,
// this flag and the unused var should be removed!!
(function(exports){
	//'use strict';
  var myVar=null;
	exports.Navigator = function(viewer, options){
           var viewerNavigator = viewer.navigator_, //
       move = viewerNavigator.drag.bind(viewerNavigator);
       zoom = viewerNavigator.scroll.bind(viewerNavigator);
       //TODO move the MOVE_FACTOR to the app configs
                               //////////////
                               //MoveModels//
                               //////////////
       this.moveLeft = function (){
           move(-exports.o3v.navUI.MOVE_FACTOR, 0);
       }
       this.moveRight = function (){
           move(exports.o3v.navUI.MOVE_FACTOR, 0);
       }
                               /////////////////////////
                               //ContinuouslyMoveModel//
                               /////////////////////////
       this.continuouslyMoveModelLeft = function (){
        this.stopModelMovement();
       	continuouslyMoveModel(move,-exports.o3v.navUI.MOVE_FACTOR,0);
       }
       this.continuouslyMoveModelRight = function (){
        this.stopModelMovement();
       	continuouslyMoveModel(move,exports.o3v.navUI.MOVE_FACTOR,0);
       }
                               //////////////
                               //MoveCamera//
                               //////////////
        this.moveCameraTop = function (){
           move(0, -o3v.navUI.MOVE_FACTOR);
       }
        this.moveCameraDown = function (){
           move(0, o3v.navUI.MOVE_FACTOR);
       }
                               //////////////////////////
                               //ContinuouslyMoveCamera//
                               //////////////////////////
        this.continuouslymoveCameraTop = function (){
        this.stopModelMovement();
        continuouslyMoveModel(move,0, -exports.o3v.navUI.MOVE_FACTOR);
       }
       this.continuouslymoveCameraDown = function (){
        this.stopModelMovement();
        continuouslyMoveModel(move,0, exports.o3v.navUI.MOVE_FACTOR);
       }
                               ////////////
                               //MoveZoom//
                               ////////////
        //TODO move the ZOOM_FACTOR to the app configs
        this.moveZoomIn = function (){
          zoom(0, o3v.navUI.ZOOM_FACTOR);
       }
        this.moveZoomOut = function (){
          zoom(0, -o3v.navUI.ZOOM_FACTOR);
       }
                               ////////////////////////
                               //ContinuouslyMoveZoom//
                               ////////////////////////
        this.continuouslymoveZoomIn = function (){
        this.stopModelMovement();
        continuouslyMoveModel(zoom,0, exports.o3v.navUI.MOVE_FACTOR);
       }
       this.continuouslymoveZoomOut = function (){
        this.stopModelMovement();
        continuouslyMoveModel(zoom,0, -exports.o3v.navUI.MOVE_FACTOR);
        
       }
                               ////////////////////
                               //DynamicMoveModel//
                               ////////////////////
        this.stopModelMovement =  function (){
        clearTimeout(myVar);
       }
        function continuouslyMoveModel(functions,kind1,kind2,starts){
        if(starts===undefined) starts=0;
        functions(kind1, kind2);
        if(starts<=500) myVar = setTimeout(function(){ continuouslyMoveModel(functions,kind1,kind2,++starts); },80);
       }
   } 
})(window);

