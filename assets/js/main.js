const SECTION_IDS = [
  "hero",
  "about",
  "education",
  "experience",
  "awards",
  "projects",
  "publications",
  "skills",
  "contact"
];

const UI_TEXT = {
  en: {
    hero_label: "Portfolio Landing",
    cta_projects: "View Projects",
    cta_resume: "Download CV",
    section_about: "About & Research Interests",
    section_education: "Education",
    section_experience: "Experience",
    section_awards: "Awards",
    section_projects: "Featured Projects",
    section_publications: "Publications & Presentations",
    section_skills: "Technical Skills",
    section_contact: "Contact",
    contact_email: "Email"
  },
  ko: {
    hero_label: "포트폴리오",
    cta_projects: "프로젝트 보기",
    cta_resume: "이력서 PDF",
    section_about: "소개 및 연구 관심",
    section_education: "학력",
    section_experience: "경험",
    section_awards: "수상",
    section_projects: "주요 프로젝트",
    section_publications: "논문 및 발표",
    section_skills: "기술 스택",
    section_contact: "연락처",
    contact_email: "이메일"
  }
};

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  return res.text();
}

function detectDefaultLang() {
  const saved = localStorage.getItem("portfolio_lang");
  if (saved === "en" || saved === "ko") return saved;
  return navigator.language?.toLowerCase().startsWith("ko") ? "ko" : "en";
}

