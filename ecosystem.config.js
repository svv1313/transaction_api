module.exports = {
  apps: [
    {
      name: 'app',
      script: './dist/main.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      dotenv: './.env',
    },
  ],
};