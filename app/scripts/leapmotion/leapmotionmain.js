/* globals Leap, app */
$( document ).ready(function() {
    'use strict';
    var width = document.body.clientWidth,
        height = document.body.clientHeight;
    var status='stoped';
    var lastPostition=0;
    // listen to leap motion
    Leap.loop({enableGestures: true}, function(frame) {
        $('.cursor').remove();
        if (frame.pointables.length < 1){
            return;
        }
        if (frame.pointables.length < 4){
            pointer(frame);
        }else if( frame.hands.length ===1 && frame.pointables.length > 3 ){
            palm(frame);
        }

    });
    function palm(frame){
        frame.hands.forEach(function(hand,i) {
            if (i > 0){
                return;
            }
            var posZ = (hand.palmPosition[2] * 3) - 400;
            if(posZ > lastPostition+10){
                app.navigator.continuouslyZoomIn();
                lastPostition = posZ;
            }else if(posZ < lastPostition-10) {
                app.navigator.continuouslyZoomOut();
                lastPostition = posZ;
            }else{
                app.navigator.stopModelMovement();
            }
        });
    }
    function pointer(frame){
        if (frame.pointables.length < 1){
            return;
        }
        frame.pointables.forEach(function(pointable,i) {
            // only do 1 finger
            if (i > 0){
                return;
            }
            // interaction box
            var pos = [
                width/2 + 6*pointable.tipPosition[0],// center 0
                height - 4*pointable.tipPosition[1] + 1000, //center 160
                pointable.tipPosition[2]
            ];
            // distance to touch
            var sizeDifference = 50-Math.abs(pos[2]);
            if (sizeDifference < 0){
                sizeDifference = 0;
            }
            sizeDifference *= 2;

            // visual cursor
            $('<div>').addClass('inner')
            .css('width',sizeDifference+'%')
            .appendTo(
                      $('<div>').addClass('cursor')
                      .css('top',pos[1] + 'px')
                      .css('left',pos[0] + 'px')
                      .appendTo('body'));

            if(sizeDifference > 0){
                if(pointable.tipPosition[1] > 230 && status !== 'up'){
                    app.navigator.continuouslyMoveCameraUp();
                    status='up';
                }
                if(pointable.tipPosition[1] < 60 && status !== 'down'){
                    app.navigator.continuouslyMoveCameraDown();
                    status='down';
                }
                if(pointable.tipPosition[0] > 100 && status !== 'right'){
                    app.navigator.continuouslyMoveCameraRight();
                    status='right';
                }
                if(pointable.tipPosition[0] < -100 && status !== 'left'){
                    app.navigator.continuouslyMoveCameraLeft();
                    status='left';
                }
                if (pointable.tipPosition[0] < 100 && pointable.tipPosition[0] > -100 && pointable.tipPosition[1] < 230 && pointable.tipPosition[1] > 60  && status !== 'stoped') {
                    app.navigator.stopModelMovement();
                    status='stoped';
                }
            }else{
                app.navigator.stopModelMovement();
                status='stoped';
            }
        });
    }
});