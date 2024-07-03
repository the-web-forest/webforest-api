module.exports = {
  apps: [
    {
      name: 'webforest-api',
      namespace: 'web-forest',
      watch: true,
      script: 'dist/src/main.js',
      appendEnvToName: true,
      env: {
        NODE_ENV: 'development',
      },
    }
  ],
};
