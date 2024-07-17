
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
            name: 'texture1',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step1-cam01.webp',
            highResTexture: '/spherical/UpTow-360-step1-cam01.jpg', // Puede estar indefinido
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
            lowResTexture: '/spherical/UpTow-360-step1-cam01.webp',
            highResTexture: '/spherical/UpTow-360-step1-cam01.jpg', // Puede estar indefinido
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

  // getters: {
  //   currentLowResTexture: (state) => {
  //     const texture = state.projects[state.currentProjectIndex]?.textures[state.currentTextureIndex]?.lowResTexture;
  //     return texture || null;
  //   },
  //   currentHighResTexture: (state) => {
  //     const texture = state.projects[state.currentProjectIndex]?.textures[state.currentTextureIndex]?.highResTexture;
  //     return texture || null;
  //   },
  // },

  // actions: {
  //   loadTexture(projectIndex = 0, textureIndex = 0) {
  //     if (this.projects[projectIndex] && this.projects[projectIndex].textures[textureIndex]) {
  //       this.currentProjectIndex = projectIndex;
  //       this.currentTextureIndex = textureIndex;
  //     } else {
  //       console.warn('Proyecto o textura no encontrados');
  //     }
  //   }
  // }
});


// import { defineStore } from 'pinia';

// export const useTexturesStore = defineStore('texturesStore', {
//   state: () => ({
//     projects: [
//       {
//         projectName: 'project1',
//         textures: [
//           {
//             name: 'texture1',
//             type: 'spherical', // 'spherical' o 'cubemap'
//             lowResTexture: '/spherical/UpTow-360-step1-cam01.jpg',
//             highResTexture: null, // Puede estar indefinido
//             points: [
//               { x: 1, y: 2, z: 3 },
//               { x: 4, y: 5, z: 6 }
//             ]
//           },
//           // Otros elementos de textura
//         ]
//       }
//     ],
//     currentProjectIndex: 0, // Índice del proyecto actual
//     currentTextureDetails: null,
//     currentTexture: null // Cambiado a null para almacenar un objeto
//   }),

//   actions: {

//     loadTexture() {
//       this.currentTexture = this.projects[0].textures[0].lowResTexture
//     },





//   }
// });

