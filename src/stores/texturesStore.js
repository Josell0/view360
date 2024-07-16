import { defineStore } from 'pinia';

export const useTexturesStore = defineStore('texturesStore', {
  state: () => ({
    projects: [
      {
        projectName: 'project1',
        textures: [
          {
            name: 'texture1',
            type: 'spherical', // 'spherical' o 'cubemap'
            lowResTexture: '/spherical/UpTow-360-step1-cam01.jpg',
            highResTexture: null, // Puede estar indefinido
            points: [
              { x: 1, y: 2, z: 3 },
              { x: 4, y: 5, z: 6 }
            ]
          },
          // Otros elementos de textura
        ]
      }
    ],
    currentProjectIndex: 0, // Índice del proyecto actual
    currentTextureDetails: null,
    currentTexture: null // Cambiado a null para almacenar un objeto
  }),

  actions: {

    loadTexture() {
      this.currentTexture = this.projects[0].textures[0].lowResTexture
    },





  }
});



// loadTexture(textureIndex) {
//   const project = this.projects[this.currentProjectIndex];
//   if (project) {
//     const texture = project.textures[textureIndex];
//     if (texture) {
//       this.currentTexture = { ...texture, src: texture.lowResTexture };

//       if (texture.highResTexture) {
//         const highResImage = new Image();
//         highResImage.src = texture.highResTexture;
//         highResImage.onload = () => {
//           this.currentTexture.src = texture.highResTexture;
//         };
//       }
//     }
//   }
// },
// initializeCurrentTexture() {
//   if (this.projects[currentProjectIndex].textures.length > 0) {
//     currentTexture = projects[currentProjectIndex].textures[0]
//   } else {
//     console.warn('No projects or textures available to initialize currentTexture.');
//   }
// }