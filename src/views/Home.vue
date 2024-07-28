<template>
  <div class="background"></div>
  <div class="svg-background"></div>
  <h1>UPTOWN</h1>
  <div class="projects-container">
    <!-- SVG Background Container -->
    
    <div class="projects-grid">
      <button
        v-for="(project, index) in texturesStore.projects"
        :key="project.projectName"
        @click="goToViewer(index)"
        class="project-button"
        :style="{ backgroundImage: `url(${getProjectBackgroundImage(project)})` }"
      >
        <span class="project-name">{{ project.projectName }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useTexturesStore } from '../stores/texturesStore';

const router = useRouter();
const texturesStore = useTexturesStore();

const goToViewer = (projectIndex) => {
  texturesStore.setCurrentProjectIndex(projectIndex);
  router.push({ name: 'Viewer' });
};

const getProjectBackgroundImage = (project) => {
  return project.textures[0]?.lowResTexture || '';
};
</script>

<style scoped>
.projects-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  position: relative; /* Ensure positioned relative to contain the SVG */

}

h1{
  position: absolute;
  top: 10rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 100%;
  z-index: 1000;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 5rem;
  
  
}

.background{
  background-image: url('/UpTow-Aereal-01-03.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.5; /* Ajusta este valor para cambiar la opacidad */
}

.svg-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/uLogo.svg');
  background-repeat: space; /* Esto distribuye el espacio entre las repeticiones */
  background-size: 300px; /* Ajusta este valor al tamaño deseado de tu SVG */
  opacity: 0.2;
  z-index: -1;
}

.projects-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  max-width: 800px;
  position: relative;
  z-index: 1; /* Ensure buttons are above the SVG background */
}

.project-button {
  width: 8rem;
  height: 8rem;
  background-color: rgba(255, 255, 255, 0.8);
  background-size: cover;
  background-position: center;
  border: 2px solid #fff;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.8rem;
  padding: 5px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.project-button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
}

.project-name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px;
  font-family: 'Roboto', sans-serif;
  font-size: 0.6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>


<!-- <template>
    <div class="projects-container">
      
      <div class="projects-grid">
        <button
          v-for="(project, index) in texturesStore.projects"
          :key="project.projectName"
          @click="goToViewer(index)"
          class="project-button"
          :style="{ backgroundImage: `url(${getProjectBackgroundImage(project)})` }"
        >
          <span class="project-name">{{ project.projectName }}</span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { useTexturesStore } from '../stores/texturesStore';
  
  const router = useRouter();
  const texturesStore = useTexturesStore();
  
  const goToViewer = (projectIndex) => {
    texturesStore.setCurrentProjectIndex(projectIndex);
    router.push({ name: 'Viewer' });
  };
  
  const getProjectBackgroundImage = (project) => {
    return project.textures[0]?.lowResTexture || '';
  };
  </script>
  
  <style scoped>
  .projects-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
    background: url('/uLogo.svg') repeat; /* SVG background */
  opacity: 0.2; /* Adjust transparency */
  }
  

  
  .projects-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    max-width: 800px;
  }
  
  .project-button {
    width: 8rem;
    height: 8rem;
    background-color: rgba(255, 255, 255, 0.8);
    background-size: cover;
    background-position: center;
    border: 2px solid #fff;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 0.8rem;
    padding: 5px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .project-button:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  }
  
  .project-name {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 2px;
    font-family: 'Roboto', sans-serif;
    font-size: 0.6rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  </style> -->