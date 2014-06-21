// Copyright 2011 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview This object keeps track of the model currently loaded.
 *               On initialization, loads model 0 in o3v.MODELS.
 */
o3v.ContentManager = function () {
    this.loader_ = null;
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    var skeleton = null;
    this.nope =null;
    this.scale = 1.5;
    var that = null;
    this.clock = new THREE.Clock();
    var controls = null;
    this.keyboard = new THREEx.KeyboardState();

    this.models_ = o3v.MODELS;
    this.metadata_ = null;
    this.currentModel_ = -1;  // Force it to cycle to the first model.

    // metadata caches.
    this.scriptsLoaded_ = {};  // e.g. adult_female.js
    this.metadataLoaded_ = {};  // e.g. entity_metadata.json
};

o3v.ContentManager.prototype.nextModel = function (loadModelInfoCallback, loadMeshCallback, loadModelCallback, loadMetadataCallback) {
    this.currentModel_ = (this.currentModel_ + 1) % this.models_.length;

    loadModelInfoCallback(this.models_[this.currentModel_]);

    this.loadModel_(this.models_[this.currentModel_],
        loadMeshCallback, loadModelCallback, loadMetadataCallback);
};

o3v.ContentManager.prototype.getCurrentModelInfo = function () {
    return this.models_[this.currentModel_];
};

o3v.ContentManager.prototype.loadModel_ =
    function (modelInfo, loadMeshCallback,  // After each mesh
              loadModelCallback,  // After all meshes
              loadMetadataCallback  // After metadata
        ) {
        // First, load javascript.
        var scriptPath = modelInfo.modelPath + modelInfo.scriptName;
        if (this.scriptsLoaded_[scriptPath]) {
            this.loadModelAfterScript_(modelInfo, loadMeshCallback, loadModelCallback,
                loadMetadataCallback);
        } else {
            $.getScript(scriptPath, function () {
                this.scriptsLoaded_[scriptPath] = true;
                this.loadModelAfterScript_(modelInfo, loadMeshCallback,
                    loadModelCallback,
                    loadMetadataCallback);
            }.bind(this));
        }
    };

o3v.ContentManager.prototype.init = function(modelInfo){
    that = this;
    var container = document.getElementById('viewer');
    //SCENE
    this.scene = new THREE.Scene();
    var ambientLight = new THREE.AmbientLight(0x404040);
    //LIGHT
    //added directional lighting to the model
    this.scene.add(ambientLight);
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1).normalize();
    this.scene.add(directionalLight);
    //CAM
    var SCREEN_WIDTH = window.innerWidth,SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH/SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
    this.scene.add(this.camera);
    this.camera.position.set(0,150,400);
    this.camera.lookAt(this.scene.position);
    //RENDERER
    this.renderer = new THREE.WebGLRenderer({canvas:container,antialias:true});
    this.renderer.setSize(SCREEN_WIDTH,SCREEN_HEIGHT);
    //CONTROLS
    controls = new THREE.OrbitControls(this.camera,this.renderer.domElement);
    //this.renderer.domElement = container;
    //container = this.renderer.domElement;
    //container.appendChild(this.renderer.domElement);



    this.loader_ = new THREE.UTF8Loader();
    this.loader_.load(modelInfo.modelPath + 'adult_female.json',modelInfo.modelPath + '../common/',function(object){
        var s = 1.5;
        that.skeleton = object;
        that.nope = object.children[2];
        object.scale.set(s,s,s);
        object.position.x = 0;
        object.position.y = -125;
        that.scene.add(object);
    },{normalizeRGB:true});
    animate();
};

var animate = function(){
    requestAnimationFrame(animate);
    render();
    update();
};

var update = function(){
    //that.skeleton;

    var delta = that.clock.getDelta();//seconds
    var moveDistance = 200 * delta;//200px per second
    var rotateAngle = Math.PI / 2 * delta // PI/2 radians (90 degrees) per second
    //local coordinates

    //local transformations

    //move forwards/backward/left/right
    if(that.keyboard.pressed("W"))
        that.skeleton.translateZ(moveDistance);
    if(that.keyboard.pressed("S"))
        that.skeleton.translateZ(-moveDistance);
    if(that.keyboard.pressed("Q"))
        that.skeleton.translateX(-moveDistance);
    if(that.keyboard.pressed("E"))
        that.skeleton.translateX( moveDistance);

    //rotate left/right/up/down
    var rotation_matrix = new THREE.Matrix4().identity();
    if(that.keyboard.pressed("A"))
        that.skeleton.rotateOnAxis(new THREE.Vector3(0,1,0), rotateAngle);
    if(that.keyboard.pressed("D"))
        that.skeleton.rotateOnAxis(new THREE.Vector3(0,1,0),-rotateAngle);
    if(that.keyboard.pressed("R"))
        that.skeleton.rotateOnAxis(new THREE.Vector3(1,0,0), rotateAngle);
    if(that.keyboard.pressed("F"))
        that.skeleton.rotateOnAxis(new THREE.Vector3(1,0,0),-rotateAngle);

    if(that.keyboard.pressed("Z")){
        that.skeleton.position.set(0,0,0);
        that.skeleton.rotation.set(0,0,0);
    }

    //NOPE 1-4-
    if(that.keyboard.pressed('left')){
        that.nope.rotateOnAxis(new THREE.Vector3(0,1,0), -rotateAngle);
        //that.skeleton.children[3].rotateOnAxis(new THREE.Vector3(0,1,0), -rotateAngle);
    }
    if(that.keyboard.pressed('right')){
        that.nope.rotateOnAxis(new THREE.Vector3(0,1,0), rotateAngle);
        //that.skeleton.children[3].rotateOnAxis(new THREE.Vector3(0,1,0), rotateAngle);
    }


    //Size
    if(that.keyboard.pressed('up')){
        that.scale *= 1.01;
        that.skeleton.scale.set(that.scale,that.scale,that.scale);
    }
    if(that.keyboard.pressed('down')){
        that.scale *= 0.99;
        that.skeleton.scale.set(that.scale,that.scale,that.scale);
    }
    if(that.keyboard.pressed("0")){
        that.scale = 1.5;
    }

    controls.update();
}

var render = function(){
    that.renderer.render(that.scene,that.camera);
}

o3v.ContentManager.prototype.loadModelAfterScript_ =
    function (modelInfo, loadMeshCallback,  // After each mesh
              loadModelCallback,  // After all meshes
              loadMetadataCallback  // After metadata
        ) {
        //TODO: Call out to webgl loader.--> soon to be Three.js
        this.init(modelInfo);
//        downloadModel(modelInfo.modelPath, modelInfo.name, loadMeshCallback,
//            loadModelCallback);

        // Load metadata.
        this.loadMetadata_(modelInfo.modelPath + modelInfo.metadataFile,
            MODELS[modelInfo.name],
            loadMetadataCallback);
    };

o3v.ContentManager.prototype.loadMetadata_ = function (metadataPath, modelMetadata, callback) {
    var cached_metadata = this.metadataLoaded_[metadataPath];
    if (cached_metadata) {
        this.metadata_ = cached_metadata;
        callback();
    } else {
        var self = this;


        function onload(req) {
            // TODO: error handling.
            var metadata = new o3v.EntityMetadata(JSON.parse(req.responseText));
            self.metadata_ = new o3v.EntityModel(modelMetadata, metadata);
            self.metadataLoaded_[metadataPath] = this.metadata_;
            callback();
        };

        getHttpRequest(metadataPath, onload);
    }
};

o3v.ContentManager.prototype.getMetadata = function () {
    return this.metadata_;
};