function parseSections(md) {
  const sections = {};
  let current = null;
  const lines = md.replace(/\r/g, "").split("\n");

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const match = line.match(/^##\s+([a-z0-9-]+)\s*$/i);
    if (match) {
      current = match[1].trim().toLowerCase();
      sections[current] = [];
      continue;
    }
    if (current) sections[current].push(line);
  }

  for (const key of Object.keys(sections)) {
    sections[key] = sections[key].join("\n").trim();
  }

  return sections;
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function inlineMd(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[(.+?)\]\((https?:[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
}

function markdownToHtml(markdown) {
  const lines = markdown.split("\n");
  let html = "";
  let inList = false;

  const closeList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  };

  for (const lineRaw of lines) {
    const line = lineRaw.trim();
    if (!line) {
      closeList();
      continue;
    }

    if (line.startsWith("- ")) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${inlineMd(line.slice(2).trim())}</li>`;
      continue;
    }

    closeList();

    if (line.startsWith("### ")) {
      html += `<h3>${inlineMd(line.slice(4).trim())}</h3>`;
      continue;
    }

    html += `<p>${inlineMd(line)}</p>`;
  }

  closeList();
  return html;
}

function parseProjects(sectionText) {
  const chunks = sectionText
    .split(/\n(?=###\s*project:)/)
    .map((v) => v.trim())
    .filter(Boolean);

  const projects = [];

  for (const chunk of chunks) {
    const lines = chunk.split("\n").map((v) => v.trim());
    const first = lines.shift();
    const idMatch = first?.match(/^###\s*project:([a-z0-9-]+)$/i);
    if (!idMatch) continue;

    const item = { id: idMatch[1], tags: [] };
    let bodyMode = false;
    const bodyLines = [];

    for (const line of lines) {
      if (!line) continue;
      const kvMatch = line.match(/^([a-z_]+):\s*(.+)$/i);
      if (kvMatch && !bodyMode) {
        const key = kvMatch[1].toLowerCase();
        const value = kvMatch[2].trim();
        if (key === "tags") {
          item.tags = value.split(",").map((v) => v.trim()).filter(Boolean);
        } else {
          item[key] = value;
        }
      } else {
        bodyMode = true;
        bodyLines.push(line);
      }
    }

    item.body = bodyLines.join("\n");
    projects.push(item);
  }

  return projects;
}

function renderProjects(projects, orderedIds) {
  const byId = new Map(projects.map((p) => [p.id, p]));
  const ordered = orderedIds.map((id) => byId.get(id)).filter(Boolean);

  return ordered
    .map((project) => {
      const tags = (project.tags || [])
        .map((tag) => `<span class="project-tag">${inlineMd(tag)}</span>`)
        .join("");

      return `
        <article class="project-card">
          <h3>${inlineMd(project.title || "")}</h3>
          <p class="project-meta">${inlineMd(project.period || "")}</p>
          <div class="project-body">${markdownToHtml(project.body || "")}</div>
          <div class="project-tags">${tags}</div>
        </article>
      `;
    })
    .join("");
}

function setLangButtons(lang) {
  document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.langBtn === lang);
    btn.setAttribute("aria-pressed", String(btn.dataset.langBtn === lang));
  });
}

function fillUIText(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = UI_TEXT[lang][key] || "";
  });
}

function renderSocialLinks(links) {
  const container = document.getElementById("social-links");
  if (!container) return;
  container.innerHTML = "";

  const validEntries = Object.entries(links || {}).filter(([, url]) => !!url);

  for (const [label, url] of validEntries) {
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.textContent = label;
    container.appendChild(a);
  }
}

function renderProfile(profile, lang) {
  document.querySelectorAll("[data-profile='name']").forEach((el) => {
    el.textContent = profile.name;
  });

  document.querySelectorAll("[data-profile-lang='headline']").forEach((el) => {
    el.textContent = profile[`headline_${lang}`] || "";
  });

  const metricRow = document.getElementById("metric-row");
  if (metricRow) {
    metricRow.innerHTML = Object.values(profile.metrics || {})
      .map((metric) => `<span class="metric-pill">${inlineMd(metric)}</span>`)
      .join("");
  }

  const resumeLink = document.getElementById("resume-link");
  if (resumeLink) {
    resumeLink.href = profile.resume_pdf_path;
  }

  const emailLink = document.getElementById("email-link");
  if (emailLink) {
    emailLink.href = `mailto:${profile.email}`;
    emailLink.textContent = profile.email;
  }

  const profileImage = document.getElementById("profile-image");
  if (profileImage && profile.profile_image) {
    profileImage.src = profile.profile_image;
  }

  renderSocialLinks(profile.social_links || {});
}

function renderSections(sections, lang) {
  for (const id of SECTION_IDS) {
    if (id === "projects") continue;
    if (id === "hero" || id === "contact") continue;

    const node = document.querySelector(`[data-section='${id}']`);
    if (!node) continue;
    node.innerHTML = markdownToHtml(sections[id] || "");
  }

  const projectSection = sections.projects || "";
  const projects = parseProjects(projectSection);
  const grid = document.getElementById("projects-grid");
  if (grid) {
    grid.innerHTML = renderProjects(projects, window.__profileData.featured_project_ids || []);
  }

  document.documentElement.lang = lang;
}

async function init() {
  try {
    const [profileRes, enMd, koMd] = await Promise.all([
      fetch("assets/data/profile.json").then((r) => r.json()),
      fetchText("content/en.md"),
      fetchText("content/ko.md")
    ]);

    window.__profileData = profileRes;

    const sectionsByLang = {
      en: parseSections(enMd),
      ko: parseSections(koMd)
    };

    const applyLanguage = (lang) => {
      const selected = lang === "ko" ? "ko" : "en";
      localStorage.setItem("portfolio_lang", selected);
      fillUIText(selected);
      renderProfile(profileRes, selected);
      renderSections(sectionsByLang[selected], selected);
      setLangButtons(selected);
    };

    const initialLang = detectDefaultLang();
    applyLanguage(initialLang);

    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      btn.addEventListener("click", () => applyLanguage(btn.dataset.langBtn));
    });
  } catch (error) {
    console.error(error);
    document.body.innerHTML =
      '<main class="container" style="padding:2rem 0;"><h1>Failed to load portfolio content.</h1><p>Check content files and JSON format.</p></main>';
  }
}

init();
