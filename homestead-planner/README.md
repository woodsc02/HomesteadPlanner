# Homestead & Garden Planner 🌱

An interactive planner that helps people design homestead and gardening plans for the land they have. Suggests animals and plants based on climate, location, land size, goals, and experience level. Includes a stocking calculator, seasonal planting calendar, regenerative practices, cost estimates, save/export, and a full catalog browser.

**21 animals · 41 plants & crops · climate-aware suggestions · works for any land size**

---

## 🚀 Quick Start (run locally)

You'll need [**Node.js 18+**](https://nodejs.org) installed (download the LTS version).

Open a terminal in this folder and run:

```bash
npm install
npm run dev
```

Then open the URL it prints (usually `http://localhost:5173`) in your browser.

---

## 📦 Build for production

```bash
npm run build
```

Output goes to `dist/` — that folder can be deployed to any static host (Vercel, Netlify, GitHub Pages, etc.).

---

## 🌍 Deploy to the web (free)

The fastest path is **Vercel**:

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com), sign in with GitHub
3. Click "New Project," pick this repo, hit Deploy
4. Done — you'll get a public URL like `homestead-planner.vercel.app`

Vercel auto-detects Vite projects and rebuilds on every `git push`.

---

## 🛠 How to make changes

```bash
# Edit src/HomesteadPlanner.jsx in any code editor

# Save your changes to git:
git add .
git commit -m "describe what you changed"
git push

# If deployed to Vercel, the live site rebuilds automatically.
```

---

## 📂 Project structure

```
homestead-planner/
├── src/
│   ├── HomesteadPlanner.jsx    ← the entire app lives here
│   └── main.jsx                ← React mounting point (don't usually touch)
├── public/                      ← static files (favicons, etc.)
├── index.html                   ← HTML shell
├── package.json                 ← dependencies & scripts
├── vite.config.js               ← build tool config
└── .gitignore
```

To change anything about the planner — add new animals or plants, change suggestions, tweak styles, etc. — edit `src/HomesteadPlanner.jsx`. Everything is in that one file: data tables, logic, components, and styles.

---

## ✨ Features

- **3-step intake** — land size, climate (auto-detected from location), goals, focus areas
- **Existing-animals support** — tell us what you already have, get a plan that grows from there
- **Stocking calculator** — suggested counts per animal with adjustable +/- controls
- **Seasonal planting calendar** — month-by-month plant/harvest grid for your climate
- **Companion planting & pest management** — proven combos and natural deterrents
- **Regenerative practices** — per-animal, per-plant, and whole-system techniques
- **Cost estimates** — startup and annual, broken down by category
- **Catalog browser** — search 21 animals + 41 plants with climate/difficulty filters
- **Save & load plans** — multiple saved plans per browser, plus JSON export and print

---

## 📜 License

Personal project — feel free to fork and adapt.
