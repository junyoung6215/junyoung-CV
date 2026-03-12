const UI_TEXT = {
  en: {
    page_title: "Junyoung Kwon | Liquid Glass CV",
    page_description: "Research portfolio and CV landing page for Junyoung Kwon.",
    brand_role: "Finance ML Portfolio",
    hero_label: "Machine Learning / Finance / Decision Analytics",
    hero_current: "Academic Status",
    hero_status: "Senior (4th Year, 1st Semester) in Computer Science and Engineering at SeoulTech.",
    hero_focus_title: "Core Areas",
    hero_contact_title: "Reach",
    focus_labels: ["Financial Markets ML", "Time Series Modeling", "Portfolio Optimization", "Decision Analytics"],
    metric_labels: {
      gpa: "GPA",
      award: "Highlight",
      portfolio: "Track Record",
      toeic: "English"
    },
    nav_story: "Overview",
    nav_spotlight: "Proof",
    nav_projects: "Projects",
    nav_toolkit: "Foundation",
    nav_contact: "Contact",
    section_story_kicker: "Identity",
    section_story: "Direction and Base",
    section_about_tag: "Intent",
    section_about: "Research Direction",
    section_education_tag: "Base",
    section_education: "Academic Base",
    section_experience_tag: "Execution",
    section_experience: "Where I Practiced It",
    section_spotlight_kicker: "Validation",
    section_spotlight: "External Proof",
    section_awards_tag: "Awards",
    section_awards: "Awards",
    section_media_tag: "Visibility",
    section_media: "Media",
    section_publications_tag: "Publication",
    section_publications: "Publications",
    section_projects_kicker: "Selected Work",
    section_projects: "Representative Projects",
    section_toolkit_kicker: "Foundation",
    section_toolkit: "Tools, Language, and Reference",
    section_skills_tag: "Tools",
    section_skills: "Technical Skills",
    section_languages_tag: "Language",
    section_languages: "Languages",
    section_references_tag: "Reference",
    section_references: "Reference",
    section_contact_kicker: "Next Step",
    section_contact: "Contact",
    cta_projects: "View Projects",
    cta_resume_pdf: "Download CV PDF",
    cta_resume_docx: "Download CV DOCX",
    contact_email: "Email",
    empty_projects: "Featured projects will appear here.",
    load_error_title: "Failed to load portfolio content.",
    load_error_body: "Check the markdown and JSON files in this repository.",
    profile_alt: "Junyoung Kwon profile portrait",
    project_prefix: "Project"
  },
  ko: {
    page_title: "권준영 | 리퀴드 글래스 CV",
    page_description: "권준영 연구 포트폴리오 및 CV 랜딩 페이지",
    brand_role: "Finance ML Portfolio",
    hero_label: "머신러닝 / 금융 / 의사결정 분석",
    hero_current: "학적 상태",
    hero_status: "서울과기대 컴퓨터공학과 4학년 1학기 재학 중입니다.",
    hero_focus_title: "핵심 분야",
    hero_contact_title: "연락처",
    focus_labels: ["금융 시장 ML", "금융 시계열", "포트폴리오 최적화", "의사결정 분석"],
    metric_labels: {
      gpa: "학점",
      award: "주요 성과",
      portfolio: "트랙 레코드",
      toeic: "영어"
    },
    nav_story: "개요",
    nav_spotlight: "검증",
    nav_projects: "프로젝트",
    nav_toolkit: "기반",
    nav_contact: "연락처",
    section_story_kicker: "정체성",
    section_story: "방향과 기반",
    section_about_tag: "방향",
    section_about: "연구 방향",
    section_education_tag: "기반",
    section_education: "학업 기반",
    section_experience_tag: "실행",
    section_experience: "실전 경험",
    section_spotlight_kicker: "검증",
    section_spotlight: "외부 검증",
    section_awards_tag: "수상",
    section_awards: "수상",
    section_media_tag: "보도",
    section_media: "언론 및 소개",
    section_publications_tag: "발표",
    section_publications: "논문 및 발표",
    section_projects_kicker: "대표 작업",
    section_projects: "대표 프로젝트",
    section_toolkit_kicker: "기반",
    section_toolkit: "기술, 언어, 추천인",
    section_skills_tag: "기술",
    section_skills: "기술 스택",
    section_languages_tag: "언어",
    section_languages: "언어",
    section_references_tag: "추천",
    section_references: "추천인",
    section_contact_kicker: "연락",
    section_contact: "연락처",
    cta_projects: "프로젝트 보기",
    cta_resume_pdf: "CV PDF 다운로드",
    cta_resume_docx: "CV DOCX 다운로드",
    contact_email: "이메일",
    empty_projects: "표시할 프로젝트가 아직 없습니다.",
    load_error_title: "포트폴리오 콘텐츠를 불러오지 못했습니다.",
    load_error_body: "저장소의 마크다운과 JSON 파일을 확인해 주세요.",
    profile_alt: "권준영 프로필 이미지",
    project_prefix: "프로젝트"
  }
};

