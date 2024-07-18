
import { defineStore } from 'pinia';

export const useTexturesStore = defineStore('texturesStore', {
  state: () => ({
    projects: [
      {
        projectName: 'STEP 1',
        textures: [
          {
            name: 'texture1',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step1-cam01.webp',
            highResTexture: '/spherical/UpTow-360-step1-cam01.jpg', // Puede estar indefinido
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
          // Otros elementos de textura
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
          // Otros elementos de textura
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
          // Otros elementos de textura
        ]
      }
    ],

    currentProjectIndex: 0,
    currentTextureIndex: 0,
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
  },

  actions: {
    setCurrentProjectIndex(projectIndex) {
      this.currentProjectIndex = projectIndex;
      this.currentTextureIndex = 0; // Reset the texture index when the project changes
    },
    setCurrentTextureIndex(textureIndex) {
      this.currentTextureIndex = textureIndex;
    },
  }


});



