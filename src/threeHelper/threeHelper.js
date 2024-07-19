import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';

let sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

export function createScene(canvas, lowResTexture, highResTexture) {
    if (!canvas) {
        console.error('Canvas element not found');
        return null;
    }

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
    camera.rotation.z = Math.PI;

    scene.add(camera);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(1, 0, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.zoomSpeed = 1.2;
    controls.update();
    controls.rotateSpeed = -0.5;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const textureLoader = new THREE.TextureLoader();

    async function loadTexture(url) {
        return new Promise((resolve, reject) => {
            textureLoader.load(
                url,
                (texture) => {
                    console.log(`Texture loaded successfully: ${url}`);
                    texture.mapping = THREE.EquirectangularReflectionMapping;
                    texture.colorSpace = THREE.SRGBColorSpace;
                    resolve(texture);
                },
                undefined,
                (error) => {
                    console.error(`Error loading texture: ${url}`, error);
                    reject(error);
                }
            );
        });
    }

    async function setupTextures() {
        let texture;
        
        if (lowResTexture) {
            try {
                texture = await loadTexture(lowResTexture);
                scene.background = texture;
                renderer.render(scene, camera);
                console.log("Low resolution texture loaded and applied");
            } catch (error) {
                console.warn("Failed to load low res texture, trying high res...");
            }
        }

        if (highResTexture) {
            try {
                const highResTextureLoaded = await loadTexture(highResTexture);
                scene.background = highResTextureLoaded;
                renderer.render(scene, camera);
                console.log("High resolution texture loaded and applied");
            } catch (error) {
                console.warn("Failed to load high res texture");
                if (!texture) {
                    console.error("No textures could be loaded");
                }
            }
        }
    }

    setupTextures();

    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    const clock = new THREE.Clock();
    function animate() {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();

    function cleanup() {
        controls.dispose();
        renderer.dispose();
    }

    return {
        scene,
        camera,
        renderer,
        controls,
        cleanup
    };
}

export async function updateSceneTexture(sceneObject, lowResTexture, highResTexture) {
    const textureLoader = new THREE.TextureLoader();

    async function loadTexture(url) {
        return new Promise((resolve, reject) => {
            textureLoader.load(
                url,
                (texture) => {
                    console.log(`Texture loaded successfully: ${url}`);
                    texture.mapping = THREE.EquirectangularReflectionMapping;
                    texture.colorSpace = THREE.SRGBColorSpace;
                    resolve(texture);
                },
                undefined,
                (error) => {
                    console.error(`Error loading texture: ${url}`, error);
                    reject(error);
                }
            );
        });
    }

    async function transitionTexture(newTextureUrl) {
        // Acercar el FOV de la cámara
        gsap.to(sceneObject.camera, {
            duration: 0.25,
            fov: 70, // Reducir el FOV para acercar
            onUpdate: () => {
                sceneObject.camera.updateProjectionMatrix();
            },
            onComplete: async () => {
                // Cargar la nueva textura
                const newTexture = await loadTexture(newTextureUrl);
                sceneObject.scene.background = newTexture;
                sceneObject.renderer.render(sceneObject.scene, sceneObject.camera);

                // Alejar el FOV de la cámara
                gsap.to(sceneObject.camera, {
                    duration: 0.05,
                    fov: 75, // Restaurar el FOV original
                    onUpdate: () => {
                        sceneObject.camera.updateProjectionMatrix();
                    }
                });
            }
        });
    }

    if (lowResTexture) {
        try {
            await transitionTexture(lowResTexture);
            console.log("Low resolution texture loaded and applied");
        } catch (error) {
            console.warn("Failed to load low res texture, trying high res...");
        }
    }

    if (highResTexture) {
        try {
            await transitionTexture(highResTexture);
            console.log("High resolution texture loaded and applied");
        } catch (error) {
            console.warn("Failed to load high res texture");
            if (!lowResTexture) {
                console.error("No textures could be loaded");
            }
        }
    }
}



// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// let sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// };

// export function createScene(canvas, lowResTexture, highResTexture) {
//     if (!canvas) {
//         console.error('Canvas element not found');
//         return null;
//     }

//     let scene = new THREE.Scene();
//     let camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
//     camera.rotation.z = Math.PI;

//     scene.add(camera);

//     const controls = new OrbitControls(camera, canvas);
//     controls.target.set(1, 0, 0);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.05;
//     controls.zoomSpeed = 1.2;
//     controls.update();
//     controls.rotateSpeed = -0.5;

//     const renderer = new THREE.WebGLRenderer({ canvas: canvas });
//     renderer.setSize(sizes.width, sizes.height);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//     const textureLoader = new THREE.TextureLoader();

//     async function loadTexture(url) {
//         return new Promise((resolve, reject) => {
//             textureLoader.load(
//                 url,
//                 (texture) => {
//                     console.log(`Texture loaded successfully: ${url}`);
//                     texture.mapping = THREE.EquirectangularReflectionMapping;
//                     texture.colorSpace = THREE.SRGBColorSpace;
//                     resolve(texture);
//                 },
//                 undefined,
//                 (error) => {
//                     console.error(`Error loading texture: ${url}`, error);
//                     reject(error);
//                 }
//             );
//         });
//     }

//     async function setupTextures() {
//         let texture;
        
//         if (lowResTexture) {
//             try {
//                 texture = await loadTexture(lowResTexture);
//                 scene.background = texture;
//                 renderer.render(scene, camera);
//                 console.log("Low resolution texture loaded and applied");
//             } catch (error) {
//                 console.warn("Failed to load low res texture, trying high res...");
//             }
//         }

//         if (highResTexture) {
//             try {
//                 const highResTextureLoaded = await loadTexture(highResTexture);
//                 scene.background = highResTextureLoaded;
//                 renderer.render(scene, camera);
//                 console.log("High resolution texture loaded and applied");
//             } catch (error) {
//                 console.warn("Failed to load high res texture");
//                 if (!texture) {
//                     console.error("No textures could be loaded");
//                 }
//             }
//         }
//     }

//     setupTextures();

//     window.addEventListener('resize', () => {
//         sizes.width = window.innerWidth;
//         sizes.height = window.innerHeight;
//         camera.aspect = sizes.width / sizes.height;
//         camera.updateProjectionMatrix();
//         renderer.setSize(sizes.width, sizes.height);
//         renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     });

//     const clock = new THREE.Clock();
//     function animate() {
//         controls.update();
//         renderer.render(scene, camera);
//         requestAnimationFrame(animate);
//     }
//     animate();

//     function cleanup() {
//         controls.dispose();
//         renderer.dispose();
//     }

//     return {
//         scene,
//         camera,
//         renderer,
//         controls,
//         cleanup
//     };
// }

// export async function updateSceneTexture(sceneObject, lowResTexture, highResTexture) {
//     const textureLoader = new THREE.TextureLoader();

//     async function loadTexture(url) {
//         return new Promise((resolve, reject) => {
//             textureLoader.load(
//                 url,
//                 (texture) => {
//                     console.log(`Texture loaded successfully: ${url}`);
//                     texture.mapping = THREE.EquirectangularReflectionMapping;
//                     texture.colorSpace = THREE.SRGBColorSpace;
//                     resolve(texture);
//                 },
//                 undefined,
//                 (error) => {
//                     console.error(`Error loading texture: ${url}`, error);
//                     reject(error);
//                 }
//             );
//         });
//     }

//     let texture;
//     if (lowResTexture) {
//         try {
//             texture = await loadTexture(lowResTexture);
//             sceneObject.scene.background = texture;
//             sceneObject.renderer.render(sceneObject.scene, sceneObject.camera);
//             console.log("Low resolution texture loaded and applied");
//         } catch (error) {
//             console.warn("Failed to load low res texture, trying high res...");
//         }
//     }

//     if (highResTexture) {
//         try {
//             const highResTextureLoaded = await loadTexture(highResTexture);
//             sceneObject.scene.background = highResTextureLoaded;
//             sceneObject.renderer.render(sceneObject.scene, sceneObject.camera);
//             console.log("High resolution texture loaded and applied");
//         } catch (error) {
//             console.warn("Failed to load high res texture");
//             if (!texture) {
//                 console.error("No textures could be loaded");
//             }
//         }
//     }
// }