function fetchText(url) {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to load ${url}`);
    }
    return res.text();
  });
}

function detectDefaultLang() {
  const saved = localStorage.getItem("portfolio_lang");
  if (saved === "en" || saved === "ko") {
    return saved;
  }
  return navigator.language?.toLowerCase().startsWith("ko") ? "ko" : "en";
}

function parseSections(markdown) {
  const sections = {};
  const lines = markdown.replace(/\r/g, "").split("\n");
  let currentSection = null;

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const match = line.match(/^##\s+([a-z0-9-]+)\s*$/i);

    if (match) {
      currentSection = match[1].trim().toLowerCase();
      sections[currentSection] = [];
      continue;
    }

    if (currentSection) {
      sections[currentSection].push(line);
    }
  }

  for (const key of Object.keys(sections)) {
    sections[key] = sections[key].join("\n").trim();
  }

  return sections;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function inlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[(.+?)\]\((https?:[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
}

function markdownToHtml(markdown) {
  if (!markdown) {
    return "";
  }

  const lines = markdown.split("\n");
  let html = "";
  let inList = false;

  const closeList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      closeList();
      continue;
    }

    if (line.startsWith("- ")) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${inlineMarkdown(line.slice(2).trim())}</li>`;
      continue;
    }

    closeList();

    if (line.startsWith("### ")) {
      html += `<h3>${inlineMarkdown(line.slice(4).trim())}</h3>`;
      continue;
    }

    html += `<p>${inlineMarkdown(line)}</p>`;
  }

  closeList();
  return html;
}

function parseHeadingBlocks(markdown) {
  const lines = markdown.replace(/\r/g, "").split("\n");
  const blocks = [];
  let current = null;

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const heading = line.match(/^###\s+(.+)$/);

    if (heading) {
      if (current) {
        current.body = current.lines.join("\n").trim();
        blocks.push(current);
      }
      current = {
        title: heading[1].trim(),
        lines: []
      };
      continue;
    }

    if (current) {
      current.lines.push(line);
    }
  }

  if (current) {
    current.body = current.lines.join("\n").trim();
    blocks.push(current);
  }

  return blocks;
}

function parseAwards(markdown) {
  const items = markdown
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim());

  const awards = [];

  for (let index = 0; index < items.length; index += 2) {
    awards.push({
      title: items[index] || "",
      description: items[index + 1] || ""
    });
  }

  return awards;
}

