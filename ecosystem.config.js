module.exports = {
  apps: [
    {
      name: 'www.careipro.com',
      script: 'npm',
      args: 'start',
      instances: 2,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};