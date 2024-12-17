<template>
  <div ref="viewerContainerRef" class="viewer-container">

    <!-- Contenedor de texturas (botones redondos) -->
    <div v-if="currentProject" class="textures-container">
      <div
        v-for="(texture, idx) in currentProject.textures"
        :key="texture.name"
        class="texture-square"
        :style="{ backgroundImage: `url(${texture.lowResTexture})` }"
        @click="changeTexture(idx)"
      ></div>
      <router-link class="steps-button" to="/">STEPS</router-link>
    </div>

    <!-- Título y navegación entre proyectos -->
    <div class="project-title">
      <button @click="prevProject" class="nav-button"> < </button>
      <div class="project-step">{{ currentProject?.projectName }}</div>
      <button @click="nextProject" class="nav-button"> > </button>
    </div>

    <!-- Canvas del entorno 360 -->
    <canvas ref="canvasRef" class="webgl"></canvas>

    <!-- Mini mapa -->
    <!-- Mostramos los 8 puntos, uno por cada textura, usando cameraMiniMap para posicionarlos.
         Quitamos transform: translate(-50%, -50%) para que aparezcan en la posición exacta definida.
         El punto de la textura actual es rojo, los demás gris oscuro con hover en rojo. -->
    <div class="miniMapContainer" ref="miniMapContainer">
      <img
        v-if="currentProjectMap"
        ref="overlayImage"
        :src="currentProjectMap"
        alt="Project Map"
        class="overlay-image"
      />

      <div
        v-for="(t, tIdx) in currentProject?.textures || []"
        :key="'minimap-marker-' + tIdx"
        class="minimap-marker"
        :class="{ 'current-texture-marker': tIdx === texturesStore.currentTextureIndex }"
        :style="{ left: t.cameraMiniMap.x + '%', top: t.cameraMiniMap.y + '%' }"
        @click="texturesStore.setCurrentTextureIndex(tIdx)"
      ></div>
    </div>

    <!-- Botón fullscreen -->
    <!-- Ahora usamos exactamente las rutas que mencionaste: '/fullscreen.svg' y '/exit-fullscreen.svg' -->
    <button @click="toggleFullScreen" class="fullscreen-button">
      <img
        :src="isFullScreen ? exitFullscreenIcon : enterFullscreenIcon"
        :alt="isFullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'"
        class="fullscreen-icon"
      >
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useTexturesStore } from '../stores/texturesStore';
import { createScene, setupInitialTextures, updateSceneTexture, addScrollListener } from '../threeHelper';
import { useFullscreen } from '../composables/useFullscreen';
import { updateMarkers, onCanvasClick, onCanvasMouseMove, animateMarkers } from '../threeHelper/markersHelper';
import * as THREE from 'three';

import enterFullscreenIcon from '/fullscreen.svg';
import exitFullscreenIcon from '/exit-fullscreen.svg';

const texturesStore = useTexturesStore();
const canvasRef = ref(null);
const viewerContainerRef = ref(null);

const currentProject = computed(() => texturesStore.currentProject);
const currentProjectMap = computed(() => texturesStore.currentProjectMap);
const currentMarkers = computed(() => texturesStore.currentMarkers);

const prevProject = () => {
  const newIndex = (texturesStore.currentProjectIndex - 1 + texturesStore.projects.length) % texturesStore.projects.length;
  const currentTex = texturesStore.currentTextureIndex;
  texturesStore.setCurrentProjectIndex(newIndex);
  texturesStore.setCurrentTextureIndex(currentTex);
};

const nextProject = () => {
  const newIndex = (texturesStore.currentProjectIndex + 1) % texturesStore.projects.length;
  const currentTex = texturesStore.currentTextureIndex;
  texturesStore.setCurrentProjectIndex(newIndex);
  texturesStore.setCurrentTextureIndex(currentTex);
};

const changeTexture = (idx) => {
  texturesStore.setCurrentTextureIndex(idx);
};

const { isFullScreen, toggleFullScreen } = useFullscreen(viewerContainerRef);

let sceneObject = ref(null);
let removeScrollListener = null;

// Definir raycaster y mouse aquí
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

onMounted(async () => {
  sceneObject.value = createScene(canvasRef.value);

  if (sceneObject.value) {
    await setupInitialTextures(
      sceneObject.value,
      texturesStore.currentLowResTexture,
      texturesStore.currentHighResTexture
    );

    removeScrollListener = addScrollListener(sceneObject.value);

    canvasRef.value.addEventListener('click', (e) => {
      const targetTextureIndex = onCanvasClick(e, sceneObject.value.camera, sceneObject.value.scene, raycaster, mouse);
      if (targetTextureIndex !== undefined) {
        texturesStore.setCurrentTextureIndex(targetTextureIndex);
      }
    });

    // Importante: el mousemove listener después de definir raycaster y mouse
    canvasRef.value.addEventListener('mousemove', (e) => {
      onCanvasMouseMove(e, sceneObject.value.camera, sceneObject.value.scene, raycaster, mouse);
    });

    updateMarkers(sceneObject.value.scene, currentMarkers.value || [], texturesStore.currentTextureIndex);
  }
});

