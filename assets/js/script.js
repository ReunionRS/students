const courseInfo = {
  "course-2": {
    label: "2 курс / Техническое задание",
    title: "Платформа поиска<br />строительных специалистов",
    description: "Веб-часть и дизайн общего продукта. Задание Android-разработчика перенесено в раздел приложений 3 курса.",
    badges: ["React", "Node.js", "PostgreSQL", "REST API"],
    modules: {
      web: {
        title: "Разработка веб-приложения",
        description: "React + Vite для frontend, Node.js + Express для API и PostgreSQL с Prisma для хранения данных.",
        label: "Web-приложение",
      },
      design: {
        title: "Интерфейс и дизайн приложений",
        description: "Единые визуальные правила для React-сайта и Flutter-приложения: темы, цвета и UI-компоненты.",
        label: "Интерфейс и дизайн",
      },
      resources: {
        title: "Полезные источники",
        description: "Документация технологий, ИИ-инструменты и информация о том, где попросить помощь.",
        label: "Полезные источники",
      },
    },
  },
  "course-3-apps": {
    label: "3 курс / Разработка приложений",
    title: "Разработка<br />приложений",
    description: "Выберите одну тему и разработайте рабочее приложение с понятным пользовательским сценарием.",
    badges: ["Flutter", "React", "Firebase", "API"],
    modules: {
      marketplace: {
        title: "Android-приложение для поиска специалистов",
        description: "Перенесенная тема: Flutter-приложение сервиса строительных заказов и специалистов.",
        label: "Строительный сервис",
      },
      messenger: {
        title: "Мобильный мессенджер",
        description: "Приложение на Flutter с регистрацией, списком диалогов и обменом сообщениями.",
        label: "Мессенджер",
      },
      finance: {
        title: "Финансовый помощник",
        description: "Мобильное приложение для учета личных доходов, расходов и бюджета.",
        label: "Финансовый помощник",
      },
      video: {
        title: "Видеоплатформа",
        description: "Веб-приложение на React для каталога и просмотра учебных видеороликов.",
        label: "Видеоплатформа React",
      },
    },
  },
  "course-3-games": {
    label: "3 курс / Разработка игр",
    title: "Разработка игр<br />на Unity",
    description: "Учебные темы игровых проектов с собственным визуальным стилем и базовыми игровыми механиками.",
    badges: ["Unity", "C#", "Game Design", "3D"],
    modules: {
      tank: {
        title: "Танковое сражение",
        description: "3D-игра на Unity в жанре аркадного танкового сражения.",
        label: "Танковая арена",
      },
      train: {
        title: "Симулятор машиниста",
        description: "3D-симулятор управления электричкой с маршрутом, станциями и оценкой действий игрока.",
        label: "Электричка",
      },
    },
  },
};

const elements = {
  body: document.getElementById("documentBody"),
  header: document.getElementById("documentHeader"),
  tabNavigation: document.getElementById("tabNavigation"),
  courseButtons: document.querySelectorAll(".course-button"),
  heroLabel: document.getElementById("heroLabel"),
  heroTitle: document.getElementById("heroTitle"),
  heroDescription: document.getElementById("heroDescription"),
  badges: document.getElementById("stackBadges"),
  progress: document.getElementById("readingProgress"),
  themeToggle: document.getElementById("themeToggle"),
  themeLabel: document.getElementById("themeLabel"),
  toTop: document.getElementById("toTop"),
  menuButton: document.getElementById("menuButton"),
  sidebar: document.getElementById("sidebar"),
  backdrop: document.getElementById("backdrop"),
};

const state = {
  activeCourse: "course-2",
  activeTab: "web",
  documents: {
    "course-2": {},
    "course-3-apps": {},
    "course-3-games": {},
  },
};

const subheadings = new Set([
  "Основные цвета",
  "Примеры использования",
  "Light Theme",
  "Dark Theme",
  "Основной стек",
  "Документация",
  "Для гостя",
  "Для заказчика",
  "Для специалиста",
  "Фильтры",
  "Карточка специалиста",
  "Карточка заказа",
  "Кнопки",
  "Функции",
  "Типы уведомлений",
  "Разделы",
  "Дополнительно",
  "Поля",
  "Frontend",
  "Backend",
  "База данных",
  "UI Framework",
  "Авторизация",
  "Специалисты",
  "Заказы",
  "Отклики",
  "Сообщения",
  "MVP",
  "React",
  "Express",
  "PostgreSQL",
  "Prisma",
  "REST API",
  "JWT",
  "TailwindCSS",
]);

