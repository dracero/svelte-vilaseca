<script>
  //para controllers ver https://threejs.org/docs/#manual/en/introduction/How-to-create-VR-content
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import { VRButton } from 'three/addons/webxr/VRButton.js';
    import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
    import { onMount } from 'svelte';
    
    
    let scene, camera, renderer, gltf, mixer, controller1,controller2, controllerGrip1, controllerGrip2;
    function init() {
    // Crear la escena
    scene = new THREE.Scene();

    // Crear la cámara
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(5, 1, -1);

    // Crear el renderizador
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    document.body.appendChild( VRButton.createButton( renderer ) );
    renderer.xr.enabled = true;
    // Crear el controlador de órbita
    const controls = new OrbitControls(camera, renderer.domElement);
    //añadir el 3D
    const loader = new GLTFLoader();
    loader.load('/models/esfera.gltf', function(gltf) {
      gltf.scene.scale.set(1, 1, 1);
      scene.add(gltf.scene);
      // Crear el controlador de animación
      mixer = new THREE.AnimationMixer(gltf.scene);
      mixer.clipAction(gltf.animations[0]).play();
      //Controllers
      const controller1 = renderer.xr.getController( 0 );
			scene.add( controller1 );
      renderer.xr.addEventListener('sessionstart', function ( event ) {
        controller1.add(gltf.scene) 
      } );
    //Fin Controllers
    });
    //
    const light = new THREE.PointLight(0xffffff, 1, 1);
    light.position.set(5, 20, -1);
    scene.add(light);
    //I need to add more light to the scene but in different positions
    const light2 = new THREE.PointLight(0xffffff, 1, 100);
    light2.position.set(-5, -20, 1);
    scene.add(light2);
    //I need to add more light to the scene but in different positions
    const light3 = new THREE.PointLight(0xffffff, 1, 100);
    light3.position.set(20, -20, 20);
    scene.add(light3);
    //I need to add more light to the scene but in different positions
    const light4 = new THREE.PointLight(0xffffff, 1, 100);
    light4.position.set(-20, 20, -20);
    scene.add(light4);
    //I need to add more light to the scene but in different positions
    const light5 = new THREE.AmbientLight(0xffffff, 1, 100);
    light5.position.set(5, 1, -2);
    scene.add(light5);
    //I need to add spotlights to the scene
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(5, 10, -2);
    spotLight.castShadow = true;
    scene.add(spotLight);
    //I need to add spotlights to the scene in different positions
    const spotLight2 = new THREE.SpotLight(0xffffff);
    spotLight2.position.set(-5, -10, 2);
    spotLight2.castShadow = true;
    scene.add(spotLight2);
    //I need to add spotlights to the scene in different positions
    const spotLight3 = new THREE.DirectionalLight(0xffffff);
    spotLight3.position.set(1,0,1);
    scene.add(spotLight3);
  }
  function animate() {
    requestAnimationFrame(animate);
    // Actualizar la animación si está disponible
    if (mixer) {
      mixer.update(0.01);
    }
    renderer.render(scene, camera);
  }
  function virtual (){
    renderer.setAnimationLoop( function () {
        renderer.render( scene, camera )
    } ); 
  }
  onMount(() => {
    init();
    animate();
    virtual();  
  });   
  
</script>
  
  <style>
    :global(body){
      margin: 0;
      overflow: hidden;
    }
  </style>
  
  <button on:click="{() => { if (mixer) { mixer.timeScale = (mixer.timeScale === 1) ? 0 : 1; } }}">
    {mixer && mixer.timeScale === 1 ? 'Pausar animación' : 'Reanudar animación'}
  </button>