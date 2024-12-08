// Este archivo define la lista de proyectos (fases) que tiene la aplicación.
// Cada proyecto tendrá su map y sus texturas generadas dinámicamente.
// Aquí importamos la función generateTextures del archivo textureConfig.js.

import { generateTextures } from './textureConfig.js';

// Define una constante con el número de texturas por fase
const TOTAL_TEXTURES_PER_PHASE = 8;

// Aquí definimos el array de proyectos. Cada proyecto:
// - Tiene un nombre "humano" (projectName) que se muestra en la UI.
// - Un mapa (projectMap) que se muestra como referencia.
// - Un array de texturas generadas por generateTextures, al que le pasamos:
//   1. phaseName: cadena que define la carpeta y nombre base de los archivos.
//   2. el número de texturas que tiene esa fase.
// Como las coordenadas por defecto y puntos están en generateTextures,
// no necesitamos repetirlos aquí.
export const projects = [
    {
      projectName: 'PHASE 1',
      projectMap: '/maps/step1.png',
      textures: generateTextures('PHASE_1', TOTAL_TEXTURES_PER_PHASE)
    },
    {
      projectName: 'PHASE 2',
      projectMap: '/maps/step2.png',
      textures: generateTextures('PHASE_2', TOTAL_TEXTURES_PER_PHASE)
    },
    {
      projectName: 'PHASE 3',
      projectMap: '/maps/step3.png',
      textures: generateTextures('PHASE_3', TOTAL_TEXTURES_PER_PHASE)
    },
    {
      projectName: 'PHASE 4',
      projectMap: '/maps/step4.png',
      textures: generateTextures('PHASE_4', TOTAL_TEXTURES_PER_PHASE)
    },
  ];
