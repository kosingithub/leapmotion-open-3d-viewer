(function (exports) {
    'use strict';
    exports.appOptions = {
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
})(window);