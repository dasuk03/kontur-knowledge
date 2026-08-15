import type { Article, Source, Stage } from "./knowledge";

export type SearchKind = "all" | "article" | "source";
export type Freshness = "all" | "current" | "review";
export type SearchSort = "relevance" | "route" | "updated" | "reading";

export type SearchFilters = {
  kind: SearchKind;
  stageId: string;
  level: string;
  topicId: string;
  equipmentId: string;
  sourceKind: string;
  freshness: Freshness;
  safetyOnly: boolean;
  sort: SearchSort;
};

export const defaultSearchFilters: SearchFilters = {
  kind: "all",
  stageId: "all",
  level: "all",
  topicId: "all",
  equipmentId: "all",
  sourceKind: "all",
  freshness: "all",
  safetyOnly: false,
  sort: "relevance",
};

export const knowledgeTopics = [
  {
    id: "adaptation",
    label: "Адаптация и организация работ",
    stageIds: ["first-day"],
    keywords: [
      "первый день",
      "адаптация",
      "инструктаж",
      "наставник",
      "бригада",
      "полномочия",
      "стажировка",
      "персонал",
    ],
  },
  {
    id: "safety",
    label: "Охрана труда и электробезопасность",
    stageIds: ["admission"],
    keywords: [
      "электробезопасность",
      "наряд-допуск",
      "распоряжение",
      "сиз",
      "заземление",
      "напряжение",
      "первая помощь",
      "электротравма",
      "пожар",
    ],
  },
  {
    id: "electrical",
    label: "Электротехника и сети",
    stageIds: ["electrical-basics"],
    keywords: [
      "трехфаз",
      "трёхфаз",
      "нейтраль",
      "pen",
      "реактив",
      "мощность",
      "сопротивление",
      "линейное напряжение",
    ],
  },
  {
    id: "metering",
    label: "Учёт электроэнергии и метрология",
    stageIds: ["metering"],
    keywords: [
      "прибор учета",
      "прибор учёта",
      "счетчик",
      "счётчик",
      "трансформатор тока",
      "ктт",
      "погрешность",
      "профиль мощности",
      "журнал событий",
      "метролог",
    ],
  },
  {
    id: "field",
    label: "Полевая работа и оформление",
    stageIds: ["field-work"],
    keywords: [
      "выезд",
      "осмотр",
      "абонент",
      "акт",
      "отчет",
      "отчёт",
      "фотофиксация",
      "стоп-работа",
      "замена пу",
      "юридические лица",
      "посуточный план",
      "карточка дня",
      "yoda",
      "max",
      "мастер рэс",
      "бригадир сэк",
    ],
  },
  {
    id: "survey",
    label: "ТП и сеть 0,4 кВ",
    stageIds: ["network-survey"],
    keywords: [
      "ктп",
      "тп",
      "ру-0,4",
      "фидер",
      "опора",
      "домовладение",
      "gps",
      "геопривязка",
      "обследование",
    ],
  },
  {
    id: "diagnostics",
    label: "Диагностика и качество электроэнергии",
    stageIds: ["diagnostics"],
    keywords: [
      "диагност",
      "нет напряжения",
      "расхождение",
      "перекос фаз",
      "качество напряжения",
      "векторная диаграмма",
      "неисправность",
    ],
  },
  {
    id: "smart",
    label: "ИСУЭ, АСКУЭ и каналы связи",
    stageIds: ["smart-metering"],
    keywords: [
      "исуэ",
      "аскуэ",
      "успд",
      "rs-485",
      "plc",
      "gsm",
      "lte",
      "сподэс",
      "dlms",
      "cosem",
      "obis",
      "опрос",
      "связь",
      "rfplc",
      "csd",
      "прямой опрос",
      "пнр",
      "пусконаладочные работы",
      "восстановление опроса",
      "пирамида сети",
      "port forwarding",
    ],
  },
  {
    id: "losses",
    label: "Потери и технический аудит",
    stageIds: ["smart-metering", "qualified-worker"],
    keywords: [
      "потери",
      "небаланс",
      "баланс",
      "безучет",
      "безучёт",
      "бездоговор",
      "вмешательство",
      "технический аудит",
      "инструментальная проверка",
      "образцовый счётчик",
      "ваф",
    ],
  },
  {
    id: "equipment",
    label: "Оборудование и программное обеспечение",
    stageIds: ["equipment"],
    keywords: [
      "нартис",
      "рим 384",
      "sm160",
      "квант",
      "меркурий",
      "милур",
      "телеофис",
      "zigbee",
      "шлюз zb",
      "модемный пул",
      "irz ruh2",
      "миртек",
      "ноутбук",
      "адаптер",
      "com-порт",
      "конфигурация",
      "программное обеспечение",
    ],
  },
  {
    id: "qualification",
    label: "Квалификация и развитие",
    stageIds: ["qualified-worker"],
    keywords: [
      "квалификация",
      "компетенции",
      "план развития",
      "обучение",
      "наставничество",
      "проверка знаний",
      "профстандарт",
    ],
  },
] as const;

