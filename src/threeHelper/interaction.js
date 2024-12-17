// interaction.js
// Aquí manejamos la interacción con el scroll para ajustar el FOV y el rotateSpeed de la cámara.

import * as THREE from 'three';

/**
 * Maneja el evento de scroll (wheel) para ajustar el campo de visión de la cámara.
 * @param {Object} sceneObject - { scene, camera, controls }
 * @param {WheelEvent} event 
 */
function handleScroll(sceneObject, event) {
  const minFov = 25;
  const maxFov = 100;
  const fovChange = event.deltaY * 0.05;
  sceneObject.camera.fov = THREE.MathUtils.clamp(
    sceneObject.camera.fov + fovChange, 
    minFov, 
    maxFov
  );
  sceneObject.camera.updateProjectionMatrix();

  // Ajustar rotateSpeed según el FOV
  const minRotateSpeed = -0.1;
  const maxRotateSpeed = -0.5;
  const ratio = (sceneObject.camera.fov - minFov) / (maxFov - minFov);
  const rotateSpeed = minRotateSpeed + (maxRotateSpeed - minRotateSpeed) * ratio;
  sceneObject.controls.rotateSpeed = rotateSpeed;
}

/**
 * Agrega el listener para el scroll y retorna una función para removerlo.
 * @param {Object} sceneObject 
 * @returns {Function} removeScrollListener
 */
export function addScrollListener(sceneObject) {
  const scrollHandler = (event) => handleScroll(sceneObject, event);
  window.addEventListener('wheel', scrollHandler);

  return () => {
    window.removeEventListener('wheel', scrollHandler);
  };
}
