<template>
  <div>
    hola
    <canvas class="webgl"></canvas>
    
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useTexturesStore } from '../stores/texturesStore';
import { createScene } from '../threeHelper/threeHelper'

const texturesStore = useTexturesStore();


onMounted(() => {
  texturesStore.loadTexture();
  if (texturesStore.currentTexture) {
    console.log('Current Texture:', texturesStore.currentTexture);
    console.log(texturesStore.currentTexture);
    createScene(texturesStore.currentTexture);
  } else {
    console.warn('No hay textura seleccionada en el store');
  }
});

// onMounted(() => {
//   texturesStore.loadTexture();
//   if (texturesStore.currentTexture) {
//     setTimeout(() => {
//       createScene(texturesStore.currentTexture);
//     }, 0); // Pequeño retraso para asegurar que el DOM esté listo
//   } else {
//     console.warn('No hay textura seleccionada en el store');
//   }
// });
// onMounted(() => {
//   // Asegúrate de que currentTexture esté definido
//   texturesStore.loadTexture()
//   if (texturesStore.currentTexture) {
//     createScene(texturesStore.currentTexture);
//   } else {
//     console.warn('No hay textura seleccionada en el store');
//   }
// });
</script>




<!-- <template>
  <div>
    <button @click="loadSpecificTexture(3)">Load Texture 4</button>
    <button @click="loadSpecificTexture(5)">Load Texture 6</button>
    <button @click="loadSpecificTexture(7)">Load Texture 8</button>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import SphericalViewer from '../components/viewer/SphericalViewer.vue';
import CubemapViewer from '../components/viewer/CubemapViewer.vue';

// Importamos la tienda de texturas
const spherical = SphericalViewer()



// Definimos la propiedad computada para determinar el visor actual

const currentViewer = computed(() => {
  if (texturesStore.currentTexture) {
    //return texturesStore.currentTexture.type === 'cubemap' ? 'CubemapViewer' : 'SphericalViewer';
    spherical
  }
  return null;
});

// Método para cargar una textura específica
const loadSpecificTexture = (textureIndex) => {
  texturesStore.loadTexture(textureIndex);
};

// Llamamos a initializeCurrentTexture cuando el componente se monta
onMounted(() => {
  texturesStore.initializeCurrentTexture();
});
</script> -->
