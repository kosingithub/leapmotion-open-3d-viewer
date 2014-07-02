
o3v.ThreeInterface = function(modelInfo){


    //Scene
    this.container   = document.getElementById('viewer');
    this.scene       = new THREE.Scene();
    //Lighting
    //TODO:(Angel) ambient lightning minimizes the shadows on most parts of the skeleton (looks good), but takes toll on performance.
    var ambientLight = new THREE.AmbientLight(0x404040);
    ambientLight.position.set(1,1,1).normalize();
    this.scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1,1,1).normalize();
    this.scene.add(directionalLight);
    //CAM
    var SCREEN_WIDTH  = window.innerWidth;
    var SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE    = 45;
    var ASPECT        = SCREEN_WIDTH / SCREEN_HEIGHT;
    var NEAR          = 0.1;
    var FAR           = 10000;
    this.camera       = new THREE.PerspectiveCamera(VIEW_ANGLE , ASPECT , NEAR , FAR);
    this.camera.position.set(0,150,400);
    this.camera.lookAt(this.scene.position);
    //Renderer
    this.renderer = new THREE.WebGLRenderer({canvas: container, antialias: true});
    this.renderer.setSize(SCREEN_WIDTH,SCREEN_HEIGHT);
    this.clock    = new THREE.Clock();
    //Scene controls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.keyboard = new THREEx.KeyboardState();
};


o3v.ThreeInterface.prototype.rotate(object, axis , rotateAngle){
    var vecAxis;
}

var animate = function(){
    requestAnimationFrame(animate);
    render();
    update();
};

var update = function(){
    var delta = this.clock.getDelta();
    var rotateAngle = Math.PI /2 * delta;
};
