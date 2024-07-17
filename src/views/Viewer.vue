<template>
  <div class="viewer-container">
    <div v-if="currentProject" class="textures-container">
      <div
        v-for="(texture, textureIndex) in currentProject.textures"
        :key="texture.name"
        class="texture-square"
        :style="{ backgroundImage: `url(${texture.lowResTexture})` }"
        @click="changeTexture(textureIndex)"
      ></div>
    </div>
    <canvas ref="canvasRef" class="webgl"></canvas>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useTexturesStore } from '../stores/texturesStore';
import { createScene, updateSceneTexture } from '../threeHelper/threeHelper';

const texturesStore = useTexturesStore();
const canvasRef = ref(null);
let sceneObject = ref(null);

const currentProject = ref(null);

watch(
  () => texturesStore.currentProjectIndex,
  (newProjectIndex) => {
    currentProject.value = texturesStore.projects[newProjectIndex];
  },
  { immediate: true }
);

const changeTexture = (textureIndex) => {
  texturesStore.setCurrentTextureIndex(textureIndex);
};

watch(
  () => [texturesStore.currentLowResTexture, texturesStore.currentHighResTexture],
  async ([newLowResTexture, newHighResTexture]) => {
    if (sceneObject.value) {
      await updateSceneTexture(sceneObject.value, newLowResTexture, newHighResTexture);
    }
  },
  { immediate: true }
);

onMounted(() => {
  sceneObject.value = createScene(
    canvasRef.value,
    texturesStore.currentLowResTexture,
    texturesStore.currentHighResTexture
  );
});

onUnmounted(() => {
  if (sceneObject.value && sceneObject.value.cleanup) {
    sceneObject.value.cleanup();
  }
});
</script>

<style scoped>
.viewer-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.textures-container {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.texture-square {
  width: 4rem;
  height: 4rem;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  border-radius: 50px;
  transition: transform 0.3s ease;
}

.texture-square:hover {
  transform: scale(1.1);
}

.webgl {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
