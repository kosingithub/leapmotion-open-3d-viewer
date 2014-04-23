/* jshint unused: false */
// TODO - tony - This line silences "options is defined but never used" warning,
// this flag and the unused var should be removed!!
(function(exports){
	//'use strict';
	exports.Navigator = function(viewer, options){
       var viewerNavigator = viewer.navigator_, //
       move = viewerNavigator.drag.bind(viewerNavigator);
       this.moveLeft = function (){
           //TODO move the MOVE_FACTOR to the app configs
           move(exports.o3v.navUI.MOVE_FACTOR, 0);
       }
       this.moveRight = function (){
           //TODO move the MOVE_FACTOR to the app configs
           move(-exports.o3v.navUI.MOVE_FACTOR, 0);
       }
       this.continuouslyMoveModelLeft = function (){
       	continuouslyMoveModel(500,0,"");
       }
       this.continuouslyMoveModelRight = function (){
       	continuouslyMoveModel(500,0,"-");
       }
       this.stopModelMovement =  function (){
       	clearTimeout(myVar);
       }
       function continuouslyMoveModel(a,b,kind){
       	move(kind+exports.o3v.navUI.MOVE_FACTOR, 0);
       	b++;
       	if(b<=a) myVar = setTimeout(function(){ continuouslyMoveModel(a,b,kind); },300);
       }
   } 
})(window);