export const equipmentFacets = [
  { id: "meters", label: "Приборы учёта", keywords: ["счётчик", "счетчик", "прибор учёта", "прибор учета"] },
  { id: "ct", label: "Трансформаторы тока", keywords: ["тт", "ктт", "трансформатор тока"] },
  { id: "relay", label: "Реле управления нагрузкой", keywords: ["реле"] },
  { id: "substation", label: "ТП, КТП и РУ-0,4 кВ", keywords: ["ктп", "тп", "ру-0,4", "трансформаторная подстанция"] },
  { id: "ce208", label: "Энергомера CE208", keywords: ["ce208", "се208"] },
  { id: "ce308", label: "Энергомера CE308", keywords: ["ce308", "се308"] },
  { id: "ce805m", label: "УСПД CE805M", keywords: ["ce805m", "се805м", "се805m"] },
  { id: "ce-modules", label: "Модули CE810 / дисплей CE901", keywords: ["ce810", "се810", "ce901", "се901"] },
  { id: "nartis", label: "НАРТИС-И100 / И300", keywords: ["нартис", "и100", "и-100", "и300", "и-300", "86199-22", "86200-22"] },
  { id: "nartis-display", label: "НАРТИС Д101 / дисплеи", keywords: ["д101", "д 101", "d101", "д101-в", "д101-2-в", "выносной дисплей"] },
  { id: "nartis-software", label: "ПО и адаптеры НАРТИС", keywords: ["нартис пульт", "nartis tools", "webconfig", "ble connect", "rf433", "rf2400"] },
  { id: "rim", label: "РиМ 384", keywords: ["рим 384"] },
  { id: "sm160", label: "Контроллеры SM160", keywords: ["sm160", "sm160-02", "конфигуратор sm", "rfplc"] },
  { id: "quant", label: "КВАНТ и модули F1/F2", keywords: ["квант", "f1", "f2", "link st200", "pan_id", "прямой опрос"] },
  { id: "mercury", label: "Счётчики «Меркурий»", keywords: ["меркурий", "меркурий 221", "инкотекс", "csd"] },
  { id: "milur", label: "Счётчики «Милур»", keywords: ["милур", "милур 307s", "милур т", "split"] },
  { id: "teleofis", label: "Модемы ТЕЛЕОФИС", keywords: ["телеофис", "terminal configurator", "прозрачный канал"] },
  { id: "gateways", label: "Шлюзы Zigbee", keywords: ["шлюз", "zigbee", "zigbee eth", "координатор", "белый список"] },
  { id: "irz", label: "Маршрутизаторы IRZ", keywords: ["irz ruh2", "port forwarding", "nat"] },
  { id: "mirtek", label: "МИРТЕК", keywords: ["миртек"] },
  { id: "data", label: "УСПД и сервер", keywords: ["успд", "сервер"] },
  { id: "channels", label: "RS-485, PLC, GSM/LTE, RF/BLE", keywords: ["rs-485", "plc", "rfplc", "gsm", "lte", "csd", "ble", "bluetooth", "rf433", "rf2400", "rf1", "rf2"] },
  { id: "protocols", label: "СПОДЭС и DLMS/COSEM", keywords: ["сподэс", "dlms", "cosem", "obis"] },
  { id: "push", label: "PUSH-сообщения", keywords: ["push", "инициативные сообщения"] },
] as const;

type SearchableArticle = Article & { stage: Stage };

