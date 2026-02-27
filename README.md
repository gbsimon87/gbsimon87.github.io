# Simon Cordova Portfolio (2026)

A fast, recruiter-friendly one-page portfolio built with semantic HTML, modern CSS, and lightweight vanilla JavaScript.

## What This App Is

This app is Simon Cordova's personal developer portfolio site.  
It highlights:

- Professional summary and proof points
- Featured projects with visuals and live links
- Experience timeline
- Skills and certifications
- Contact and downloadable CV

The app is intentionally simple, accessible, and static so it loads quickly and is easy to maintain.

## Tech Stack

- HTML5 (semantic structure)
- CSS3 (responsive layout with Grid/Flexbox)
- Vanilla JavaScript (progressive enhancement)

## Project Structure

```txt
.
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── docs/
│   │   └── simon-cordova-cv.pdf
│   ├── favicon_io/
│   └── projects/
└── render.yaml
```

## Run Locally

This is a static site, so no build step is required.  
You can open `index.html` directly, or use any local static server.

## Deployment

### Render

- Config is in `render.yaml`
- Runtime: static
- Publish directory: project root

### GitHub Pages + Portfolio Repo Push

This project uses two remotes in this local setup:

- `origin` -> `simon-cordova-portfolio-2026`
- `pages` -> `gbsimon87.github.io`

A local git alias is configured:

```bash
git pushboth
```

This command:

1. Pushes to the portfolio repo (`origin main`)
2. Pushes to the GitHub Pages repo (`pages main`) using `--force-with-lease`

If the alias is missing in another clone, recreate it with:

```bash
git config alias.pushboth '!git push origin main && git push --force-with-lease pages main'
```

