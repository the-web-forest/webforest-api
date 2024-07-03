module.exports = {
  apps: [
    {
      name: 'publya-api',
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