export type SearchEntry = {
  id: string;
  kind: "article" | "source";
  title: string;
  stage?: Stage;
  article?: SearchableArticle;
  source?: Source;
  topicIds: string[];
  equipmentIds: string[];
  level?: Article["level"];
  sourceKind?: Source["kind"];
  updated: string;
  readTime?: number;
  hasSafety: boolean;
  fields: Array<{ label: string; value: string; weight: number }>;
  normalized: string;
};

export type SearchHit = {
  entry: SearchEntry;
  score: number;
  matchedFields: string[];
  snippetLabel: string;
  snippet: string;
};

const synonymGroups = [
  ["пу", "прибор учета", "прибор учёта", "счетчик", "счётчик"],
  ["тт", "трансформатор тока"],
  ["ктт", "коэффициент трансформации"],
  ["ктп", "комплектная трансформаторная подстанция", "трансформаторная подстанция"],
  ["тп", "трансформаторная подстанция"],
  ["исуэ", "интеллектуальная система учета", "интеллектуальная система учёта"],
  ["аскуэ", "автоматизированная система коммерческого учета", "автоматизированная система коммерческого учёта"],
  ["успд", "устройство сбора и передачи данных"],
  ["се208", "ce208", "ce 208", "се 208"],
  ["се308", "ce308", "ce 308", "се 308"],
  ["се805м", "ce805m", "ce 805m", "се 805м", "успд ce805m"],
  ["се810", "ce810", "сменный модуль связи"],
  ["се901", "ce901", "выносной дисплей"],
  ["д101", "d101", "д 101", "d 101", "выносной дисплей"],
  ["д101-в", "d101-v", "д 101 в", "d 101 v"],
  ["д101-2-в", "d101-2-v", "д 101 2 в", "d 101 2 v"],
  ["ble", "bluetooth", "bluetooth low energy", "блютус"],
  ["rf433", "rf 433", "433 мгц"],
  ["rf2400", "rf2400/2", "rf 2400", "2400 мгц"],
  ["рим384", "рим 384", "rim 384", "rim384"],
  ["sm160", "sm 160", "см160", "контроллер sm"],
  ["rfplc", "rf plc", "радио plc", "радиоплс"],
  ["квант", "quant", "счетчик квант", "счётчик квант"],
  ["f1", "модуль f1", "433 мгц"],
  ["f2", "модуль f2", "868 мгц"],
  ["прямой опрос", "технологический режим", "direct query"],
  ["irz ruh2", "irz", "ruh2", "роутер irz"],
  ["port forwarding", "проброс порта", "перенаправление порта", "nat"],
  ["меркурий", "mercury", "инкотекс"],
  ["милур", "milur", "милур 307s", "milur 307s", "307s"],
  ["телеофис", "teleofis", "terminal configurator"],
  ["прозрачный канал", "transparent channel", "режим преобразователя"],
  ["zigbee", "zig bee", "zb", "zigbee eth"],
  ["белый список", "whitelist", "разрешенные узлы", "разрешённые узлы"],
  ["модемный пул", "modem pool", "link st200"],
  ["нет регистрации", "не регистрируется", "gsm не в сети", "нет gsm"],
  ["две sim", "dual sim", "2 sim", "две сим"],
  ["csd", "дозвон", "коммутируемое соединение"],
  ["nartis tools", "нартис тулс", "улитка"],
  ["webconfig", "web config", "веб конфиг", "веб конфигуратор"],
  ["юл", "юридическое лицо", "юридические лица"],
  ["сподэс", "spodes", "dlms cosem", "dlms/cosem"],
  ["push", "инициативное сообщение", "инициативная передача"],
  ["рун", "реле управления нагрузкой", "disconnect control"],
  ["чрв", "часы реального времени", "rtc"],
  ["сиз", "средства индивидуальной защиты"],
  ["потээ", "правила по охране труда при эксплуатации электроустановок"],
  ["птээп", "правила технической эксплуатации электроустановок потребителей"],
  ["нет связи", "не опрашивается", "нет опроса", "недоступен"],
  ["нет света", "нет напряжения", "отсутствует напряжение"],
  ["воровство", "хищение", "безучет", "безучёт", "вмешательство"],
  ["нартас", "нартис"],
] as const;