const githubRequirement = `## Обязательное условие по GitHub
Ссылка на GitHub-репозиторий обязательна.
Если ссылки на GitHub нет или репозиторий недоступен для просмотра, работа рассматриваться не будет.`;

const aiSources = `ИИ-инструменты для идей, макетов, объяснения ошибок и помощи с кодом
ChatGPT: https://chatgpt.com/
Codex: https://openai.com/codex/
Stitch: https://stitch.withgoogle.com/
Lovable: https://lovable.dev/
Gemini: https://gemini.google.com/
Claude: https://claude.ai/
GitHub Copilot: https://github.com/features/copilot
Perplexity: https://www.perplexity.ai/
ИИ можно использовать как помощника, но студент должен понимать свой код и уметь объяснить решение.`;

const generalSources = `GitHub и основы web
GitHub Docs: https://docs.github.com/
Git: https://git-scm.com/doc
MDN Web Docs: https://developer.mozilla.org/

${aiSources}`;

const projectSources = {
  "course-2": {
    web: `Официальная документация
React: https://react.dev/
Vite: https://vite.dev/guide/
Node.js: https://nodejs.org/docs/latest/api/
Express: https://expressjs.com/
PostgreSQL: https://www.postgresql.org/docs/
Prisma: https://www.prisma.io/docs

${generalSources}`,
    design: `Полезные материалы по интерфейсам
Figma: https://help.figma.com/
Material Design: https://m3.material.io/
Flutter UI: https://docs.flutter.dev/ui
React: https://react.dev/
Web Content Accessibility Guidelines: https://www.w3.org/WAI/standards-guidelines/wcag/

${generalSources}`,
  },
  "course-3-apps": {
    marketplace: `Официальная документация
Flutter: https://docs.flutter.dev/
Firebase для Flutter: https://firebase.google.com/docs/flutter/setup
Express: https://expressjs.com/
PostgreSQL: https://www.postgresql.org/docs/
REST API: https://developer.mozilla.org/docs/Glossary/REST

${generalSources}`,
    messenger: `Официальная документация
Flutter: https://docs.flutter.dev/
Firebase для Flutter: https://firebase.google.com/docs/flutter/setup
Firebase Authentication: https://firebase.google.com/docs/auth/flutter/start
Cloud Firestore: https://firebase.google.com/docs/firestore
Firebase Storage: https://firebase.google.com/docs/storage/flutter/start
Firebase Cloud Messaging: https://firebase.google.com/docs/cloud-messaging/flutter/client

${generalSources}`,
    finance: `Официальная документация
Flutter: https://docs.flutter.dev/
Firebase для Flutter: https://firebase.google.com/docs/flutter/setup
Вход через Google в Firebase: https://firebase.google.com/docs/auth/flutter/federated-auth
Cloud Firestore: https://firebase.google.com/docs/firestore
Flutter charts packages: https://pub.dev/packages/fl_chart

${generalSources}`,
    video: `Официальная документация
React: https://react.dev/
Vite: https://vite.dev/guide/
Firebase для web: https://firebase.google.com/docs/web/setup
HTML video: https://developer.mozilla.org/docs/Web/HTML/Element/video
React Router: https://reactrouter.com/
Firebase Storage: https://firebase.google.com/docs/storage/web/start

${generalSources}`,
  },
  "course-3-games": {
    tank: `Документация
Unity Manual: https://docs.unity3d.com/Manual/index.html
C# на Microsoft Learn: https://learn.microsoft.com/dotnet/csharp/
Unity Learn: https://learn.unity.com/
Unity Asset Store: https://assetstore.unity.com/

Референсы механик, а не материалы для копирования
World of Tanks: https://worldoftanks.com/
War Thunder: https://warthunder.com/
Видео World of Tanks на YouTube: https://www.youtube.com/results?search_query=World+of+Tanks+official+gameplay
Видео War Thunder на YouTube: https://www.youtube.com/results?search_query=War+Thunder+official+gameplay
Фото и видео War Thunder в Steam: https://store.steampowered.com/app/236390/War_Thunder/
Фото и визуальный стиль World of Tanks: https://worldoftanks.com/

${generalSources}`,
    train: `Документация
Unity Manual: https://docs.unity3d.com/Manual/index.html
C# на Microsoft Learn: https://learn.microsoft.com/dotnet/csharp/
Unity Learn: https://learn.unity.com/
Unity Asset Store: https://assetstore.unity.com/

Референсы механик, а не материалы для копирования
Train Sim World: https://trainsimworld.com/
SimRail: https://simrail.eu/
Видео Train Sim World на YouTube: https://www.youtube.com/results?search_query=Train+Sim+World+official+gameplay
Видео SimRail на YouTube: https://www.youtube.com/results?search_query=SimRail+gameplay
Фото и видео Train Sim World в Steam: https://store.steampowered.com/app/3656800/Train_Sim_World_6/
Фото и видео SimRail в Steam: https://store.steampowered.com/app/1422130/SimRail__The_Railway_Simulator/

${generalSources}`,
  },
};

