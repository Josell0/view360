// sceneSetup.js
// Este archivo se encarga de crear la escena 3D, la cámara, el renderizador y los controles de órbita.
// También maneja el evento de resize de la ventana.

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Tamaño inicial de la ventana
let sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

/**
 * Crea la escena 3D con cámara, controles y renderizador.
 * @param {HTMLCanvasElement} canvas - El canvas donde se pintará la escena.
 * @returns {Object} - Un objeto con { scene, camera, renderer, controls, cleanup }.
 */
export function createScene(canvas) {
  if (!canvas) {
    console.error('Canvas element not found');
    return null;
  }

  // Crear escena y cámara
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
  camera.rotation.z = Math.PI; // Rota la cámara 180 grados
  scene.add(camera);

  // Crear renderizador
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Controles de órbita
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(1, 0, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.zoomSpeed = 1.2;
  controls.rotateSpeed = -0.5;
  controls.minPolarAngle = 0;
  controls.maxPolarAngle = Math.PI;
  controls.update();

  // Ajustar la escena al redimensionar la ventana
  const onResize = () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };
  window.addEventListener('resize', onResize);

  // Animación
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
    window.removeEventListener('resize', onResize);
  }

  return {
    scene,
    camera,
    renderer,
    controls,
    cleanup
  };
}