const fieldPriority = [
  "Название",
  "Теги",
  "Оборудование",
  "Краткое описание",
  "Короткий ответ",
  "Безопасность",
  "Алгоритм",
  "Главное",
  "Технические данные",
  "Подробности",
  "Таблицы",
  "Типичные ошибки",
  "Самопроверка",
  "Этап",
  "Источники",
  "Версия",
  "Файл",
  "Статус",
  "Полнота",
  "Примечание",
];

export function normalizeSearchText(value: string) {
  return value
    .toLocaleLowerCase("ru-RU")
    .replaceAll("ё", "е")
    .replace(/се\s*(?=\d)/g, "ce")
    .replace(/д\s*(?=101)/g, "d")
    .replace(/ce\s*805м/g, "ce805m")
    .replace(/[–—−]/g, "-")
    .replace(/([а-яa-z])([0-9])/gi, "$1 $2")
    .replace(/([0-9])([а-яa-z])/gi, "$1 $2")
    .replace(/[^а-яa-z0-9.,+\-/\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenise(value: string) {
  return normalizeSearchText(value)
    .split(/[\s,/]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1);
}

function stemRussian(token: string) {
  if (token.length < 5 || /[a-z0-9]/i.test(token)) return token;
  return token.replace(
    /(иями|ями|ами|его|ого|ему|ому|ыми|ими|иях|ах|ях|ия|ья|ие|ье|ий|ый|ой|ая|яя|ое|ее|ую|юю|ов|ев|ам|ям|ом|ем|ы|и|а|я|у|ю|е|о)$/,
    "",
  );
}

function distanceAtMostOne(left: string, right: string) {
  if (left === right) return true;
  if (Math.abs(left.length - right.length) > 1) return false;

  let leftIndex = 0;
  let rightIndex = 0;
  let edits = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] === right[rightIndex]) {
      leftIndex += 1;
      rightIndex += 1;
      continue;
    }

    edits += 1;
    if (edits > 1) return false;

    if (left.length > right.length) leftIndex += 1;
    else if (right.length > left.length) rightIndex += 1;
    else {
      leftIndex += 1;
      rightIndex += 1;
    }
  }

  return true;
}

function synonymVariants(token: string) {
  const normalizedToken = normalizeSearchText(token);
  const matches = synonymGroups.find((group) =>
    group.some((item) => normalizeSearchText(item) === normalizedToken),
  );

  return matches
    ? [...new Set(matches.map((item) => normalizeSearchText(item)))]
    : [normalizedToken];
}

type ParsedQuery = {
  raw: string;
  tokens: string[];
  expandedTokens: string[][];
  phrases: string[];
  excluded: string[];
};

