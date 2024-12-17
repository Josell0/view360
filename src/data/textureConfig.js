// textureConfig.js
// Genera texturas sin markers ni miniMap. Esto no cambia.
// Las markers y miniMap se asignan después en projectsData.js con attachCoordinates.

export function generateTextures(phaseName, totalTextures) {
  const textures = [];
  for (let i = 1; i <= totalTextures; i++) {
    const camNumber = i.toString().padStart(2, '0');
    textures.push({
      name: `texture${i}`,
      type: 'spherical',
      lowResTexture: `/spherical/${phaseName}/cam${camNumber}.webp`,
      highResTexture: `/spherical/${phaseName}/cam${camNumber}.jpg`,
    });
  }
  return textures;
}



// // Este archivo se encarga de la configuración relacionada con las texturas.
// // Aquí definimos datos globales y funciones utilitarias para generar arrays de texturas de forma dinámica.

// // Array global de coordenadas de la miniatura del mapa, usado por defecto en todas las texturas.
// // Esto evita tener que repetir estas coordenadas en cada proyecto.
// export const defaultCameraMiniMaps = [
//     { x: 88.5, y: 32.2 },
//     { x: 69.2, y: 32.2 },
//     { x: 43.8, y: 32.2 },
//     { x: 21.4, y: 32.2 },
//     { x: 43.8, y: 49.7 },
//     { x: 55, y: 49.7 },
//     { x: 67, y: 49.7 },
//     { x: 43.8, y: 65 },
//   ];
  
//   // Función para generar texturas de forma dinámica
//   // Parámétros:
//   // - phaseName (string): Nombre interno utilizado para la ruta del archivo.
//   // - totalTextures (number): Cantidad total de texturas a generar.
//   // - cameraMiniMaps (array): Coordenadas para cada textura. Por defecto usa `defaultCameraMiniMaps`.
//   // Retorna un array de objetos "texture", cada uno con rutas lowRes, highRes y otros datos.
//   export function generateTextures(phaseName, totalTextures, cameraMiniMaps = defaultCameraMiniMaps) {
//     const textures = [];
  
//     // Recorremos desde 1 hasta totalTextures para crear cada textura.
//     for (let i = 1; i <= totalTextures; i++) {
//       // Formateamos el número de cámara a dos dígitos, ej: 1 -> "01"
//       const camNumber = i.toString().padStart(2, '0');
  
//       textures.push({
//         name: `texture${i}`,
//         type: 'spherical', // Podría ser 'cubemap' si hicieras otros tipos
//         // Rutas de las texturas. Utilizamos phaseName para cambiar la carpeta según la fase, y camNumber para la textura específica.
//         lowResTexture: `/spherical/${phaseName}/cam${camNumber}.webp`,
//         highResTexture: `/spherical/${phaseName}/cam${camNumber}.jpg`,
//         // Puntos de navegación (ejemplo). Aquí se dejan fijos, pero podrías parametrizarlos.
//         points: [
//           { coordinates: { x: 1, y: 2, z: 3 }, targetTextureId: 2 },
//           { coordinates: { x: 4, y: 5, z: 6 }, targetTextureId: 3 },
//         ],
//         // cameraMiniMap: las coordenadas para ubicar el marcador en el mini mapa.
//         cameraMiniMap: cameraMiniMaps[i - 1] || { x: 0, y: 0 },
//       });
//     }
  
//     return textures;
//   }
  