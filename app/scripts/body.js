(function (exports, document) {
    'use strict';
    /* globals app */ //Temporate just For first Demo
    jQuery(document).ready(function () {
        window.app = new exports.Application();
        window.app.run(exports.appOptions);
        app.layersManager.setLayerUiVisibility();//Temporate just For first Demo

    });

})(window, document);