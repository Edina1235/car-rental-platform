# car-rental-platform

admin belépés: 

email: toth@edina.hu 

jelszo: admin123

backend indítása:  

npm run start-server (ehhez kell node 20-as legalább)

## Car Rental Platform
Egy webes autókölcsönző alkalmazás teljes CI/CD és monitoring rendszerrel

A **Car Rental Platform** egy full-stack webalkalmazás, amely lehetővé teszi:
- felhasználók számára:
  - regisztráció/bejelentkezés
  - kölcsönzések törlése/felvétele/módosítása
  - autók böngészése
- admin számára:
  - autók felvétele/módosítása/törlése
  - felhasználók böngészése
  - felhasználók törlése
  - autók böngészése

A rendszer Angular frontendből, Node.js + Express backendből és MongoDB Atlas adatbázisból áll.

A projekt CI/CD folyamata Jenkins, Ansible, nginx, valamint Prometheus + Grafana monitoring eszközökre épül.

### Projekt felépítése
#### Frontend
- Angular alkalmazás
- Production build: dist/car-rental-platform
#### Backend
- Node.js + Express
- TypeScript alapú (TS → JS build a CI során)
- PM2 kezeli a futtatást
- Metrics endpoint: /metrics, Prometheus kompatibilis
#### Adatbázis
- MongoDB Atlas cluster
- A CI/CD pipeline a MONGODB_URI-t titkosított Jenkins environment variable-ból kapja

### CI/CD folyamat
A teljes CI/CD automatizálva van a Jenkinsfile segítségével.

#### Jenkins Pipeline lépései
**Checkout**
A pipeline letölti a repository aktuális verzióját.

**Workspace ellenőrzés**
Kiírja:
- aktuális könyvtár tartalmát
- Node/NPM verziókat
Ez segít hibakeresésben.

**Dependenciák telepítése**

```npm install```

**Lint**

A kódot az Angular built-in linter ellenőrzi:

```npm run lint```

**Teszt futtatása**

```npm test --watch=false```

**Build**

A frontend és backend külön épül:

```
npm run build:frontend
npm run build:backend
```

**Deploy (Ansible)**

Jenkins meghívja:

```ansible-playbook deploy.yml -i localhost -e "mongodb_uri=xxxx"```

Ez gondoskodik:
- nginx telepítéséről és beállításáról
- frontend build bemásolásáról a /var/www/car-rental-platform alá
- backend futtatásáról PM2 segítségével
- nginx reverse proxy beállításáról

**Prometheus indítás**

Docker konténerként indul a Prometheus a konfigurált prometheus.yml fájllal.

**Grafana indítás**

A grafana 3001-es porton fut (mivel a backend foglalja a 3000-et).
A datasourcok és dashboardok automatikusan betöltődnek provisioning segítségével.

### Deployment (Ansible)

A **deploy.yml** felelős az éles deployért.

Fő lépések:
- rendszer csomagok telepítése (nginx, rsync, pm2)
- frontend build szinkronizálása nginx kiszolgáló könyvtárába
- backend fájlok szinkronizálása
- PM2 konfiguráció telepítése (ecosystem.config.js)
- backend indítása:

```pm2 start ecosystem.config.js --env production```

- nginx konfiguráció telepítése és aktiválása

### Nginx konfiguráció
A **nginx.conf** gondoskodik:
- Angular frontend kiszolgálásáról
- backend API továbbításáról a 3000-es portra:

```
location ^~ /api/ {
    proxy_pass http://127.0.0.1:3000;
}
```

### Monitoring – Prometheus & Grafana
**Prometheus**
- 5 másodpercenként scrape-eli a Node backend localhost:3000 címet
- Metric endpoint:

```GET /metrics```

**Grafana**
- automatikus provisioning:
  - ```datasources.yml```
  - ``` dashboards.yml```
  - ```my-garafana-dashboard.yml```
- port: 3001
- anonim admin hozzáférés engedélyezve (lab környezethez)

A dashboard figyeli:
- scrape időt
- metricszámokat
- Prometheus → Node exporter adatait

### PM2 – backend futtatás

Az **ecosystem.config.js**:
```
{
  name: "backend",
  script: "backend/src/backend/express.js",
  env_production: {
    PORT: 3000,
    MONGODB_URI: "{{ mongodb_uri }}"
  }
}
```

PM2 előnyei:
- automatikus újraindítás
- logkezelés
- cluster mód

### Metrics endpoint (Prometheus számára)
Az Express backendben:
```
const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

Ez biztosítja:
- CPU / memória / event loop latency
- Node runtime adatok
- saját metrikák bővíthetősége

📦 NPM Scripts
```
"build:frontend": "ng build --configuration production",
"build:backend": "tsc -p src/backend/tsconfig-be.json --outDir dist/backend",
"lint": "ng lint",
"test": "ng test",
"start-server": "ts-node src/backend/express.ts"
```

### Adatbázis - MongoDB Atlas

A csatlakozáshoz használt URI:

```MONGODB_URI```

amit:
- Jenkins ad át pipeline környezeti változóként
- PM2 továbbít a backendnek