watch(
  () => [texturesStore.currentLowResTexture, texturesStore.currentHighResTexture],
  async ([newLowRes, newHighRes]) => {
    if (sceneObject.value) {
      await updateSceneTexture(sceneObject.value, newLowRes, newHighRes);
      updateMarkers(sceneObject.value.scene, currentMarkers.value || [], texturesStore.currentTextureIndex);
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  if (sceneObject.value?.cleanup) {
    sceneObject.value.cleanup();
  }
  if (removeScrollListener) {
    removeScrollListener();
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
  background-color: rgba(255, 255, 255, 0);
  padding: 10px 20px;
  border-radius: 10px;
}

.texture-square {
  width: 4rem;
  height: 4rem;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  border: 2px solid #fff;
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
  font-size: 1.5rem;
  text-decoration: none;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
}

.project-title {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 10;
  display: flex;
  align-items: center;
}

.project-step {
  opacity: 0.5;
}

.nav-button {
  background: none;
  border: none;
  font-size: 2rem;
  font-weight: bold;
  color: green;
  cursor: pointer;
  margin: 0 1rem;
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

.minimap-marker {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #444; /* Gris oscuro por defecto */
  border-radius: 50%;
  cursor: pointer;
  z-index: 12;
  transition: transform 0.3s, background 0.3s;
}

.minimap-marker.current-texture-marker {
  background: red; /* Textura actual: rojo */
}

/* Al pasar el mouse por un marcador que no es la textura actual, se pone rojo y se agranda */
.minimap-marker:not(.current-texture-marker):hover {
  background: red;
  transform: scale(1.2);
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
}

.fullscreen-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>






<!-- 

// Opcional: Si quisieras reaccionar al cambio de markers independientemente, podrías agregar otro watcher.
// Pero no es necesario si ya actualizas markers en el watcher anterior.
// watch(
//   () => currentMarkers.value,
//   (newMarkers) => {
//     if (sceneObject.value) {
//       updateMarkers(sceneObject.value.scene, newMarkers);
//     }
//   }
// );



<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { useTexturesStore } from '../stores/texturesStore';
import { createScene, setupInitialTextures, updateSceneTexture, addScrollListener } from '../threeHelper';
import { useFullscreen } from '../composables/useFullscreen';
import enterFullscreenIcon from '/fullscreen.svg';
import exitFullscreenIcon from '/exit-fullscreen.svg';

const texturesStore = useTexturesStore();

// Refs del DOM
const canvasRef = ref(null);
const miniMapContainerRef = ref(null);
const overlayImageRef = ref(null);
const viewerContainerRef = ref(null);

// Computed para proyecto y texturas
const currentProject = computed(() => texturesStore.projects[texturesStore.currentProjectIndex]);
const currentTextureIndex = computed(() => texturesStore.currentTextureIndex);
const currentProjectMap = computed(() => currentProject.value?.projectMap || null);

// Lógica de cambiar texturas
const changeTexture = async (idx) => {
  texturesStore.setCurrentTextureIndex(idx);
};

// Navegar entre texturas desde el minimapa
const navigateToTexture = (idx) => {
  texturesStore.setCurrentTextureIndex(idx);
};

// Navegar entre proyectos
const prevProject = () => {
  const newIndex = (texturesStore.currentProjectIndex - 1 + texturesStore.projects.length) % texturesStore.projects.length;
  const currentTex = texturesStore.currentTextureIndex;
  texturesStore.setCurrentProjectIndex(newIndex);
  texturesStore.setCurrentTextureIndex(currentTex);
};

const nextProject = () => {
  const newIndex = (texturesStore.currentProjectIndex + 1) % texturesStore.projects.length;
  const currentTex = texturesStore.currentTextureIndex;
  texturesStore.setCurrentProjectIndex(newIndex);
  texturesStore.setCurrentTextureIndex(currentTex);
};

// Calcular tamaño y posición de marcadores
const markerSize = ref('5%');
const markerStyle = (cameraMiniMap) => ({
  left: cameraMiniMap.x + '%',
  top: cameraMiniMap.y + '%',
  width: markerSize.value,
  height: markerSize.value
});

// Actualizar posiciones de marcadores al redimensionar
const updateMarkerPositions = () => {
  const overlayImage = overlayImageRef.value;
  if (overlayImage) {
    const overlayRect = overlayImage.getBoundingClientRect();
    markerSize.value = `${(5 * (overlayRect.width / 100))}px`;
  }
};

// Escena
let sceneObject = ref(null);
let removeScrollListener = null;

// Fullscreen composable
const { isFullScreen, toggleFullScreen } = useFullscreen(viewerContainerRef);

onMounted(async () => {
  // Crear la escena
  sceneObject.value = createScene(canvasRef.value);
  if (sceneObject.value) {
    // Configurar texturas iniciales
    await setupInitialTextures(
      sceneObject.value,
      texturesStore.currentLowResTexture,
      texturesStore.currentHighResTexture
    );
    // Listener de scroll para zoom
    removeScrollListener = addScrollListener(sceneObject.value);
  }

  window.addEventListener('resize', updateMarkerPositions);
  nextTick(updateMarkerPositions);
});

onUnmounted(() => {
  if (sceneObject.value?.cleanup) {
    sceneObject.value.cleanup();
  }
  if (removeScrollListener) {
    removeScrollListener();
  }
  window.removeEventListener('resize', updateMarkerPositions);
});

// Watch para actualizar la textura al cambiar currentLowResTexture o currentHighResTexture
watch(
  () => [texturesStore.currentLowResTexture, texturesStore.currentHighResTexture],
  async ([newLowRes, newHighRes]) => {
    if (sceneObject.value) {
      await updateSceneTexture(sceneObject.value, newLowRes, newHighRes);
    }
  },
  { immediate: true }
);
</script> -->




<!-- <template>
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
</style> -->