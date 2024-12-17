import * as THREE from 'three';

let currentMarkersObjects = []; 
let hoveredMarker = null;
let originalHoverData = { color: null, opacity: null };

// Colores base
const BASE_COLOR = new THREE.Color(0x444444); // Gris base
const HOVER_COLOR = new THREE.Color(0x666666); // Gris más oscuro al hover
const CURRENT_COLOR = new THREE.Color(0xff0000); // Rojo para el actual

/**
 * updateMarkers
 * @param {THREE.Scene} scene 
 * @param {Array} markersArray - [{position:{x,y,z}, targetTextureIndex:number}]
 * @param {number} currentTextureIndex
 */
export function updateMarkers(scene, markersArray, currentTextureIndex) {
  clearMarkers(scene);
  for (const markerData of markersArray) {
    addMarkerToScene(scene, markerData.position, markerData.targetTextureIndex, currentTextureIndex);
  }
}

/**
 * Crea un marker como un disco circular en el suelo.
 * Estos discos pulsarán con un ciclo infinito.
 * Para ello, cada marker guardará un userData.time que se actualizará en animateMarkers.
 */
function addMarkerToScene(scene, position, targetTextureIndex, currentTextureIndex) {
  const geometry = new THREE.CircleGeometry(0.1, 32); // disco con radio 0.1
  // Si es el marcador actual, color base rojo, sino gris
  const isCurrent = (targetTextureIndex === currentTextureIndex);
  const color = isCurrent ? CURRENT_COLOR.clone() : BASE_COLOR.clone();

  const material = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: 1.0 // empezamos con opacidad completa
  });

  const marker = new THREE.Mesh(geometry, material);
  marker.rotation.x = -Math.PI / 2; // poner el disco en el suelo (horizontal)
  marker.position.set(position.x, position.y, position.z);

  marker.userData.targetTextureIndex = targetTextureIndex;
  marker.userData.isCurrent = isCurrent;
  marker.userData.time = 0; // tiempo para animación
  scene.add(marker);
  currentMarkersObjects.push(marker);
}

function clearMarkers(scene) {
  for (const marker of currentMarkersObjects) {
    scene.remove(marker);
  }
  currentMarkersObjects = [];
}

/**
 * Llamar en cada frame desde Viewer.vue:
 * animateMarkers() actualizará el scale y la opacity de cada marker para crear el efecto pulsación.
 */
export function animateMarkers() {
  for (const marker of currentMarkersObjects) {
    marker.userData.time += 0.01; // incrementar tiempo
    
    // La animación: un ciclo donde el marker nace pequeño y opaco, crece y se desvanece.
    // Ejemplo: usar una función sinusoidal o lineal
    // time % 1 nos da un valor de 0 a 1 cada ciclo
    const cycle = (marker.userData.time % 1);
    // Escala y opacidad basadas en cycle
    // Por ej: cuando cycle=0 -> scale=0.5, opacity=1, 
    // cycle=0.5 -> scale=1.5, opacity=0.5, 
    // cycle=1 -> scale=2, opacity=0
    
    const scale = 0.5 + cycle * 1.5; // va de 0.5 a 2.0
    const opacity = 1.0 - cycle; // va de 1 a 0
    
    marker.scale.set(scale, scale, scale);
    
    // Si es el actual, que siga rojo y opaco, 
    // podríamos hacer el actual menos cambiante:
    if (marker.userData.isCurrent) {
      // El actual podría no cambiar opacidad tanto, 
      // si quieres que siga pulsando cambia este bloque,
      // si quieres que sea estable:
      marker.material.opacity = 1.0; 
    } else {
      // Para los demás:
      marker.material.opacity = opacity;
    }
  }
}

/**
 * onCanvasClick igual que antes, no cambia.
 */
export function onCanvasClick(event, camera, scene, raycaster, mouse) {
  setMouseCoordinates(event, mouse, event.target);
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(currentMarkersObjects, true);
  if (intersects.length > 0) {
    const marker = intersects[0].object;
    return marker.userData.targetTextureIndex;
  }
  return undefined;
}

/**
 * onCanvasMouseMove:
 * Usamos raycaster para detectar hover. 
 * Si no es el actual, cambiamos color y opacidad ligeramente.
 */
export function onCanvasMouseMove(event, camera, scene, raycaster, mouse) {
  setMouseCoordinates(event, mouse, event.target);
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(currentMarkersObjects, true);
  if (intersects.length > 0) {
    const marker = intersects[0].object;
    if (marker.userData.isCurrent) {
      // Es el marcador actual, ya está en rojo permanente
      restoreHoveredMarker();
      hoveredMarker = null;
      return;
    }

    if (marker !== hoveredMarker) {
      // Restaurar el anterior hovered si había
      restoreHoveredMarker();
      // Guardar estado original
      originalHoverData.color = marker.material.color.getHex();
      originalHoverData.opacity = marker.material.opacity;

      // Cambiar a gris más oscuro y un poco más opaco.
      marker.material.color.set(0x666666);
      // marker.material.opacity = puede ser un poco más alto, ej 0.8 si era 0.5
      // Como pulsamos el marker, su opacidad varía, pero al hover sólo un sutil cambio:
      // Si era semi-transparente, aumentamos un poco la opacidad:
      marker.material.opacity = Math.min(marker.material.opacity + 0.2, 1.0);
      
      hoveredMarker = marker;
    }
  } else {
    restoreHoveredMarker();
    hoveredMarker = null;
  }
}

function restoreHoveredMarker() {
  if (hoveredMarker) {
    hoveredMarker.material.color.setHex(originalHoverData.color);
    hoveredMarker.material.opacity = originalHoverData.opacity;
  }
}

function setMouseCoordinates(event, mouse, canvas) {
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}



// // markersHelper.js (ajustado)
// // Este archivo ya no importará useTexturesStore.
// // onCanvasClick sólo detectará cuál marker se clicó y retornará esa información.

// import * as THREE from 'three';

// let currentMarkersObjects = [];
// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();

// export function updateMarkers(scene, markersArray) {
//   clearMarkers(scene);
//   for (const markerData of markersArray) {
//     addMarkerToScene(scene, markerData.position, markerData.targetTextureIndex);
//   }
// }

// function addMarkerToScene(scene, position, targetTextureIndex) {
//   const geometry = new THREE.SphereGeometry(0.05, 16, 16);
//   const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
//   const marker = new THREE.Mesh(geometry, material);
//   marker.position.set(position.x, position.y, position.z);
//   marker.userData.targetTextureIndex = targetTextureIndex;

//   scene.add(marker);
//   currentMarkersObjects.push(marker);
// }

// function clearMarkers(scene) {
//   for (const marker of currentMarkersObjects) {
//     scene.remove(marker);
//   }
//   currentMarkersObjects = [];
// }

// /**
//  * onCanvasClick ahora no accede al store, sólo detecta el marker clicado y devuelve su targetTextureIndex.
//  * @returns {number|undefined} el targetTextureIndex del marker clicado
//  */
// export function onCanvasClick(event, camera, scene) {
//   const rect = event.target.getBoundingClientRect();
//   mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//   mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

//   raycaster.setFromCamera(mouse, camera);

//   const intersects = raycaster.intersectObjects(currentMarkersObjects, true);
//   if (intersects.length > 0) {
//     const marker = intersects[0].object;
//     return marker.userData.targetTextureIndex;
//   }
//   return undefined;
// }
