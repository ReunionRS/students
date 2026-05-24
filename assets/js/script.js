const tabInfo = {
  web: {
    title: "Разработка веб-приложения",
    description: "React + Vite для frontend, Node.js + Express для API и PostgreSQL с Prisma для хранения данных.",
    label: "Web-приложение",
  },
  mobile: {
    title: "Разработка Android-приложения",
    description: "Flutter-клиент общего REST API: приложение показывает те же данные, что и сайт.",
    label: "Android-приложение",
  },
  design: {
    title: "Интерфейс и дизайн приложений",
    description: "Единые визуальные правила для React-сайта и Flutter-приложения: темы, цвета и UI-компоненты.",
    label: "Интерфейс и дизайн",
  },
  resources: {
    title: "Полезные источники",
    description: "Документация технологий, ИИ-инструменты и информация о том, где попросить помощь.",
    label: "Источники и помощь",
  },
};

const elements = {
  body: document.getElementById("documentBody"),
  header: document.getElementById("documentHeader"),
  tabs: document.querySelectorAll(".tab-button"),
  progress: document.getElementById("readingProgress"),
  themeToggle: document.getElementById("themeToggle"),
  themeLabel: document.getElementById("themeLabel"),
  toTop: document.getElementById("toTop"),
  menuButton: document.getElementById("menuButton"),
  sidebar: document.getElementById("sidebar"),
  backdrop: document.getElementById("backdrop"),
};

const state = {
  activeTab: "web",
  documents: {},
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

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function splitDocument(source) {
  const mobileMarker = "ТЗ на разработку Flutter Android-приложения";
  const webMarker = "Техническое задание для студентов";
  const resourcesMarker = "Полезные источники и поддержка";
  const mobileStart = source.indexOf(mobileMarker);
  const webStart = source.indexOf(webMarker);
  const resourcesStart = source.indexOf(resourcesMarker);

  if (mobileStart < 0 || webStart < 0 || resourcesStart < 0) {
    throw new Error("Не найдены заголовки разделов в исходном TXT.");
  }

  return {
    design: source.slice(0, mobileStart).trim(),
    mobile: source.slice(mobileStart, webStart).trim(),
    web: source.slice(webStart, resourcesStart).trim(),
    resources: source.slice(resourcesStart).trim(),
  };
}

function renderHeader(tab) {
  const info = tabInfo[tab];
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
    const heading = line.trim().match(/^(\d+)\.\s+(.+)$/);
    if (heading) {
      currentSection = { number: heading[1], title: heading[2], lines: [] };
      sections.push(currentSection);
    } else if (currentSection) {
      currentSection.lines.push(line);
    } else if (line.trim()) {
      intro.push(line.trim());
    }
  });

  return { intro, sections };
}

function nextMeaningfulLine(lines, index) {
  return lines.slice(index + 1).find((line) => line.trim())?.trim() || "";
}

function renderList(items) {
  return `<ul class="doc-list">${items.map((item) => `<li>${escapeHtml(item.replace(/;$/, ""))}</li>`).join("")}</ul>`;
}

function renderContent(lines) {
  const output = [];
  let index = 0;

  while (index < lines.length) {
    const rawLine = lines[index];
    const line = rawLine.trim();

    if (!line) {
      index += 1;
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
    if (subNumber || subheadings.has(line) || (line.length <= 35 && nextMeaningfulLine(lines, index).endsWith(":"))) {
      output.push(`<h4>${escapeHtml(subNumber ? subNumber[1] : line)}</h4>`);
      index += 1;
      continue;
    }

    if (line.endsWith(":")) {
      output.push(`<p class="block-label">${escapeHtml(line)}</p>`);
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

    output.push(`<p>${escapeHtml(line)}</p>`);
    index += 1;
  }

  return output.join("");
}

function renderDocument(tab) {
  const text = state.documents[tab];
  const parsed = parseSections(text);
  renderHeader(tab);
  const introTitle = parsed.intro[0] || tabInfo[tab].title;
  const introText = parsed.intro.slice(1).map((line) => `<p>${escapeHtml(line)}</p>`).join("");
  const encouragement =
    tab === "resources"
      ? `
        <section class="encouragement">
          <img src="assets/images/mint-success.gif" alt="" />
          <div>
            <h3>У вас всё получится!</h3>
            <p>Удачи в разработке и защите проекта!</p>
          </div>
        </section>
      `
      : "";
  elements.body.innerHTML = `
    <section class="doc-intro">
      <h3>${escapeHtml(introTitle)}</h3>
      ${introText}
    </section>
    ${parsed.sections
      .map(
        (section) => `
          <section class="doc-section">
            <h3><span class="section-number">${section.number}.</span>${escapeHtml(section.title)}</h3>
            ${renderContent(section.lines)}
          </section>
        `,
      )
      .join("")}
    ${encouragement}
  `;
}

function setActiveTab(tab, updateHash = true) {
  state.activeTab = tab;
  elements.tabs.forEach((button) => {
    const selected = button.dataset.tab === tab;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-selected", String(selected));
  });
  renderDocument(tab);
  closeMenu();
  if (updateHash) {
    history.replaceState(null, "", `#${tab}`);
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
  elements.tabs.forEach((button) => {
    button.addEventListener("click", () => setActiveTab(button.dataset.tab));
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

  const parts = splitDocument(window.DOCUMENT_TEXT);
  Object.entries(parts).forEach(([key, value]) => {
    state.documents[key] = value;
  });
  const requestedTab = window.location.hash.slice(1);
  if (Object.hasOwn(tabInfo, requestedTab)) {
    setActiveTab(requestedTab, false);
  } else {
    renderDocument(state.activeTab);
  }
}

init();
