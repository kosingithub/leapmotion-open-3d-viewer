(function (exports, document) {
    'use strict';

    jQuery(document).ready(function () {
        var app = new exports.Application();
        app.run(exports.appOptions);
    });

})(window, document);