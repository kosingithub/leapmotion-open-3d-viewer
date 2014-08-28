(function (exports, $) {
    'use strict';

    exports.Application = function () {
        var _initHelp = function () {
            $('a[rel*=facebox]').facebox();
            $('#ad a').click(function () {
                var link = $(this);
                if (link.hasClass('ad-arrow')) {
                    if (link.hasClass('ad-closed')) {
                        // open it
                        $('.ad-closed').hide();
                        $('.ad-open').show();
                        $('#ad').animate({
                            height: 277
                        });

                        return false;
                    } else if (link.hasClass('ad-open')) {
                        // close it
                        $('.ad-closed').show();
                        $('.ad-open').hide();
                        $('#ad').animate({
                            height: 30
                        });
                        return false;
                    }
                }
            });
        },
        self = this;


        this.viewer = null;
        this.init = function (options) {
            _initHelp();
            //TODO validate models object structure
            exports.o3v.MODELS = options.MODELS || [];
        };

        this.run = function (options) {
            this.init(options);
            self._viewer = new exports.o3v.Viewer();
            //TODO: (Angel) create nav instance after model callback is complete
            self.navigator = new exports.Navigator(self._viewer,options);
            self.layersManager = new exports.LayersManager(this._viewer,options);

            /*TODO create fields objects that encapsulates several viewer objects and uses options
                 this.layersManager = new LayersManager(this._viewer,options);
                 the layersManager should have at least the following methods
                 setLayerUiVisibility(:boolean)
                 showLayers(layers:array)
                 hideLayers(layers:array)

              this.navigator = new Navigator(this._viewer,options)
                 the navigator should have at least the following methods
                 moveModel[Left|Right|Down|Top]();
                 moveCamera[Left|Right|Down|Top]();
                 continuouslyMoveModel[Left|Right|Down|Top](velocity:float);
                 stopModelMovement();
                 enableSupermanMode();
                 disableSupermanMode();
                 */
        };
    };
})(window, window.jQuery);