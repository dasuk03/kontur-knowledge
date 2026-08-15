"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  allArticles,
  LATEST_UPDATE,
  quickSearches,
  sourceById,
  sources,
  stages,
} from "./knowledge";
import {
  buildSearchEntries,
  defaultSearchFilters,
  equipmentFacets,
  hasActiveFilters,
  knowledgeTopics,
  parseSearchQuery,
  searchKnowledge,
  type SearchFilters,
} from "./search-engine";
import {
  diagnosticGuides,
  equipmentProfiles,
  experienceOptions,
  goalOptions,
  practiceScenarios,
  qualificationLabel,
  roleOptions,
  type LearnerProfile,
} from "./learning";

type ArticleViewMode = "minute" | "study" | "field";

const STORAGE_KEY = "kontur-learning-v1";

const defaultProfile: LearnerProfile = {
  name: "",
  role: "electrician",
  experience: "new",
  goal: "adaptation",
};

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="6.75" />
      <path d="m16.1 16.1 4 4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m5 12.5 4.2 4.2L19 7" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M7 3h7l4 4v14H7zM14 3v5h4M10 12h5M10 16h5" />
    </svg>
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function wordForm(
  count: number,
  one: string,
  few: string,
  many: string,
) {
  const lastTwo = count % 100;
  const last = count % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return many;
  if (last === 1) return one;
  if (last >= 2 && last <= 4) return few;
  return many;
}

