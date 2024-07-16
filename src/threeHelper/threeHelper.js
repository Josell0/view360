import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


let sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

export function createScene(currentTexture) {
    let canvas = document.querySelector('canvas.webgl');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
    camera.rotation.z = Math.PI
    
    scene.add(camera);


    // Controls
    const controls = new OrbitControls(camera, canvas);
    //controls.target.y = -3.5;
    controls.target.set(1, 0, 0); // Ajusta según sea necesario para la orientación deseada
    
    controls.enableDamping = true;
    controls.update()
    
    // Invertir el movimiento de los controles
    controls.rotateSpeed = -0.5;


    const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    });

    const textureLoader = new THREE.TextureLoader();
    const environmentMap = textureLoader.load(currentTexture)
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    environmentMap.colorSpace = THREE.SRGBColorSpace

    // const environmentMap = textureLoader.load(
    //     currentTexture, 
    //     () => {
    //         renderer.render(scene, camera); // Render once the texture is loaded
    //     },
    //     undefined, // onProgress callback not used
    //     (error) => {
    //         console.error('Error loading texture:', error);
    //     }
    // );
      
    // const textureLoader = new THREE.TextureLoader();
    // const environmentMap = textureLoader.load(currentTexture)
    // const environmentMap = textureLoader.load(texture, () => {
    //     renderer.render(scene, camera); // Render once the texture is loaded
    //}


    scene.background = environmentMap;
    console.log(scene.background)
    console.log(currentTexture)

    // Update sizes
    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        // Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     * Animate
     */
    const clock = new THREE.Clock();
    const tick = () => {
        // Time
        const elapsedTime = clock.getElapsedTime();

        // Update controls
        controls.update();

        // Render
        renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
    };

    tick();

    return {
        createScene
    };
}

// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// //import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// let canvas = document.querySelector('canvas.webgl')
// let scene, camera

// let sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }




// export function createScene(texture) {


//     scene = new THREE.Scene();
//     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     scene.add(camera)

//     // Controls
//     const controls = new OrbitControls(camera, canvas)
//     controls.target.y = 3.5
//     controls.enableDamping = true

//     const renderer = new THREE.WebGLRenderer({
//         canvas: canvas
//     });

//     const textureLoader = new THREE.TextureLoader()

//     const environmentMap = textureLoader.load(texture)
//     scene.environment = environmentMap

//     // Update sizes
//     window.addEventListener('resize', () => {
//         sizes.width = window.innerWidth
//         sizes.height = window.innerHeight

//         // Update camera
//         camera.aspect = sizes.width / sizes.height
//         camera.updateProjectionMatrix()

//         // Update renderer
//         renderer.setSize(sizes.width, sizes.height)
//         renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//     })

//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//     /**
//      * Animate
//      */
//     const clock = new THREE.Clock()
//     const tick = () => {
//         // Time
//         const elapsedTime = clock.getElapsedTime()

//         // Update controls
//         controls.update()

//         // Render
//         renderer.render(scene, camera)

//         // Call tick again on the next frame
//         window.requestAnimationFrame(tick)
//     }

//     tick()


    
//     return {
//         createScene
//     }
// }

// // renderer.setSize(window.innerWidth, window.innerHeight);
// // container.appendChild(renderer.domElement);

// // // const controls = new OrbitControls(camera, renderer.domElement);
// // // controls.enableZoom = true;
// // // controls.enablePan = false;
// // // controls.enableDamping = true;
// // // controls.dampingFactor = 0.25;
// // // controls.rotateSpeed = 0.35;

// // const textureLoader = new THREE.TextureLoader();
// // textureLoader.load(initialTexture, (texture) => {
// //     scene.background = texture;
// // });

// // camera.position.set(0, 0, 0.1);

// // function animate() {
// //     requestAnimationFrame(animate);
// //     controls.update();
// //     renderer.render(scene, camera);
// // }
// // animate();

// // return {
// //     updateTexture(newTexture) {
// //         textureLoader.load(newTexture, (texture) => {
// //             scene.background = texture;
// //         });
// //     },
// // };