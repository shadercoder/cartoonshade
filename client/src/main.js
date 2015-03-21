var container = undefined;
var camera = undefined;
var wglRenderer = undefined;
var scene = undefined;
var cameraController = undefined;
var timer = undefined;

var outlineScene = undefined;
var mesh = undefined;
var outlinemesh = undefined;
var material = undefined;
var outlineMaterial = undefined;

var shaders = undefined;
window.onload = function(){

    onInit();
    
    
    
}


var onInit = function(){
    container = document.createElement('div');
    document.body.appendChild(container);
    
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    // todo camera init setting
    camera.position.z = -100.0;
    
    // setup three.js
    wglRenderer = new THREE.WebGLRenderer({antialias: true});
    wglRenderer.setPixelRatio(window.devicePixelRatio);
    wglRenderer.setSize(window.innerWidth, window.innerHeight);
    //wglRenderer.setClearColor();
    container.appendChild(wglRenderer.domElement);
    
    // camera controller
    cameraController = new THREE.OrbitControls(camera, wglRenderer.domElement);
    
    // timer
    timer = new THREE.Clock();
    timer.start();
    
    // main scene
    scene = new THREE.Scene();
    // outline edge scene
    outlineScene = new THREE.Scene();
    
    material =  new THREE.MeshLambertMaterial( { map: null, side: THREE.FrontSide } );
    // teapot mesh setup
    mesh = new THREE.Mesh(new THREE.TorusKnotGeometry( 50, 10, 50, 20 ), material);

    scene.add(mesh);
    scene.add(new THREE.AmbientLight( 0x404040 ));
	var light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 0, 1, 1 );
	scene.add( light );    
    
    window.addEventListener('resize', onResize, false);
    
    shaders = new ShaderLoader( "../shaders" , "../shaders/chunks" );
    
    shaders.load("toon_vert", "toonEdge", "vertex");
    shaders.load("toon_frag", "toonEdge", "fragment");
    shaders.shaderSetLoaded = function(){
        outlinemesh = mesh.clone();
        outlineScene.add(outlinemesh);
       
        

        
        var uniforms = {};
        outlineMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: shaders.vertexShaders.toonEdge,
            fragmentShader: shaders.fragmentShaders.toonEdge,
            side: THREE.BackSide
        });
        
        outlinemesh.material = outlineMaterial;
        outlinemesh.material.needsUpdate = true;
        
        onTick();
    };
    
}


var onTick = function(){
    window.requestAnimationFrame( onTick );
    cameraController.update();
    var dt = timer.getDelta();
    
    wglRenderer.render(scene, camera);
    
    wglRenderer.autoClear = false;
    wglRenderer.render(outlineScene, camera);
     wglRenderer.autoClear = true;
    
}


var onResize = function(){
   camera.aspect = window.innerWidth / window.innerHeight;

   camera.updateProjectionMatrix();

   wglRenderer.setSize(window.innerWidth, window.innerHeight);    
}