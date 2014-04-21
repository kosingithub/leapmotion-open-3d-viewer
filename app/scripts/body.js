(function (exports, document) {
    'use strict';

    jQuery(document).ready(function () {
        window.app = new exports.Application();
        window.app.run(exports.appOptions);

    });

})(window, document);