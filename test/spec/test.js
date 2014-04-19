(function() {
    'use strict';

    describe('app', function() {
        it("should define o3v namespace", function() {
            expect(o3v).to.not.be.undefined;
            expect(o3v.options.imageSearchUrl).to.equal('images/search.png');
            expect(o3v.MODELS.length).to.equal(2);
            expect(o3v.MODELS[0].name).to.equal('adult_female.obj');
            expect(o3v.MODELS[0].scriptName).to.equal('adult_female.js');
            expect(o3v.MODELS[0].modelPath).to.equal('models/adult_female/');
            expect(o3v.MODELS[0].metadataFile).to.equal('entity_metadata.json');
            expect(o3v.MODELS[0].texturePath).to.equal('models/common/');
            expect(o3v.MODELS[0].numLayers).to.equal(7);
            expect(o3v.MODELS[1].name).to.equal('adult_male.obj');
            expect(o3v.MODELS[1].scriptName).to.equal('adult_male.js');
            expect(o3v.MODELS[1].modelPath).to.equal('models/adult_male/');
            expect(o3v.MODELS[1].metadataFile).to.equal('entity_metadata.json');
            expect(o3v.MODELS[1].texturePath).to.equal('models/common/');
            expect(o3v.MODELS[1].numLayers).to.equal(7);
        });
    });
})();
