(function (exports) {
    'use strict';
    exports.appOptions = {
        layersUI:{
            //TODO add constants for each layer number(i.e BONES, NERVES, MUSCLES, etc)
            //TODO implement a `visible` flag to hide/show the layers ui
            /*TODO create a config to set the initial settings of the multislider
                visibleLayers = [BONES,NERVES];
              */
        },
        MOVEMENT:{
                TRANSLATION_VERTICAL_FACTOR: 10,
                TRANSLATION_HORIZONTAL_FACTOR: 10,
                SPIN_HORIZONTAL_FACTOR: 5,
                SPIN_VERTICAL_FACTOR: 5,
                ZOOM_FACTOR: 50
            },
            MODELS: [
                {
                    name: 'adult_female.obj',
                    scriptName: 'adult_female.js',
                    modelPath: 'models/adult_female/',
                    metadataFile: 'entity_metadata.json',
                    texturePath: 'models/common/',
                    numLayers: 7
                }
//                },
//                {
//                    name: 'adult_male.obj',
//                    scriptName: 'adult_male.js',
//                    modelPath: 'models/adult_male/',
//                    metadataFile: 'entity_metadata.json',
//                    texturePath: 'models/common/',
//                    numLayers: 7
//                }
            ]
        };
})(window);