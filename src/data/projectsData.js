// projectsData.js
// Aquí generamos las texturas para cada Phase.
// Después de generarlas, llamamos a attachCoordinates para asignar el miniMap y los markers
// desde defaultCameraMiniMaps y markersTemplate.

import { generateTextures } from './textureConfig.js';
import { defaultCameraMiniMaps, markersTemplate } from './coordinatesData.js';

const TOTAL_TEXTURES_PER_PHASE = 8;

/**
 * Asigna cameraMiniMap y markers a cada textura generada.
 * Como todas las fases comparten las mismas miniMaps y markers,
 * simplemente aplicamos el mismo patrón.
 * @param {Array} textures - las texturas generadas por generateTextures
 */
function attachCoordinates(textures) {
  for (let i = 0; i < textures.length; i++) {
    // Asignar cameraMiniMap
    textures[i].cameraMiniMap = defaultCameraMiniMaps[i] || { x:0, y:0 };
    //textures[i].cameraMiniMap = defaultCameraMiniMaps[i] || { x: 0, y: 0 };

    // Asignar markers
    textures[i].markers = markersTemplate[i] || [];
  }
}

export const projects = [
  {
    projectName: 'PHASE 1',
    projectMap: '/maps/step1.png',
    textures: (function() {
      const tex = generateTextures('PHASE_1', TOTAL_TEXTURES_PER_PHASE);
      attachCoordinates(tex);
      return tex;
    })()
  },
  {
    projectName: 'PHASE 2',
    projectMap: '/maps/step2.png',
    textures: (function() {
      const tex = generateTextures('PHASE_2', TOTAL_TEXTURES_PER_PHASE);
      attachCoordinates(tex);
      return tex;
    })()
  },
  {
    projectName: 'PHASE 3',
    projectMap: '/maps/step3.png',
    textures: (function() {
      const tex = generateTextures('PHASE_3', TOTAL_TEXTURES_PER_PHASE);
      attachCoordinates(tex);
      return tex;
    })()
  },
  {
    projectName: 'PHASE 4',
    projectMap: '/maps/step4.png',
    textures: (function() {
      const tex = generateTextures('PHASE_4', TOTAL_TEXTURES_PER_PHASE);
      attachCoordinates(tex);
      return tex;
    })()
  },
];



// // Este archivo define la lista de proyectos (fases) que tiene la aplicación.
// // Cada proyecto tendrá su map y sus texturas generadas dinámicamente.
// // Aquí importamos la función generateTextures del archivo textureConfig.js.

// import { generateTextures } from './textureConfig.js';

// // Define una constante con el número de texturas por fase
// const TOTAL_TEXTURES_PER_PHASE = 8;

// // Aquí definimos el array de proyectos. Cada proyecto:
// // - Tiene un nombre "humano" (projectName) que se muestra en la UI.
// // - Un mapa (projectMap) que se muestra como referencia.
// // - Un array de texturas generadas por generateTextures, al que le pasamos:
// //   1. phaseName: cadena que define la carpeta y nombre base de los archivos.
// //   2. el número de texturas que tiene esa fase.
// // Como las coordenadas por defecto y puntos están en generateTextures,
// // no necesitamos repetirlos aquí.
// export const projects = [
//     {
//       projectName: 'PHASE 1',
//       projectMap: '/maps/step1.png',
//       textures: generateTextures('PHASE_1', TOTAL_TEXTURES_PER_PHASE)
//     },
//     {
//       projectName: 'PHASE 2',
//       projectMap: '/maps/step2.png',
//       textures: generateTextures('PHASE_2', TOTAL_TEXTURES_PER_PHASE)
//     },
//     {
//       projectName: 'PHASE 3',
//       projectMap: '/maps/step3.png',
//       textures: generateTextures('PHASE_3', TOTAL_TEXTURES_PER_PHASE)
//     },
//     {
//       projectName: 'PHASE 4',
//       projectMap: '/maps/step4.png',
//       textures: generateTextures('PHASE_4', TOTAL_TEXTURES_PER_PHASE)
//     },
//   ];
