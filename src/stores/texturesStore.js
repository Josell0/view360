
import { defineStore } from 'pinia'; // Importa defineStore de Pinia

export const useTexturesStore = defineStore('texturesStore', {
  state: () => ({
    projects: [
      {
        projectName: 'STEP 1',
        textures: [
          {
            name: 'texture1',
            type: 'spherical', // Tipo de textura: 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step1-cam01.webp', // Ruta de la textura de baja resolución
            highResTexture: '/spherical/UpTow-360-step1-cam01.jpg', // Ruta de la textura de alta resolución (puede ser indefinida)
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture2',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step1-cam02.webp',
            highResTexture: '/spherical/UpTow-360-step1-cam02.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture3',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step1-cam03.webp',
            highResTexture: '/spherical/UpTow-360-step1-cam03.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture4',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step1-cam04.webp',
            highResTexture: '/spherical/UpTow-360-step1-cam04.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture5',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step1-cam05.webp',
            highResTexture: '/spherical/UpTow-360-step1-cam05.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture6',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step1-cam06.webp',
            highResTexture: '/spherical/UpTow-360-step1-cam06.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture7',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step1-cam07.webp',
            highResTexture: '/spherical/UpTow-360-step1-cam07.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture8',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step1-cam08.webp',
            highResTexture: '/spherical/UpTow-360-step1-cam08.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          
        ]
      },
      {
        projectName: 'STEP 2',
        textures: [
          {
            name: 'texture1',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step2-cam01.webp',
            highResTexture: '/spherical/UpTow-360-step2-cam01.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture2',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step2-cam02.webp',
            highResTexture: '/spherical/UpTow-360-step2-cam02.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },

          {
            name: 'texture3',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step2-cam03.webp',
            highResTexture: '/spherical/UpTow-360-step2-cam03.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture4',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step2-cam04.webp',
            highResTexture: '/spherical/UpTow-360-step2-cam04.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture5',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step2-cam05.webp',
            highResTexture: '/spherical/UpTow-360-step2-cam05.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture6',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step2-cam06.webp',
            highResTexture: '/spherical/UpTow-360-step2-cam06.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture7',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step2-cam07.webp',
            highResTexture: '/spherical/UpTow-360-step2-cam07.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture8',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step2-cam08.webp',
            highResTexture: '/spherical/UpTow-360-step2-cam08.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          
        ]
      },
      {
        projectName: 'STEP 3',
        textures: [
          {
            name: 'texture1',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step3-cam01.webp',
            highResTexture: '/spherical/UpTow-360-step3-cam01.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture2',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step3-cam02.webp',
            highResTexture: '/spherical/UpTow-360-step3-cam02.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },

          {
            name: 'texture3',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step3-cam03.webp',
            highResTexture: '/spherical/UpTow-360-step3-cam03.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture4',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step3-cam04.webp',
            highResTexture: '/spherical/UpTow-360-step3-cam04.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture5',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step3-cam05.webp',
            highResTexture: '/spherical/UpTow-360-step3-cam05.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture6',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step3-cam06.webp',
            highResTexture: '/spherical/UpTow-360-step3-cam06.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture7',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step3-cam07.webp',
            highResTexture: '/spherical/UpTow-360-step3-cam07.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture8',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step3-cam08.webp',
            highResTexture: '/spherical/UpTow-360-step3-cam08.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          // Otros elementos de textura
        ]
      },
      {
        projectName: 'STEP 4',
        textures: [
          {
            name: 'texture1',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step4-cam01.webp',
            highResTexture: '/spherical/UpTow-360-step4-cam01.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture2',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step4-cam02.webp',
            highResTexture: '/spherical/UpTow-360-step4-cam02.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },

          {
            name: 'texture3',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step4-cam03.webp',
            highResTexture: '/spherical/UpTow-360-step4-cam03.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture4',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step4-cam04.webp',
            highResTexture: '/spherical/UpTow-360-step4-cam04.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture5',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step4-cam05.webp',
            highResTexture: '/spherical/UpTow-360-step4-cam05.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture6',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step4-cam06.webp',
            highResTexture: '/spherical/UpTow-360-step4-cam06.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture7',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step4-cam07.webp',
            highResTexture: '/spherical/UpTow-360-step4-cam07.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          {
            name: 'texture8',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step4-cam08.webp',
            highResTexture: '/spherical/UpTow-360-step4-cam08.jpg', // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          
        ]
      }
    ],

    currentProjectIndex: 0, // Índice del proyecto actual
    currentTextureIndex: 0, // Índice de la textura actual
  }),

  getters: {
    currentLowResTexture: (state) => {
      // Retorna la textura de baja resolución del proyecto y textura actuales
      const texture = state.projects[state.currentProjectIndex]?.textures[state.currentTextureIndex]?.lowResTexture;
      return texture || null;
    },
    currentHighResTexture: (state) => {
      // Retorna la textura de alta resolución del proyecto y textura actuales
      const texture = state.projects[state.currentProjectIndex]?.textures[state.currentTextureIndex]?.highResTexture;
      return texture || null;
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