function parseProjects(sectionText) {
  const chunks = sectionText
    .split(/\n(?=###\s*project:)/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  const projects = [];

  for (const chunk of chunks) {
    const lines = chunk.split("\n").map((line) => line.trim());
    const firstLine = lines.shift();
    const idMatch = firstLine?.match(/^###\s*project:([a-z0-9-]+)$/i);

    if (!idMatch) {
      continue;
    }

    const item = {
      id: idMatch[1],
      tags: []
    };

    let bodyMode = false;
    const bodyLines = [];

    for (const line of lines) {
      if (!line) {
        continue;
      }

      const kvMatch = line.match(/^([a-z_]+):\s*(.+)$/i);
      if (kvMatch && !bodyMode) {
        const key = kvMatch[1].toLowerCase();
        const value = kvMatch[2].trim();

        if (key === "tags") {
          item.tags = value
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);
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

function parseListItems(markdown) {
  return markdown
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim());
}

function splitLabelValue(text) {
  const index = text.indexOf(":");
  if (index === -1) {
    return {
      label: "",
      value: text.trim()
    };
  }

  return {
    label: text.slice(0, index).trim(),
    value: text.slice(index + 1).trim()
  };
}

function splitProjectBody(body) {
  const items = parseListItems(body);

  if (!items.length) {
    return {
      outcome: "",
      bodyMarkdown: body
    };
  }

  const lastItem = items[items.length - 1];
  const isOutcome = /achiev|award|rank|score|top|outperform|달성|수상|기록|상위|우수상|1위|2위|성과/i.test(lastItem);

  if (!isOutcome) {
    return {
      outcome: "",
      bodyMarkdown: body
    };
  }

  return {
    outcome: lastItem,
    bodyMarkdown: items
      .slice(0, -1)
      .map((item) => `- ${item}`)
      .join("\n")
  };
}

function renderProjects(projects, orderedIds, lang) {
  const byId = new Map(projects.map((project) => [project.id, project]));
  const ordered = orderedIds?.length ? orderedIds.map((id) => byId.get(id)).filter(Boolean) : projects;
  const items = ordered.length ? ordered : projects;

  if (!items.length) {
    return `<p class="empty">${escapeHtml(UI_TEXT[lang].empty_projects)}</p>`;
  }

  return items
    .map((project, index) => {
      const projectParts = splitProjectBody(project.body || "");
      const tags = (project.tags || [])
        .map((tag) => `<span class="project-tag">${inlineMarkdown(tag)}</span>`)
        .join("");

      return `
        <article class="surface project-card">
          <p class="project-index">${escapeHtml(UI_TEXT[lang].project_prefix)} ${String(index + 1).padStart(2, "0")}</p>
          <h3>${inlineMarkdown(project.title || "")}</h3>
          <p class="project-meta">${inlineMarkdown(project.period || "")}</p>
          ${projectParts.outcome ? `<p class="project-outcome">${inlineMarkdown(projectParts.outcome)}</p>` : ""}
          <div class="project-body">${markdownToHtml(projectParts.bodyMarkdown || project.body || "")}</div>
          <div class="project-tags">${tags}</div>
        </article>
      `;
    })
    .join("");
}

function inferExperienceLabel(title, lang) {
  const source = title.toLowerCase();

  if (source.includes("research") || source.includes("연구")) {
    return lang === "ko" ? "연구" : "Research";
  }
  if (source.includes("intern")) {
    return lang === "ko" ? "인턴십" : "Internship";
  }
  if (source.includes("teaching") || source.includes("튜터") || source.includes("교육")) {
    return lang === "ko" ? "교육" : "Teaching";
  }
  return lang === "ko" ? "추가 경험" : "Additional";
}

function renderExperience(markdown, lang) {
  const blocks = parseHeadingBlocks(markdown);

  return blocks
    .map((block, index) => {
      const cardClass = index < 2 ? "experience-card major" : "experience-card";
      return `
        <article class="${cardClass}">
          <span class="experience-label">${escapeHtml(inferExperienceLabel(block.title, lang))}</span>
          <h4>${inlineMarkdown(block.title)}</h4>
          <div class="experience-body">${markdownToHtml(block.body)}</div>
        </article>
      `;
    })
    .join("");
}

function renderAwards(markdown) {
  const awards = parseAwards(markdown);

  return awards
    .map(
      (award) => `
        <article class="award-item">
          <h4 class="award-title">${inlineMarkdown(award.title)}</h4>
          <p class="award-desc">${inlineMarkdown(award.description)}</p>
        </article>
      `
    )
    .join("");
}

function renderEducation(markdown) {
  const blocks = parseHeadingBlocks(markdown);
  const block = blocks[0];

  if (!block) {
    return "";
  }

  const facts = parseListItems(block.body || "");
  return `
    <div class="edu-school">${inlineMarkdown(block.title)}</div>
    <div class="edu-facts">
      ${facts
        .map((fact) => {
          const parts = splitLabelValue(fact);
          if (!parts.label) {
            return `<div class="edu-fact"><span class="edu-value">${inlineMarkdown(parts.value)}</span></div>`;
          }
          return `<div class="edu-fact"><span class="edu-label">${inlineMarkdown(parts.label)}</span><span class="edu-value">${inlineMarkdown(parts.value)}</span></div>`;
        })
        .join("")}
    </div>
  `;
}

function renderSkills(markdown) {
  const items = parseListItems(markdown);

  return items
    .map((item) => {
      const parts = splitLabelValue(item);
      return `
        <article class="skill-group">
          <p class="skill-group-label">${inlineMarkdown(parts.label || "Skill")}</p>
          <p class="skill-group-value">${inlineMarkdown(parts.value || item)}</p>
        </article>
      `;
    })
    .join("");
}

function renderLanguages(markdown) {
  return parseListItems(markdown)
    .map((item) => `<span class="language-pill">${inlineMarkdown(item)}</span>`)
    .join("");
}

function renderReference(markdown) {
  const items = parseListItems(markdown);
  if (!items.length) {
    return "";
  }

  const [name, ...details] = items;

  return `
    <div class="reference-name">${inlineMarkdown(name)}</div>
    <div class="reference-meta">
      ${details.map((detail) => `<p>${inlineMarkdown(detail)}</p>`).join("")}
    </div>
  `;
}

function setLangButtons(lang) {
  document.querySelectorAll("[data-lang-btn]").forEach((button) => {
    const active = button.dataset.langBtn === lang;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function fillUIText(lang) {
  const ui = UI_TEXT[lang];

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    node.textContent = ui[key] || "";
  });

  document.title = ui.page_title;

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", ui.page_description);
  }
}

function fillFocusAreas(lang) {
  const labels = UI_TEXT[lang].focus_labels || [];

  const focusRow = document.getElementById("focus-row");
  if (focusRow) {
    focusRow.innerHTML = labels.map((label) => `<span class="focus-chip">${escapeHtml(label)}</span>`).join("");
  }

  const focusList = document.getElementById("focus-list");
  if (focusList) {
    focusList.innerHTML = labels.map((label) => `<div class="signal-pill">${escapeHtml(label)}</div>`).join("");
  }
}

function renderSocialLinks(links) {
  const container = document.getElementById("social-links");
  if (!container) {
    return;
  }

  const validEntries = Object.entries(links || {}).filter(([, url]) => Boolean(url));
  container.innerHTML = "";

  if (!validEntries.length) {
    container.hidden = true;
    return;
  }

  container.hidden = false;

  for (const [label, url] of validEntries) {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    anchor.textContent = label;
    container.appendChild(anchor);
  }
}

function setResumeLinks(profile) {
  const linksByType = {
    pdf: profile.resume_pdf_path,
    docx: profile.resume_docx_path
  };

  Object.entries(linksByType).forEach(([type, href]) => {
    document.querySelectorAll(`[data-resume="${type}"]`).forEach((node) => {
      if (href) {
        node.href = href;
        node.style.display = "inline-flex";
      } else {
        node.removeAttribute("href");
        node.style.display = "none";
      }
    });
  });
}

function renderProfile(profile, lang) {
  document.querySelectorAll('[data-profile="name"]').forEach((node) => {
    node.textContent = profile.name || "";
  });

  document.querySelectorAll('[data-profile-lang="headline"]').forEach((node) => {
    node.textContent = profile[`headline_${lang}`] || "";
  });

  const metricRow = document.getElementById("metric-row");
  if (metricRow) {
    metricRow.innerHTML = Object.entries(profile.metrics || {})
      .map(([key, metric]) => {
        const label = UI_TEXT[lang].metric_labels?.[key] || key;
        return `<div class="metric-item"><span class="metric-label">${escapeHtml(label)}</span><span class="metric-value">${inlineMarkdown(metric)}</span></div>`;
      })
      .join("");
  }

  document.querySelectorAll("[data-email-link]").forEach((node) => {
    node.href = `mailto:${profile.email || ""}`;
    node.textContent = profile.email || "";
  });

  const profileImage = document.getElementById("profile-image");
  if (profileImage) {
    if (profile.profile_image) {
      profileImage.src = profile.profile_image;
    }
    profileImage.alt = UI_TEXT[lang].profile_alt;
  }

  setResumeLinks(profile);
  renderSocialLinks(profile.social_links || {});
}

function renderSections(sections, profile, lang) {
  document.querySelectorAll("[data-section]").forEach((node) => {
    const key = node.getAttribute("data-section");
    if (key === "experience" || key === "awards" || key === "education" || key === "skills" || key === "languages" || key === "references") {
      return;
    }
    node.innerHTML = markdownToHtml(sections[key] || "");
  });

  const educationSummary = document.getElementById("education-summary");
  if (educationSummary) {
    educationSummary.innerHTML = renderEducation(sections.education || "");
  }

  const experienceTrack = document.getElementById("experience-track");
  if (experienceTrack) {
    experienceTrack.innerHTML = renderExperience(sections.experience || "", lang);
  }

  const awardsList = document.getElementById("awards-list");
  if (awardsList) {
    awardsList.innerHTML = renderAwards(sections.awards || "");
  }

  const skillsGroups = document.getElementById("skills-groups");
  if (skillsGroups) {
    skillsGroups.innerHTML = renderSkills(sections.skills || "");
  }

  const languagesStrip = document.getElementById("languages-strip");
  if (languagesStrip) {
    languagesStrip.innerHTML = renderLanguages(sections.languages || "");
  }

  const referenceCard = document.getElementById("reference-card");
  if (referenceCard) {
    referenceCard.innerHTML = renderReference(sections.references || "");
  }

  const projectsGrid = document.getElementById("projects-grid");
  if (projectsGrid) {
    const projects = parseProjects(sections.projects || "");
    projectsGrid.innerHTML = renderProjects(projects, profile.featured_project_ids || [], lang);
  }

  document.documentElement.lang = lang;
}

function setupRevealAnimations() {
  const targets = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    targets.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  targets.forEach((node) => observer.observe(node));
}

async function init() {
  try {
    const [profile, enMarkdown, koMarkdown] = await Promise.all([
      fetch("data/profile.json").then((response) => response.json()),
      fetchText("data/content/en.md"),
      fetchText("data/content/ko.md")
    ]);

    const sectionsByLang = {
      en: parseSections(enMarkdown),
      ko: parseSections(koMarkdown)
    };

    const applyLanguage = (lang) => {
      const selected = lang === "ko" ? "ko" : "en";
      localStorage.setItem("portfolio_lang", selected);
      fillUIText(selected);
      fillFocusAreas(selected);
      renderProfile(profile, selected);
      renderSections(sectionsByLang[selected], profile, selected);
      setLangButtons(selected);
    };

    setupRevealAnimations();
    applyLanguage(detectDefaultLang());

    document.querySelectorAll("[data-lang-btn]").forEach((button) => {
      button.addEventListener("click", () => applyLanguage(button.dataset.langBtn));
    });
  } catch (error) {
    console.error(error);
    const lang = detectDefaultLang();
    document.title = UI_TEXT[lang].page_title;
    document.body.innerHTML = `
      <main style="width:min(720px, calc(100vw - 2rem)); margin:6rem auto; font-family: Instrument Sans, sans-serif;">
        <div style="padding:2rem; border-radius:28px; background:rgba(255,255,255,0.58); box-shadow:0 20px 50px rgba(31,47,73,0.12);">
          <h1 style="margin:0 0 0.75rem; color:#10233d;">${escapeHtml(UI_TEXT[lang].load_error_title)}</h1>
          <p style="margin:0; color:#44556c;">${escapeHtml(UI_TEXT[lang].load_error_body)}</p>
        </div>
      </main>
    `;
  }
}

init();
