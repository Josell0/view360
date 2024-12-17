// models.js
// Aquí definimos la lógica para añadir esferas u otros modelos 3D a la escena.

import * as THREE from 'three';

/**
 * Añade una esfera a la escena.
 * @param {THREE.Scene} scene 
 * @param {Object} position { x, y, z }
 * @param {number} radius 
 * @param {Function} onClick - función a ejecutar al hacer click en la esfera.
 */
export function addSphereToScene(scene, position, radius, onClick) {
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(position.x, position.y, position.z);
  sphere.userData.onClick = onClick;
  scene.add(sphere);
  return sphere;
}

/**
 * Actualiza las esferas en la escena según las texturas (si usan puntos).
 * @param {Object} sceneObject - { scene, ... }
 * @param {Array} textures
 * @param {Function} onTextureChange
 */
export function updateSceneSpheres(sceneObject, textures, onTextureChange) {
  // Elimina esferas existentes
  sceneObject.scene.children = sceneObject.scene.children.filter(child =>
    !(child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry)
  );

  // Añade nuevas esferas
  textures.forEach((texture, textureIndex) => {
    texture.points.forEach(pointArray => {
      pointArray.forEach(point => {
        addSphereToScene(sceneObject.scene, point, 0.1, () => onTextureChange(textureIndex));
      });
    });
  });
}
