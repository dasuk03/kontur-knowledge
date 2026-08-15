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
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="КОНТУР — на главную">
          <span className="brand__accent" />
          <span className="brand__name">КОНТУР</span>
          <span className="brand__descriptor">База знаний</span>
        </a>

        <nav className="topbar__nav" aria-label="Основная навигация">
          <a href="#route">Маршрут</a>
          <a href="#catalog">Категории</a>
          <a href="#sources">Источники</a>
          <a href="#about">О проекте</a>
          <span className="topbar__index">{allArticles.length} материалов</span>
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

          <a className="hero__action" href="#route">
            Начать с первого этапа
            <span>
              <ArrowIcon />
            </span>
          </a>
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
            </button>
          ))}
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
                    {source.status ? ` · ${source.status}` : ""}
                  </small>
                  <strong>{source.title}</strong>
                  <p>{source.organization}</p>
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
                            {article.level} · {article.readTime} мин
                          </small>
                        </span>
                        <span className="article-item__toggle">
                          {isExpanded ? "−" : "+"}
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="article-item__details">
                          <p className="article-item__label">Короткий ответ</p>
                          <p className="article-item__answer">
                            {article.shortAnswer}
                          </p>

                          <div className="article-detail-block article-detail-block--key">
                            <h3>Главное</h3>
                            <ul>
                              {article.keyPoints.map((point) => (
                                <li key={point}>{point}</li>
                              ))}
                            </ul>
                          </div>

                          {article.facts && article.facts.length > 0 && (
                            <div className="article-facts">
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
                            <div className="article-detail-block" key={section.title}>
                              <h3>{section.title}</h3>
                              <ul>
                                {section.items.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          ))}

                          {article.tables?.map((table) => (
                            <div className="article-data-table" key={table.title}>
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

                          <div className="article-detail-block">
                            <h3>Рабочий алгоритм</h3>
                            <ol>
                              {article.procedure.map((step) => (
                                <li key={step}>{step}</li>
                              ))}
                            </ol>
                          </div>

                          {article.safety && (
                            <div className="article-warning">
                              <strong>Безопасность</strong>
                              <p>{article.safety}</p>
                            </div>
                          )}

                          <div className="article-detail-block">
                            <h3>Типичные ошибки</h3>
                            <ul>
                              {article.mistakes.map((mistake) => (
                                <li key={mistake}>{mistake}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="article-self-check">
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

                          <div className="article-sources">
                            <div className="article-sources__head">
                              <h3>Источники</h3>
                              <span>Обновлено {article.updated}</span>
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
