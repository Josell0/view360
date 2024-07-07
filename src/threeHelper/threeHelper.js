import * as THREE from 'three'

export function createScene(container, initialTexture) {

    //creamos la escena
    const scene = new THREE.Scene();

    //creamos la camara
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 0.1);

    //creamos el renderizador
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    //creamos la esfera
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(initialTexture);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    //animacion de frames
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    return {
        updateTexture(newTexture) {
            const newTextureLoaded = textureLoader.load(newTexture);
            sphere.material.map = newTextureLoaded;
            sphere.material.needsUpdate = true;
        },
    };

}