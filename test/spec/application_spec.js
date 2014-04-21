describe('#Application', function () {
    'use strict';
    describe('init', function () {
        it('should set window.o3v.MODELS', function () {
            var app = new Application();
            app.init({MODELS: ['foo', 'bar']});
            expect(window.o3v.MODELS.length).to.equal(2);
            expect(window.o3v.MODELS[0]).to.equal('foo');
            expect(window.o3v.MODELS[1]).to.equal('bar');
        });
    });
});

