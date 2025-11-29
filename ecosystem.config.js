module.exports = {
  apps: [
    {
      name: "backend",
      cwd: "/var/www/car-rental-platform",
      // mutat az aktuális JS entry-re a repo-n belül
      script: "node",
      args: "backend/src/backend/express.js",
      instances: 1,
      exec_mode: "cluster",
      watch: true,
      env: {
        PORT: 3000,
        MONGODB_URI: "{{ mongodb_uri }}"
      }
    }
  ]
};