<template>
  <div class="viewer-container">
    <!-- Botones de navegación de steps (prev y next) -->
    <div class="steps-navigation">
      <button @click="prevStep" class="nav-button">Prev Step</button>
      <button @click="nextStep" class="nav-button">Next Step</button>
    </div>

    <!-- Canvas para la textura esférica -->
    <canvas ref="canvasRef" class="webgl"></canvas>

    <!-- Mini mapa en la esquina superior derecha -->
    <div class="mini-map-container" ref="miniMapContainer">
      <img
        v-if="currentProjectMap"
        ref="overlayImage"
        :src="currentProjectMap"
        alt="Mini Map"
        class="mini-map"
      />
      <div
        v-for="(texture, textureIndex) in currentProject.textures"
        :key="textureIndex"
        :class="['minimap-marker', { active: currentTextureIndex === textureIndex }]"
        :style="markerStyles(texture)"
        @click="navigateToTexture(textureIndex)"
      ></div>
    </div>

    <!-- Contenedor de texturas (botones redondos y botón Steps) -->
    <div v-if="currentProject" class="textures-container">
      <div
        v-for="(texture, textureIndex) in currentProject.textures"
        :key="texture.name"
        class="texture-square"
        :style="{ backgroundImage: `url(${texture.lowResTexture})` }"
        @click="changeTexture(textureIndex)"
      ></div>
      <router-link class="steps-button" to="/">STEPS</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useTexturesStore } from '../../stores/texturesStore';
import { createScene, updateSceneTexture, handleScroll } from '../../threeHelper/threeHelper';


// Refs para elementos DOM
const canvasRef = ref(null);
const miniMapContainer = ref(null);

// Store de texturas
const texturesStore = useTexturesStore();

// Propiedades computadas para obtener datos del proyecto y sus texturas
const currentProject = computed(() => texturesStore.projects[texturesStore.currentProjectIndex]);
const currentTextureIndex = computed(() => texturesStore.currentTextureIndex);
const currentProjectMap = computed(() => currentProject.value?.projectMap || null);

// Cambiar textura
const changeTexture = async (textureIndex) => {
  texturesStore.setCurrentTextureIndex(textureIndex);
  const lowRes = texturesStore.currentLowResTexture;
  const highRes = texturesStore.currentHighResTexture;
  if (sceneObject.value) {
    await updateSceneTexture(sceneObject.value, lowRes, highRes);
  }
};

// Navegar entre steps (prev y next)
const prevStep = () => {
  const totalProjects = texturesStore.projects.length;
  const newIndex =
    (texturesStore.currentProjectIndex - 1 + totalProjects) % totalProjects;
  texturesStore.setCurrentProjectIndex(newIndex);
};

const nextStep = () => {
  const totalProjects = texturesStore.projects.length;
  const newIndex =
    (texturesStore.currentProjectIndex + 1) % totalProjects;
  texturesStore.setCurrentProjectIndex(newIndex);
};

// Navegar hacia una textura desde el minimapa
const navigateToTexture = (textureIndex) => {
  if (currentTextureIndex.value !== textureIndex) {
    changeTexture(textureIndex);
  }
};

// Estilos dinámicos para los marcadores en el minimapa
const markerStyles = (texture) => ({
  left: `${texture.cameraMiniMap.x}%`,
  top: `${texture.cameraMiniMap.y}%`,
  width: '5%',
  height: '5%',
});

// Inicializar la escena de Three.js
let sceneObject = ref(null);
let removeScrollListener = null;

onMounted(() => {
  sceneObject.value = createScene(
    canvasRef.value,
    texturesStore.currentLowResTexture,
    texturesStore.currentHighResTexture
  );

  // Agregar listener de scroll
  removeScrollListener = handleScroll(sceneObject.value);
});


onUnmounted(() => {
  if (sceneObject.value?.cleanup) {
    sceneObject.value.cleanup();
  }

  // Remover listener de scroll
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
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: black;
}

.webgl {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Mini mapa */
.mini-map-container {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 15%;
  z-index: 11;
}

.mini-map {
  width: 100%;
  height: auto;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  opacity: 0.8;
}

.minimap-marker {
  position: absolute;
  background-color: rgba(255, 0, 0, 0.8);
  border-radius: 50%;
  cursor: pointer;
  transform: translate(-50%, -50%);
  z-index: 12;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.minimap-marker.active {
  background-color: rgba(0, 255, 0, 0.8);
}

.minimap-marker:hover {
  transform: translate(-50%, -50%) scale(1.2);
}

/* Botones de navegación de steps */
.steps-navigation {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 10;
}

.nav-button {
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.nav-button:hover {
  background-color: #0056b3;
}

/* Contenedor de texturas (botones redondos y botón Steps) */
.textures-container {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 10;
}

.texture-square {
  width: 4rem;
  height: 4rem;
  background-size: cover;
  background-position: center;
  border: 2px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.texture-square:hover {
  transform: scale(1.25);
}

/* Botón Steps */
.steps-button {
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
}

.steps-button:hover {
  background-color: #0056b3;
}
</style>




<!-- <template>
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
</style> -->
