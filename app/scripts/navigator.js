//* jshint unused: false */
// TODO - tony - This line silences "options is defined but never used" warning,
// this flag and the unused var should be removed!!
(function (exports) {
    'use strict';
    exports.Navigator = function (viewer, options) {
        var viewerNavigator = viewer.navigator_, //
            move = viewerNavigator.drag.bind(viewerNavigator);
        var zoom = viewerNavigator.scroll.bind(viewerNavigator);
        var setOriginCameraAndModel = viewerNavigator.setOriginCameraAndModelRoot.bind(viewerNavigator);
        self.timeoutVar = null;
        self.cameraXInitialValue=0;
        self.statusHorizontally=0;
        //TODO move the MOVE_FACTOR to the app configs
        this.moveLeft = function () {
            move(-exports.o3v.navUI.MOVE_FACTOR, 0);
        };
        this.moveRight = function () {
            move(exports.o3v.navUI.MOVE_FACTOR, 0);
        };
        this.continuouslymoveModelLeft = function () {
            this.stopModelMovement();
            continuouslyMoveModel(move, [-exports.o3v.navUI.MOVE_FACTOR, 0]);
        };
        this.continuouslymoveModelRight = function () {
            this.stopModelMovement();
            continuouslyMoveModel(move, [exports.o3v.navUI.MOVE_FACTOR, 0]);
        };
        this.changeCamera = function (x, y, z) {
            viewerNavigator.camera.eye[0] = x;
            viewerNavigator.camera.eye[1] = y;
            viewerNavigator.camera.eye[2] = z;
            viewerNavigator.reset(true);
        };
        this.moveCameraLeft = function () {
            self.cameraXInitialValue=exports.o3v.navUI.MOVE_FACTOR+self.cameraXInitialValue;
            setOriginCameraAndModel([self.cameraXInitialValue, -100, -100, 0, 100, 100]);
        };
        this.moveCameraRight = function () {
            self.cameraXInitialValue=-exports.o3v.navUI.MOVE_FACTOR+self.cameraXInitialValue;
            setOriginCameraAndModel([self.cameraXInitialValue, -100, -100, 0, 100, 100]);
        };
        this.moveCameraUp = function () {
            move(0, -exports.o3v.navUI.MOVE_FACTOR);
        };
        this.moveCameraDown = function () {
            move(0, exports.o3v.navUI.MOVE_FACTOR);
        };
        this.continuouslymoveCameraLeft = function () {
            this.stopModelMovement();
            self.statusHorizontally=exports.o3v.navUI.MOVE_FACTOR;
            continuouslyMoveModel(setOriginCameraAndModel,[self.cameraXInitialValue, -100, -100, 0, 100, 100]);
        };
        this.continuouslymoveCameraRight = function () {
            this.stopModelMovement();
            self.statusHorizontally=-exports.o3v.navUI.MOVE_FACTOR;
            continuouslyMoveModel(setOriginCameraAndModel,[self.cameraXInitialValue, -100, -100, 0, 100, 100]);
        };
        this.continuouslymoveCameraUp = function () {
            this.stopModelMovement();
            continuouslyMoveModel(move, [0, -exports.o3v.navUI.MOVE_FACTOR]);
        };
        this.continuouslymoveCameraDown = function () {
            this.stopModelMovement();
            continuouslyMoveModel(move, [0, exports.o3v.navUI.MOVE_FACTOR]);
        };
        //TODO move the ZOOM_FACTOR to the app configs
        this.moveZoomIn = function () {
            zoom(0, exports.o3v.navUI.ZOOM_FACTOR);
        };
        this.moveZoomOut = function () {
            zoom(0, -exports.o3v.navUI.ZOOM_FACTOR);
        };
        this.continuouslymoveZoomIn = function () {
            this.stopModelMovement();
            continuouslyMoveModel(zoom, [0, exports.o3v.navUI.MOVE_FACTOR]);
        };
        this.continuouslymoveZoomOut = function () {
            this.stopModelMovement();
            continuouslyMoveModel(zoom, [0, -exports.o3v.navUI.MOVE_FACTOR]);
        };
        this.stopModelMovement = function () {
            clearTimeout(self.timeoutVar);
        };
        function continuouslyMoveModel(func, args, starts) {
            if (starts === undefined) { starts = 0; }
            if(setOriginCameraAndModel===func){
               self.cameraXInitialValue= self.statusHorizontally+self.cameraXInitialValue;
               arguments[1][0]=self.cameraXInitialValue;
               func(arguments[1]);
            }else{ func.apply(this,arguments[1]); }
            if (starts <= 500){ self.timeoutVar = setTimeout(function () { continuouslyMoveModel(func, args, ++starts); }, 80); }
        };

    };
})(window);
