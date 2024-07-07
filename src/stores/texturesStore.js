import { defineStore } from 'pinia'

const useTexturesStore = defineStore('texturesStore', {
    state: () => ({
        projects: [
            {
                projectName: 'project1',
                projectId: 1,
                textures: [
                    {
                        id: 'texture1',
                        type: 'spherical', // 'spherical' o 'cubemap'
                        lowResTexture: 'path',
                        highResTexture: 'path'

                    }
                ]
            }
        ],
        currentTexture: ''
    }),
    actions: {
        loadTexture(projectId, textureId) {
            const project = this.projects.find(p => p.projectId === projectId);
            if (project) {
                const texture = project.textures.find(t => t.id === textureId);
                if (texture) {
                    this.currentTexture = texture.lowResTexture;

                    const highResImage = new Image();
                    highResImage.src = texture.highResTexture;
                    highResImage.onload = () => {
                        this.currentTexture = texture.highResTexture;
                    };
                }
            }
        }
    }
})