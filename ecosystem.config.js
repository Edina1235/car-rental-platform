module.exports = {
  apps: [
    {
      name: "backend",
      cwd: "/var/www/car-rental-platform",
      // mutat az aktuális JS entry-re a repo-n belül
      script: "npm",
      args: "start:backend",
      instances: 1,
      exec_mode: "cluster",
      watch: false,
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        MONGODB_URI: "{{ mongodb_uri }}"
      }
    }
  ]
};