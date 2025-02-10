export default {
    root: 'src',
    publicDir: 'public',
    base: './',
    build: {
      outDir: '../dist',
      emptyOutDir: true, 
    },
    server: {
      mimeTypes: {
        'model/gltf-binary': ['.glb'],
      }
    }
  }