<template>
  <div ref="viewerContainerRef" class="viewer-container">
    <div v-if="currentProject" class="textures-container">
      <div v-for="(texture, textureIndex) in currentProject.textures" :key="texture.name" class="texture-square"
        :style="{ backgroundImage: `url(${texture.lowResTexture})` }" @click="changeTexture(textureIndex)"></div>
      <router-link class="steps-button" to="/">STEPS</router-link>
    </div>
    <div class="project-title">
      <button @click="prevProject" class="nav-button"> < </button>
      <div class="project-step">{{ currentProject.projectName }}</div>
      <button @click="nextProject" class="nav-button"> > </button>
    </div>
    <canvas ref="canvasRef" class="webgl"></canvas>
    <div class="miniMapContainer" ref="miniMapContainer">
      <img v-if="currentProjectMap" ref="overlayImage" :src="currentProjectMap" alt="Project Map" class="overlay-image" />
      <div v-for="(texture, textureIndex) in currentProject.textures" :key="`marker-${textureIndex}`">
        <div v-if="texture.cameraMiniMap" :class="['minimap-marker', { active: currentTextureIndex === textureIndex }]"
          :style="{ left: `${texture.cameraMiniMap.x}%`, top: `${texture.cameraMiniMap.y}%`, width: markerSize, height: markerSize }"
          @click="currentTextureIndex !== textureIndex && navigateToTexture(textureIndex)"></div>
      </div>
    </div>
    <button @click="toggleFullScreen" class="fullscreen-button">
      <img :src="isFullScreen ? exitFullscreenIcon : enterFullscreenIcon"
        :alt="isFullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'" class="fullscreen-icon">
    </button>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { useTexturesStore } from '../stores/texturesStore';
import { createScene, updateSceneTexture, addScrollListener } from '../threeHelper/threeHelper';
import enterFullscreenIcon from '/fullscreen.svg';
import exitFullscreenIcon from '/exit-fullscreen.svg';

const texturesStore = useTexturesStore();
const canvasRef = ref(null);
const overlayImageRef = ref(null);
const miniMapContainerRef = ref(null);
const viewerContainerRef = ref(null);

const isFullScreen = ref(false);

let sceneObject = ref(null);

const currentProject = ref(null);
const currentProjectMap = ref(null);
const currentCameraMiniMap = ref(null);
const currentTextureIndex = ref(texturesStore.currentTextureIndex);
const markerSize = ref('5%');

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
  const miniMapContainer = miniMapContainerRef.value;
  if (overlayImage && miniMapContainer) {
    const containerRect = miniMapContainer.getBoundingClientRect();
    const overlayRect = overlayImage.getBoundingClientRect();
    const markers = document.querySelectorAll('.minimap-marker');
    markers.forEach(marker => {
      const x = parseFloat(marker.style.left);
      const y = parseFloat(marker.style.top);
      marker.style.left = `${(x / 100) * overlayRect.width}px`;
      marker.style.top = `${(y / 100) * overlayRect.height}px`;
      marker.style.width = `${5 * (overlayRect.width / 100)}px`;
      marker.style.height = `${5 * (overlayRect.width / 100)}px`;
    });
    markerSize.value = `${5 * (overlayRect.width / 100)}px`;
  }
};

let removeScrollListener;

onMounted(() => {
  sceneObject.value = createScene(
    canvasRef.value,
    texturesStore.currentLowResTexture,
    texturesStore.currentHighResTexture
  );
  window.addEventListener('resize', updateMarkerPositions);
  removeScrollListener = addScrollListener(sceneObject.value);
  nextTick(updateMarkerPositions);

  // Agregar un event listener para detectar cambios en el estado de pantalla completa
  document.addEventListener('fullscreenchange', () => {
    isFullScreen.value = !!document.fullscreenElement;
  });
});

onUnmounted(() => {
  if (sceneObject.value && sceneObject.value.cleanup) {
    sceneObject.value.cleanup();
  }
  window.removeEventListener('resize', updateMarkerPositions);
  if (removeScrollListener) {
    removeScrollListener();
  }
  // Remover el event listener
  document.removeEventListener('fullscreenchange', () => {
    isFullScreen.value = !!document.fullscreenElement;
  });

});

const toggleFullScreen = () => {
  nextTick(() => {
    const element = viewerContainerRef.value;
    if (element) {
      if (!document.fullscreenElement) {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
        isFullScreen.value = true;
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        isFullScreen.value = false;
      }
    } else {
      console.error("Viewer container is not available for fullscreen request");
    }
  });
};
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
  text-decoration: none;
  color: white;
  background: none;
  border: none;
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

.miniMapContainer {
  position: absolute;
  top: 3px;
  right: 10px;
  width: 10%;
  height: auto;
  z-index: 11;
}

.overlay-image {
  width: 100%;
  height: auto;
  opacity: 0.7;
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

.fullscreen-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  /* Ajusta según sea necesario */
}

.fullscreen-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
  }

  50% {
    box-shadow: 0 0 0 5px rgba(255, 0, 0, 0.1);
  }

  60% {
    box-shadow: 0 0 0 5px rgba(255, 0, 0, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
  }
}
</style>