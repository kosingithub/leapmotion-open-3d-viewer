(function (exports, document) {
    'use strict';
    /* globals app */ //Temporal just For first Demo
    jQuery(document).ready(function () {
        window.app = new exports.Application();
        window.app.run(exports.appOptions);

    });

})(window, document);