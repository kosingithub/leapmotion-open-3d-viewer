/* jshint unused: false */
// TODO - tony - This line silences "options is defined but never used" warning,
// this flag and the unused var should be removed!!
(function (exports) {
    'use strict';
    exports.Navigator = function (viewer, options) {
        var viewerNavigator = viewer.navigator_, //
            move = viewerNavigator.drag.bind(viewerNavigator),
            zoom = viewerNavigator.scroll.bind(viewerNavigator),
            setOriginCameraAndModel = viewerNavigator.setOriginCameraAndModelRoot.bind(viewerNavigator);
        self = this;
        self.timeoutVar = null;
        self.cameraXInitialValue=0;
        self.statusVertically=0;
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
            self.statusVertically=-exports.o3v.navUI.MOVE_FACTOR;
            self.statusHorizontally=0;
            continuouslyMoveModel(move);
        };
        this.continuouslymoveModelRight = function () {
            this.stopModelMovement();
            self.statusVertically=exports.o3v.navUI.MOVE_FACTOR;
            self.statusHorizontally=0;
            continuouslyMoveModel(move);
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
            continuouslyMoveCameraModel(setOriginCameraAndModel);
        };
        this.continuouslymoveCameraRight = function () {
            this.stopModelMovement();
            self.statusHorizontally=-exports.o3v.navUI.MOVE_FACTOR;
            continuouslyMoveCameraModel(setOriginCameraAndModel);
        };
        this.continuouslymoveCameraUp = function () {
            this.stopModelMovement();
            self.statusVertically=0;
            self.statusHorizontally=-exports.o3v.navUI.MOVE_FACTOR;
            continuouslyMoveModel(move);
        };
        this.continuouslymoveCameraDown = function () {
            this.stopModelMovement();
            self.statusVertically=0;
            self.statusHorizontally=exports.o3v.navUI.MOVE_FACTOR;
            continuouslyMoveModel(move);
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
            self.statusVertically=0;
            self.statusHorizontally=exports.o3v.navUI.MOVE_FACTOR;
            continuouslyMoveModel(zoom);
        };
        this.continuouslymoveZoomOut = function () {
            this.stopModelMovement();
            self.statusVertically=0;
            self.statusHorizontally=-exports.o3v.navUI.MOVE_FACTOR;
            continuouslyMoveModel(zoom);
        };
        this.stopModelMovement = function () {
            clearTimeout(self.timeoutVar);
        };
        function continuouslyMoveModel(func, starts) {
            /* jshint validthis:true */
            // TODO - ariel - fix this, see comments on github, commit 2d2ef92d5e90619b26a087c871b64d5409c3cb89
            // after fix, delete the jshint flag!!!
            starts =(starts === undefined) ? 0: starts;
            func(self.statusVertically,self.statusHorizontally);
            if (starts <= 500) {
                self.timeoutVar = setTimeout(function () {
                    continuouslyMoveModel(func, ++starts);
                }, 80);
            }
        }
        function continuouslyMoveCameraModel(func, starts) {
            starts =(starts === undefined) ? 0: starts;
            self.cameraXInitialValue= self.statusHorizontally+self.cameraXInitialValue;
            func([self.cameraXInitialValue, -100, -100, 0, 100, 100]);
            if (starts <= 500) {
                self.timeoutVar = setTimeout(function () {
                    continuouslyMoveCameraModel(func, ++starts);
                }, 80);
            }
        }
    };
})(window);