function addProjectDetails(course, tab, text) {
  const sources = projectSources[course]?.[tab];
  return sources ? `${text}\n\n${githubRequirement}\n\n## Полезные источники\n${sources}` : text;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function cleanText(value) {
  return value.replace(/\*\*(.*?)\*\*/g, "$1").replace(/^#+\s*/, "").trim();
}

function splitDocument(source) {
  const mobileMarker = "ТЗ на разработку Flutter Android-приложения";
  const webMarker = "Техническое задание для студентов";
  const resourcesMarker = "Полезные источники и поддержка";
  const mobileStart = source.indexOf(mobileMarker);
  const webStart = source.indexOf(webMarker);
  const resourcesStart = source.indexOf(resourcesMarker);

  if (mobileStart < 0 || webStart < 0 || resourcesStart < 0) {
    throw new Error("Не найдены заголовки разделов во встроенном тексте заданий.");
  }

  return {
    design: source.slice(0, mobileStart).trim(),
    mobile: source.slice(mobileStart, webStart).trim(),
    web: source.slice(webStart, resourcesStart).trim(),
    resources: source.slice(resourcesStart).trim(),
  };
}

function renderHeader(tab) {
  const info = courseInfo[state.activeCourse].modules[tab];
  elements.header.innerHTML = `
    <div class="document-kicker">${info.label}</div>
    <h2>${info.title}</h2>
    <p>${info.description}</p>
  `;
  elements.header.setAttribute("aria-label", info.label);
}

function parseSections(text) {
  const lines = text.replaceAll("\r", "").split("\n");
  const sections = [];
  const intro = [];
  let currentSection = null;

  lines.forEach((line) => {
    const trimmed = line.trim();
    const heading = trimmed.match(/^(\d+)\.\s+(.+)$/);
    const markdownSection = trimmed.match(/^##\s+(.+)$/) || (sections.length > 0 ? trimmed.match(/^#\s+(.+)$/) : null);
    if (heading) {
      currentSection = { number: heading[1], title: cleanText(heading[2]), lines: [] };
      sections.push(currentSection);
    } else if (markdownSection) {
      currentSection = { number: "", title: cleanText(markdownSection[1]), lines: [] };
      sections.push(currentSection);
    } else if (currentSection) {
      currentSection.lines.push(line);
    } else if (trimmed && trimmed !== "---") {
      intro.push(cleanText(trimmed));
    }
  });

  return { intro, sections };
}

function nextMeaningfulLine(lines, index) {
  return lines.slice(index + 1).find((line) => line.trim())?.trim() || "";
}

function renderList(items) {
  return `<ul class="doc-list">${items.map((item) => `<li>${escapeHtml(cleanText(item.replace(/^[*+-]\s+/, "").replace(/;$/, "")))}</li>`).join("")}</ul>`;
}

function renderContent(lines) {
  const output = [];
  let index = 0;

  while (index < lines.length) {
    const rawLine = lines[index];
    const line = rawLine.trim();

    if (!line || line === "---") {
      index += 1;
      continue;
    }

    if (/^[*+-]\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^[*+-]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim());
        index += 1;
      }
      output.push(renderList(items));
      continue;
    }

    if (/^(lib\/|src\/)$/.test(line)) {
      const tree = [];
      while (index < lines.length && lines[index].trim()) {
        tree.push(lines[index]);
        index += 1;
      }
      output.push(`<pre class="doc-code">${escapeHtml(tree.join("\n"))}</pre>`);
      continue;
    }

    if (/^(GET|POST|PUT|PATCH|DELETE)\s+/.test(line)) {
      const endpoints = [];
      while (index < lines.length && /^(GET|POST|PUT|PATCH|DELETE)\s+/.test(lines[index].trim())) {
        endpoints.push(lines[index].trim());
        index += 1;
      }
      output.push(`<pre class="doc-code">${escapeHtml(endpoints.join("\n"))}</pre>`);
      continue;
    }

    const linkedUrl = line.match(/https?:\/\/\S+/)?.[0];
    if (linkedUrl) {
      output.push(
        `<a class="doc-link" href="${escapeHtml(linkedUrl)}" target="_blank" rel="noreferrer">${escapeHtml(line)}</a>`,
      );
      index += 1;
      continue;
    }

    const subNumber = line.match(/^\d+\.\d+\.\s+(.+)$/);
    const markdownHeading = line.match(/^#{2,6}\s+(.+)$/);
    if (subNumber || markdownHeading || subheadings.has(line) || (line.length <= 35 && nextMeaningfulLine(lines, index).endsWith(":"))) {
      output.push(`<h4>${escapeHtml(cleanText(subNumber ? subNumber[1] : markdownHeading ? markdownHeading[1] : line))}</h4>`);
      index += 1;
      continue;
    }

    if (line.endsWith(":")) {
      output.push(`<p class="block-label">${escapeHtml(cleanText(line))}</p>`);
      const nextLine = nextMeaningfulLine(lines, index);
      if (/^(GET|POST|PUT|PATCH|DELETE)\s+/.test(nextLine) || /^(lib\/|src\/)$/.test(nextLine)) {
        index += 1;
        continue;
      }
      const list = [];
      index += 1;
      while (index < lines.length && lines[index].trim()) {
        const item = lines[index].trim();
        if (/^(GET|POST|PUT|PATCH|DELETE)\s+/.test(item) || item.match(/https?:\/\/\S+/)) {
          break;
        }
        list.push(item);
        index += 1;
      }
      if (list.length) {
        output.push(renderList(list));
      }
      continue;
    }

    output.push(`<p>${escapeHtml(cleanText(line))}</p>`);
    index += 1;
  }

  return output.join("");
}

function renderDocument(tab) {
  const text = state.documents[state.activeCourse][tab];
  const parsed = parseSections(text);
  renderHeader(tab);
  const introTitle = parsed.intro[0] || courseInfo[state.activeCourse].modules[tab].title;
  const introText = parsed.intro.slice(1).map((line) => `<p>${escapeHtml(line)}</p>`).join("");
  const encouragement = `
    <section class="encouragement">
      <img src="assets/images/mint-success.gif" alt="" />
      <div>
        <h3>Удачи с проектом!</h3>
        <p>У вас всё получится. Успехов в разработке и защите!</p>
      </div>
    </section>
  `;
  elements.body.innerHTML = `
    <section class="doc-intro">
      <h3>${escapeHtml(introTitle)}</h3>
      ${introText}
    </section>
    ${parsed.sections
      .map(
        (section) => `
          <section class="doc-section${section.title === "Обязательное условие по GitHub" ? " github-warning" : ""}">
            <h3>${section.number ? `<span class="section-number">${section.number}.</span>` : ""}${escapeHtml(section.title)}</h3>
            ${renderContent(section.lines)}
          </section>
        `,
      )
      .join("")}
    ${encouragement}
  `;
}

function renderHero() {
  const course = courseInfo[state.activeCourse];
  elements.heroLabel.textContent = course.label;
  elements.heroTitle.innerHTML = course.title;
  elements.heroDescription.textContent = course.description;
  elements.badges.innerHTML = course.badges.map((badge) => `<span>${escapeHtml(badge)}</span>`).join("");
}

function renderTabs() {
  const modules = courseInfo[state.activeCourse].modules;
  elements.tabNavigation.setAttribute("aria-label", `Материалы: ${courseInfo[state.activeCourse].label}`);
  elements.tabNavigation.innerHTML = Object.entries(modules)
    .map(
      ([id, info]) =>
        `<button class="module-tab${id === state.activeTab ? " active" : ""}" type="button" role="tab" data-tab="${id}" aria-selected="${id === state.activeTab}" aria-controls="documentBody">${escapeHtml(info.label)}</button>`,
    )
    .join("");
  elements.tabNavigation.querySelectorAll(".module-tab").forEach((button) => {
    button.addEventListener("click", () => setActiveTab(button.dataset.tab));
  });
}

function setActiveTab(tab, updateHash = true) {
  state.activeTab = tab;
  elements.tabNavigation.querySelectorAll(".module-tab").forEach((button) => {
    const selected = button.dataset.tab === tab;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-selected", String(selected));
  });
  renderDocument(tab);
  closeMenu();
  if (updateHash) {
    history.replaceState(null, "", `#${state.activeCourse}/${tab}`);
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setActiveCourse(course, requestedTab, updateHash = true) {
  state.activeCourse = course;
  const modules = courseInfo[course].modules;
  state.activeTab = Object.hasOwn(modules, requestedTab) ? requestedTab : Object.keys(modules)[0];
  elements.courseButtons.forEach((button) => {
    const selected = button.dataset.course === course;
    button.classList.toggle("active", selected);
    if (selected) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
  renderHero();
  renderTabs();
  renderDocument(state.activeTab);
  closeMenu();
  if (updateHash) {
    history.replaceState(null, "", `#${state.activeCourse}/${state.activeTab}`);
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("docs-theme", theme);
  const isDark = theme === "dark";
  elements.themeLabel.textContent = isDark ? "Светлая тема" : "Тёмная тема";
  elements.themeToggle.setAttribute("aria-label", isDark ? "Включить светлую тему" : "Включить тёмную тему");
}

function closeMenu() {
  elements.sidebar.classList.remove("open");
  elements.backdrop.classList.remove("open");
  elements.menuButton.setAttribute("aria-expanded", "false");
}

function attachEvents() {
  elements.courseButtons.forEach((button) => {
    button.addEventListener("click", () => setActiveCourse(button.dataset.course));
  });

  elements.themeToggle.addEventListener("click", () => {
    updateTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });

  elements.menuButton.addEventListener("click", () => {
    const expanded = elements.sidebar.classList.toggle("open");
    elements.backdrop.classList.toggle("open", expanded);
    elements.menuButton.setAttribute("aria-expanded", String(expanded));
  });
  elements.backdrop.addEventListener("click", closeMenu);

  elements.toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const amount = scrollable ? (window.scrollY / scrollable) * 100 : 0;
    elements.progress.style.width = `${amount}%`;
    elements.toTop.classList.toggle("visible", window.scrollY > 450);
  });
}

function init() {
  const preferredTheme =
    localStorage.getItem("docs-theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  updateTheme(preferredTheme);
  attachEvents();

  const course2Documents = splitDocument(window.DOCUMENT_TEXT);
  state.documents["course-2"] = {
    web: addProjectDetails("course-2", "web", course2Documents.web),
    design: addProjectDetails("course-2", "design", course2Documents.design),
    resources: course2Documents.resources,
  };
  state.documents["course-3-apps"] = {
    marketplace: addProjectDetails("course-3-apps", "marketplace", course2Documents.mobile),
    messenger: addProjectDetails("course-3-apps", "messenger", window.COURSE_3_CONTENT.messenger),
    finance: addProjectDetails("course-3-apps", "finance", window.COURSE_3_CONTENT.finance),
    video: addProjectDetails("course-3-apps", "video", window.COURSE_3_CONTENT.video),
  };
  state.documents["course-3-games"] = {
    tank: addProjectDetails("course-3-games", "tank", window.COURSE_3_CONTENT.tank),
    train: addProjectDetails("course-3-games", "train", window.COURSE_3_CONTENT.train),
  };
  const hashParts = window.location.hash.slice(1).split("/");
  const requestedCourse = Object.hasOwn(courseInfo, hashParts[0]) ? hashParts[0] : state.activeCourse;
  const legacyTab = Object.hasOwn(courseInfo["course-2"].modules, hashParts[0]) ? hashParts[0] : undefined;
  const requestedTab = hashParts.length === 2 ? hashParts[1] : legacyTab;
  setActiveCourse(requestedCourse, requestedTab, false);
}

init();
