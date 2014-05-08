(function (exports) {
    'use strict';
    exports.Navigator = function (viewer, options) {
        //Leap Motion Handler
        var ctrl = '';
        /* jshint ignore:start */
        ctrl = new Leap.Controller({enableGestures:true}); // jshint ignore:line
        /* jshint ignore:end */
        var leapHandler = {
            circle: ctrl.gesture('circle'),
            direction: 0,
            clockwise: false
        };

        var viewerNavigator = viewer.navigator_, //
            move = viewerNavigator.drag.bind(viewerNavigator),
            zoom = viewerNavigator.scroll.bind(viewerNavigator),
            setOriginCameraAndModel = viewerNavigator.setOriginCameraAndModelRoot.bind(viewerNavigator);
        var self = this;
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
            starts =(starts === undefined) ? 0: starts;
            func(self.statusVertically,self.statusHorizontally);
            if (starts <= 500) {
                self.timeoutVar = setTimeout(function () {
                    continuouslyMoveModel(func, ++starts);
                }, 80);
            }
        }

        function continuouslyMoveCameraModel(func, starts) {
            starts = (starts === undefined) ? 0: starts;
            self.cameraXInitialValue += self.statusHorizontally;
            func([self.cameraXInitialValue, -100, -100, 0, 100, 100]);
            if (starts <= 500) {
                self.timeoutVar = setTimeout(function () {
                    continuouslyMoveCameraModel(func, ++starts);
                }, 80);
            }
        }

        function onCircle(gesture,frame){
            if(gesture.type === 'circle' && gesture.state === 'stop'){
                leapHandler.direction = frame.finger(gesture.pointableIds[0]).direction;
                try {
                    /* jshint ignore:start */
                    leapHandler.clockwise = Leap.vec3.dot(leapHandler.direction, gesture.normal) > 0;
                    /* jshint ignore:end */
                }catch(e){
                    console.log('Leaphandler.direction might be undefined!');
                }
                if(leapHandler.clockwise){
                    if(frame.fingers.length >1){
                        self.moveCameraUp();
                    }else{
                        self.spinModelRight();
                    }
                } else {
                    if(frame.fingers.length >1){
                        self.moveCameraDown();
                    }else{
                        self.spinModelLeft();
                    }
                }
            }
        }

        ctrl.on('gesture',onCircle);
        ctrl.connect();
    };
})(window);

