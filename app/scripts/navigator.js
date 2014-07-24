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
        var self = this;
        var viewerContentManager = viewer.contentManager_;
        self.timeoutVar          = 0;
        self.cameraXInitialValue = 0;
        self.statusVertically    = 0;
        self.statusHorizontally  = 0;

        this.spinModelLeft = function () {
            move(-options.MOVEMENT.TRANSLATION_HORIZONTAL_FACTOR, 0);
        };

        this.spinModelRight = function () {
            move(options.MOVEMENT.TRANSLATION_HORIZONTAL_FACTOR, 0);
        };

        this.continuouslySpinModelLeft = function () {
            this.stopModelMovement();
            self.statusVertically   = -options.MOVEMENT.SPIN_HORIZONTAL_FACTOR;
            self.statusHorizontally = 0;
            continuouslyMoveModel(move);
        };

        this.continuouslySpinModelRight = function () {
            this.stopModelMovement();
            self.statusVertically   = options.MOVEMENT.SPIN_HORIZONTAL_FACTOR;
            self.statusHorizontally = 0;
            continuouslyMoveModel(move);
        };

        this.moveCameraLeft = function () {
            self.cameraXInitialValue += options.MOVEMENT.TRANSLATION_HORIZONTAL_FACTOR;
            setOriginCameraAndModel([self.cameraXInitialValue, -100, -100, 0, 100, 100]);
        };

        this.moveCameraRight = function () {
            self.cameraXInitialValue += -options.MOVEMENT.TRANSLATION_HORIZONTAL_FACTOR;
            setOriginCameraAndModel([self.cameraXInitialValue, -100, -100, 0, 100, 100]);
        };

        this.moveCameraUp = function () {
            move(0, -options.MOVEMENT.TRANSLATION_VERTICAL_FACTOR);
        };

        this.moveCameraDown = function () {
            move(0, options.MOVEMENT.TRANSLATION_VERTICAL_FACTOR);
        };

        this.continuouslyMoveCameraLeft = function () {
            this.stopModelMovement();
            self.statusHorizontally = options.MOVEMENT.TRANSLATION_HORIZONTAL_FACTOR;
            continuouslyMoveCameraModel(setOriginCameraAndModel);
        };

        this.continuouslyMoveCameraRight = function () {
            this.stopModelMovement();
            self.statusHorizontally = -options.MOVEMENT.TRANSLATION_HORIZONTAL_FACTOR;
            continuouslyMoveCameraModel(setOriginCameraAndModel);
        };

        this.continuouslyMoveCameraUp = function () {
            this.stopModelMovement();
            self.statusVertically   = 0;
            self.statusHorizontally = -options.MOVEMENT.TRANSLATION_VERTICAL_FACTOR;
            continuouslyMoveModel(move);
        };

        this.continuouslyMoveCameraDown = function () {
            this.stopModelMovement();
            self.statusVertically   = 0;
            self.statusHorizontally = options.MOVEMENT.TRANSLATION_VERTICAL_FACTOR;
            continuouslyMoveModel(move);
        };

        
        this.zoomIn = function () {
            zoom(0, options.MOVEMENT.ZOOM_FACTOR);
        };

        this.zoomOut = function () {
            zoom(0, -options.MOVEMENT.ZOOM_FACTOR);
        };

        this.continuouslyZoomIn = function () {
            this.stopModelMovement();
            self.statusVertically   = 0;
            self.statusHorizontally = options.MOVEMENT.ZOOM_FACTOR;
            continuouslyMoveModel(zoom);
        };

        this.continuouslyZoomOut = function () {
            this.stopModelMovement();
            self.statusVertically   = 0;
            self.statusHorizontally = -options.MOVEMENT.ZOOM_FACTOR;
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
            self.cameraXInitialValue += self.statusHorizontally;
            func([self.cameraXInitialValue, -100, -100, 0, 100, 100]);
            if (starts <= 500) {
                self.timeoutVar = setTimeout(function () {
                    continuouslyMoveCameraModel(func, ++starts);
                }, 80);
            }
        }
    };
})(window);

