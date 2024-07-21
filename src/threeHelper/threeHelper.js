

// Importaciones de bibliotecas necesarias
import * as THREE from 'three'; // Importa la biblioteca Three.js para gráficos 3D
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Importa los controles de órbita para la cámara
import { gsap } from 'gsap'; // Importa GSAP para animaciones suaves

// Define el tamaño inicial de la ventana
let sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

export function addSphereToScene(scene, position, radius, onClick) {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(position.x, position.y, position.z);
    sphere.userData.onClick = onClick;
    scene.add(sphere);
    return sphere;
}

export function updateSceneSpheres(sceneObject, textures, onTextureChange) {
    // Eliminar esferas existentes
    sceneObject.scene.children = sceneObject.scene.children.filter(child => !(child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry));

    // Añadir nuevas esferas
    textures.forEach((texture, textureIndex) => {
        texture.points.forEach(pointArray => {
            pointArray.forEach(point => {
                addSphereToScene(sceneObject.scene, point, 0.1, () => onTextureChange(textureIndex));
            });
        });
    });
}

// Función principal para crear la escena 3D
export function createScene(canvas, lowResTexture, highResTexture) {
    // Verifica si el elemento canvas existe
    if (!canvas) {
        console.error('Canvas element not found');
        return null;
    }

    // Crea la escena, cámara y configuración inicial
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
    camera.rotation.z = Math.PI; // Rota la cámara 180 grados

    scene.add(camera);

    // Configura los controles de órbita para la cámara
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(1, 0, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.zoomSpeed = 1.2;
    controls.update();
    controls.rotateSpeed = -0.5;

    // Crea el renderizador WebGL
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Crea un cargador de texturas
    const textureLoader = new THREE.TextureLoader();

    // Función para cargar texturas de forma asíncrona
    async function loadTexture(url) {
        return new Promise((resolve, reject) => {
            textureLoader.load(
                url,
                (texture) => {
                    texture.mapping = THREE.EquirectangularReflectionMapping;
                    texture.colorSpace = THREE.SRGBColorSpace;
                    texture.needsUpdate = true;  // Asegúrate de que la textura se actualice
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

    // Función para configurar las texturas iniciales
    async function setupTextures() {
        let texture;

        // Intenta cargar la textura de baja resolución primero
        if (lowResTexture) {
            try {
                texture = await loadTexture(lowResTexture);
                scene.background = texture;
                renderer.render(scene, camera);
            } catch (error) {
                console.warn("Failed to load low res texture, trying high res...");
            }
        }

        // Intenta cargar la textura de alta resolución
        if (highResTexture) {
            try {
                const highResTextureLoaded = await loadTexture(highResTexture);
                scene.background = highResTextureLoaded;
                renderer.render(scene, camera);
            } catch (error) {
                console.warn("Failed to load high res texture");
                if (!texture) {
                    console.error("No textures could be loaded");
                }
            }
        }
    }

    // Llama a la función para configurar las texturas
    setupTextures();

    // Maneja el redimensionamiento de la ventana
    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Función de animación
    const clock = new THREE.Clock();
    function animate() {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();

    // Función de limpieza
    function cleanup() {
        controls.dispose();
        renderer.dispose();
    }

    // Retorna los objetos principales de la escena
    return {
        scene,
        camera,
        renderer,
        controls,
        cleanup
    };
}

// Función para actualizar la textura de la escena
export async function updateSceneTexture(sceneObject, lowResTexture, highResTexture) {
    const textureLoader = new THREE.TextureLoader();

    // Función para cargar texturas de forma asíncrona
    async function loadTexture(url) {
        return new Promise((resolve, reject) => {
            textureLoader.load(
                url,
                (texture) => {
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

    // Función para realizar la transición de texturas con animación
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

    // Intenta cargar y aplicar la textura de baja resolución
    if (lowResTexture) {
        try {
            await transitionTexture(lowResTexture);
        } catch (error) {
            console.warn("Failed to load low res texture, trying high res...");
        }
    }

    // Intenta cargar y aplicar la textura de alta resolución
    if (highResTexture) {
        try {
            await transitionTexture(highResTexture);
        } catch (error) {
            console.warn("Failed to load high res texture");
            if (!lowResTexture) {
                console.error("No textures could be loaded");
            }
        }
    }
}