export function parseSearchQuery(query: string): ParsedQuery {
  const phrases = [...query.matchAll(/[«"]([^»"]+)[»"]/g)]
    .map((match) => normalizeSearchText(match[1]))
    .filter(Boolean);
  const withoutPhrases = query.replace(/[«"]([^»"]+)[»"]/g, " ");
  const excluded = [...withoutPhrases.matchAll(/(?:^|\s)-([^\s]+)/g)]
    .flatMap((match) => tokenise(match[1]))
    .filter(Boolean);
  const positive = withoutPhrases.replace(/(?:^|\s)-[^\s]+/g, " ");
  const tokens = [...new Set([...tokenise(positive), ...phrases.flatMap(tokenise)])];

  return {
    raw: normalizeSearchText(query),
    tokens,
    expandedTokens: tokens.map(synonymVariants),
    phrases,
    excluded,
  };
}

function textMatchesKeyword(text: string, keyword: string) {
  const normalized = normalizeSearchText(text);
  const words = tokenise(normalized);
  const normalizedKeyword = normalizeSearchText(keyword);
  if (normalizedKeyword.includes(" ") || /[.,+\-/]/.test(normalizedKeyword))
    return normalized.includes(normalizedKeyword);

  return words.some(
    (word) =>
      word === normalizedKeyword ||
      (normalizedKeyword.length >= 4 && word.startsWith(normalizedKeyword)),
  );
}

function topicIdsFor(text: string, stageId?: string) {
  return knowledgeTopics
    .filter(
      (topic) =>
        (stageId && topic.stageIds.some((id) => id === stageId)) ||
        topic.keywords.some((keyword) => textMatchesKeyword(text, keyword)),
    )
    .map((topic) => topic.id);
}

function equipmentIdsFor(text: string) {
  return equipmentFacets
    .filter((equipment) =>
      equipment.keywords.some((keyword) => textMatchesKeyword(text, keyword)),
    )
    .map((equipment) => equipment.id);
}

function articleFields(article: SearchableArticle, sourceTitles: string) {
  const facts =
    article.facts
      ?.map(({ label, value }) => `${label}: ${value}`)
      .join(" ") ?? "";
  const sections =
    article.sections
      ?.map(({ title, items }) => `${title}: ${items.join(" ")}`)
      .join(" ") ?? "";
  const tables =
    article.tables
      ?.map(({ title, columns, rows, note }) =>
        [
          title,
          columns.join(" "),
          ...rows.map((row) => row.join(" ")),
          note ?? "",
        ].join(" "),
      )
      .join(" ") ?? "";

  return [
    { label: "Название", value: article.title, weight: 15 },
    { label: "Теги", value: article.tags.join(" · "), weight: 13 },
    { label: "Оборудование", value: article.equipment?.join(" · ") ?? "", weight: 12 },
    { label: "Краткое описание", value: article.summary, weight: 9 },
    { label: "Короткий ответ", value: article.shortAnswer, weight: 8 },
    { label: "Безопасность", value: article.safety ?? "", weight: 8 },
    { label: "Алгоритм", value: article.procedure.join(" "), weight: 6 },
    { label: "Главное", value: article.keyPoints.join(" "), weight: 6 },
    { label: "Технические данные", value: facts, weight: 8 },
    { label: "Подробности", value: sections, weight: 6 },
    { label: "Таблицы", value: tables, weight: 7 },
    { label: "Типичные ошибки", value: article.mistakes.join(" "), weight: 5 },
    {
      label: "Самопроверка",
      value: article.selfCheck
        .map(({ question, answer }) => `${question} ${answer}`)
        .join(" "),
      weight: 4,
    },
    {
      label: "Этап",
      value: `${article.stage.code} ${article.stage.title} ${article.stage.shortTitle}`,
      weight: 4,
    },
    { label: "Источники", value: sourceTitles, weight: 3 },
  ].filter((field) => field.value.trim());
}

function sourceFields(source: Source) {
  return [
    { label: "Название", value: source.title, weight: 15 },
    { label: "Организация", value: source.organization, weight: 10 },
    { label: "Тип документа", value: source.kind, weight: 9 },
    { label: "Оборудование", value: source.equipment?.join(" · ") ?? "", weight: 9 },
    { label: "Версия", value: source.version ?? "", weight: 7 },
    { label: "Файл", value: source.fileName ?? "", weight: 8 },
    { label: "Дата выпуска", value: source.published ?? "", weight: 5 },
    { label: "Статус", value: source.status ?? "", weight: 7 },
    { label: "Полнота", value: source.coverage ?? "", weight: 6 },
    { label: "Страницы", value: source.pages ? String(source.pages) : "", weight: 4 },
    { label: "Примечание", value: source.note ?? "", weight: 6 },
  ].filter((field) => field.value.trim());
}

export function buildSearchEntries(
  articles: SearchableArticle[],
  sources: Source[],
  sourceById: Map<string, Source>,
) {
  const articleEntries: SearchEntry[] = articles.map((article) => {
    const sourceTitles = article.sourceIds
      .map((id) => sourceById.get(id)?.title ?? "")
      .join(" ");
    const fields = articleFields(article, sourceTitles);
    const fullText = fields.map((field) => field.value).join(" ");

    return {
      id: `article:${article.stage.id}:${article.id}`,
      kind: "article",
      title: article.title,
      stage: article.stage,
      article,
      topicIds: [
        ...new Set([
          ...(article.topicIds ?? []),
          ...topicIdsFor(fullText, article.stage.id),
        ]),
      ],
      equipmentIds: equipmentIdsFor(fullText),
      level: article.level,
      updated: article.updated,
      readTime: article.readTime,
      hasSafety: Boolean(article.safety),
      fields,
      normalized: normalizeSearchText(fullText),
    };
  });

  const sourceEntries: SearchEntry[] = sources.map((source) => {
    const fields = sourceFields(source);
    const fullText = fields.map((field) => field.value).join(" ");

    return {
      id: `source:${source.id}`,
      kind: "source",
      title: source.title,
      source,
      topicIds: [
        ...new Set([...(source.topicIds ?? []), ...topicIdsFor(fullText)]),
      ],
      equipmentIds: equipmentIdsFor(fullText),
      sourceKind: source.kind,
      updated: source.checked,
      hasSafety: false,
      fields,
      normalized: normalizeSearchText(fullText),
    };
  });

  return [...articleEntries, ...sourceEntries];
}

function parseDate(value: string) {
  const [day, month, year] = value.split(".").map(Number);
  if (!day || !month || !year) return 0;
  return new Date(year, month - 1, day).getTime();
}

function isCurrent(value: string) {
  const date = parseDate(value);
  if (!date) return false;
  return Date.now() - date <= 180 * 24 * 60 * 60 * 1000;
}

function fieldMatchScore(value: string, variants: string[], weight: number) {
  const normalized = normalizeSearchText(value);
  const words = tokenise(normalized);
  let best = 0;

  for (const variant of variants) {
    const variantTokens = tokenise(variant);
    if (variantTokens.length === 1 && variant.length <= 3) {
      if (words.includes(variant)) best = Math.max(best, weight * 4);
      continue;
    }

    if (normalized === variant) best = Math.max(best, weight * 7);
    if (normalized.startsWith(variant)) best = Math.max(best, weight * 5);
    if (normalized.includes(variant)) best = Math.max(best, weight * 4);

    if (variantTokens.length > 1) {
      const variantStems = variantTokens.map(stemRussian);
      const wordStems = words.map(stemRussian);
      const hasStemPhrase = wordStems.some((_, start) =>
        variantStems.every(
          (variantStem, offset) => wordStems[start + offset] === variantStem,
        ),
      );
      if (hasStemPhrase) best = Math.max(best, weight * 3);
      continue;
    }

    for (const variantToken of variantTokens) {
      const variantStem = stemRussian(variantToken);
      for (const word of words) {
        const wordStem = stemRussian(word);
        if (word === variantToken) best = Math.max(best, weight * 3);
        else if (wordStem.length > 3 && wordStem === variantStem)
          best = Math.max(best, weight * 2.5);
        else if (
          variantToken.length >= 5 &&
          word.length >= 5 &&
          distanceAtMostOne(word, variantToken)
        )
          best = Math.max(best, weight * 1.4);
      }
    }
  }

  return best;
}

function bestSnippet(entry: SearchEntry, parsed: ParsedQuery) {
  const priorityOf = (label: string) => {
    const index = fieldPriority.indexOf(label);
    return index === -1 ? fieldPriority.length : index;
  };
  const ranked = entry.fields
    .map((field) => ({
      ...field,
      score: parsed.expandedTokens.reduce(
        (sum, variants) =>
          sum + fieldMatchScore(field.value, variants, field.weight),
        0,
      ),
    }))
    .sort(
      (left, right) =>
        right.score - left.score ||
        priorityOf(left.label) - priorityOf(right.label),
    );
  const selected = ranked[0] ?? {
    label: "Описание",
    value: entry.title,
    score: 0,
  };
  const text = selected.value.replace(/\s+/g, " ").trim();

  if (text.length <= 210) return { label: selected.label, text };

  const normalizedText = normalizeSearchText(text);
  const firstMatch = parsed.tokens
    .map((token) => normalizedText.indexOf(normalizeSearchText(token)))
    .filter((index) => index >= 0)
    .sort((left, right) => left - right)[0];
  const start = Math.max(0, (firstMatch ?? 0) - 72);
  const end = Math.min(text.length, start + 210);

  return {
    label: selected.label,
    text: `${start > 0 ? "…" : ""}${text.slice(start, end).trim()}${end < text.length ? "…" : ""}`,
  };
}

function passesFilters(entry: SearchEntry, filters: SearchFilters) {
  if (filters.kind !== "all" && entry.kind !== filters.kind) return false;
  if (filters.stageId !== "all" && entry.stage?.id !== filters.stageId)
    return false;
  if (filters.level !== "all" && entry.level !== filters.level) return false;
  if (filters.topicId !== "all" && !entry.topicIds.includes(filters.topicId))
    return false;
  if (
    filters.equipmentId !== "all" &&
    !entry.equipmentIds.includes(filters.equipmentId)
  )
    return false;
  if (
    filters.sourceKind !== "all" &&
    entry.sourceKind !== filters.sourceKind
  )
    return false;
  if (filters.safetyOnly && !entry.hasSafety) return false;
  if (filters.freshness === "current" && !isCurrent(entry.updated)) return false;
  if (filters.freshness === "review" && isCurrent(entry.updated)) return false;
  return true;
}

export function searchKnowledge(
  entries: SearchEntry[],
  query: string,
  filters: SearchFilters,
) {
  const parsed = parseSearchQuery(query);
  const hasTextQuery = parsed.tokens.length > 0 || parsed.phrases.length > 0;
  const rawQueryWithoutOperators = normalizeSearchText(
    query.replace(/[«"]([^»"]+)[»"]/g, "$1").replace(/(?:^|\s)-[^\s]+/g, " "),
  );

  const hits = entries.flatMap<SearchHit>((entry) => {
    if (!passesFilters(entry, filters)) return [];
    if (parsed.excluded.some((token) => entry.normalized.includes(token)))
      return [];

    let score = 0;
    let matchedTokenCount = 0;
    const matchedFields = new Set<string>();

    for (const variants of parsed.expandedTokens) {
      let tokenScore = 0;
      let tokenField = "";

      for (const field of entry.fields) {
        const current = fieldMatchScore(field.value, variants, field.weight);
        if (current > tokenScore) {
          tokenScore = current;
          tokenField = field.label;
        }
      }

      if (tokenScore > 0) {
        matchedTokenCount += 1;
        score += tokenScore;
        matchedFields.add(tokenField);
      }
    }

    for (const phrase of parsed.phrases) {
      if (!entry.normalized.includes(phrase)) return [];
      score += entry.fields.some(
        (field) =>
          field.label === "Название" &&
          normalizeSearchText(field.value).includes(phrase),
      )
        ? 130
        : 55;
    }

    if (hasTextQuery) {
      const requiredMatches =
        parsed.tokens.length <= 2
          ? parsed.tokens.length
          : Math.ceil(parsed.tokens.length * 0.67);
      if (matchedTokenCount < requiredMatches) return [];

      const normalizedTitle = normalizeSearchText(entry.title);
      if (rawQueryWithoutOperators && normalizedTitle === rawQueryWithoutOperators)
        score += 180;
      else if (
        rawQueryWithoutOperators &&
        normalizedTitle.includes(rawQueryWithoutOperators)
      )
        score += 95;
    }

    if (!hasTextQuery) score = entry.kind === "article" ? 10 : 5;

    const snippet = bestSnippet(entry, parsed);
    return [
      {
        entry,
        score,
        matchedFields: [...matchedFields].filter(Boolean).slice(0, 3),
        snippetLabel: snippet.label,
        snippet: snippet.text,
      },
    ];
  });

  return hits.sort((left, right) => {
    if (filters.sort === "route") {
      const leftCode = Number(left.entry.stage?.code ?? 99);
      const rightCode = Number(right.entry.stage?.code ?? 99);
      return leftCode - rightCode || right.score - left.score;
    }
    if (filters.sort === "updated") {
      return (
        parseDate(right.entry.updated) - parseDate(left.entry.updated) ||
        right.score - left.score
      );
    }
    if (filters.sort === "reading") {
      return (
        (left.entry.readTime ?? Number.MAX_SAFE_INTEGER) -
          (right.entry.readTime ?? Number.MAX_SAFE_INTEGER) ||
        right.score - left.score
      );
    }
    return right.score - left.score || left.entry.title.localeCompare(right.entry.title, "ru");
  });
}

export function hasActiveFilters(filters: SearchFilters) {
  return Object.entries(filters).some(([key, value]) => {
    if (key === "sort") return value !== "relevance";
    if (key === "safetyOnly") return value === true;
    return value !== "all";
  });
}
