# Junyoung Portfolio Landing

Bilingual (EN/KR) static portfolio landing page for professor/lab sharing.

## Stack
- Static HTML/CSS/JS
- Markdown-driven content (`content/en.md`, `content/ko.md`)
- Structured profile config (`assets/data/profile.json`)
- GitHub Pages deployment via Actions

## Project Structure
- `index.html`: page skeleton and section containers
- `assets/css/styles.css`: visual system and responsive layout
- `assets/js/main.js`: markdown parsing, language toggle, rendering
- `content/en.md`: English content source
- `content/ko.md`: Korean content source
- `assets/data/profile.json`: profile/contact/metrics/project ordering
- `assets/files/resume-junyoung-kwon.pdf`: downloadable resume
- `assets/img/profile-placeholder.svg`: profile image placeholder
- `.github/workflows/pages.yml`: GitHub Pages deployment workflow

## Run Locally
Because `fetch()` is used for local content files, run a local web server:

```bash
cd /Users/kwon_junyoung/Desktop/practice
python3 -m http.server 8000
```

Then open: `http://localhost:8000`

## Edit Content
1. Update English copy in `content/en.md`
2. Update Korean copy in `content/ko.md`
3. Update personal metadata in `assets/data/profile.json`
4. Replace profile image path in `assets/data/profile.json` (`profile_image`)
5. Replace resume PDF at `assets/files/resume-junyoung-kwon.pdf` if needed

### Markdown Contract
Each markdown file must keep fixed section headings:

- `## hero`
- `## about`
- `## education`
- `## experience`
- `## awards`
- `## projects`
- `## publications`
- `## skills`
- `## contact`

In `## projects`, use this format:

```md
### project:project-id
title: Project title
period: Date range
tags: tag1, tag2, tag3
- Bullet 1
- Bullet 2
```

Project IDs must match `featured_project_ids` in `assets/data/profile.json`.

## Deploy to GitHub Pages
1. Push this repo to GitHub.
2. Ensure default branch is `main`.
3. In GitHub repo settings:
   - Go to `Settings > Pages`
   - Set source to `GitHub Actions`
4. Push to `main`; deployment runs automatically.

Your site URL will be:
- `https://<github-username>.github.io/<repo-name>/`

## Notes
- Current PDF file is copied from available local resume PDF. Replace with your final English PDF when ready.
- Phone number is intentionally omitted; only email is rendered.
