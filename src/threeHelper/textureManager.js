// textureManager.js
// Este archivo se encarga de:
// 1. Cargar texturas para entornos 360 (baja y alta resolución).
// 2. Aplicarlas a la escena como fondo (scene.background).
// 3. Realizar transiciones suaves entre texturas con animaciones (usando GSAP).

import * as THREE from 'three';
import { gsap } from 'gsap';

/**
 * Carga una textura de forma asíncrona utilizando Three.TextureLoader.
 * Ajusta el mapeo equirectangular y la codificación del color (encoding).
 * 
 * @param {string} url - La ruta de la textura a cargar.
 * @returns {Promise<THREE.Texture>} - Una promesa que se resuelve con la textura cargada.
 */
function loadTexture(url) {
  const textureLoader = new THREE.TextureLoader();
  return new Promise((resolve, reject) => {
    textureLoader.load(
      url,
      (texture) => {
          // Evitar que la imagen aparezca invertida verticalmente:
          texture.flipY = true;
          
        // Configuramos el mapeo equirectangular para ver la textura como un entorno 360.
        texture.mapping = THREE.EquirectangularReflectionMapping;

        // Ajuste de color. Para versiones anteriores a r152, usar sRGBEncoding:
        //texture.encoding = THREE.sRGBEncoding;
        texture.colorSpace = THREE.SRGBColorSpace;


        // Ajustar filtros para mejorar la visualización. Esto ayuda a que la textura no se vea granulada.
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;

        // No establecer texture.needsUpdate = true, pues puede causar el error "Texture is immutable".
        
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

/**
 * Configura las texturas iniciales (lowRes y highRes) en la escena.
 * Primero intenta la textura de baja resolución. Si se carga con éxito,
 * la aplica a scene.background. Luego intenta la textura de alta resolución.
 * 
 * @param {Object} sceneObject - Objeto con { scene, camera, renderer } retornado por createScene.
 * @param {string} lowResTexture - URL de la textura de baja resolución.
 * @param {string} highResTexture - URL de la textura de alta resolución.
 */
export async function setupInitialTextures(sceneObject, lowResTexture, highResTexture) {
  let texture;

  // Intentar cargar la lowRes primero
  if (lowResTexture) {
    try {
      texture = await loadTexture(lowResTexture);
      sceneObject.scene.background = texture;
      sceneObject.renderer.render(sceneObject.scene, sceneObject.camera);
    } catch {
      console.warn("Failed to load low res texture, trying high res...");
    }
  }

  // Luego, intentar la highRes
  if (highResTexture) {
    try {
      const highResTextureLoaded = await loadTexture(highResTexture);
      sceneObject.scene.background = highResTextureLoaded;
      sceneObject.renderer.render(sceneObject.scene, sceneObject.camera);
    } catch {
      console.warn("Failed to load high res texture");
      if (!texture) {
        console.error("No textures could be loaded");
      }
    }
  }
}

/**
 * Realiza una transición animada entre texturas con GSAP:
 * 1. Acerca la cámara (reduciendo el FOV).
 * 2. Carga la nueva textura y la aplica.
 * 3. Vuelve el FOV al valor original.
 * 
 * @param {Object} sceneObject - Objeto con { scene, camera, renderer }.
 * @param {string} newTextureUrl - URL de la nueva textura a aplicar.
 * @returns {Promise<void>}
 */
async function transitionTexture(sceneObject, newTextureUrl) {
  await new Promise((resolve) => {
    gsap.to(sceneObject.camera, {
      duration: 0.25,
      fov: 70, // Acerca el FOV para hacer el cambio de textura
      onUpdate: () => {
        sceneObject.camera.updateProjectionMatrix();
      },
      onComplete: async () => {
        // Cargar la nueva textura
        const newTexture = await loadTexture(newTextureUrl);
        sceneObject.scene.background = newTexture;
        sceneObject.renderer.render(sceneObject.scene, sceneObject.camera);

        // Regresar el FOV a su valor original (75 en este ejemplo)
        gsap.to(sceneObject.camera, {
          duration: 0.05,
          fov: 75,
          onUpdate: () => {
            sceneObject.camera.updateProjectionMatrix();
          },
          onComplete: resolve
        });
      }
    });
  });
}

/**
 * Actualiza la textura de la escena para cambiar a una nueva lowRes o highRes.
 * Primero intenta con lowRes, si falla o si luego quieres mejorar la calidad,
 * intenta highRes.
 * 
 * @param {Object} sceneObject 
 * @param {string} lowResTexture 
 * @param {string} highResTexture 
 */
export async function updateSceneTexture(sceneObject, lowResTexture, highResTexture) {
  // Intentar lowRes primero
  if (lowResTexture) {
    try {
      await transitionTexture(sceneObject, lowResTexture);
    } catch {
      console.warn("Failed to load low res texture, trying high res...");
    }
  }

  // Intentar highRes luego
  if (highResTexture) {
    try {
      await transitionTexture(sceneObject, highResTexture);
    } catch {
      console.warn("Failed to load high res texture");
      if (!lowResTexture) {
        console.error("No textures could be loaded");
      }
    }
  }
}


// // textureManager.js
// // Este archivo se encarga de cargar texturas, aplicarlas a la escena, y manejar las transiciones entre texturas.
// // Usa GSAP para las animaciones de cámara al cambiar texturas.

// import * as THREE from 'three';
// import { gsap } from 'gsap';

// /**
//  * Carga una textura de forma asíncrona.
//  * @param {string} url - URL de la textura a cargar.
//  * @returns {Promise<THREE.Texture>}
//  */
// function loadTexture(url) {
//   const textureLoader = new THREE.TextureLoader();
//   return new Promise((resolve, reject) => {
//     textureLoader.load(
//       url,
//       (texture) => {
//         texture.mapping = THREE.EquirectangularReflectionMapping;
//         //texture.colorSpace = THREE.SRGBColorSpace;
//         //texture.encoding = THREE.sRGBEncoding;

//         resolve(texture);
//       },
//       undefined,
//       (error) => {
//         console.error(`Error loading texture: ${url}`, error);
//         reject(error);
//       }
//     );
//   });
// }

// /**
//  * Configura las texturas iniciales (baja y alta resolución) en la escena.
//  * @param {Object} sceneObject - El objeto de la escena (scene, camera, renderer).
//  * @param {string} lowResTexture - URL de la textura de baja resolución.
//  * @param {string} highResTexture - URL de la textura de alta resolución.
//  */
// export async function setupInitialTextures(sceneObject, lowResTexture, highResTexture) {
//   let texture;

//   // Intenta cargar la low res primero
//   if (lowResTexture) {
//     try {
//       texture = await loadTexture(lowResTexture);
//       sceneObject.scene.background = texture;
//       sceneObject.renderer.render(sceneObject.scene, sceneObject.camera);
//     } catch {
//       console.warn("Failed to load low res texture, trying high res...");
//     }
//   }

//   // Luego la high res
//   if (highResTexture) {
//     try {
//       const highResTextureLoaded = await loadTexture(highResTexture);
//       sceneObject.scene.background = highResTextureLoaded;
//       sceneObject.renderer.render(sceneObject.scene, sceneObject.camera);
//     } catch {
//       console.warn("Failed to load high res texture");
//       if (!texture) {
//         console.error("No textures could be loaded");
//       }
//     }
//   }
// }

// /**
//  * Transición de textura con animación de FOV
//  * @param {Object} sceneObject 
//  * @param {string} newTextureUrl
//  */
// async function transitionTexture(sceneObject, newTextureUrl) {
//   await new Promise((resolve) => {
//     gsap.to(sceneObject.camera, {
//       duration: 0.25,
//       fov: 70,
//       onUpdate: () => {
//         sceneObject.camera.updateProjectionMatrix();
//       },
//       onComplete: async () => {
//         const newTexture = await loadTexture(newTextureUrl);
//         sceneObject.scene.background = newTexture;
//         sceneObject.renderer.render(sceneObject.scene, sceneObject.camera);
//         gsap.to(sceneObject.camera, {
//           duration: 0.05,
//           fov: 75,
//           onUpdate: () => {
//             sceneObject.camera.updateProjectionMatrix();
//           },
//           onComplete: resolve
//         });
//       }
//     });
//   });
// }

// /**
//  * Actualiza la textura de la escena a una nueva lowRes o highRes.
//  * Aplica una transición animada.
//  * @param {Object} sceneObject 
//  * @param {string} lowResTexture 
//  * @param {string} highResTexture 
//  */
// export async function updateSceneTexture(sceneObject, lowResTexture, highResTexture) {
//   if (lowResTexture) {
//     try {
//       await transitionTexture(sceneObject, lowResTexture);
//     } catch {
//       console.warn("Failed to load low res texture, trying high res...");
//     }
//   }

//   if (highResTexture) {
//     try {
//       await transitionTexture(sceneObject, highResTexture);
//     } catch {
//       console.warn("Failed to load high res texture");
//       if (!lowResTexture) {
//         console.error("No textures could be loaded");
//       }
//     }
//   }
// }