function Highlight({ text, query }: { text: string; query: string }) {
  const terms = parseSearchQuery(query).tokens
    .filter((term) => term.length > 1)
    .sort((left, right) => right.length - left.length);

  if (!terms.length) return <>{text}</>;

  const expression = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "giu");
  const parts = text.split(expression);

  return (
    <>
      {parts.map((part, index) =>
        terms.some(
          (term) => part.toLocaleLowerCase("ru-RU") === term.toLocaleLowerCase("ru-RU"),
        ) ? (
          <mark key={`${part}-${index}`}>{part}</mark>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </>
  );
}

function SelectField({
  label,
  value,
  onChange,
  children,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <label className={`search-filter${disabled ? " is-disabled" : ""}`}>
      <span>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
      >
        {children}
      </select>
    </label>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>(defaultSearchFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null,
  );
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [draftProfile, setDraftProfile] = useState<LearnerProfile>(defaultProfile);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [completedArticles, setCompletedArticles] = useState<string[]>([]);
  const [articleViewMode, setArticleViewMode] = useState<ArticleViewMode>("study");
  const [fieldMode, setFieldMode] = useState(false);
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, number>>({});
  const [activeScenario, setActiveScenario] = useState(practiceScenarios[0].id);
  const [mentorNotes, setMentorNotes] = useState("");
  const [streak, setStreak] = useState(1);
  const [storageReady, setStorageReady] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedSection =
    stages.find((stage) => stage.id === selectedSectionId) ?? null;

  const searchEntries = useMemo(
    () => buildSearchEntries(allArticles, sources, sourceById),
    [],
  );
  const searchActive = Boolean(query.trim()) || hasActiveFilters(filters);
  const searchResults = useMemo(() => {
    if (!searchActive) return [];
    return searchKnowledge(searchEntries, query, filters);
  }, [filters, query, searchActive, searchEntries]);
  const resultBreakdown = useMemo(
    () => ({
      articles: searchResults.filter((result) => result.entry.kind === "article")
        .length,
      sources: searchResults.filter((result) => result.entry.kind === "source")
        .length,
    }),
    [searchResults],
  );
  const activeFilterCount = Object.entries(filters).filter(([key, value]) => {
    if (key === "sort") return value !== "relevance";
    if (key === "safetyOnly") return value === true;
    return value !== "all";
  }).length;

  const role = roleOptions.find((option) => option.id === profile?.role) ?? roleOptions[0];
  const goal = goalOptions.find((option) => option.id === profile?.goal) ?? goalOptions[0];
  const experience = experienceOptions.find((option) => option.id === profile?.experience) ?? experienceOptions[0];
  const prioritizedStageIds = [...new Set([...goal.preferredStages, ...role.stageIds])];
  const personalizedArticles = prioritizedStageIds
    .flatMap((stageId) => stages.find((stage) => stage.id === stageId)?.articles.slice(0, experience.articleLimit) ?? [])
    .slice(0, 24);
  const completedSet = new Set(completedArticles);
  const personalizedCompleted = personalizedArticles.filter((article) => completedSet.has(article.id)).length;
  const progress = personalizedArticles.length
    ? Math.round((personalizedCompleted / personalizedArticles.length) * 100)
    : 0;
  const routeMinutes = personalizedArticles.reduce((sum, article) => sum + article.readTime, 0);
  const nextArticle = personalizedArticles.find((article) => !completedSet.has(article.id));
  const nextArticleStage = nextArticle
    ? stages.find((stage) => stage.articles.some((article) => article.id === nextArticle.id))
    : null;
  const scenarioScore = practiceScenarios.filter(
    (scenario) => scenarioAnswers[scenario.id] === scenario.correct,
  ).length;
  const activePracticeScenario =
    practiceScenarios.find((scenario) => scenario.id === activeScenario) ?? practiceScenarios[0];
  const activeDiagnostic = diagnosticGuides.find((guide) => {
    const normalizedQuery = query.toLocaleLowerCase("ru-RU");
    return guide.keywords.some((keyword) => normalizedQuery.includes(keyword));
  });

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const state = JSON.parse(saved) as {
            profile?: LearnerProfile;
            completedArticles?: string[];
            scenarioAnswers?: Record<string, number>;
            mentorNotes?: string;
            streak?: number;
            lastVisit?: string;
            fieldMode?: boolean;
          };
          setProfile(state.profile ?? null);
          setDraftProfile(state.profile ?? defaultProfile);
          setCompletedArticles(state.completedArticles ?? []);
          setScenarioAnswers(state.scenarioAnswers ?? {});
          setMentorNotes(state.mentorNotes ?? "");
          setFieldMode(state.fieldMode ?? false);

          const today = new Date().toISOString().slice(0, 10);
          const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
          setStreak(
            state.lastVisit === yesterday
              ? (state.streak ?? 0) + 1
              : state.lastVisit === today
                ? state.streak ?? 1
                : 1,
          );
        } else {
          setOnboardingOpen(true);
        }
      } catch {
        setOnboardingOpen(true);
      } finally {
        setStorageReady(true);
      }
    });

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch(() => undefined);
    }
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        profile,
        completedArticles,
        scenarioAnswers,
        mentorNotes,
        streak,
        fieldMode,
        lastVisit: new Date().toISOString().slice(0, 10),
      }),
    );
  }, [completedArticles, fieldMode, mentorNotes, profile, scenarioAnswers, storageReady, streak]);

  const saveProfile = () => {
    setProfile(draftProfile);
    setOnboardingOpen(false);
    window.requestAnimationFrame(() => {
      document.getElementById("my-route")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const toggleArticleComplete = (articleId: string) => {
    setCompletedArticles((current) =>
      current.includes(articleId)
        ? current.filter((id) => id !== articleId)
        : [...current, articleId],
    );
  };

  const openPersonalizedNext = () => {
    if (nextArticle && nextArticleStage) openSection(nextArticleStage.id, nextArticle.id);
    else setOnboardingOpen(true);
  };

  const exportMentorReport = () => {
    const report = {
      generatedAt: new Date().toLocaleString("ru-RU"),
      learner: profile,
      route: role.label,
      goal: goal.label,
      progress,
      completed: personalizedCompleted,
      total: personalizedArticles.length,
      practice: `${scenarioScore}/${practiceScenarios.length}`,
      completedArticleIds: completedArticles,
      mentorNotes,
      disclaimer: "Отчёт не подтверждает допуск к работам и не заменяет установленную проверку знаний.",
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `kontur-progress-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const updateFilter = <Key extends keyof SearchFilters>(
    key: Key,
    value: SearchFilters[Key],
  ) => {
    setVisibleCount(8);
    setFilters((current) => {
      const next = { ...current, [key]: value };

      if (key === "kind" && value === "source") {
        next.stageId = "all";
        next.level = "all";
        next.safetyOnly = false;
      }
      if (key === "kind" && value === "article") next.sourceKind = "all";

      return next;
    });
  };

  const updateQuery = (value: string) => {
    setQuery(value);
    setVisibleCount(8);
  };

  const clearSearch = () => {
    setQuery("");
    setFilters(defaultSearchFilters);
    setVisibleCount(8);
  };

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedSectionId) {
          setSelectedSectionId(null);
          setExpandedArticle(null);
        } else if (query || hasActiveFilters(filters)) {
          clearSearch();
        }
      }

      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT";
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (event.key === "/" && !isTyping) {
        event.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [filters, query, selectedSectionId]);

  useEffect(() => {
    if (!selectedSection) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedSection]);

  useEffect(() => {
    if (!selectedSection || !expandedArticle) return;

    const frame = window.requestAnimationFrame(() => {
      document
        .querySelector(`[data-article-id="${expandedArticle}"]`)
        ?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [expandedArticle, selectedSection]);

  const openSection = (sectionId: string, articleId?: string) => {
    setSelectedSectionId(sectionId);
    setExpandedArticle(articleId ?? null);
    setArticleViewMode(fieldMode ? "field" : "study");
  };

  const closeSection = () => {
    setSelectedSectionId(null);
    setExpandedArticle(null);
  };

  const openSource = (sourceId: string) => {
    document.getElementById(`source-${sourceId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const searchByTopic = (topicId: string) => {
    updateQuery("");
    setFilters({ ...defaultSearchFilters, topicId });
    setFiltersOpen(true);
    window.requestAnimationFrame(() => {
      searchInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      searchInputRef.current?.focus();
    });
  };

  return (
    <main className={`site-shell${fieldMode ? " is-field-mode" : ""}`}>
      <header className="topbar">
        <a className="brand" href="#" aria-label="КОНТУР — на главную">
          <span className="brand__accent" />
          <span className="brand__name">КОНТУР</span>
          <span className="brand__descriptor">База знаний</span>
        </a>

        <nav className="topbar__nav" aria-label="Основная навигация">
          <a href="#my-route">Мой путь</a>
          <a href="#practice">Практика</a>
          <a href="#equipment">Оборудование</a>
          <a href="#sources">Источники</a>
          <button
            type="button"
            className={`topbar__field${fieldMode ? " is-active" : ""}`}
            onClick={() => setFieldMode((current) => !current)}
            aria-pressed={fieldMode}
          >
            {fieldMode ? "Обычный режим" : "Режим на объекте"}
          </button>
          <button
            type="button"
            className="topbar__progress"
            onClick={() => document.getElementById("my-route")?.scrollIntoView({ behavior: "smooth" })}
          >
            {progress}%
          </button>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="eyebrow">
            <span className="eyebrow__dot" />
            База знаний специалиста учёта
          </p>

          <h1 id="hero-title">
            С первого
            <br />
            рабочего дня
            <span>до квалифицированного работника.</span>
          </h1>

          <p className="hero__lead">
            Последовательный маршрут по электробезопасности, приборам учёта,
            полевой диагностике, АСКУЭ и ИСУЭ — с алгоритмами, ошибками,
            самопроверкой и источниками.
          </p>

          <div className="hero__stats" aria-label="Состав базы знаний">
            <div>
              <strong>{stages.length}</strong>
              <span>этапов развития</span>
            </div>
            <div>
              <strong>{allArticles.length}</strong>
              <span>полных материалов</span>
            </div>
            <div>
              <strong>{sources.length}</strong>
              <span>проверенных источников</span>
            </div>
          </div>

          <button className="hero__action" type="button" onClick={profile ? openPersonalizedNext : () => setOnboardingOpen(true)}>
            {profile ? "Продолжить мой маршрут" : "Настроить мой маршрут"}
            <span>
              <ArrowIcon />
            </span>
          </button>
        </div>

        <div
          className={`search-console${searchActive ? " is-active" : ""}`}
          aria-label="Расширенный поиск по базе знаний"
        >
          <div className="search-console__heading">
            <div>
              <p>Статьи + документы</p>
              <h2>
                Найти
                <span>ответ</span>
              </h2>
            </div>
            <span className="search-console__range">
              {allArticles.length + sources.length}
            </span>
          </div>

          <label className="search-field">
            <span className="search-field__icon">
              <SearchIcon />
            </span>
            <span className="sr-only">Поисковый запрос</span>
            <input
              ref={searchInputRef}
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              placeholder="Вопрос, симптом, прибор или пункт правил..."
              autoComplete="off"
              spellCheck="false"
            />
            {query.trim() ? (
              <button
                type="button"
                onClick={() => updateQuery("")}
                className="search-field__clear"
                aria-label="Очистить поиск"
              >
                <CloseIcon />
              </button>
            ) : (
              <kbd>Ctrl K</kbd>
            )}
          </label>

          <div className="search-toolbar">
            <button
              type="button"
              className={filtersOpen ? "is-active" : ""}
              onClick={() => setFiltersOpen((current) => !current)}
              aria-expanded={filtersOpen}
            >
              <FilterIcon />
              Фильтры
              {activeFilterCount > 0 && <strong>{activeFilterCount}</strong>}
            </button>
            <button
              type="button"
              onClick={clearSearch}
              disabled={!searchActive}
            >
              Сбросить
            </button>
          </div>

          {filtersOpen && (
            <div className="search-filters" aria-label="Фильтры поиска">
              <div className="search-filters__grid">
                <SelectField
                  label="Что искать"
                  value={filters.kind}
                  onChange={(value) =>
                    updateFilter("kind", value as SearchFilters["kind"])
                  }
                >
                  <option value="all">Статьи и документы</option>
                  <option value="article">Только статьи</option>
                  <option value="source">Только документы</option>
                </SelectField>

                <SelectField
                  label="Тема"
                  value={filters.topicId}
                  onChange={(value) => updateFilter("topicId", value)}
                >
                  <option value="all">Все темы</option>
                  {knowledgeTopics.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.label}
                    </option>
                  ))}
                </SelectField>

                <SelectField
                  label="Оборудование / система"
                  value={filters.equipmentId}
                  onChange={(value) => updateFilter("equipmentId", value)}
                >
                  <option value="all">Любое оборудование</option>
                  {equipmentFacets.map((equipment) => (
                    <option key={equipment.id} value={equipment.id}>
                      {equipment.label}
                    </option>
                  ))}
                </SelectField>

                <SelectField
                  label="Этап маршрута"
                  value={filters.stageId}
                  onChange={(value) => updateFilter("stageId", value)}
                  disabled={filters.kind === "source"}
                >
                  <option value="all">Все этапы</option>
                  {stages.map((stage) => (
                    <option key={stage.id} value={stage.id}>
                      {stage.code}. {stage.shortTitle}
                    </option>
                  ))}
                </SelectField>

                <SelectField
                  label="Уровень"
                  value={filters.level}
                  onChange={(value) => updateFilter("level", value)}
                  disabled={filters.kind === "source"}
                >
                  <option value="all">Все уровни</option>
                  <option value="Старт">Старт</option>
                  <option value="База">База</option>
                  <option value="Практика">Практика</option>
                  <option value="Уверенная работа">Уверенная работа</option>
                </SelectField>

                <SelectField
                  label="Тип документа"
                  value={filters.sourceKind}
                  onChange={(value) => updateFilter("sourceKind", value)}
                  disabled={filters.kind === "article"}
                >
                  <option value="all">Все типы</option>
                  <option value="НПА">Нормативный акт</option>
                  <option value="ГОСТ">ГОСТ</option>
                  <option value="Стандарт">Стандарт организации</option>
                  <option value="Документация">Техническая документация</option>
                </SelectField>

                <SelectField
                  label="Актуальность"
                  value={filters.freshness}
                  onChange={(value) =>
                    updateFilter(
                      "freshness",
                      value as SearchFilters["freshness"],
                    )
                  }
                >
                  <option value="all">Любая дата проверки</option>
                  <option value="current">Проверено за 180 дней</option>
                  <option value="review">Требует перепроверки</option>
                </SelectField>

                <SelectField
                  label="Сортировка"
                  value={filters.sort}
                  onChange={(value) =>
                    updateFilter("sort", value as SearchFilters["sort"])
                  }
                >
                  <option value="relevance">По релевантности</option>
                  <option value="route">По этапам маршрута</option>
                  <option value="updated">Сначала обновлённые</option>
                  <option value="reading">Сначала короткие</option>
                </SelectField>

                <label
                  className={`search-safety-toggle${
                    filters.kind === "source" ? " is-disabled" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={filters.safetyOnly}
                    disabled={filters.kind === "source"}
                    onChange={(event) =>
                      updateFilter("safetyOnly", event.target.checked)
                    }
                  />
                  <span>
                    <CheckIcon />
                  </span>
                  Только материалы с блоком безопасности
                </label>
              </div>
            </div>
          )}

          <div className="search-stage">
            {!searchActive ? (
              <>
                <div className="search-stage__intro">
                  <p>Введите запрос или начните с готовой формулировки</p>
                  <span>01 → 10</span>
                </div>
                <div className="quick-searches">
                  {quickSearches.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => updateQuery(item)}
                    >
                      <SearchIcon />
                      {item}
                    </button>
                  ))}
                </div>
                <div className="search-shortcuts">
                  <button type="button" onClick={() => openSection(stages[0].id)}>
                    <span>01</span>
                    <div>
                      <strong>Начать по маршруту</strong>
                      <small>Первый рабочий день</small>
                    </div>
                    <ArrowIcon />
                  </button>
                  <details>
                    <summary>Как искать точнее</summary>
                    <p>
                      Возьмите точную фразу в кавычки: «проверка отсутствия
                      напряжения». Исключите слово знаком минус: реле -НАРТИС.
                      Сокращения ПУ, ТТ, КТП, ИСУЭ и АСКУЭ распознаются
                      автоматически.
                    </p>
                  </details>
                </div>
              </>
            ) : (
              <div className="search-results" aria-live="polite">
                <div className="search-results__top">
                  <div>
                    <span>Найдено</span>
                    <strong>{searchResults.length}</strong>
                  </div>
                  <span className="search-results__filter">
                    {resultBreakdown.articles}{" "}
                    {wordForm(resultBreakdown.articles, "статья", "статьи", "статей")}{" "}
                    · {resultBreakdown.sources}{" "}
                    {wordForm(
                      resultBreakdown.sources,
                      "документ",
                      "документа",
                      "документов",
                    )}
                  </span>
                </div>

                {activeDiagnostic && (
                  <article className="diagnostic-answer">
                    <div className="diagnostic-answer__head">
                      <span>Диагностический маршрут</span>
                      <strong>{activeDiagnostic.title}</strong>
                    </div>
                    <div className="diagnostic-answer__grid">
                      <div>
                        <small>Возможные причины</small>
                        <ul>{activeDiagnostic.causes.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
                      </div>
                      <div>
                        <small>Проверить сначала</small>
                        <ol>{activeDiagnostic.checks.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ol>
                      </div>
                    </div>
                    <p><strong>Стоп:</strong> {activeDiagnostic.stop}</p>
                  </article>
                )}

                <div className="search-results__list">
                  {searchResults.length > 0 ? (
                    searchResults.slice(0, visibleCount).map((result) => {
                      const { entry } = result;
                      const resultContent = (
                        <>
                          <span
                            className={`result-code result-code--${entry.kind}`}
                            style={
                              entry.stage
                                ? ({
                                    "--result-bg": entry.stage.color,
                                    "--result-ink": entry.stage.ink,
                                  } as CSSProperties)
                                : undefined
                            }
                          >
                            {entry.stage ? entry.stage.code : <DocumentIcon />}
                          </span>
                          <span className="result-copy">
                            <span className="result-copy__type">
                              {entry.kind === "article"
                                ? `${entry.stage?.shortTitle} · ${entry.level} · ${entry.readTime} мин`
                                : `${entry.sourceKind} · ${entry.source?.organization}`}
                            </span>
                            <strong>
                              <Highlight text={entry.title} query={query} />
                            </strong>
                            <small>
                              <em>{result.snippetLabel}</em>
                              <Highlight text={result.snippet} query={query} />
                            </small>
                            {result.matchedFields.length > 0 && (
                              <span className="result-copy__matches">
                                Совпадение: {result.matchedFields.join(", ")}
                              </span>
                            )}
                          </span>
                          <span className="result-arrow">
                            <ArrowIcon />
                          </span>
                        </>
                      );

                      if (entry.article && entry.stage) return (
                        <button
                          type="button"
                          className="search-result-card"
                          key={entry.id}
                          onClick={() =>
                            openSection(entry.stage!.id, entry.article!.id)
                          }
                        >
                          {resultContent}
                        </button>
                      );

                      if (entry.source?.url) return (
                        <a
                          className="search-result-card"
                          key={entry.id}
                          href={entry.source?.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {resultContent}
                        </a>
                      );

                      return (
                        <button
                          type="button"
                          className="search-result-card"
                          key={entry.id}
                          onClick={() => entry.source && openSource(entry.source.id)}
                        >
                          {resultContent}
                        </button>
                      );
                    })
                  ) : (
                    <div className="search-empty">
                      <span>0</span>
                      <p>
                        Совпадений нет. Попробуйте название прибора, симптом,
                        сокращение или рабочую операцию.
                      </p>
                      <button type="button" onClick={clearSearch}>
                        Сбросить запрос и фильтры
                      </button>
                    </div>
                  )}
                  {searchResults.length > visibleCount && (
                    <button
                      type="button"
                      className="search-results__more"
                      onClick={() => setVisibleCount((count) => count + 12)}
                    >
                      Показать ещё {Math.min(12, searchResults.length - visibleCount)}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="search-console__footer">
            <span>Полный текст · неточные совпадения · сокращения</span>
            <span>Обновлено {LATEST_UPDATE}</span>
          </div>
        </div>
      </section>

      <section className="learning-hub" id="my-route" aria-labelledby="learning-title">
        <div className="learning-hub__main">
          <div className="learning-hub__eyebrow">
            <span>Персональная траектория</span>
            <button type="button" onClick={() => {
              setDraftProfile(profile ?? defaultProfile);
              setOnboardingOpen(true);
            }}>
              {profile ? "Изменить профиль" : "Настроить"}
            </button>
          </div>
          <div className="learning-hub__heading">
            <div>
              <p>{profile ? `${role.label} · ${goal.label}` : "Маршрут ещё не настроен"}</p>
              <h2 id="learning-title">
                {profile?.name ? `${profile.name}, ваш следующий шаг` : "Ваш следующий шаг"}
              </h2>
            </div>
            <div className="progress-ring" style={{ "--progress": `${progress * 3.6}deg` } as CSSProperties}>
              <span><strong>{progress}%</strong><small>маршрута</small></span>
            </div>
          </div>

          <div className="learning-next">
            <span className="learning-next__code">{nextArticleStage?.code ?? "✓"}</span>
            <div>
              <small>{nextArticleStage?.shortTitle ?? "Маршрут завершён"}</small>
              <strong>{nextArticle?.title ?? "Все материалы персонального маршрута пройдены"}</strong>
              <p>{nextArticle?.summary ?? "Можно повторить практические кейсы или сформировать отчёт для наставника."}</p>
            </div>
            <button type="button" onClick={openPersonalizedNext}>
              {nextArticle ? "Продолжить" : "Настроить новый путь"}
              <ArrowIcon />
            </button>
          </div>

          <div className="learning-route-strip" aria-label="Персональные этапы">
            {prioritizedStageIds.slice(0, 7).map((stageId) => {
              const stage = stages.find((item) => item.id === stageId);
              if (!stage) return null;
              const routeStageArticles = personalizedArticles.filter((article) =>
                stage.articles.some((candidate) => candidate.id === article.id),
              );
              const done = routeStageArticles.filter((article) => completedSet.has(article.id)).length;
              return (
                <button type="button" key={stage.id} onClick={() => openSection(stage.id)}>
                  <span className={done === routeStageArticles.length && done > 0 ? "is-done" : ""}>{done === routeStageArticles.length && done > 0 ? <CheckIcon /> : stage.code}</span>
                  <strong>{stage.shortTitle}</strong>
                  <small>{done}/{routeStageArticles.length}</small>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="learning-hub__stats" aria-label="Прогресс обучения">
          <div>
            <small>Текущий уровень</small>
            <strong>{qualificationLabel(progress)}</strong>
          </div>
          <div className="learning-stat-grid">
            <span><strong>{personalizedCompleted}</strong><small>из {personalizedArticles.length} тем</small></span>
            <span><strong>{Math.max(1, Math.ceil(routeMinutes / 60))} ч</strong><small>весь маршрут</small></span>
            <span><strong>{streak}</strong><small>{wordForm(streak, "день", "дня", "дней")} подряд</small></span>
            <span><strong>{scenarioScore}/{practiceScenarios.length}</strong><small>кейсов решено</small></span>
          </div>
          <p>Прогресс хранится только на этом устройстве и не подтверждает допуск к работам.</p>
        </aside>
      </section>

      <section className="sections" id="route" aria-labelledby="sections-title">
        <div className="section-heading">
          <div>
            <p>Профессиональная траектория</p>
            <h2 id="sections-title">10 этапов квалификации</h2>
          </div>
          <span>ОТ АДАПТАЦИИ К СИСТЕМНОЙ РАБОТЕ</span>
        </div>

        <div className="route-line" aria-label="Этапы маршрута">
          {stages.map((section) => (
            <button
              type="button"
              key={section.id}
              onClick={() => openSection(section.id)}
              aria-label={`Открыть этап ${section.code}: ${section.title}`}
            >
              <span>{section.code}</span>
              <small>{section.shortTitle}</small>
            </button>
          ))}
        </div>

        <div className="section-grid">
          {stages.map((section) => (
            <button
              type="button"
              key={section.id}
              className="section-card"
              style={
                {
                  "--card-bg": section.color,
                  "--card-ink": section.ink,
                } as CSSProperties
              }
              onClick={() => openSection(section.id)}
              aria-label={`Открыть этап «${section.title}»`}
            >
              <span className="section-card__top">
                <span className="section-card__stage">
                  Этап {section.code}
                </span>
                <span className="section-card__arrow">
                  <ArrowIcon />
                </span>
              </span>

              <span className="section-card__body">
                <span className="section-card__period">
                  {section.timeframe}
                </span>
                <strong>{section.title}</strong>
                <span className="section-card__description">
                  {section.description}
                </span>
              </span>

              <span className="section-card__count">
                <strong>{section.articles.length}</strong>
                <small>материалов</small>
              </span>
              <span className="section-card__progress" aria-label={`Пройдено ${section.articles.filter((article) => completedSet.has(article.id)).length} из ${section.articles.length}`}>
                <i style={{ width: `${Math.round((section.articles.filter((article) => completedSet.has(article.id)).length / section.articles.length) * 100)}%` }} />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="practice-lab" id="practice" aria-labelledby="practice-title">
        <div className="section-heading section-heading--light">
          <div>
            <p>Тренажёр решений</p>
            <h2 id="practice-title">Практика без риска</h2>
          </div>
          <span>{scenarioScore} ИЗ {practiceScenarios.length} РЕШЕНО ВЕРНО</span>
        </div>

        <div className="practice-layout">
          <div className="scenario-list" role="tablist" aria-label="Рабочие ситуации">
            {practiceScenarios.map((scenario) => {
              const answered = scenarioAnswers[scenario.id];
              const isCorrect = answered === scenario.correct;
              return (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activePracticeScenario.id === scenario.id}
                  className={activePracticeScenario.id === scenario.id ? "is-active" : ""}
                  key={scenario.id}
                  onClick={() => setActiveScenario(scenario.id)}
                >
                  <span>{scenario.code}</span>
                  <strong>{scenario.title}</strong>
                  <small>{answered === undefined ? "Не решён" : isCorrect ? "Верно" : "Повторить"}</small>
                </button>
              );
            })}
          </div>

          <article className="scenario-card">
            <div className="scenario-card__top">
              <span>{activePracticeScenario.code}</span>
              <button type="button" onClick={() => openSection(activePracticeScenario.stageId)}>Открыть теорию ↗</button>
            </div>
            <h3>{activePracticeScenario.title}</h3>
            <p className="scenario-card__situation">{activePracticeScenario.situation}</p>
            <strong className="scenario-card__question">{activePracticeScenario.question}</strong>
            <div className="scenario-choices">
              {activePracticeScenario.choices.map((choice, index) => {
                const selected = scenarioAnswers[activePracticeScenario.id];
                const answered = selected !== undefined;
                const className = answered
                  ? index === activePracticeScenario.correct
                    ? "is-correct"
                    : index === selected
                      ? "is-wrong"
                      : ""
                  : "";
                return (
                  <button
                    type="button"
                    className={className}
                    key={choice}
                    onClick={() => setScenarioAnswers((current) => ({ ...current, [activePracticeScenario.id]: index }))}
                  >
                    <span>{String.fromCharCode(65 + index)}</span>
                    {choice}
                  </button>
                );
              })}
            </div>
            {scenarioAnswers[activePracticeScenario.id] !== undefined && (
              <div className="scenario-feedback" aria-live="polite">
                <strong>{scenarioAnswers[activePracticeScenario.id] === activePracticeScenario.correct ? "Решение верное" : "Разберите логику ещё раз"}</strong>
                <p>{activePracticeScenario.explanation}</p>
                <small><b>Критерий остановки:</b> {activePracticeScenario.stopRule}</small>
              </div>
            )}
          </article>
        </div>
      </section>

      <section className="equipment-atlas" id="equipment" aria-labelledby="equipment-title">
        <div className="section-heading">
          <div>
            <p>Визуальный справочник</p>
            <h2 id="equipment-title">Атлас оборудования</h2>
          </div>
          <span>МОДЕЛЬ → КАНАЛЫ → ИНСТРУКЦИИ → ДИАГНОСТИКА</span>
        </div>
        <p className="equipment-atlas__lead">Карточка собирает все связанные материалы и документы в одну точку. Выберите модель, чтобы сразу открыть точный поиск по базе.</p>
        <div className="equipment-grid">
          {equipmentProfiles.map((equipment, index) => {
            const articleCount = searchEntries.filter((entry) => entry.kind === "article" && entry.equipmentIds.includes(equipment.id)).length;
            const sourceCount = searchEntries.filter((entry) => entry.kind === "source" && entry.equipmentIds.includes(equipment.id)).length;
            return (
              <button type="button" key={equipment.id} onClick={() => {
                updateQuery(equipment.query);
                setFiltersOpen(true);
                window.requestAnimationFrame(() => searchInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }));
              }}>
                <span className="equipment-grid__visual"><i>{String(index + 1).padStart(2, "0")}</i><b>{equipment.model.slice(0, 2).toUpperCase()}</b></span>
                <span className="equipment-grid__body">
                  <small>{equipment.type}</small>
                  <strong>{equipment.model}</strong>
                  <span>{equipment.channels.map((channel) => <em key={channel}>{channel}</em>)}</span>
                </span>
                <span className="equipment-grid__meta">
                  <small>{articleCount} статей · {sourceCount} документов</small>
                  <ArrowIcon />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="catalog" id="catalog" aria-labelledby="catalog-title">
        <div className="section-heading">
          <div>
            <p>Единая классификация</p>
            <h2 id="catalog-title">Категории базы знаний</h2>
          </div>
          <span>ОДИН ДОКУМЕНТ МОЖЕТ ОТНОСИТЬСЯ К НЕСКОЛЬКИМ ТЕМАМ</span>
        </div>

        <p className="catalog__lead">
          Новые инструкции распределяются не только по этапу обучения. Для них
          фиксируются тема, тип документа, оборудование, источник, дата и
          актуальность — поэтому материал остаётся доступным даже при большом
          объёме базы.
        </p>

        <div className="topic-grid">
          {knowledgeTopics.map((topic, index) => {
            const count = searchEntries.filter((entry) =>
              entry.topicIds.includes(topic.id),
            ).length;

            return (
              <button
                type="button"
                key={topic.id}
                onClick={() => searchByTopic(topic.id)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{topic.label}</strong>
                <small>
                  {count} {wordForm(count, "позиция", "позиции", "позиций")} в индексе
                </small>
                <i>
                  <ArrowIcon />
                </i>
              </button>
            );
          })}
        </div>

        <div className="intake-method" aria-label="Порядок добавления документов">
          <div className="intake-method__heading">
            <span>Протокол пополнения</span>
            <strong>Файл → знания</strong>
          </div>
          <ol>
            <li>
              <span>01</span>
              <div>
                <strong>Полное чтение</strong>
                <p>Документ изучается целиком, включая приложения и примечания.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Классификация</strong>
                <p>Определяются темы, тип, оборудование, версия и область применения.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>Извлечение знаний</strong>
                <p>Положения превращаются в ответы, алгоритмы, ошибки и самопроверку.</p>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <strong>Связь с источником</strong>
                <p>Указываются документ, дата проверки и границы применимости.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="source-section" id="sources">
        <div className="section-heading section-heading--sources">
          <div>
            <p>Нормативное и техническое ядро</p>
            <h2>Источники, а не пересказы</h2>
          </div>
          <span>ПОСЛЕДНЕЕ ДОБАВЛЕНИЕ: {LATEST_UPDATE}</span>
        </div>

        <p className="source-section__lead">
          Каждая статья связана с первичными документами. Перед работой и
          проверкой знаний открывайте действующую редакцию и локальные документы
          работодателя.
        </p>

        <div className="source-grid">
          {sources.map((source, index) => {
            const sourceContent = (
              <>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <small>
                    {source.kind}
                    {` · ${source.status ?? "Действует"}`}
                  </small>
                  <strong>{source.title}</strong>
                  <p>{source.organization}</p>
                  <p className="source-card__trust">Проверено {source.checked}{source.published ? ` · опубликовано ${source.published}` : ""}</p>
                  {source.fileName && (
                    <p className="source-card__meta">
                      {source.fileName} · {source.pages} стр. · {source.version} · {source.coverage}
                    </p>
                  )}
                  {source.note && <em>{source.note}</em>}
                </div>
                <i>{source.url ? <ArrowIcon /> : <DocumentIcon />}</i>
              </>
            );

            return source.url ? (
              <a
                className="source-card"
                id={`source-${source.id}`}
                key={source.id}
                href={source.url}
                target="_blank"
                rel="noreferrer"
              >
                {sourceContent}
              </a>
            ) : (
              <article
                className="source-card source-card--local"
                id={`source-${source.id}`}
                key={source.id}
              >
                {sourceContent}
              </article>
            );
          })}
        </div>
      </section>

      <section className="mentor-room" id="mentor" aria-labelledby="mentor-title">
        <div className="mentor-room__header">
          <div>
            <p>Совместно с наставником</p>
            <h2 id="mentor-title">Подтвердить понимание практикой</h2>
          </div>
          <span>ЛОКАЛЬНЫЙ ОТЧЁТ · БЕЗ ОТПРАВКИ ДАННЫХ</span>
        </div>

        <div className="mentor-grid">
          <div className="mentor-score">
            <small>Готовность по персональному маршруту</small>
            <strong>{progress}%</strong>
            <div><i style={{ width: `${progress}%` }} /></div>
            <p>{personalizedCompleted} из {personalizedArticles.length} материалов · {scenarioScore} из {practiceScenarios.length} практических кейсов</p>
          </div>

          <div className="mentor-questions">
            <small>Три вопроса после каждой темы</small>
            <ol>
              <li><span>1</span>Что необходимо запомнить и почему?</li>
              <li><span>2</span>Что сотрудник теперь способен выполнить под наблюдением?</li>
              <li><span>3</span>В какой ситуации работу необходимо остановить?</li>
            </ol>
          </div>

          <label className="mentor-notes">
            <span>Заметка наставника или план следующей практики</span>
            <textarea
              value={mentorNotes}
              onChange={(event) => setMentorNotes(event.target.value)}
              placeholder="Например: повторить схемы включения ТТ и выполнить разбор под наблюдением…"
            />
          </label>

          <div className="mentor-actions">
            <button type="button" onClick={exportMentorReport}>Скачать отчёт о прогрессе</button>
            <button type="button" onClick={() => window.print()} disabled={progress < 100}>Печать итогового листа</button>
            <p>КОНТУР фиксирует обучение, но не заменяет инструктаж, стажировку, проверку знаний, присвоение группы или допуск работодателем.</p>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <p className="about__index">КОНТУР / БАЗА ЗНАНИЙ / 2026</p>
        <div className="about__content">
          <h2>
            Опыт, который
            <span>не должен потеряться.</span>
          </h2>
          <p>
            База устроена как путь развития, а не алфавитный справочник. Каждый
            материал содержит короткий ответ, рабочий алгоритм, типовые ошибки,
            ограничение по безопасности, вопрос для самопроверки и источники.
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="brand brand--footer">
          <span className="brand__accent" />
          <span className="brand__name">КОНТУР</span>
          <span className="brand__descriptor">База знаний</span>
        </div>
        <p>С первого дня до квалифицированного работника</p>
        <a href="#">Наверх ↑</a>
      </footer>

      <nav className="field-dock" aria-label="Быстрые действия на объекте">
        <button type="button" onClick={() => searchInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}><SearchIcon /><span>Найти</span></button>
        <button type="button" onClick={openPersonalizedNext}><ArrowIcon /><span>Следующий шаг</span></button>
        <a href="#practice"><CheckIcon /><span>Кейсы</span></a>
        <button type="button" onClick={() => setFieldMode((current) => !current)}><DocumentIcon /><span>{fieldMode ? "Обычный" : "На объекте"}</span></button>
      </nav>

      {onboardingOpen && (
        <div className="onboarding-backdrop" role="presentation" onMouseDown={() => profile && setOnboardingOpen(false)}>
          <section className="onboarding" role="dialog" aria-modal="true" aria-labelledby="onboarding-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="onboarding__head">
              <div>
                <span>КОНТУР / МОЙ ПУТЬ</span>
                <h2 id="onboarding-title">Соберём маршрут под вашу работу</h2>
                <p>Три ответа — и база предложит последовательность тем, продолжительность и следующий практический шаг.</p>
              </div>
              {profile && <button type="button" onClick={() => setOnboardingOpen(false)} aria-label="Закрыть"><CloseIcon /></button>}
            </div>

            <label className="onboarding__name">
              <span>Как к вам обращаться</span>
              <input value={draftProfile.name} onChange={(event) => setDraftProfile((current) => ({ ...current, name: event.target.value }))} placeholder="Имя — необязательно" />
            </label>

            <fieldset>
              <legend>1. Ваша роль</legend>
              <div className="onboarding-options onboarding-options--roles">
                {roleOptions.map((option) => (
                  <label key={option.id} className={draftProfile.role === option.id ? "is-selected" : ""}>
                    <input type="radio" name="role" checked={draftProfile.role === option.id} onChange={() => setDraftProfile((current) => ({ ...current, role: option.id }))} />
                    <span>{option.label}</span>
                    <small>{option.description}</small>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="onboarding__columns">
              <fieldset>
                <legend>2. Опыт</legend>
                <div className="onboarding-options">
                  {experienceOptions.map((option) => (
                    <label key={option.id} className={draftProfile.experience === option.id ? "is-selected" : ""}>
                      <input type="radio" name="experience" checked={draftProfile.experience === option.id} onChange={() => setDraftProfile((current) => ({ ...current, experience: option.id }))} />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend>3. Главная цель</legend>
                <div className="onboarding-options">
                  {goalOptions.map((option) => (
                    <label key={option.id} className={draftProfile.goal === option.id ? "is-selected" : ""}>
                      <input type="radio" name="goal" checked={draftProfile.goal === option.id} onChange={() => setDraftProfile((current) => ({ ...current, goal: option.id }))} />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="onboarding__footer">
              <p>Настройки и прогресс сохраняются только в браузере этого устройства.</p>
              <button type="button" onClick={saveProfile}>Создать персональный маршрут <ArrowIcon /></button>
            </div>
          </section>
        </div>
      )}

      {selectedSection && (
        <div
          className="drawer-backdrop"
          role="presentation"
          onMouseDown={closeSection}
        >
          <aside
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div
              className="drawer__hero"
              style={
                {
                  "--drawer-bg": selectedSection.color,
                  "--drawer-ink": selectedSection.ink,
                } as CSSProperties
              }
            >
              <div className="drawer__topline">
                <span>
                  Этап {selectedSection.code} из {stages.length}
                </span>
                <button
                  type="button"
                  onClick={closeSection}
                  aria-label="Закрыть этап"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="drawer__meta">
                <span>{selectedSection.timeframe}</span>
                <span>{selectedSection.articles.length} материалов</span>
              </div>
              <h2 id="drawer-title">{selectedSection.title}</h2>
              <p>{selectedSection.description}</p>
              <div className="drawer__outcome">
                <span>
                  <CheckIcon />
                </span>
                <div>
                  <small>Результат этапа</small>
                  <strong>{selectedSection.outcome}</strong>
                </div>
              </div>
            </div>

            <div className="drawer__content">
              <div className="drawer__content-heading">
                <span>Материалы этапа</span>
                <strong>{selectedSection.articles.length}</strong>
              </div>

              <div className="article-list">
                {selectedSection.articles.map((article, index) => {
                  const isExpanded = expandedArticle === article.id;
                  const articleSources = article.sourceIds
                    .map((id) => sourceById.get(id))
                    .filter((source) => source !== undefined);

                  return (
                    <div
                      className={`article-item${isExpanded ? " is-expanded" : ""}`}
                      key={article.title}
                      data-article-id={article.id}
                    >
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() =>
                          setExpandedArticle(isExpanded ? null : article.id)
                        }
                      >
                        <span className="article-item__index">
                          {selectedSection.code}.
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="article-item__title">
                          {article.title}
                          <small>
                            {article.level} · {article.readTime} мин{completedSet.has(article.id) ? " · Пройдено" : ""}
                          </small>
                        </span>
                        <span className="article-item__toggle">
                          {isExpanded ? "−" : "+"}
                        </span>
                      </button>

                      {isExpanded && (
                        <div className={`article-item__details mode-${articleViewMode}`}>
                          <div className="article-view-switch" aria-label="Режим чтения">
                            <button type="button" className={articleViewMode === "minute" ? "is-active" : ""} onClick={() => setArticleViewMode("minute")}>
                              <strong>За 1 минуту</strong><small>Суть и главное</small>
                            </button>
                            <button type="button" className={articleViewMode === "study" ? "is-active" : ""} onClick={() => setArticleViewMode("study")}>
                              <strong>Изучить</strong><small>Полный материал</small>
                            </button>
                            <button type="button" className={articleViewMode === "field" ? "is-active" : ""} onClick={() => setArticleViewMode("field")}>
                              <strong>На объекте</strong><small>Алгоритм и стоп</small>
                            </button>
                          </div>
                          <p className="article-item__label">Короткий ответ</p>
                          <p className="article-item__answer">
                            {article.shortAnswer}
                          </p>

                          <div className="article-detail-block article-detail-block--key article-content--quick">
                            <h3>Главное</h3>
                            <ul>
                              {article.keyPoints.map((point) => (
                                <li key={point}>{point}</li>
                              ))}
                            </ul>
                          </div>

                          {article.facts && article.facts.length > 0 && (
                            <div className="article-facts article-content--deep">
                              <h3>Технические данные</h3>
                              <dl>
                                {article.facts.map(({ label, value }) => (
                                  <div key={`${label}-${value}`}>
                                    <dt>{label}</dt>
                                    <dd>{value}</dd>
                                  </div>
                                ))}
                              </dl>
                            </div>
                          )}

                          {article.sections?.map((section) => (
                            <div className="article-detail-block article-content--deep" key={section.title}>
                              <h3>{section.title}</h3>
                              <ul>
                                {section.items.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          ))}

                          {article.tables?.map((table) => (
                            <div className="article-data-table article-content--deep" key={table.title}>
                              <h3>{table.title}</h3>
                              <div>
                                <table>
                                  <thead>
                                    <tr>
                                      {table.columns.map((column) => (
                                        <th key={column} scope="col">
                                          {column}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {table.rows.map((row, rowIndex) => (
                                      <tr key={`${table.title}-${rowIndex}`}>
                                        {row.map((cell, cellIndex) => (
                                          <td key={`${cell}-${cellIndex}`}>{cell}</td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              {table.note && <p>{table.note}</p>}
                            </div>
                          ))}

                          <div className="article-detail-block article-content--field">
                            <h3>Рабочий алгоритм</h3>
                            <ol>
                              {article.procedure.map((step) => (
                                <li key={step}>{step}</li>
                              ))}
                            </ol>
                          </div>

                          {article.safety && (
                            <div className="article-warning article-content--field">
                              <strong>Безопасность</strong>
                              <p>{article.safety}</p>
                            </div>
                          )}

                          <div className="article-detail-block article-content--field">
                            <h3>Типичные ошибки</h3>
                            <ul>
                              {article.mistakes.map((mistake) => (
                                <li key={mistake}>{mistake}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="article-self-check article-content--deep">
                            <small>Самопроверка</small>
                            {article.selfCheck.map(({ question, answer }) => (
                              <details key={question}>
                                <summary>{question}</summary>
                                <p>{answer}</p>
                              </details>
                            ))}
                          </div>

                          <div className="article-tags">
                            {article.tags.map((tag) => (
                              <span key={tag}>{tag}</span>
                            ))}
                          </div>

                          <div className="article-completion">
                            <div>
                              <small>Проверка понимания</small>
                              <strong>Объясните главное, действие и критерий остановки наставнику.</strong>
                            </div>
                            <button
                              type="button"
                              className={completedSet.has(article.id) ? "is-complete" : ""}
                              onClick={() => toggleArticleComplete(article.id)}
                            >
                              <CheckIcon />
                              {completedSet.has(article.id) ? "Материал пройден" : "Отметить пройденным"}
                            </button>
                          </div>

                          <div className="article-sources">
                            <div className="article-sources__head">
                              <h3>Источники</h3>
                              <span>{articleSources.length} первоисточника · обновлено {article.updated}</span>
                            </div>
                            <div className="article-trust">
                              <span><CheckIcon /> Связано с первоисточниками</span>
                              <span>Статус проверяйте перед работой</span>
                            </div>
                            {articleSources.map((source) =>
                              source.url ? (
                                <a
                                  className="article-source"
                                  key={source.id}
                                  href={source.url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <span>{source.title}</span>
                                  <ArrowIcon />
                                </a>
                              ) : (
                                <button
                                  type="button"
                                  className="article-source article-source--local"
                                  key={source.id}
                                  onClick={() => {
                                    closeSection();
                                    window.requestAnimationFrame(() => openSource(source.id));
                                  }}
                                >
                                  <span>
                                    {source.title}
                                    <small>
                                      {source.fileName} · {source.pages} стр. · {source.coverage}
                                    </small>
                                  </span>
                                  <DocumentIcon />
                                </button>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
