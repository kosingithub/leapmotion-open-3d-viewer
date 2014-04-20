(function() {
    'use strict';
    describe('app', function() {
        it('should define window.o3v namespace', function() {
            expect(window.o3v.options.imageSearchUrl).to.equal('images/search.png');
            expect(window.o3v.MODELS.length).to.equal(3);
            expect(window.o3v.MODELS[0].name).to.equal('adult_female.obj');
            expect(window.o3v.MODELS[0].scriptName).to.equal('adult_female.js');
            expect(window.o3v.MODELS[0].modelPath).to.equal('models/adult_female/');
            expect(window.o3v.MODELS[0].metadataFile).to.equal('entity_metadata.json');
            expect(window.o3v.MODELS[0].texturePath).to.equal('models/common/');
            expect(window.o3v.MODELS[0].numLayers).to.equal(7);
            expect(window.o3v.MODELS[1].name).to.equal('adult_male.obj');
            expect(window.o3v.MODELS[1].scriptName).to.equal('adult_male.js');
            expect(window.o3v.MODELS[1].modelPath).to.equal('models/adult_male/');
            expect(window.o3v.MODELS[1].metadataFile).to.equal('entity_metadata.json');
            expect(window.o3v.MODELS[1].texturePath).to.equal('models/common/');
            expect(window.o3v.MODELS[1].numLayers).to.equal(7);
        });
    });
})();
