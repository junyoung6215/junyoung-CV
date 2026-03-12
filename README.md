# Junyoung Portfolio Landing

Bilingual static CV landing page built with plain HTML, CSS, and JavaScript.

## Stack
- Static HTML/CSS/JS
- Markdown-driven content in `data/content/`
- Structured profile config in `data/profile.json`
- GitHub Pages deployment via Actions

## Folder Structure
- `index.html`: page shell and section layout
- `assets/styles/styles.css`: liquid-glass visual system and responsive layout
- `assets/scripts/main.js`: content loading, markdown parsing, language toggle, rendering
- `assets/images/profile/`: rendered profile photo and fallback placeholder
- `data/profile.json`: profile metadata, metrics, and downloadable document paths
- `data/content/en.md`: English copy source
- `data/content/ko.md`: Korean copy source
- `documents/current/`: current source-of-truth CV used by the site
- `documents/archive/`: older resume/CV files kept only for reference
- `.github/workflows/pages.yml`: GitHub Pages deployment workflow

## Run Locally
Because the page loads markdown and JSON via `fetch()`, run it behind a local web server:

```bash
cd /Users/kwon_junyoung/Desktop/Seoultech/3rd_Winter/CV_forgithub
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Edit Workflow
1. Update personal metadata in `data/profile.json`
2. Update English copy in `data/content/en.md`
3. Update Korean copy in `data/content/ko.md`
4. Replace the current CV in `documents/current/` if the source document changes
5. Replace the profile image in `assets/images/profile/` if needed

## Markdown Contract
Each markdown file should keep these section headings:

- `## hero`
- `## about`
- `## education`
- `## experience`
- `## media`
- `## awards`
- `## projects`
- `## publications`
- `## skills`
- `## languages`
- `## references`
- `## contact`

Inside `## projects`, use this format:

```md
### project:project-id
title: Project title
period: Date range
tags: tag1, tag2, tag3
- Bullet 1
- Bullet 2
```

Project IDs must match `featured_project_ids` in `data/profile.json`.

## Deploy to GitHub Pages
1. Push this repo to GitHub.
2. Ensure the default branch is `main`.
3. In GitHub repo settings, go to `Settings > Pages`.
4. Set the source to `GitHub Actions`.
5. Push to `main` to trigger deployment.

## Notes
- The current source document is `documents/current/CV_권준영_서울과학기술대학교_2026.pdf`.
- Older resume files are archived and no longer drive site content.
