# YBHA.ino — Cyber-Craft Engineering Portfolio & IntellDev Agency

Official personal engineering portfolio and agency platform for **YASSINE BEL HADJ ALI** (`YBHA.ino`), Electrical & Automatic Engineering student at École Nationale d'Ingénieurs de Gabès (ENIG, Class of 2029) and Founder of **IntellDev** (Dev & Marketing Agency).

## 🌟 Key Features

- **Zero External Dependencies / Zero Google Libraries**: Completely self-contained. No Google Fonts CDN links, no Google API clients, no external hotlinked images. Runs seamlessly on air-gapped systems, intranets, custom domains, and any web server.
- **Electric Blue Degradation Theme**: Custom cyberpunk/industrial engineering styling (`oklch(75% 0.22 225)`), animated telemetry simulator, and glowing circuit accents.
- **Embedded Systems & AI Projects**:
  - **EnerGuard**: ESP32 machine-level energy monitoring, MQTT/Mosquitto ingestion, FastAPI backend, and reactive dashboard.
  - **FloodGuard AI**: Flood evacuation decision support, deterministic A* pathfinding, GIS spatial datasets, and emergency route recalculation.
- **IntellDev Agency Showcase**: Direct link and inquiry flow to [https://intelldev.tn/](https://intelldev.tn/).
- **The Track Record**:
  - **Engineering Intern — Sotualco (2026, Tunisia)**: Automated production lines, heavy electrical machinery, control systems, and power distribution.
  * **Founder — IntellDev** (2026 — Present).
  * **Customer Service Advisor — Concentrix (Petro-Canada Account)** (Aug 2024 — Jan 2025).
  * **Academic Track**: National Engineering Diploma at ENIG (2025–2029) & Preparatory Cycle at IPEIG (2023–2025).
  * **Extracurriculars**: Music Club Initiative Founder & Instructor, Robotics Club, Interact Tunis Paradise.
- **Interactive Cyber CLI Terminal**: Press `~` or click the terminal icon to access `ybha@YBHA.ino:~$` firmware shell.
- **Self-Contained Local Assets**: High-resolution profile picture (`/profile.png`) and downloadable CV document (`/Yassine_Bel_Hadj_Ali_CV.pdf`) bundled in `public/`.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

---

## 📦 Building for Production

```bash
# Type check and build static files into /dist
npm run build

# Preview production build locally
npm run preview
```

The resulting `dist/` folder is a 100% static production package containing:
- `index.html`
- `assets/` (minified JS & CSS bundles)
- `profile.png`
- `Yassine_Bel_Hadj_Ali_CV.pdf`

---

## 🌐 Deploy to Any Server

### Option A: Docker (VPS, DigitalOcean, AWS, Hetzner, etc.)

```bash
# Build the container
docker build -t ybha-portfolio .

# Run on port 80
docker run -d -p 80:80 --name ybha-portfolio ybha-portfolio
```

### Option B: Traditional Nginx Web Server

1. Run `npm run build` on your machine or CI/CD.
2. Copy the contents of the `dist/` directory to your server:
   ```bash
   scp -r dist/* user@your-server-ip:/var/www/ybha-portfolio/
   ```
3. Use the included `nginx.conf` file as your site configuration.

### Option C: Apache HTTP Server

Upload the `dist/` folder to your `public_html` or DocumentRoot and add a `.htaccess` file for SPA routing:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Option D: Vercel / Netlify / Cloudflare Pages / GitHub Pages

- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Node version**: 18+ or 20+

---

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (native `@import "tailwindcss";`)
- **Icons**: Lucide React
- **Animations**: CSS transitions + Motion
- **Tooling**: Vite 8
