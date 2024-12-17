// coordinatesData.js
// Este archivo agrupa:
// - defaultCameraMiniMaps: Un array de 8 elementos, uno por cada textura, usado en todas las fases por igual.
// - markersTemplate: Un array de 8 elementos, donde cada elemento es un array de markers para la textura correspondiente.
// De este modo, todas las fases comparten las mismas coordenadas de mini mapa y el mismo patrón de markers.

export const defaultCameraMiniMaps = [
    // 8 valores, uno por cada textura
    { x: 88.5, y: 32.2 }, // textura 1
    { x: 69.2, y: 32.2 }, // textura 2
    { x: 43.8, y: 32.2 }, // textura 3
    { x: 21.4, y: 32.2 }, // textura 4
    { x: 43.8, y: 49.7 }, // textura 5
    { x: 55, y: 49.7 },   // textura 6
    { x: 67, y: 49.7 },   // textura 7
    { x: 43.8, y: 65 },   // textura 8
  ];
  
  // markersTemplate: Un array de 8 elementos, cada uno corresponde a una textura.
  // Cada elemento es un array de markers.
  // Un marker tiene { position: {x,y,z}, targetTextureIndex }, entre otros datos opcionales.
  // Aquí un ejemplo simplificado:
  export const markersTemplate = [
    // textura 1:
    [
      { position: { x: 1, y: 0, z: 0 }, targetTextureIndex: 1 },
      { position: { x: 0, y: 0, z: -1 }, targetTextureIndex: 2 }
    ],
    // textura 2:
    [
      { position: { x: -1, y: 0, z: 0 }, targetTextureIndex: 1 }
    ],
    // textura 3:
    [
        { position: { x: 1, y: 0, z: 0 }, targetTextureIndex: 1 },
      { position: { x: 0, y: 0, z: -1 }, targetTextureIndex: 2 }
    ],
    // textura 4:
    [
        { position: { x: 1, y: 0, z: 0 }, targetTextureIndex: 1 },
      { position: { x: 0, y: 0, z: -1 }, targetTextureIndex: 2 }
    ],
    // textura 5:
    [
        { position: { x: 1, y: 0, z: 0 }, targetTextureIndex: 1 },
      { position: { x: 0, y: 0, z: -1 }, targetTextureIndex: 2 }
    ],
    // textura 6:
    [
        { position: { x: 1, y: 0, z: 0 }, targetTextureIndex: 1 },
      { position: { x: 0, y: 0, z: -1 }, targetTextureIndex: 2 }
    ],
    // textura 7:
    [
        { position: { x: 1, y: 0, z: 0 }, targetTextureIndex: 1 },
      { position: { x: 0, y: 0, z: -1 }, targetTextureIndex: 2 }
    ],
    // textura 8:
    [
        { position: { x: 1, y: 0, z: 0 }, targetTextureIndex: 1 },
      { position: { x: 0, y: 0, z: -1 }, targetTextureIndex: 2 }
    ]
  ];
  
  // Si más adelante cambias la posición de markers, lo haces aquí. 
  // Todas las fases los usarán por igual.
  