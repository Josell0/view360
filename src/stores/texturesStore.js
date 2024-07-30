
import { defineStore } from 'pinia'; // Importa defineStore de Pinia

export const useTexturesStore = defineStore('texturesStore', {
  state: () => ({
    projects: [
      {
        projectName: 'PHASE 1',
        projectMap: '/maps/step1.png',
        textures: [
          {
            name: 'texture1',
            type: 'spherical', // Tipo de textura: 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step1-cam01.webp', // Ruta de la textura de baja resolución
            highResTexture: '/spherical/UpTow-360-step1-cam01.jpg', // Ruta de la textura de alta resolución (puede ser indefinida)
            coordinatesPoint: [
              { coordinate: { x: 4, y: 10, z: 6 }, targetTextureId: 2 },
              { coordinate: { x: 4, y: 15, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 88.5, y: 32.2 } // Coordenadas del mini mapa
          },
          {
            name: 'texture2',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step1-cam02.webp',
            highResTexture: '/spherical/UpTow-360-step1-cam02.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 69.2, y: 32.2 } // Coordenadas del mini mapa
          },
          {
            name: 'texture3',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step1-cam03.webp',
            highResTexture: '/spherical/UpTow-360-step1-cam03.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 43.8, y: 32.2 } // Coordenadas del mini mapa
          },
          {
            name: 'texture4',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step1-cam04.webp',
            highResTexture: '/spherical/UpTow-360-step1-cam04.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 21.4, y: 32.2 } // Coordenadas del mini mapa
          },
          {
            name: 'texture5',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step1-cam05.webp',
            highResTexture: '/spherical/UpTow-360-step1-cam05.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 43.8, y: 49.7 } // Coordenadas del mini mapa
          },
          {
            name: 'texture6',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step1-cam06.webp',
            highResTexture: '/spherical/UpTow-360-step1-cam06.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 55, y: 49.7 } // Coordenadas del mini mapa
          },
          {
            name: 'texture7',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step1-cam07.webp',
            highResTexture: '/spherical/UpTow-360-step1-cam07.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 67, y: 49.7} // Coordenadas del mini mapa
          },
          {
            name: 'texture8',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step1-cam08.webp',
            highResTexture: '/spherical/UpTow-360-step1-cam08.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 43.8, y: 65 } // Coordenadas del mini mapa
          },
          
        ]
      },
      {
        projectName: 'PHASE 2',
        projectMap: '/maps/step2.png',
        textures: [
          {
            name: 'texture1',
            type: 'spherical', // Tipo de textura: 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step2-cam01.webp', // Ruta de la textura de baja resolución
            highResTexture: '/spherical/UpTow-360-step2-cam01.jpg', // Ruta de la textura de alta resolución (puede ser indefinida)
            coordinatesPoint: [
              { coordinate: { x: 4, y: 10, z: 6 }, targetTextureId: 2 },
              { coordinate: { x: 4, y: 15, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 88.5, y: 32.2 } // Coordenadas del mini mapa
          },
          {
            name: 'texture2',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step2-cam02.webp',
            highResTexture: '/spherical/UpTow-360-step2-cam02.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 69.2, y: 32.2 } // Coordenadas del mini mapa
          },
          {
            name: 'texture3',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step2-cam03.webp',
            highResTexture: '/spherical/UpTow-360-step2-cam03.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 43.8, y: 32.2 } // Coordenadas del mini mapa
          },
          {
            name: 'texture4',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step2-cam04.webp',
            highResTexture: '/spherical/UpTow-360-step2-cam04.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 21.4, y: 32.2 } // Coordenadas del mini mapa
          },
          {
            name: 'texture5',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step2-cam05.webp',
            highResTexture: '/spherical/UpTow-360-step2-cam05.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 43.8, y: 49.7 } // Coordenadas del mini mapa
          },
          {
            name: 'texture6',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step2-cam06.webp',
            highResTexture: '/spherical/UpTow-360-step2-cam06.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 55, y: 49.7 } // Coordenadas del mini mapa
          },
          {
            name: 'texture7',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step2-cam07.webp',
            highResTexture: '/spherical/UpTow-360-step2-cam07.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 67, y: 49.7} // Coordenadas del mini mapa
          },
          {
            name: 'texture8',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step2-cam08.webp',
            highResTexture: '/spherical/UpTow-360-step2-cam08.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 43.8, y: 65 } // Coordenadas del mini mapa
          },
          
        ]
      },
      {
        projectName: 'PHASE 3',
        projectMap: '/maps/step3.png',
        textures: [
          {
            name: 'texture1',
            type: 'spherical', // Tipo de textura: 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step3-cam01.webp', // Ruta de la textura de baja resolución
            highResTexture: '/spherical/UpTow-360-step3-cam01.jpg', // Ruta de la textura de alta resolución (puede ser indefinida)
            coordinatesPoint: [
              { coordinate: { x: 4, y: 10, z: 6 }, targetTextureId: 2 },
              { coordinate: { x: 4, y: 15, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 88.5, y: 32.2 } // Coordenadas del mini mapa
          },
          {
            name: 'texture2',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step3-cam02.webp',
            highResTexture: '/spherical/UpTow-360-step3-cam02.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 69.2, y: 32.2 } // Coordenadas del mini mapa
          },
          {
            name: 'texture3',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step3-cam03.webp',
            highResTexture: '/spherical/UpTow-360-step3-cam03.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 43.8, y: 32.2 } // Coordenadas del mini mapa
          },
          {
            name: 'texture4',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step3-cam04.webp',
            highResTexture: '/spherical/UpTow-360-step3-cam04.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 21.4, y: 32.2 } // Coordenadas del mini mapa
          },
          {
            name: 'texture5',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step3-cam05.webp',
            highResTexture: '/spherical/UpTow-360-step3-cam05.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 43.8, y: 49.7 } // Coordenadas del mini mapa
          },
          {
            name: 'texture6',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step3-cam06.webp',
            highResTexture: '/spherical/UpTow-360-step3-cam06.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 55, y: 49.7 } // Coordenadas del mini mapa
          },
          {
            name: 'texture7',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step3-cam07.webp',
            highResTexture: '/spherical/UpTow-360-step3-cam07.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 67, y: 49.7} // Coordenadas del mini mapa
          },
          {
            name: 'texture8',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step3-cam08.webp',
            highResTexture: '/spherical/UpTow-360-step3-cam08.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 43.8, y: 65 } // Coordenadas del mini mapa
          },
          
        ]
      },
      {
        projectName: 'PHASE 4',
        projectMap: '/maps/step4.png',
        textures: [
          {
            name: 'texture1',
            type: 'spherical', // Tipo de textura: 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step4-cam01.webp', // Ruta de la textura de baja resolución
            highResTexture: '/spherical/UpTow-360-step4-cam01.jpg', // Ruta de la textura de alta resolución (puede ser indefinida)
            coordinatesPoint: [
              { coordinate: { x: 4, y: 10, z: 6 }, targetTextureId: 2 },
              { coordinate: { x: 4, y: 15, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 88.5, y: 32.2 } // Coordenadas del mini mapa
          },
          {
            name: 'texture2',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step4-cam02.webp',
            highResTexture: '/spherical/UpTow-360-step4-cam02.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 69.2, y: 32.2 } // Coordenadas del mini mapa
          },
          {
            name: 'texture3',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step4-cam03.webp',
            highResTexture: '/spherical/UpTow-360-step4-cam03.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 43.8, y: 32.2 } // Coordenadas del mini mapa
          },
          {
            name: 'texture4',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step4-cam04.webp',
            highResTexture: '/spherical/UpTow-360-step4-cam04.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 21.4, y: 32.2 } // Coordenadas del mini mapa
          },
          {
            name: 'texture5',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step4-cam05.webp',
            highResTexture: '/spherical/UpTow-360-step4-cam05.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 43.8, y: 49.7 } // Coordenadas del mini mapa
          },
          {
            name: 'texture6',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step4-cam06.webp',
            highResTexture: '/spherical/UpTow-360-step4-cam06.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 55, y: 49.7 } // Coordenadas del mini mapa
          },
          {
            name: 'texture7',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step4-cam07.webp',
            highResTexture: '/spherical/UpTow-360-step4-cam07.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 67, y: 49.7} // Coordenadas del mini mapa
          },
          {
            name: 'texture8',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step4-cam08.webp',
            highResTexture: '/spherical/UpTow-360-step4-cam08.jpg', // Puede estar indefinido
            points: [
              { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
              { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
            ],
            cameraMiniMap: { x: 43.8, y: 65 } // Coordenadas del mini mapa
          },
          
        ]
      },
    ],

    currentProjectIndex: 0, // Índice del proyecto actual
    currentTextureIndex: 0, // Índice de la textura actual
  }),

  getters: {
    currentLowResTexture: (state) => {
      const texture = state.projects[state.currentProjectIndex]?.textures[state.currentTextureIndex]?.lowResTexture;
      return texture || null;
    },
    currentHighResTexture: (state) => {
      const texture = state.projects[state.currentProjectIndex]?.textures[state.currentTextureIndex]?.highResTexture;
      return texture || null;
    },
    currentProjectMap: (state) => {
      const projectMap = state.projects[state.currentProjectIndex]?.projectMap;
      return projectMap || null;
    },
    currentCameraMiniMap: (state) => {
      const cameraMiniMap = state.projects[state.currentProjectIndex]?.textures[state.currentTextureIndex]?.cameraMiniMap;
      return cameraMiniMap || null;
    },
    currentProject: (state) => {
      return state.projects[state.currentProjectIndex] || null;
    },
  },

  actions: {
    // Cambia el índice del proyecto actual
    setCurrentProjectIndex(projectIndex) {
      this.currentProjectIndex = projectIndex;
      this.currentTextureIndex = 0; // Resetea el índice de la textura cuando cambia el proyecto
    },
    // Cambia el índice de la textura actual
    setCurrentTextureIndex(textureIndex) {
      this.currentTextureIndex = textureIndex;
    },
  }


});



