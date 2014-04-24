/* jshint unused: false */
// TODO - tony - This line silences "options is defined but never used" warning,
// this flag and the unused var should be removed!!
(function (exports) {
    'use strict';
    var timeoutVar = null;

    exports.Navigator = function (viewer, options) {
        var viewerNavigator = viewer.navigator_, //
            move = viewerNavigator.drag.bind(viewerNavigator);
        var zoom = viewerNavigator.scroll.bind(viewerNavigator);
        //TODO move the MOVE_FACTOR to the app configs
        this.moveLeft = function () {
            move(-exports.o3v.navUI.MOVE_FACTOR, 0);
        };

        this.moveRight = function () {
            move(exports.o3v.navUI.MOVE_FACTOR, 0);
        };

        this.continuouslyMoveModelLeft = function () {
            this.stopModelMovement();
            continuouslyMoveModel(move, -exports.o3v.navUI.MOVE_FACTOR, 0);
        };

        this.continuouslyMoveModelRight = function () {
            this.stopModelMovement();
            continuouslyMoveModel(move, exports.o3v.navUI.MOVE_FACTOR, 0);
        };

        this.changeCamera = function (x, y, z) {
            viewerNavigator.camera.eye[0] = x;
            viewerNavigator.camera.eye[1] = y;
            viewerNavigator.camera.eye[2] = z;
            viewerNavigator.reset(true);
        };

        this.moveCameraTop = function () {
            move(0, -exports.o3v.navUI.MOVE_FACTOR);
        };

        this.moveCameraDown = function () {
            move(0, exports.o3v.navUI.MOVE_FACTOR);
        };

        this.continuouslymoveCameraTop = function () {
            this.stopModelMovement();
            continuouslyMoveModel(move, 0, -exports.o3v.navUI.MOVE_FACTOR);
        };

        this.continuouslymoveCameraDown = function () {
            this.stopModelMovement();
            continuouslyMoveModel(move, 0, exports.o3v.navUI.MOVE_FACTOR);
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
            continuouslyMoveModel(zoom, 0, exports.o3v.navUI.MOVE_FACTOR);
        };

        this.continuouslymoveZoomOut = function () {
            this.stopModelMovement();
            continuouslyMoveModel(zoom, 0, -exports.o3v.navUI.MOVE_FACTOR);
        };

        this.stopModelMovement = function () {
            clearTimeout(timeoutVar);
        };

        function continuouslyMoveModel(functions, xAxisTranslate, yAxisTranslate, starts) {
            if (starts === undefined) { starts = 0; }
            functions(xAxisTranslate, yAxisTranslate);
            if (starts <= 500){ timeoutVar = setTimeout(function () { continuouslyMoveModel(functions, xAxisTranslate, yAxisTranslate, ++starts); }, 80); }
        }
    };
})(window);
