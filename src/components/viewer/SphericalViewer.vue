<template>
  <div ref="sphericalContainer" class="viewer-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { createScene } from '../threeHelper/threeHelper';
import { useTexturesStore } from '../stores/texturesStore';

const sphericalContainer = ref(null);
const texturesStore = useTexturesStore();
let scene = null;

onMounted(() => {
  if (texturesStore.currentTexture) {
    scene = createScene(sphericalContainer.value, texturesStore.currentTexture.lowResTexture);

    if (texturesStore.currentTexture.highResTexture) {
      setTimeout(() => {
        scene.updateTexture(texturesStore.currentTexture.highResTexture);
      }, 2000); // Ajusta el tiempo según sea necesario
    }
  }
});

onUnmounted(() => {
  if (sphericalContainer.value) {
    sphericalContainer.value.innerHTML = '';
  }
});
</script>

<style>
.viewer-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
