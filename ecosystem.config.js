module.exports = {
  apps: [
    {
      name: "backend",
      cwd: "/var/www/car-rental-platform/car-rental-platform",
      // mutat az aktuális JS entry-re a repo-n belül
      script: "car-rental-platform/src/backend/express.js",
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