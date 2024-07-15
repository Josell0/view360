<template>
    <div ref="cubemapContainer" class="viewer-container"></div>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { createScene } from '../threeHelper/threeHelper';
import { useTexturesStore } from '../stores/texturesStore';

const cubemapContainer = ref(null);
const texturesStore = useTexturesStore();
let scene = null;

onMounted(() => {
    if (texturesStore.currentTexture) {
        scene = createScene(cubemapContainer.value, texturesStore.currentTexture.lowResTexture);

        if (texturesStore.currentTexture.highResTexture) {
            setTimeout(() => {
                scene.updateTexture(texturesStore.currentTexture.highResTexture);
            }, 2000); // Ajusta el tiempo según sea necesario
        }
    }
});

onUnmounted(() => {
    if (cubemapContainer.value) {
        cubemapContainer.value.innerHTML = '';
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
  