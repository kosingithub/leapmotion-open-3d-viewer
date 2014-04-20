(function(exports, document) {
    'use strict';

    exports.o3v = {
        options: {
            imageSearchUrl: 'images/search.png'
        },
        MODELS: [
            {
                name: 'adult_female.obj',
                scriptName: 'adult_female.js',
                modelPath: 'models/adult_female/',
                metadataFile: 'entity_metadata.json',
                texturePath: 'models/common/',
                numLayers: 7
            },
            {
                name: 'adult_male.obj',
                scriptName: 'adult_male.js',
                modelPath: 'models/adult_male/',
                metadataFile: 'entity_metadata.json',
                texturePath: 'models/common/',
                numLayers: 7
            }
        ]
    };

    jQuery(document).ready(function() {
        // The assignment to window.viewer_ is ONLY for debugging.
        // This variable should NEVER be accessed from code.
        window.viewer_ = new o3v.Viewer();

        jQuery('a[rel*=facebox]').facebox();

        jQuery('#ad a').click(function() {
            var link = jQuery(this);

            if (link.hasClass('ad-arrow')) {
                if (link.hasClass('ad-closed')) {
                    // open it
                    jQuery('.ad-closed').hide();
                    jQuery('.ad-open').show();
                    jQuery('#ad').animate({
                        height: 277
                    });

                    return false;
                } else if (link.hasClass('ad-open')) {
                    // close it
                    jQuery('.ad-closed').show();
                    jQuery('.ad-open').hide();
                    jQuery('#ad').animate({
                        height: 30
                    });

                    return false;
                }
            }

        });
    });

})(window, document);


