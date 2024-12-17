// useFullscreen.js
// Un composable para manejar la lógica de pantalla completa en Vue.

import { ref, onMounted, onUnmounted } from 'vue';

export function useFullscreen(elementRef) {
  const isFullScreen = ref(false);

  const handleFullscreenChange = () => {
    isFullScreen.value = !!document.fullscreenElement;
  };

  const toggleFullScreen = () => {
    const element = elementRef.value;
    if (!document.fullscreenElement && element) {
      element.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  onMounted(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
  });

  onUnmounted(() => {
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
  });

  return { isFullScreen, toggleFullScreen };
}
