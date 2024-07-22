<template>
  <div class="viewer-container">
    <div v-if="currentProject" class="textures-container">
      <div v-for="(texture, textureIndex) in currentProject.textures" :key="texture.name" class="texture-square"
        :style="{ backgroundImage: `url(${texture.lowResTexture})` }" @click="changeTexture(textureIndex)"></div>
      <!-- Añadir el botón Steps -->
      <router-link class="steps-button" to="/">STEPS</router-link>
    </div>
    <!-- Mostrar el título del proyecto con botones de navegación -->
    <div class="project-title">
      <button @click="prevProject" class="nav-button"><</button>
          <div class="project-step">{{ currentProject.projectName }}</div>
          <button @click="nextProject" class="nav-button">></button>
    </div>
    <canvas ref="canvasRef" class="webgl"></canvas>
    <div class="miniMapContainer">
      <img v-if="currentProjectMap" ref="overlayImage" :src="currentProjectMap" alt="Project Map" class="overlay-image" />
      <div v-for="(texture, textureIndex) in currentProject.textures" :key="`marker-${textureIndex}`">
        <div v-if="texture.cameraMiniMap" :class="['minimap-marker', { active: currentTextureIndex === textureIndex }]"
          :style="{ left: `${texture.cameraMiniMap.x}%`, top: `${texture.cameraMiniMap.y}%` }"
          @click="currentTextureIndex !== textureIndex && navigateToTexture(textureIndex)"></div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { useTexturesStore } from '../stores/texturesStore';
import { createScene, updateSceneTexture } from '../threeHelper/threeHelper';

const texturesStore = useTexturesStore();
const canvasRef = ref(null);
const overlayImageRef = ref(null);
let sceneObject = ref(null);

const currentProject = ref(null);
const currentProjectMap = ref(null);
const currentCameraMiniMap = ref(null);
const currentTextureIndex = ref(texturesStore.currentTextureIndex);

watch(
  () => texturesStore.currentProjectIndex,
  (newProjectIndex) => {
    currentProject.value = texturesStore.projects[newProjectIndex];
    currentProjectMap.value = texturesStore.projects[newProjectIndex].projectMap;
  },
  { immediate: true }
);

watch(
  () => texturesStore.currentTextureIndex,
  (newTextureIndex) => {
    currentTextureIndex.value = newTextureIndex;
    currentCameraMiniMap.value = texturesStore.projects[texturesStore.currentProjectIndex].textures[newTextureIndex].cameraMiniMap;
  },
  { immediate: true }
);

const changeTexture = (textureIndex) => {
  texturesStore.setCurrentTextureIndex(textureIndex);
};

const navigateToTexture = (textureIndex) => {
  texturesStore.setCurrentTextureIndex(textureIndex);
};

const prevProject = () => {
  const newIndex = (texturesStore.currentProjectIndex - 1 + texturesStore.projects.length) % texturesStore.projects.length;
  const currentTexture = texturesStore.currentTextureIndex;
  texturesStore.setCurrentProjectIndex(newIndex);
  texturesStore.setCurrentTextureIndex(currentTexture);
};

const nextProject = () => {
  const newIndex = (texturesStore.currentProjectIndex + 1) % texturesStore.projects.length;
  const currentTexture = texturesStore.currentTextureIndex;
  texturesStore.setCurrentProjectIndex(newIndex);
  texturesStore.setCurrentTextureIndex(currentTexture);
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

const updateMarkerPositions = () => {
  const overlayImage = overlayImageRef.value;
  if (overlayImage) {
    const width = overlayImage.clientWidth;
    const height = overlayImage.clientHeight;
    const markers = document.querySelectorAll('.minimap-marker');
    markers.forEach(marker => {
      const x = parseFloat(marker.style.left);
      const y = parseFloat(marker.style.top);
      marker.style.left = `${(x / 100) * width}px`;
      marker.style.top = `${(y / 100) * height}px`;
    });
  }
};

onMounted(() => {
  sceneObject.value = createScene(
    canvasRef.value,
    texturesStore.currentLowResTexture,
    texturesStore.currentHighResTexture
  );
  window.addEventListener('resize', updateMarkerPositions);
  nextTick(updateMarkerPositions); // Update marker positions after initial render
});

onUnmounted(() => {
  if (sceneObject.value && sceneObject.value.cleanup) {
    sceneObject.value.cleanup();
  }
  window.removeEventListener('resize', updateMarkerPositions);
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
  background-color: rgba(255, 255, 255, 0);
  padding: 10px 20px;
  border-radius: 10px;

}

.texture-square {
  width: 4rem;
  height: 4rem;
  background-size: cover;
  background-position: center;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  border-radius: 50px;
  transition: transform 0.3s ease;
}

.texture-square:hover {
  transform: scale(1.25);
}

.steps-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  padding: 0.5rem 1rem;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 1.5rem;
  /* Tamaño de fuente más grande */
  text-decoration: none;
  /* Sin subrayado */
  color: white;
  /* Color del texto */
  background: none;
  /* Sin fondo */
  border: none;
  /* Sin borde */
  cursor: pointer;
}

.webgl {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.miniMapContainer{
  width: 8rem;
  height: 8rem;
  
}

.overlay-image {
  position: absolute;
  top: 3px;
  right: 10px;
  width: 10%;
  opacity: 0.7;
  z-index: 11;
}

.project-title {
  position: fixed;
  top: 10px;
  left: 50%;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  transform: translateX(-50%);
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 10;
  display: flex;
  align-items: center;
}

.project-step {
  opacity: 50%;
}

.nav-button {
  background: none;
  border: none;
  font-size: 2rem;
  font-weight: bold;
  color: green;
  border: black;
  cursor: pointer;
  margin: 0 1rem;
}

.minimap-marker {
  position: absolute;
  width: .7%;
  height: .9%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  z-index: 12;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  animation: pulse 1.5s infinite;
}

.minimap-marker:hover {
  background-color: red;
  transform: scale(1.25);
}

.minimap-marker.active {
  background-color: red;
  cursor: default;
  pointer-events: none;
  animation: none;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
  }

  50% {
    box-shadow: 0 0 0 5px rgba(255, 0, 0, .1);
  }

  60% {
    box-shadow: 0 0 0 5px rgba(255, 0, 0, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
  }
}
</style>
