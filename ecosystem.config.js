module.exports = {
  apps: [
    {
      name: "backend",
      cwd: "/var/www/car-rental-platform",
      script: "backend/src/backend/express.js",
      instances: 1,
      exec_mode: "cluster",
      watch: true,
      env_production: {
        PORT: 3000,
        MONGODB_URI: "{{ mongodb_uri }}"
      }
    }
  ]
};