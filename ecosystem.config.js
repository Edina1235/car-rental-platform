module.exports = {
  apps: [
    {
      name: "backend",
      // CSERÉLD erre az útvonalra, ha a szerveren más a projekt helye.
      // A playbook feltételezi, hogy ezt a fájlt felmásolja a project_root-ba.
      cwd: "var/www/car-rental-platform", 
      script: "dist/backend/express.js",   // a buildelt JS entry
      instances: 1,
      exec_mode: "cluster",
      watch: false,
      env: {
        NODE_ENV: "development",
        PORT: 3000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000
        // MONGODB_URI: ne itt hardcode-olj! Injektáld Ansible-ból vagy futtatási környezettel.
      }
    }
  ]
};