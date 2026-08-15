import { manualArticles } from "./manual-articles";
import { equipmentArticlesV6 } from "./equipment-articles-v6";
import { equipmentArticlesV7 } from "./equipment-articles-v7";
import { equipmentArticlesV8 } from "./equipment-articles-v8";
import {
  legalMeterReplacementArticles,
  nartisArticles,
} from "./nartis-articles";

export type Source = {
  id: string;
  title: string;
  organization: string;
  kind: "НПА" | "ГОСТ" | "Стандарт" | "Документация";
  url?: string;
  checked: string;
  note?: string;
  fileName?: string;
  version?: string;
  published?: string;
  topicIds?: string[];
  equipment?: string[];
  status?: "Действует" | "Требует проверки" | "Архив";
  pages?: number;
  coverage?: "Прочитан полностью";
};

export type SelfCheck = {
  question: string;
  answer: string;
};

export type ArticleFact = {
  label: string;
  value: string;
};

export type ArticleSection = {
  title: string;
  items: string[];
};

export type ArticleTable = {
  title: string;
  columns: string[];
  rows: string[][];
  note?: string;
};

export type Article = {
  id: string;
  title: string;
  summary: string;
  level: "Старт" | "База" | "Практика" | "Уверенная работа";
  readTime: number;
  tags: string[];
  shortAnswer: string;
  procedure: string[];
  keyPoints: string[];
  mistakes: string[];
  safety?: string;
  selfCheck: SelfCheck[];
  sourceIds: string[];
  updated: string;
  topicIds?: string[];
  equipment?: string[];
  voltageClasses?: string[];
  facts?: ArticleFact[];
  sections?: ArticleSection[];
  tables?: ArticleTable[];
};

export type Stage = {
  id: string;
  code: string;
  title: string;
  shortTitle: string;
  timeframe: string;
  outcome: string;
  description: string;
  color: string;
  ink: string;
  articles: Article[];
};

export const CHECKED_AT = "28.07.2026";
export const LATEST_UPDATE = "14.08.2026";

export const sources: Source[] = [
  {
    id: "potee-official",
    title:
      "Правила по охране труда при эксплуатации электроустановок. Приказ Минтруда России № 903н",
    organization: "Официальное опубликование правовых актов",
    kind: "НПА",
    url: "https://publication.pravo.gov.ru/Document/View/0001202012300142",
    checked: CHECKED_AT,
  },
  {
    id: "potee-current",
    title:
      "Приказ Минтруда России № 903н — действующая сводная редакция",
    organization: "КонсультантПлюс",
    kind: "НПА",
    url: "https://www.consultant.ru/document/cons_doc_LAW_372952/",
    checked: CHECKED_AT,
    note: "Срок действия правил продлён до 1 сентября 2031 года.",
  },
  {
    id: "potee-extension",
    title:
      "Приказ Минтруда России от 29.04.2025 № 287н о продлении действия правил",
    organization: "Официальное опубликование правовых актов",
    kind: "НПА",
    url: "https://publication.pravo.gov.ru/document/0001202505300025",
    checked: CHECKED_AT,
  },
  {
    id: "personnel-current",
    title:
      "Правила работы с персоналом в организациях электроэнергетики. Приказ Минэнерго России № 796",
    organization: "КонсультантПлюс",
    kind: "НПА",
    url: "https://www.consultant.ru/document/cons_doc_LAW_374368/",
    checked: CHECKED_AT,
  },
  {
    id: "personnel-official",
    title:
      "Приказ Минэнерго России от 22.09.2020 № 796 — официальная публикация",
    organization: "Официальное опубликование правовых актов",
    kind: "НПА",
    url: "https://publication.pravo.gov.ru/Document/View/0001202101180005",
    checked: CHECKED_AT,
  },
  {
    id: "professional-standard",
    title:
      "Профессиональный стандарт «Работник по техническому аудиту систем учета электроэнергии». Приказ Минтруда России № 758н",
    organization: "Официальное опубликование правовых актов",
    kind: "НПА",
    url: "https://publication.pravo.gov.ru/document/0001202311160010",
    checked: CHECKED_AT,
    note: "Действует с 1 сентября 2024 года до 1 сентября 2030 года.",
  },
  {
    id: "ptee",
    title:
      "Правила технической эксплуатации электроустановок потребителей электрической энергии. Приказ Минэнерго № 811",
    organization: "Официальное опубликование правовых актов",
    kind: "НПА",
    url: "https://publication.pravo.gov.ru/Document/View/0001202210070065",
    checked: CHECKED_AT,
  },
  {
    id: "first-aid-order",
    title:
      "Порядок оказания первой помощи. Приказ Минздрава России № 220н",
    organization: "Официальное опубликование правовых актов",
    kind: "НПА",
    url: "https://publication.pravo.gov.ru/document/0001202405310015",
    checked: CHECKED_AT,
  },
  {
    id: "first-aid-manual",
    title: "Первая помощь: учебное пособие для специалистов",
    organization: "Минздрав России",
    kind: "Документация",
    url: "https://static-0.minzdrav.gov.ru/system/attachments/attaches/000/080/128/original/%D0%A3%D1%87%D0%B5%D0%B1%D0%BD%D0%BE%D0%B5_%D0%BF%D0%BE%D1%81%D0%BE%D0%B1%D0%B8%D0%B5_%D0%B4%D0%BB%D1%8F_%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D0%B8%D1%81%D1%82%D0%BE%D0%B2.pdf?1766135269=",
    checked: CHECKED_AT,
  },
  {
    id: "fire-rules",
    title:
      "Правила противопожарного режима в Российской Федерации. Постановление Правительства № 1479",
    organization: "Официальное опубликование правовых актов",
    kind: "НПА",
    url: "https://publication.pravo.gov.ru/Document/View/0001202009250010",
    checked: CHECKED_AT,
  },
  {
    id: "ppe-rosseti",
    title:
      "Порядок применения электрозащитных средств. Требования к эксплуатации и испытаниям. СТО 34.01-30.1-001-2016",
    organization: "ПАО «Россети»",
    kind: "Стандарт",
    url: "https://www.rosseti.ru/upload/iblock/8c7/u1s2n3cwul8thn319i3sp3a8fnc83fl3.pdf",
    checked: CHECKED_AT,
  },
  {
    id: "pue",
    title: "Правила устройства электроустановок",
    organization: "ПАО «Россети»",
    kind: "НПА",
    url: "https://www.rosseti.ru/upload/iblock/ad5/3lehxsqvwcd60o4z0xgb3ei1j6zc4c6k.pdf",
    checked: CHECKED_AT,
    note:
      "Сборник включает главы разных изданий; применимость конкретной главы необходимо проверять отдельно.",
  },
  {
    id: "law-522",
    title:
      "Федеральный закон от 27.12.2018 № 522-ФЗ о развитии систем учёта электрической энергии",
    organization: "Официальное опубликование правовых актов",
    kind: "НПА",
    url: "https://publication.pravo.gov.ru/Document/View/0001201812280018",
    checked: CHECKED_AT,
  },
  {
    id: "pp-890",
    title:
      "Минимальный набор функций интеллектуальных систем учёта. Постановление Правительства № 890",
    organization: "Официальное опубликование правовых актов",
    kind: "НПА",
    url: "https://publication.pravo.gov.ru/Document/View/0001202006230034",
    checked: CHECKED_AT,
  },
  {
    id: "pp-442",
    title:
      "Основные положения функционирования розничных рынков электрической энергии. Постановление Правительства № 442",
    organization: "КонсультантПлюс",
    kind: "НПА",
    url: "https://www.consultant.ru/document/cons_doc_LAW_130498/",
    checked: CHECKED_AT,
  },
  {
    id: "gost-71331",
    title:
      "ГОСТ Р 71331-2024. Интеллектуальные системы учёта электрической энергии. Общие технические требования",
    organization: "Росстандарт",
    kind: "ГОСТ",
    url: "https://protect.gost.ru/gost/details/3a5b0307-1165-4ee4-aa30-d32202ff5675",
    checked: CHECKED_AT,
  },
  {
    id: "gost-58940",
    title:
      "ГОСТ Р 58940-2020. Информационная модель интеллектуальных систем учёта",
    organization: "Росстандарт",
    kind: "ГОСТ",
    url: "https://protect.gost.ru/gost/details/db1524da-37d6-4f46-8e83-1bcd2d9cb7ce",
    checked: CHECKED_AT,
  },
  {
    id: "gost-31818",
    title:
      "ГОСТ 31818.11-2012. Счётчики электрической энергии. Общие требования, испытания и условия испытаний",
    organization: "Росстандарт",
    kind: "ГОСТ",
    url: "https://protect.gost.ru/gost/details/b33c3946-fa8f-40bd-b586-8ffaa6d30fc2",
    checked: CHECKED_AT,
  },
  {
    id: "gost-31819-21",
    title:
      "ГОСТ 31819.21-2012. Статические счётчики активной энергии классов точности 1 и 2",
    organization: "Росстандарт",
    kind: "ГОСТ",
    url: "https://protect.gost.ru/gost/details/b76ccc72-5dc7-4c60-b712-c300002d55ee",
    checked: CHECKED_AT,
  },
  {
    id: "gost-31819-22",
    title:
      "ГОСТ 31819.22-2012. Статические счётчики активной энергии классов точности 0,2S и 0,5S",
    organization: "Росстандарт",
    kind: "ГОСТ",
    url: "https://protect.gost.ru/gost/details/6d4ae6a9-2d44-41c9-8303-71f842a27db6",
    checked: CHECKED_AT,
  },
  {
    id: "metrology-law",
    title:
      "Федеральный закон от 26.06.2008 № 102-ФЗ «Об обеспечении единства измерений»",
    organization: "Официальный интернет-портал правовой информации",
    kind: "НПА",
    url: "https://pravo.gov.ru/proxy/ips/?docbody=&nd=102122832",
    checked: CHECKED_AT,
  },
  {
    id: "nartis-i300",
    title: "Счётчик трёхфазный интеллектуальный НАРТИС-И300",
    organization: "НАРТИС",
    kind: "Документация",
    url: "https://www.nartis.ru/catalog/pribory-ucheta-elektricheskoy-energii/schetchik-trekhfaznyy-intellektualnyy-nartis-i300/",
    checked: CHECKED_AT,
  },
  {
    id: "nartis-support",
    title: "Документация и программное обеспечение НАРТИС",
    organization: "НАРТИС",
    kind: "Документация",
    url: "https://www.nartis.ru/support/",
    checked: CHECKED_AT,
  },
  {
    id: "rim-384",
    title: "Интеллектуальные счётчики РиМ 384",
    organization: "АО «Радио и Микроэлектроника»",
    kind: "Документация",
    url: "https://www.ao-rim.ru/product/schyetchiki/vysokovoltnye/rim-384-0x/",
    checked: CHECKED_AT,
  },
  {
    id: "mirtek-docs",
    title: "Эксплуатационная документация на приборы МИРТЕК",
    organization: "МИРТЕК",
    kind: "Документация",
    url: "https://mirtekgroup.com/dokumentaciya",
    checked: CHECKED_AT,
  },
  {
    id: "ce308-re-2016",
    title:
      "Счётчики электрической энергии трёхфазные многофункциональные CE308. Руководство по эксплуатации САНТ.411152.107-01",
    organization: "АО «Энергомера»",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note:
      "Архивное руководство семейства CE308. Для CE308 с ВПО 9.x/10.x и СПОДЭС применяется более новое руководство САНТ.411152.107-05.",
    fileName: "ce308_re_2.pdf",
    published: "05.04.2016",
    version: "САНТ.411152.107-01",
    topicIds: ["metering", "diagnostics", "smart", "equipment"],
    equipment: ["CE308", "AdminTools", "RS-485", "PLC", "GSM"],
    status: "Архив",
    pages: 267,
    coverage: "Прочитан полностью",
  },
  {
    id: "ce805m-re-11",
    title:
      "Устройство сбора и передачи данных УСПД CE805M, исполнение I. Руководство по эксплуатации САНТ.411189.004 РЭ",
    organization: "АО «Электротехнические заводы «Энергомера»",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note:
      "Руководство по техническим характеристикам, вводу, подключению, безопасности и обслуживанию CE805M исполнения I.",
    fileName: "ce805m_re(1).pdf",
    published: "28.09.2022",
    version: "Изменение 11",
    topicIds: ["safety", "smart", "diagnostics", "equipment"],
    equipment: ["CE805M", "УСПД", "RS-485", "G3-PLC", "GSM/LTE", "AdminTools"],
    status: "Действует",
    pages: 64,
    coverage: "Прочитан полностью",
  },
  {
    id: "ce208-ce308-spodes-9-10",
    title:
      "CE208 / CE308. Руководство пользователя САНТ.411152.068-05 / САНТ.411152.107-05. Версия ВПО 9.x; 10.x",
    organization: "АО «Энергомера»",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note:
      "Приоритетный источник для CE208 и CE308 с ВПО 9.x/10.x: СПОДЭС, DLMS/COSEM, PUSH, журналы, реле, электронные пломбы и обслуживание.",
    fileName: "ce208_ce308_v9_x_10_x_spds_rp.pdf",
    published: "04.06.2024",
    version: "ВПО 9.x; 10.x · СПОДЭС версия 2",
    topicIds: ["metering", "diagnostics", "smart", "equipment", "safety"],
    equipment: ["CE208", "CE308", "CE810", "CE901", "СПОДЭС", "DLMS/COSEM", "PUSH"],
    status: "Действует",
    pages: 286,
    coverage: "Прочитан полностью",
  },
  {
    id: "nartis-d101-field",
    title: "Инструкция по подключению пульта Д101",
    organization: "Полевой материал по оборудованию НАРТИС",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note:
      "Пошаговая инструкция для четырёхкнопочного выносного дисплея. Применимость подтверждают по маркировке и паспорту; служебные реквизиты в открытой базе не публикуются.",
    fileName: "Д101.pdf",
    published: "01.10.2025",
    version: "Полевая инструкция",
    topicIds: ["metering", "smart", "equipment"],
    equipment: ["НАРТИС", "Д101", "RF433", "выносной дисплей"],
    status: "Требует проверки",
    pages: 2,
    coverage: "Прочитан полностью",
  },
  {
    id: "nartis-d101-v-field",
    title: "Инструкция по подключению пульта Д101-В",
    organization: "Полевой материал по оборудованию НАРТИС",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note:
      "Инструкция для дисплея с цифровой клавиатурой. Коды программирования и доступа исключены из открытой базы; данные берут только из утверждённого источника.",
    fileName: "Д101-В.pdf",
    published: "14.11.2025",
    version: "Полевая инструкция",
    topicIds: ["metering", "smart", "equipment"],
    equipment: ["НАРТИС", "Д101-В", "Bluetooth", "BLE", "выносной дисплей"],
    status: "Требует проверки",
    pages: 3,
    coverage: "Прочитан полностью",
  },
  {
    id: "nartis-d101-2-v-field",
    title: "Инструкция по подключению пульта Д101-2-В Bluetooth",
    organization: "Полевой материал по оборудованию НАРТИС",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note:
      "Инструкция для четырёхкнопочного Bluetooth-дисплея. Индивидуальные реквизиты сопряжения не публикуются; совместимость проверяют до настройки.",
    fileName: "Д101-2-В.pdf",
    published: "13.12.2025",
    version: "Полевая инструкция",
    topicIds: ["metering", "smart", "equipment"],
    equipment: ["НАРТИС", "Д101-2-В", "RF2400/2", "Bluetooth", "BLE"],
    status: "Требует проверки",
    pages: 3,
    coverage: "Прочитан полностью",
  },
  {
    id: "nartis-modules-field",
    title: "НАРТИС: модули подключения, варианты ПУ и векторная диаграмма",
    organization: "ПАО «Россети Московский регион» (полевой материал)",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note:
      "Полевая памятка по RF433/RF2400, Д101, Nartis Tools, WebConfig и Ble Connect. Внешние признаки и диапазоны выпуска используются только как подсказка; внутренние ссылки и параметры доступа не перенесены.",
    fileName: "НАРТИС (Модули Подключения).docx",
    published: "17.10.2025",
    version: "Редакция 5",
    topicIds: ["smart", "diagnostics", "equipment", "metering"],
    equipment: [
      "НАРТИС",
      "Д101",
      "RF433",
      "RF2400/2",
      "Nartis Tools",
      "WebConfig",
      "Ble Connect",
    ],
    status: "Требует проверки",
    pages: 11,
    coverage: "Прочитан полностью",
  },
  {
    id: "nartis-pult-mobile-2025",
    title: "Мобильное приложение «НАРТИС ПУЛЬТ». Руководство по эксплуатации",
    organization: "ООО «НЭК ТЕХ»",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note:
      "Официальное руководство по установке Android-приложения, BLE-сопряжению, показаниям, параметрам сети, состоянию реле и обновлению ПО.",
    fileName: "НАРТИС.Пульт.pdf",
    published: "01.09.2025",
    version: "НЛПР.02.02001-01 91 01",
    topicIds: ["smart", "diagnostics", "equipment", "metering"],
    equipment: ["НАРТИС ПУЛЬТ", "Android", "BLE", "НАРТИС-И300", "РУН"],
    status: "Действует",
    pages: 12,
    coverage: "Прочитан полностью",
  },
  {
    id: "legal-meter-replacement-2026",
    title:
      "ПАО «Россети МР»: замена приборов учёта у юридических лиц. Адресно-посуточное планирование и контроль",
    organization: "ПАО «Россети Московский регион» / ООО «СтройЭнергоКом»",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note:
      "Операционная инструкция по ролям, плану на сутки, Карточке дня, Yoda и MAX. Перед применением сверяют актуальность локального процесса; персональные данные и реквизиты заявок не публикуются.",
    fileName: "Замена ПУ ЮЛ.pdf",
    published: "01.06.2026",
    version: "Операционная инструкция",
    topicIds: ["field", "adaptation", "metering", "safety"],
    equipment: ["Приборы учёта", "ИИК", "MAX", "Yoda", "динамические таблицы"],
    status: "Требует проверки",
    pages: 13,
    coverage: "Прочитан полностью",
  },
  {
    id: "rim384-manual-2022",
    title:
      "Интеллектуальные приборы учёта электроэнергии РиМ 384.01/2–384.04/2. Руководство по эксплуатации",
    organization: "АО «Радио и Микроэлектроника»",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note:
      "Заводское руководство по ИПУЭ 6/10 кВ: схема Арона, ДИЭ master/slave, RF1/RF2, GSM/GPRS, GPS/GLONASS, монтажный контроль, журналы и ограничения. Перед работой сверяют редакцию с паспортом комплекта.",
    fileName: "RE_RiM_384.pdf",
    published: "18.07.2022",
    version: "ВНКЛ.411152.048 РЭ · редакция по файлу",
    topicIds: ["safety", "electrical", "metering", "diagnostics", "smart", "equipment"],
    equipment: ["РиМ 384.01/2", "РиМ 384.02/2", "РиМ 384.03/2", "РиМ 384.04/2", "RF1", "RF2", "GSM/GPRS", "Setting_384"],
    status: "Требует проверки",
    pages: 36,
    coverage: "Прочитан полностью",
  },
  {
    id: "sm160-operator-2015",
    title: "Конфигурационное ПО «Конфигуратор SM». Руководство оператора",
    organization: "ООО Завод «Промприбор» / ЗАО ИТФ «Системы и технологии»",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note:
      "Руководство 2015 года по SM160/SM160-02: порты, устройства, теги, архивы, GPRS, РиМ RFPLC, резервные копии, журналы и Web-интерфейс. Используется как архивный источник с обязательной сверкой версии ПО.",
    fileName: "rukovodstvo_operatora_SM160_SM160-02.pdf",
    published: "02.10.2015",
    version: "ВЛСТ 340.00.000 РО · 2015",
    topicIds: ["smart", "diagnostics", "equipment"],
    equipment: ["SM160", "SM160-02", "Конфигуратор SM", "Пирамида", "Modbus", "RFPLC"],
    status: "Архив",
    pages: 52,
    coverage: "Прочитан полностью",
  },
  {
    id: "quant-direct-query-2024",
    title: "Доступ к ПУ КВАНТ по прямому опросу",
    organization: "Полевой материал по оборудованию КВАНТ",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note:
      "Краткая памятка по Link ST200.F1/F2 и временному технологическому режиму прямого опроса. Внешние ссылки не перенесены; актуальность ПО и канала проверяют локально.",
    fileName: "Доступ к ПУ КВАНТ по прямому опросу.pdf",
    published: "07.10.2024",
    version: "Полевая инструкция",
    topicIds: ["smart", "diagnostics", "equipment"],
    equipment: ["КВАНТ", "F1", "F2", "Link ST200", "F1F2Connector"],
    status: "Требует проверки",
    pages: 1,
    coverage: "Прочитан полностью",
  },
  {
    id: "irz-ruh2-field-2024",
    title: "Инструкция подключения к ПУ через IRZ RUH2",
    organization: "Внутренняя полевая инструкция",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note:
      "Порядок временного NAT/Port Forwarding для авторизованного опроса. Внутренние IP-адреса, учётные данные и примеры реквизитов ПУ исключены из открытой базы.",
    fileName: "Инструкция для подключения к ПУ через IRZ RUH2.pdf",
    published: "12.04.2024",
    version: "Полевая инструкция",
    topicIds: ["smart", "diagnostics", "equipment"],
    equipment: ["IRZ RUH2", "NAT", "Port Forwarding", "TCP/IP"],
    status: "Требует проверки",
    pages: 5,
    coverage: "Прочитан полностью",
  },
  {
    id: "mercury-connection-2020",
    title: "Подключение к компьютеру и программирование счётчиков «Меркурий»",
    organization: "Материал по оборудованию «Инкотекс»",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note:
      "Инструкция версии 06.2020 по «Меркурий 221», CAN/RS-485, универсальному конфигуратору и GSM/CSD. Заводские пароли исключены; доступность CSD и актуальность ПО проверяют перед применением.",
    fileName: "Инструкция по подключению.pdf",
    published: "06.2020",
    version: "Версия 06.2020",
    topicIds: ["safety", "metering", "smart", "diagnostics", "equipment"],
    equipment: ["Меркурий 221", "Меркурий 200", "Меркурий 206", "Меркурий 230", "Меркурий 233", "RS-485", "CAN", "GSM/CSD"],
    status: "Требует проверки",
    pages: 18,
    coverage: "Прочитан полностью",
  },
  {
    id: "quant-f1f2-config-2024",
    title: "Программа конфигурирования модулей связи F1/F2. Инструкция пользователя",
    organization: "Материал по оборудованию КВАНТ",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note:
      "Версия 1.4: одиночная и групповая настройка, PAN_ID, поиск каналов, перезагрузка и режим прямого опроса. Перед изменениями проверяют версию встроенного ПО модуля.",
    fileName: "Инструкция пользования программой конфигурирования модулей связи F1-F2_v1.4.pdf",
    published: "17.01.2024",
    version: "v1.4",
    topicIds: ["smart", "diagnostics", "equipment"],
    equipment: ["КВАНТ", "F1", "F2", "Link ST200", "PAN_ID"],
    status: "Требует проверки",
    pages: 3,
    coverage: "Прочитан полностью",
  },
  {
    id: "teleofis-field-2024",
    title: "Настройка модема ТЕЛЕОФИС через Terminal Configurator",
    organization: "Полевая инструкция по оборудованию ТЕЛЕОФИС",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note: "Порядок чтения параметров, настройки SIM и последовательного интерфейса, открытия и закрытия прозрачного USB-канала. Сетевые реквизиты и идентификаторы исключены из открытой базы.",
    fileName: "Настройка модема ТЕЛЕОФИС.pdf",
    published: "03.12.2024",
    version: "Полевая инструкция",
    topicIds: ["smart", "diagnostics", "equipment"],
    equipment: ["ТЕЛЕОФИС", "Terminal Configurator", "USB", "GSM/GPRS"],
    status: "Требует проверки",
    pages: 7,
    coverage: "Прочитан полностью",
  },
  {
    id: "nartis-zb-gateway-2024",
    title: "Настройка шлюза NARTIS ZB L 02.G1E3U1.ZR2.I6",
    organization: "Полевая инструкция по оборудованию НАРТИС",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note: "Web-настройка GPRS и Zigbee, координатор, обнаружение и массовый импорт узлов, белый список и диагностика. Учётные данные, адреса и идентификаторы исключены.",
    fileName: "Настройка ШЛ ZB L 02.G1E3U1.ZR2.I6.pdf",
    published: "28.11.2024",
    version: "Полевая инструкция",
    topicIds: ["smart", "diagnostics", "equipment"],
    equipment: ["NARTIS ZB L 02", "Zigbee", "ZigBee Eth", "GPRS", "CSV"],
    status: "Требует проверки",
    pages: 33,
    coverage: "Прочитан полностью",
  },
  {
    id: "mercury-spodes-configurator-2023",
    title: "Конфигуратор СПОДЭС. Руководство пользователя",
    organization: "АО «НПК „Инкотекс“»",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note: "Подключение по Direct HDLC, GSM/CSD и TCP/IP, измерения, профили, журналы, тарификация и управление. Реквизиты доступа в открытый индекс не включены.",
    fileName: "Конфигуратор СПОДЭС.pdf",
    published: "11.2023",
    version: "Версия 11.2023",
    topicIds: ["metering", "smart", "diagnostics", "equipment"],
    equipment: ["Меркурий", "Конфигуратор СПОДЭС", "DLMS/COSEM", "Direct HDLC"],
    status: "Требует проверки",
    pages: 83,
    coverage: "Прочитан полностью",
  },
  {
    id: "mercury-threephase-configurator-2021",
    title: "Конфигуратор трёхфазных счётчиков «Меркурий». Руководство пользователя",
    organization: "АО «НПК „Инкотекс“»",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note: "Версия 02.2021: CAN/RS-485, IrDA, GSM, тарифы, профили, события, качество и автоматизированный опрос. Совместимость сверяют с моделью и ОС.",
    fileName: "Конфигуратор трёхфазных.pdf",
    published: "02.2021",
    version: "Версия 02.2021",
    topicIds: ["metering", "smart", "diagnostics", "equipment"],
    equipment: ["Меркурий", "Меркурий 221", "CAN", "RS-485", "IrDA", "GSM"],
    status: "Требует проверки",
    pages: 44,
    coverage: "Прочитан полностью",
  },
  {
    id: "mercury-universal-configurator-2024",
    title: "Универсальный конфигуратор счётчиков «Меркурий». Руководство пользователя",
    organization: "АО «НПК „Инкотекс“»",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note: "Версия 03.2024: подключение, идентификация, протокол СПОДЭС, время, тарифы, профили, реле, журналы, потери и качество электроэнергии.",
    fileName: "Конфигуратор универсальный.pdf",
    published: "03.2024",
    version: "Версия 03.2024",
    topicIds: ["metering", "smart", "diagnostics", "equipment"],
    equipment: ["Меркурий 200", "Меркурий 201", "Меркурий 203", "Меркурий 206", "Меркурий 221"],
    status: "Требует проверки",
    pages: 41,
    coverage: "Прочитан полностью",
  },
  {
    id: "mercury-204-238-manual-2024",
    title: "Счётчики электрической энергии «Меркурий 204, 208, 234, 238». Руководство по эксплуатации",
    organization: "АО «НПК „Инкотекс“»",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note: "Исполнения, схемы, измерения, архивы, связь, GSM-индикаторы, монтаж, безопасность, обслуживание и поверка. Применяется только к точному исполнению прибора.",
    fileName: "Меркурий 204,208,234,238 руководство.pdf",
    published: "01.2024",
    version: "Версия 01.2024",
    topicIds: ["safety", "metering", "smart", "diagnostics", "equipment"],
    equipment: ["Меркурий 204", "Меркурий 208", "Меркурий 234", "Меркурий 238", "GSM/GPRS", "СПОДЭС"],
    status: "Требует проверки",
    pages: 68,
    coverage: "Прочитан полностью",
  },
  {
    id: "milur307s-manual-2023",
    title: "Счётчик электрической энергии трёхфазный многофункциональный Милур 307S. Руководство по эксплуатации",
    organization: "АО «ПКК Миландр»",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note: "Расширенное руководство 2023 года: исполнения, SPLIT, измерения, профили, журналы, качество, связь, ИСУЭ, реле, монтаж и поверка.",
    fileName: "Милур 307S.pdf",
    published: "2023",
    version: "Расширенное руководство · 2023",
    topicIds: ["safety", "metering", "smart", "diagnostics", "equipment"],
    equipment: ["Милур 307S", "Милур Т", "SPLIT", "СПОДЭС", "реле управления нагрузкой"],
    status: "Требует проверки",
    pages: 140,
    coverage: "Прочитан полностью",
  },
  {
    id: "kvant-gsm-field-2024",
    title: "Настройка GSM-модуля КВАНТ с двумя SIM",
    organization: "Полевая инструкция по оборудованию КВАНТ",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note: "Краткая памятка по настройке и проверке обеих SIM. SMS-команды, пароль, параметры оператора и сервера исключены из открытой базы.",
    fileName: "НАСТРОЙКА GSM КВАНТ.pdf",
    published: "08.10.2024",
    version: "Полевая инструкция",
    topicIds: ["smart", "diagnostics", "equipment"],
    equipment: ["КВАНТ", "GSM", "dual SIM"],
    status: "Требует проверки",
    pages: 1,
    coverage: "Прочитан полностью",
  },
  {
    id: "mercury-gsm-module-2024",
    title: "Инструкция по настройке GSM-модулей счётчиков «Меркурий»",
    organization: "АО «НПК „Инкотекс“»",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note: "Версия 03.2024: SMS, GPRS/CSD, интерфейс прибора, прямой канал, RS-485, резервный сервер и MQTT. Команды и секреты не публикуются.",
    fileName: "Настройка GSM модуля.pdf",
    published: "03.2024",
    version: "Версия 03.2024",
    topicIds: ["smart", "diagnostics", "equipment"],
    equipment: ["GSM-модуль Меркурий", "GPRS", "CSD", "RS-485", "MQTT"],
    status: "Требует проверки",
    pages: 10,
    coverage: "Прочитан полностью",
  },
  {
    id: "sm160-link-field-2024",
    title: "Настройка SM160 и Link ST200 F1/F2",
    organization: "Полевая инструкция по SM160 и КВАНТ",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note: "GPRS, последовательные порты, модемный пул, СПОДЭС-счётчики и диагностические журналы. Учётные данные, IP, номера приборов и радиоидентификаторы исключены.",
    fileName: "настройка SM 160 + link F1_F2.pdf",
    published: "03.12.2024",
    version: "Полевая инструкция",
    topicIds: ["smart", "diagnostics", "equipment"],
    equipment: ["SM160", "Link ST200", "F1", "F2", "НАРТИС-И300", "СПОДЭС"],
    status: "Требует проверки",
    pages: 32,
    coverage: "Прочитан полностью",
  },
  {
    id: "instrumental-check-training-2023",
    title: "Методика проведения инструментальной проверки счётчиков электроэнергии",
    organization: "Учебный материал · Шевчук А. Р.",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note: "Осмотр, средства измерений, прямые и полукосвенные схемы, ТТ, ВАФ, акт и передача на экспертизу. Нормативные ссылки и локальные процедуры сверяют перед применением.",
    fileName: "Проведение инструментальной проверки.pdf",
    published: "12.2023",
    version: "Учебная презентация",
    topicIds: ["safety", "metering", "field", "diagnostics", "losses"],
    equipment: ["ВАФ", "образцовый счётчик", "токоизмерительные клещи", "ТТ"],
    status: "Требует проверки",
    pages: 64,
    coverage: "Прочитан полностью",
  },
  {
    id: "pnr-data-restoration-training-2024",
    title: "Организация удалённого сбора данных и восстановление опроса ИСУЭ",
    organization: "Учебный материал · Шевчук А. Р.",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note: "ПНР счётчиков и УСПД, «Пирамида Сети», маршруты, балансы и диагностика отсутствия опроса. Пароли, адреса и идентификаторы исключены.",
    fileName: "Проведение ПНР.pdf",
    published: "08.2024",
    version: "Учебная презентация",
    topicIds: ["smart", "diagnostics", "metering", "equipment"],
    equipment: ["УСПД", "Пирамида Сети", "PLC", "RS-485", "GSM/GPRS"],
    status: "Требует проверки",
    pages: 98,
    coverage: "Прочитан полностью",
  },
  {
    id: "ce805m-plc-rs485-field",
    title: "Настройка УСПД Энергомера CE805M PLC + RS-485",
    organization: "Полевая инструкция по оборудованию Энергомера",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note: "Снимки интерфейса: локальный доступ, чтение конфигурации, PLC, RS-485, таблица приборов, группы и задания. Сетевые реквизиты и идентификаторы исключены.",
    fileName: "Настройка энергомера 805М PLC+RS 485.pdf",
    version: "Полевая инструкция",
    topicIds: ["smart", "diagnostics", "equipment"],
    equipment: ["CE805M", "PLC", "RS-485", "AdminTools"],
    status: "Требует проверки",
    pages: 45,
    coverage: "Прочитан полностью",
  },
  {
    id: "ce208-type-description-2024",
    title: "Описание типа СИ: счётчики однофазные многофункциональные CE 208",
    organization: "Росстандарт",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note: "Регистрационный № 55454-13; назначение, исполнения, функции, метрологические и технические характеристики. Утверждено приказом № 1900 от 14.08.2024.",
    fileName: "ОПИСАНИЕ ТИПА ce208_ot.pdf",
    published: "14.08.2024",
    version: "19 листов",
    topicIds: ["metering", "smart", "equipment"],
    equipment: ["CE208", "CE901", "PLC", "RS-485", "GSM"],
    status: "Действует",
    pages: 19,
    coverage: "Прочитан полностью",
  },
  {
    id: "nartis-i100-type-description-2022",
    title: "Описание типа СИ: НАРТИС-И100",
    organization: "Росстандарт",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note: "Регистрационный № 86199-22; W111, SP1, интерфейсы, СПОДЭС/ПИРС, четыре тарифа и характеристики. Также входит в приложение к приказу № 1739.",
    fileName: "Описание типа НАРТИС 100.pdf",
    published: "18.07.2022",
    version: "14 листов · отдельная копия",
    topicIds: ["metering", "smart", "equipment"],
    equipment: ["НАРТИС-И100", "НАРТИС-Д101", "W111", "SP1"],
    status: "Действует",
    pages: 15,
    coverage: "Прочитан полностью",
  },
  {
    id: "nartis-i300-type-description-2022",
    title: "Описание типа СИ: НАРТИС-И300",
    organization: "Росстандарт",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note: "Регистрационный № 86200-22; W131, SP31, исполнения, интерфейсы, функции и характеристики. Также входит в приложение к приказу № 1739.",
    fileName: "Описание типа НАРТИС И300.pdf",
    published: "18.07.2022",
    version: "15 листов · отдельная копия",
    topicIds: ["metering", "smart", "equipment"],
    equipment: ["НАРТИС-И300", "НАРТИС-Д101", "W131", "SP31"],
    status: "Действует",
    pages: 16,
    coverage: "Прочитан полностью",
  },
  {
    id: "milur-gsm-guide-2023",
    title: "Подключение и настройка GSM-модуля для ПУ Милур 307/107",
    organization: "Полевая инструкция по оборудованию «Милур»",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note: "Стандартные и SPLIT GZ исполнения, RS-485, оптопорт, временная ретрансляция и запись RAM/Flash. Реквизиты и ссылки на загрузку исключены.",
    fileName: "Подключение и настройка GSM модуля для ПУ Милур 307-107_v_10.01.23.pdf",
    published: "10.01.2023",
    version: "Редакция 10.01.2023",
    topicIds: ["smart", "diagnostics", "equipment"],
    equipment: ["Милур 107", "Милур 307", "SPLIT", "GSM", "USO-2"],
    status: "Требует проверки",
    pages: 12,
    coverage: "Прочитан полностью",
  },
  {
    id: "ce-dlms-field",
    title: "Подключение к приборам учёта Энергомера CE по DLMS",
    organization: "Полевая инструкция по оборудованию Энергомера",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note: "COM-порт, параметры канала, авторизация, чтение групп профиля и экспорт. Пароли и примеры реквизитов исключены.",
    fileName: "Подключение к ПУ Энрегомера СЕ DLMS.pdf",
    version: "Полевая инструкция",
    topicIds: ["smart", "metering", "diagnostics", "equipment"],
    equipment: ["Энергомера CE", "DLMS/COSEM", "СПОДЭС", "COM-порт"],
    status: "Требует проверки",
    pages: 16,
    coverage: "Прочитан полностью",
  },
  {
    id: "zigbee-settlement-act-2025",
    title: "Акт анализа сети ZigBee населённого пункта",
    organization: "Локальная операционная форма",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note: "Сканирование из четырёх точек, проверка УСПД, классификация сетей и повторный контроль. Координаты и сетевые идентификаторы исключены.",
    fileName: "Приложение №1_Акт анализа н.п..pdf",
    published: "2025",
    version: "Приложение № 1",
    topicIds: ["smart", "diagnostics", "field", "equipment"],
    equipment: ["ZigBee", "Telegesis", "УСПД", "Hermes"],
    status: "Требует проверки",
    pages: 2,
    coverage: "Прочитан полностью",
  },
  {
    id: "rosstandart-order-1739-2022",
    title: "Приложение к приказу Росстандарта № 1739 об утверждении типов СИ",
    organization: "Росстандарт",
    kind: "Документация",
    checked: LATEST_UPDATE,
    note: "16 типов средств измерений; позиции 15–16 — НАРТИС-И100 и И300. Включает полные описания типов, поэтому пересекается с двумя отдельными файлами.",
    fileName: "Приложение_к_приказу_об_утверждении_типа.pdf",
    published: "18.07.2022",
    version: "Приказ № 1739 · приложение",
    topicIds: ["metering", "equipment"],
    equipment: ["НАРТИС-И100", "НАРТИС-И300", "реестр СИ"],
    status: "Действует",
    pages: 129,
    coverage: "Прочитан полностью",
  },
];

const article = (
  data: Omit<Article, "updated"> & { updated?: string },
): Article => ({
  ...data,
  updated: data.updated ?? CHECKED_AT,
});

export const stages: Stage[] = [
  {
    id: "first-day",
    code: "01",
    title: "Первый рабочий день",
    shortTitle: "Первый день",
    timeframe: "День 1",
    outcome: "Понимаю правила входа в работу и не выхожу за границы допуска.",
    description:
      "Люди, документы, рабочее место, получение задания и безопасная фиксация результата.",
    color: "#005A9B",
    ink: "#FFFFFF",
    articles: [
      article({
        id: "first-day-route",
        title: "Маршрут первого рабочего дня",
        summary:
          "Что должно произойти до первого самостоятельного действия: оформление, инструктаж, знакомство с руководителем и наставником.",
        level: "Старт",
        readTime: 5,
        tags: ["адаптация", "инструктаж", "наставник"],
        shortAnswer:
          "Первый день нужен не для демонстрации скорости, а для безопасного входа в систему работы. Получите понятные контакты, пройдите назначенные инструктажи, выясните порядок заданий и не приступайте к операциям, на которые ещё нет допуска.",
        procedure: [
          "Уточнить непосредственного руководителя, наставника и способ связи с ними.",
          "Пройти предусмотренные вводный и первичный инструктажи с оформлением в установленном порядке.",
          "Получить локальные инструкции, маршрут эвакуации, сведения о первой помощи и пожарной безопасности.",
          "Проверить, кто выдаёт задания, кто допускает к работе и кому сообщать об отклонениях.",
          "Записать вопросы и разобрать их с наставником до первого выезда.",
        ],
        keyPoints: [
          "Трудовой разряд, группа по электробезопасности и фактическое право выполнять конкретную работу — не одно и то же.",
          "Обучение и допуск к самостоятельной работе оформляет работодатель по установленной процедуре.",
          "Локальные инструкции конкретизируют общие правила применительно к организации и рабочему месту.",
        ],
        mistakes: [
          "Считать присутствие опытного коллеги автоматическим разрешением на любую операцию.",
          "Подписывать документ, содержание которого не разобрано.",
          "Скрывать непонимание терминов или порядка действий.",
        ],
        safety:
          "До документированного допуска выполняйте только те действия, которые прямо поручены и безопасно организованы ответственным работником.",
        selfCheck: [
          {
            question: "Кто определяет право на самостоятельную работу?",
            answer:
              "Работодатель — после требуемой подготовки, проверки знаний и оформления допуска распорядительным документом.",
          },
        ],
        sourceIds: [
          "professional-standard",
          "personnel-current",
          "potee-current",
        ],
      }),
      article({
        id: "people-and-roles",
        title: "К кому обращаться: рабочая карта ролей",
        summary:
          "Как не путать административного руководителя, выдающего задание, допускающего, производителя работ и наставника.",
        level: "Старт",
        readTime: 5,
        tags: ["роли", "руководитель", "бригада"],
        shortAnswer:
          "Один человек может совмещать некоторые роли только в разрешённых случаях, но каждая роль имеет отдельные обязанности. Перед работой важно знать не только фамилию старшего, но и в каком качестве он действует.",
        procedure: [
          "Записать ФИО и контакты непосредственного руководителя и наставника.",
          "Для конкретной работы назвать выдающего задание, допускающего и производителя работ.",
          "Уточнить, кому докладывать о начале, перерыве, изменении условий и завершении.",
          "При неясности полномочий остановиться и получить разъяснение до действия.",
        ],
        keyPoints: [
          "Наставник помогает учиться, но не отменяет организационные меры безопасности.",
          "Член бригады выполняет требования правил, инструктажа и указания ответственных за безопасное ведение работ.",
          "Изменение состава, места или условий работы требует оформления по применимому порядку.",
        ],
        mistakes: [
          "Ориентироваться только на должность человека, не выясняя его роль в конкретной работе.",
          "Самостоятельно расширять порученное задание.",
          "Сообщать об отклонении только после завершения работы.",
        ],
        safety:
          "Если ответственный за безопасное ведение работ не определён или недоступен, не начинайте потенциально опасную операцию.",
        selfCheck: [
          {
            question: "Почему «старший в машине» не всегда производитель работ?",
            answer:
              "Потому что роль определяется оформлением и назначением на конкретную работу, а не неформальным старшинством.",
          },
        ],
        sourceIds: ["potee-current", "personnel-current"],
      }),
      article({
        id: "authority-boundaries",
        title: "Границы полномочий электромонтёра",
        summary:
          "Простой способ понять, можно ли продолжать, когда задача изменилась уже на объекте.",
        level: "Старт",
        readTime: 6,
        tags: ["полномочия", "стоп-работа", "допуск"],
        shortAnswer:
          "Разряд показывает квалификацию по профессии, но конкретная операция определяется заданием, группой, подготовкой рабочего места, составом бригады и локальными инструкциями. Новая неисправность не является автоматическим новым заданием.",
        procedure: [
          "Сопоставить фактическое место и оборудование с заданием.",
          "Проверить, не изменились ли напряжение, схема, границы рабочего места или состав бригады.",
          "Оценить, входит ли обнаруженная операция в программу подготовки и локальную инструкцию.",
          "При расхождении прекратить действия, оградить опасную зону при необходимости и доложить руководителю.",
          "Продолжить только после безопасного переоформления или нового указания.",
        ],
        keyPoints: [
          "Право остановить работу при возникновении опасности — часть профессиональной ответственности.",
          "Диагностировать признак и устранять его причину могут быть разными задачами с разными допусками.",
          "Устное давление по срокам не меняет требований безопасности.",
        ],
        mistakes: [
          "«Раз уж приехали, сделаем заодно».",
          "Считать отсутствие видимых искр доказательством безопасности.",
          "Подменять согласование сообщением постфактум.",
        ],
        safety:
          "При непосредственной угрозе людям сначала прекращают опасное действие и обеспечивают безопасность, затем информируют по установленной цепочке.",
        selfCheck: [
          {
            question: "Что делать, если объект не соответствует схеме в задании?",
            answer:
              "Не угадывать схему; остановиться, зафиксировать расхождение и получить решение ответственного лица.",
          },
        ],
        sourceIds: ["potee-current", "personnel-current"],
      }),
      article({
        id: "first-departure",
        title: "Подготовка к первому выезду",
        summary:
          "Проверка задания, СИЗ, инструмента, связи, маршрута и формы фиксации до выхода на объект.",
        level: "Старт",
        readTime: 6,
        tags: ["выезд", "СИЗ", "чек-лист"],
        shortAnswer:
          "Хороший выезд начинается до посадки в автомобиль. Цель подготовки — заранее обнаружить отсутствие данных, защитных средств, исправного инструмента или связи, а не компенсировать это на объекте.",
        procedure: [
          "Прочитать цель, адрес, объект, границы и форму организации работы.",
          "Сверить состав бригады, контакты, маршрут и порядок доступа к объекту.",
          "Осмотреть СИЗ и инструмент, проверить маркировку и сроки испытаний там, где они предусмотрены.",
          "Проверить заряд телефона, ноутбука, адаптеров и наличие офлайн-копий нужных схем.",
          "Подготовить единый шаблон записи: объект, время, действие, измерение, фото, отклонение, решение.",
        ],
        keyPoints: [
          "Исправность и комплектность проверяются до применения.",
          "Документы производителя нужны для конкретной модели и исполнения оборудования.",
          "Отсутствие связи должно быть предусмотрено заранее: контакты и данные задания сохраняют офлайн.",
        ],
        mistakes: [
          "Брать непроверенный индикатор или прибор «на всякий случай».",
          "Хранить адреса и задание только в переписке, недоступной без сети.",
          "Начинать маршрут без согласованного приоритета объектов.",
        ],
        safety:
          "Не применяйте средство защиты или измерительный прибор с повреждением, неясной маркировкой либо просроченным испытанием, когда оно обязательно.",
        selfCheck: [
          {
            question: "Какая минимальная запись нужна для каждого измерения?",
            answer:
              "Объект и точка, дата и время, режим/условия, измеренная величина с единицей, применённый прибор и исполнитель.",
          },
        ],
        sourceIds: ["ppe-rosseti", "potee-current"],
      }),
      article({
        id: "field-notes",
        title: "Рабочая запись и фото без потери контекста",
        summary:
          "Как сделать данные пригодными для акта, диагностики и повторного выезда.",
        level: "Старт",
        readTime: 5,
        tags: ["фото", "фиксация", "данные"],
        shortAnswer:
          "Фотография без объекта, времени и пояснения быстро превращается в догадку. Каждая запись должна отвечать: где, когда, что наблюдалось, в каком режиме, чем измерено и что сделано.",
        procedure: [
          "Присвоить объекту устойчивое обозначение из задания или информационной системы.",
          "Сначала сделать общий кадр привязки, затем табличку, схему и нужную деталь.",
          "Записывать показания вместе с единицами, фазой, режимом и временем.",
          "Отделять наблюдение от вывода: «клемма потемневшая» — факт; «перегрев из-за контакта» — гипотеза до проверки.",
          "До отъезда проверить читаемость фото и полноту обязательных полей.",
        ],
        keyPoints: [
          "Оригинал фотографии сохраняют; редактура не должна уничтожать доказательный контекст.",
          "Персональные данные и изображения людей собирают только в объёме, необходимом для задачи и разрешённом локальными правилами.",
          "Одинаковые названия и порядок кадров ускоряют последующую проверку.",
        ],
        mistakes: [
          "Фотографировать только крупным планом без привязки к объекту.",
          "Записывать число без единицы измерения и фазы.",
          "Исправлять значение без сохранения истории изменения.",
        ],
        selfCheck: [
          {
            question: "Чем факт отличается от диагностического вывода?",
            answer:
              "Факт непосредственно наблюдаем или измерен; вывод объясняет факт и должен подтверждаться дополнительными данными.",
          },
        ],
        sourceIds: ["professional-standard", "personnel-current"],
      }),
    ],
  },
  {
    id: "admission",
    code: "02",
    title: "Допуск и безопасность",
    shortTitle: "Допуск",
    timeframe: "Дни 1–30",
    outcome: "Знаю, как организуется безопасная работа и когда обязан остановиться.",
    description:
      "Подготовка персонала, группы, формы работы, технические меры, СИЗ и первая помощь.",
    color: "#D1D3D4",
    ink: "#0A1720",
    articles: [
      article({
        id: "independent-work",
        title: "Путь к самостоятельной работе",
        summary:
          "Инструктаж, подготовка по новой должности, стажировка, проверка знаний, дублирование — что применяется и кто решает.",
        level: "База",
        readTime: 8,
        tags: ["стажировка", "проверка знаний", "допуск"],
        shortAnswer:
          "Самостоятельная работа начинается не по истечении условного срока, а после выполнения применимых этапов подготовки и оформления допуска работодателем. Набор этапов зависит от категории персонала, должности и характера работ.",
        procedure: [
          "Определить категорию персонала и требования программы подготовки по должности.",
          "Пройти теоретическую подготовку, инструктажи и стажировку, если она предусмотрена.",
          "Пройти предэкзаменационную подготовку и первичную проверку знаний в установленном объёме.",
          "Пройти дублирование, если оно обязательно для соответствующей категории персонала.",
          "Получить оформленный допуск к самостоятельной работе и изучить его границы.",
        ],
        keyPoints: [
          "Для нового работника и для перевода на другую должность программы могут различаться.",
          "Минимальные сроки дублирования нельзя механически переносить на любую должность: сначала определяют категорию персонала.",
          "Допуск оформляется организационно; устное «можешь работать один» его не заменяет.",
        ],
        mistakes: [
          "Считать календарный месяц автоматическим допуском.",
          "Путать проверку знаний по охране труда с полной подготовкой по должности.",
          "Использовать программу подготовки коллеги как собственный официальный документ.",
        ],
        safety:
          "До оформления самостоятельной работы соблюдайте установленный режим работы под руководством или надзором.",
        selfCheck: [
          {
            question: "Всегда ли новому электромонтёру нужно 12 смен дублирования?",
            answer:
              "Нет. Требование зависит от категории персонала и применимой программы; его нельзя назначать только по названию профессии.",
          },
        ],
        sourceIds: ["personnel-current", "personnel-official"],
      }),
      article({
        id: "electrical-safety-groups",
        title: "Группы II и III: что они действительно означают",
        summary:
          "Группа подтверждает знания и условия допуска, но не является универсальным разрешением на любую работу.",
        level: "База",
        readTime: 8,
        tags: ["II группа", "III группа", "электробезопасность"],
        shortAnswer:
          "Группа по электробезопасности характеризует уровень знаний и допуска в установленных условиях. Она рассматривается вместе с должностью, возрастом, стажем в предыдущей группе, видом электроустановки и назначенной ролью.",
        procedure: [
          "Уточнить, к каким электроустановкам и в качестве какого персонала вы допущены.",
          "Сверить запись о группе, дату проверки знаний и область действия.",
          "Перед конкретной работой проверить соответствие группы назначенной роли.",
          "Планировать повышение группы через утверждённую программу и проверку знаний.",
        ],
        keyPoints: [
          "Группа III присваивается только работникам старше 18 лет.",
          "При первичном переводе из установок до 1000 В в установки выше 1000 В начальная группа не может быть выше III.",
          "Группа не отменяет наряд, распоряжение, подготовку рабочего места и инструктаж.",
        ],
        mistakes: [
          "Говорить «у меня III группа, значит можно всё до 1000 В».",
          "Оценивать готовность только по запомненным ответам экзамена.",
          "Не проверять срок очередной проверки знаний.",
        ],
        safety:
          "Точную достаточность группы для роли и работы определяйте по действующим правилам и локальному назначению, а не по бытовому толкованию.",
        selfCheck: [
          {
            question: "Что важнее для допуска: разряд или группа?",
            answer:
              "Они описывают разные вещи. Для конкретной работы одновременно учитываются квалификация, группа, подготовка и организационное назначение.",
          },
        ],
        sourceIds: ["potee-current", "personnel-current"],
      }),
      article({
        id: "work-forms",
        title: "Наряд, распоряжение и текущая эксплуатация",
        summary:
          "Как различать формы организации работ и почему нельзя выбирать их исполнителю по удобству.",
        level: "База",
        readTime: 9,
        tags: ["наряд-допуск", "распоряжение", "текущая эксплуатация"],
        shortAnswer:
          "Форму работы определяют правила, характер операции и утверждённые перечни. Наряд фиксирует место, содержание, условия, состав и ответственных; распоряжение имеет установленный объём и срок; текущая эксплуатация возможна только для включённых в утверждённый перечень работ.",
        procedure: [
          "Определить установку, напряжение, характер и границы работы.",
          "Проверить, кем и в какой форме выдано задание.",
          "Сверить состав бригады, ответственных, подготовку рабочего места и срок.",
          "Получить целевой инструктаж и допуск там, где они требуются.",
          "При изменении условий действовать по процедуре перерыва, перевода или переоформления.",
        ],
        keyPoints: [
          "Текущая эксплуатация — не синоним «простая привычная работа».",
          "Распоряжение не превращается в бессрочное разрешение.",
          "Содержание работы и реальные границы рабочего места должны совпадать с оформлением.",
        ],
        mistakes: [
          "Выбирать форму работы после её выполнения.",
          "Добавлять к заданию соседнее оборудование.",
          "Начинать до допуска, потому что рабочее место выглядит подготовленным.",
        ],
        safety:
          "При любом расхождении между документом и фактической схемой остановитесь и сообщите ответственному работнику.",
        selfCheck: [
          {
            question: "Можно ли считать любую часто выполняемую операцию текущей эксплуатацией?",
            answer:
              "Нет. Она должна соответствовать требованиям правил и утверждённому работодателем перечню.",
          },
        ],
        sourceIds: ["potee-current"],
      }),
      article({
        id: "safe-workplace",
        title: "Организационные и технические мероприятия",
        summary:
          "Две взаимосвязанные линии защиты: кто организует работу и как физически готовят рабочее место.",
        level: "База",
        readTime: 10,
        tags: ["отключение", "проверка напряжения", "заземление"],
        shortAnswer:
          "Организационные меры распределяют ответственность и управляют ходом работы. Технические меры предотвращают подачу напряжения и воздействие опасных факторов. Одни не заменяют другие.",
        procedure: [
          "Организационно оформить работу, назначить ответственных, подготовить место и выполнить допуск.",
          "Произвести необходимые отключения и принять меры против ошибочного или самопроизвольного включения.",
          "Вывесить запрещающие плакаты и при необходимости оградить остающиеся под напряжением части.",
          "Проверить отсутствие напряжения предназначенным для этого исправным указателем.",
          "Установить заземления там, где они требуются, затем разместить предписывающие и указательные плакаты.",
          "Обеспечить надзор, оформление перерывов, переводов и завершения работы.",
        ],
        keyPoints: [
          "Последовательность технических мероприятий имеет значение.",
          "Положение аппарата или погасший индикатор не доказывают отсутствие напряжения.",
          "Подготовленное рабочее место нельзя самовольно расширять.",
        ],
        mistakes: [
          "Начинать проверку отсутствия напряжения неподходящим прибором.",
          "Снимать плакаты или ограждения ради удобства.",
          "Считать устный запрет включения достаточной защитой.",
        ],
        safety:
          "Эта статья объясняет логику, но не заменяет обучение практическому выполнению технических мероприятий и локальную инструкцию.",
        selfCheck: [
          {
            question: "Почему отключение не равно отсутствию напряжения?",
            answer:
              "Возможны ошибочное включение, обратная подача, наведённое или остаточное напряжение и несоответствие схемы.",
          },
        ],
        sourceIds: ["potee-current"],
      }),
      article({
        id: "protective-equipment",
        title: "Электрозащитные средства: выбор и осмотр",
        summary:
          "Как проверить назначение, напряжение, состояние, маркировку и срок испытания до применения.",
        level: "База",
        readTime: 8,
        tags: ["СИЗ", "указатель напряжения", "диэлектрические перчатки"],
        shortAnswer:
          "Защитное средство выбирают по назначению и классу напряжения, осматривают перед применением и проверяют установленную маркировку/срок испытания. Наличие предмета в комплекте не доказывает его пригодность.",
        procedure: [
          "Определить опасный фактор и требуемый вид защиты.",
          "Сверить допустимое напряжение и назначение средства.",
          "Осмотреть поверхность, комплектность, чистоту и отсутствие повреждений.",
          "Проверить инвентарный номер, штамп или иной предусмотренный учёт и срок испытания.",
          "Применять по инструкции, не изменяя конструкцию и не сокращая безопасные расстояния.",
          "После работы очистить, уложить и сообщить о дефекте по установленному порядку.",
        ],
        keyPoints: [
          "Основные и дополнительные средства имеют разную защитную функцию.",
          "Условия хранения влияют на пригодность резины, изоляции и указателей.",
          "Средство, перенёсшее удар или воздействие, требует оценки, даже если дефект малозаметен.",
        ],
        mistakes: [
          "Применять средство с нечитаемой маркировкой.",
          "Проверять пригодность только по внешнему виду.",
          "Хранить защитные средства рядом с маслами, острыми предметами или нагревом.",
        ],
        safety:
          "Повреждённое, загрязнённое либо просроченное средство изымают из применения по локальному порядку; его нельзя «доработать» на месте.",
        selfCheck: [
          {
            question: "Что проверяют раньше: удобство или назначение?",
            answer:
              "Сначала соответствие опасному фактору и классу напряжения, затем состояние и правильность применения.",
          },
        ],
        sourceIds: ["ppe-rosseti", "potee-current"],
      }),
      article({
        id: "first-aid",
        title: "Первая помощь при электротравме",
        summary:
          "Безопасность места, прекращение воздействия, вызов помощи, оценка состояния и поддержка пострадавшего.",
        level: "База",
        readTime: 10,
        tags: ["первая помощь", "112", "электротравма"],
        shortAnswer:
          "Сначала исключают опасность для оказывающего помощь и прекращают воздействие тока безопасным способом. Затем вызывают 112 или 103, оценивают сознание и дыхание и действуют в пределах обучения по действующему порядку первой помощи.",
        procedure: [
          "Оценить безопасность места и не приближаться, пока источник опасности не контролируется.",
          "Организовать безопасное прекращение воздействия электрического тока.",
          "Вызвать 112 или 103, сообщить место, характер происшествия, число пострадавших и опасности.",
          "Оценить сознание и нормальное дыхание; при их отсутствии начать предусмотренные обучением действия.",
          "Провести обзорный осмотр, остановить наружное кровотечение и поддерживать состояние до передачи специалистам.",
        ],
        keyPoints: [
          "Нельзя становиться вторым пострадавшим.",
          "Даже при внешне хорошем состоянии после электротравмы нужна медицинская оценка.",
          "Практические навыки сердечно-лёгочной реанимации осваиваются на очном обучении с тренажёром.",
        ],
        mistakes: [
          "Касаться пострадавшего до прекращения воздействия.",
          "Тратить время на поиск ожога до оценки сознания и дыхания.",
          "Оставлять пострадавшего одного после восстановления состояния.",
        ],
        safety:
          "Не используйте импровизированный способ освобождения, если он создаёт риск попадания под напряжение; организуйте отключение и помощь обученного персонала.",
        selfCheck: [
          {
            question: "Какое действие всегда первое?",
            answer:
              "Оценка безопасности места для себя, пострадавшего и окружающих.",
          },
        ],
        sourceIds: ["first-aid-order", "first-aid-manual", "potee-current"],
      }),
    ],
  },
  {
    id: "electrical-basics",
    code: "03",
    title: "Электротехническая база",
    shortTitle: "Электротехника",
    timeframe: "Недели 1–8",
    outcome: "Связываю схему, измерение и физический смысл величины.",
    description:
      "Трёхфазная сеть, мощность и энергия, нейтраль, защитные проводники и измерения.",
    color: "#C7E0EF",
    ink: "#082B43",
    articles: [
      article({
        id: "voltage-current-resistance",
        title: "Напряжение, ток и сопротивление",
        summary:
          "Как не путать три величины и правильно читать результат измерения.",
        level: "База",
        readTime: 7,
        tags: ["напряжение", "ток", "сопротивление"],
        shortAnswer:
          "Напряжение описывает разность потенциалов между точками, ток — перенос заряда через цепь, сопротивление — противодействие току. Измерение имеет смысл только вместе с точками подключения, режимом цепи, диапазоном и единицей.",
        procedure: [
          "Перед измерением сформулировать вопрос: между какими точками и в каком режиме нужна величина.",
          "Выбрать прибор, категорию, диапазон и способ подключения по инструкции.",
          "Проверить исправность прибора предусмотренным способом.",
          "Снять значение, зафиксировать единицу, точки, фазу, время и режим нагрузки.",
          "Сопоставить результат со схемой и ожидаемым диапазоном, а не только с одним «нормальным» числом.",
        ],
        keyPoints: [
          "Токовые клещи измеряют ток охваченного проводника; охват сразу нескольких проводников меняет смысл результата.",
          "Измерение сопротивления обычно требует обесточенной цепи и выполнения инструкции прибора.",
          "Погрешность, разрешение и категория безопасности — разные характеристики.",
        ],
        mistakes: [
          "Переставлять щупы или режим прибора уже в опасной зоне без подготовки.",
          "Записывать «220» без точек измерения и единицы.",
          "Считать одиночное значение достаточным для диагноза.",
        ],
        safety:
          "Работы в электроустановках и измерения выполняются только в рамках допуска, с предназначенным прибором и применением требуемых защитных средств.",
        selfCheck: [
          {
            question: "Почему 230 В само по себе не доказывает исправность питания?",
            answer:
              "Неизвестны точки измерения, режим нагрузки, устойчивость значения и состояние соединений.",
          },
        ],
        sourceIds: ["pue", "potee-current"],
      }),
      article({
        id: "single-three-phase",
        title: "Однофазная и трёхфазная сеть",
        summary:
          "Фазные и линейные величины, последовательность фаз и распределение нагрузки.",
        level: "База",
        readTime: 8,
        tags: ["трёхфазная сеть", "фаза", "линейное напряжение"],
        shortAnswer:
          "В трёхфазной системе различают фазные и линейные напряжения, а токи и мощности оценивают по каждой фазе. Для учёта важны правильная привязка токовых и напряженческих цепей и направление энергии.",
        procedure: [
          "По схеме определить систему сети и точки нейтрали/заземления.",
          "Разделить измерения между фазой и нейтралью и между фазами.",
          "Сопоставить фазу напряжения с соответствующим токовым каналом прибора учёта.",
          "Оценить симметрию токов и напряжений в одинаковом временном режиме.",
          "При отклонении строить гипотезы по схеме, соединениям и нагрузке.",
        ],
        keyPoints: [
          "Одинаковое линейное напряжение не гарантирует одинаковый фазный ток.",
          "Перепутанные соответствия U и I дают ошибочные мощности и коэффициенты мощности.",
          "Последовательность фаз существенна для части оборудования и схем измерения.",
        ],
        mistakes: [
          "Сравнивать токи, снятые в разное время при меняющейся нагрузке.",
          "Называть любую асимметрию аварией без оценки величины и режима.",
          "Игнорировать нейтральный проводник при диагностике однофазных нагрузок.",
        ],
        safety:
          "Не изменяйте соединения для «проверки гипотезы» без предусмотренной формы работы и безопасной подготовки.",
        selfCheck: [
          {
            question: "Что нужно сопоставить в канале трёхфазного счётчика?",
            answer:
              "Напряжение конкретной фазы, ток той же фазы, полярность/направление и назначение клемм.",
          },
        ],
        sourceIds: ["pue", "gost-31818"],
      }),
      article({
        id: "power-and-energy",
        title: "Мощность и энергия",
        summary:
          "Почему кВт и кВт·ч отвечают на разные вопросы и как связаны P, Q, S и cos φ.",
        level: "База",
        readTime: 8,
        tags: ["кВт", "кВт·ч", "реактивная энергия"],
        shortAnswer:
          "Мощность показывает интенсивность преобразования энергии в данный момент, энергия — накопленный результат за интервал. Активная, реактивная и полная мощности описывают разные составляющие режима переменного тока.",
        procedure: [
          "Уточнить, анализируется мгновенный режим, интервальный профиль или накопленный регистр.",
          "Проверить единицы: Вт/кВт, вар/квар, В·А/кВ·А или Вт·ч/кВт·ч.",
          "Сопоставить знаки и направления по документации прибора.",
          "Для интервала связать приращение энергии со средней мощностью и длительностью.",
          "Проверить полноту фаз и коэффициент трансформации схемы.",
        ],
        keyPoints: [
          "Большая накопленная энергия не означает большую текущую нагрузку.",
          "Профиль мощности помогает увидеть время и продолжительность режима.",
          "Знак реактивной мощности и квадрант нужно трактовать по руководству конкретного прибора.",
        ],
        mistakes: [
          "Сравнивать кВт на клещах с накопленным значением кВт·ч.",
          "Игнорировать коэффициент мощности при оценке тока по активной мощности.",
          "Суммировать регистры разных направлений без понимания OBIS/назначения.",
        ],
        selfCheck: [
          {
            question: "Чем 5 кВт отличается от 5 кВт·ч?",
            answer:
              "5 кВт — мощность в момент/режиме; 5 кВт·ч — количество энергии, например за один час при мощности 5 кВт.",
          },
        ],
        sourceIds: ["gost-31818", "gost-31819-21"],
      }),
      article({
        id: "neutral-and-protection",
        title: "N, PE и PEN: назначение проводников",
        summary:
          "Почему рабочая нейтраль и защитный проводник не взаимозаменяемы.",
        level: "База",
        readTime: 8,
        tags: ["нейтраль", "PE", "PEN"],
        shortAnswer:
          "N участвует в рабочей цепи, PE выполняет защитную функцию, PEN совмещает функции в предусмотренной части системы. Их разделение, повторное объединение и сечение определяются схемой и требованиями устройства электроустановок.",
        procedure: [
          "Определить систему заземления и место разделения PEN по документации.",
          "Проследить назначение проводников по схеме, маркировке и фактическому подключению.",
          "Проверить, не подменяется ли защитная функция рабочим соединением.",
          "При диагностике нейтрали оценивать напряжения под нагрузкой и состояние соединений в допустимых границах работы.",
          "Фиксировать расхождение схемы и факта без самовольной переделки.",
        ],
        keyPoints: [
          "По цвету проводника нельзя окончательно судить о его фактическом назначении.",
          "Разрыв рабочего нулевого проводника в несимметричной трёхфазной сети может привести к опасным отклонениям фазных напряжений.",
          "Защитный проводник не используют как рабочий токовый путь.",
        ],
        mistakes: [
          "Считать N и PE «одним нулём».",
          "Делать перемычку как быстрый способ устранения симптома.",
          "Проверять непрерывность на цепи без безопасной подготовки.",
        ],
        safety:
          "Повреждение нейтрали может создавать опасное напряжение на оборудовании; при признаках такого режима прекратите действия и организуйте безопасное отключение.",
        selfCheck: [
          {
            question: "Можно ли определить PE только по жёлто-зелёному цвету?",
            answer:
              "Цвет — важная маркировка, но фактическое назначение подтверждают схемой и проверкой по разрешённой процедуре.",
          },
        ],
        sourceIds: ["pue", "potee-current"],
      }),
      article({
        id: "measurement-quality",
        title: "Качество измерения и неопределённость",
        summary:
          "Как отличать реальное отклонение от ошибки метода, прибора или времени измерения.",
        level: "База",
        readTime: 7,
        tags: ["погрешность", "измерение", "сравнение"],
        shortAnswer:
          "Два показания сравнимы, если относятся к одной величине, точке, фазе, направлению, масштабу и времени. Разницу сначала проверяют на методические причины, затем на схему и оборудование.",
        procedure: [
          "Записать измеряемую величину и ожидаемую точность решения.",
          "Сверить поверку/пригодность и технические характеристики используемых средств измерений.",
          "Синхронизировать время и режим сравниваемых данных.",
          "Учесть коэффициенты трансформации, направление, усреднение и дискретность.",
          "Повторить измерение независимым допустимым способом, если вывод критичен.",
        ],
        keyPoints: [
          "Разрешение дисплея не равно точности.",
          "Клещи и счётчик могут использовать разные окна усреднения.",
          "Метрологическая прослеживаемость важна, когда результат используется как основание решения.",
        ],
        mistakes: [
          "Считать последнюю цифру дисплея абсолютно точной.",
          "Сравнивать данные разных фаз.",
          "Не фиксировать модель и режим измерительного прибора.",
        ],
        selfCheck: [
          {
            question: "Что проверить первым при расхождении двух приборов?",
            answer:
              "Что они измеряют одну и ту же величину в одной точке, фазе, направлении и в сопоставимое время.",
          },
        ],
        sourceIds: ["metrology-law", "gost-31818"],
      }),
    ],
  },
  {
    id: "metering",
    code: "04",
    title: "Приборы и схемы учёта",
    shortTitle: "Приборы учёта",
    timeframe: "Месяцы 1–3",
    outcome: "Читаю паспортные данные, схему, регистры и коэффициенты без догадок.",
    description:
      "Прямое и трансформаторное включение, ТТ, регистры, реле, пломбы и метрология.",
    color: "#2E7EAF",
    ink: "#FFFFFF",
    articles: [
      article({
        id: "direct-transformer-connection",
        title: "Прямое и трансформаторное включение",
        summary:
          "Как распознать схему и понять, где появляется коэффициент трансформации.",
        level: "База",
        readTime: 8,
        tags: ["прямое включение", "ТТ", "схема"],
        shortAnswer:
          "При прямом включении ток нагрузки проходит через токовые цепи счётчика в пределах его исполнения. При трансформаторном включении счётчик получает вторичные токи ТТ, а итог зависит от коэффициентов и настроек системы.",
        procedure: [
          "Сверить паспорт счётчика, номинальные/максимальные токи и схему на крышке или в руководстве.",
          "Проследить токовые и напряженческие цепи по каждой фазе.",
          "Для ТТ записать первичный и вторичный ток, класс, коэффициент и полярность.",
          "Проверить, где применяется коэффициент: в приборе, системе или расчёте.",
          "Сопоставить фактическую схему с расчётной и информационной моделью.",
        ],
        keyPoints: [
          "Двойное применение коэффициента завышает результат, отсутствие — занижает.",
          "Исполнение счётчика определяют по точной модификации, а не только по семейству.",
          "Напряженческие и токовые каналы должны соответствовать одной фазе.",
        ],
        mistakes: [
          "Определять схему только по внешнему виду шкафа.",
          "Записывать Ктт без первичного/вторичного номинала.",
          "Менять коэффициент в ПО без проверки расчётной цепочки.",
        ],
        safety:
          "Вторичные цепи ТТ обслуживают по специальным требованиям; нельзя размыкать их под током произвольным способом.",
        selfCheck: [
          {
            question: "Где может учитываться Ктт?",
            answer:
              "В самом приборе, верхнем уровне системы или расчёте; нужно установить одно место применения и исключить дублирование.",
          },
        ],
        sourceIds: ["gost-31818", "gost-31819-22", "pue"],
      }),
      article({
        id: "current-transformers",
        title: "Трансформаторы тока: коэффициент и полярность",
        summary:
          "Что означают первичная/вторичная обмотки, P1/P2, S1/S2 и класс точности.",
        level: "Практика",
        readTime: 9,
        tags: ["трансформатор тока", "полярность", "Ктт"],
        shortAnswer:
          "ТТ масштабирует первичный ток до стандартизованного вторичного и сохраняет фазовое соотношение в пределах характеристик. Для правильного учёта важны коэффициент, направление первичного тока, полярность вторичных выводов, нагрузка цепи и класс точности.",
        procedure: [
          "Считать табличку каждого ТТ и записать точное исполнение.",
          "Сверить направление P1→P2 с направлением принятого потока энергии.",
          "Проследить S1/S2 до соответствующего токового канала счётчика.",
          "Проверить коэффициенты и фазное соответствие в приборе/системе.",
          "Сопоставить токи, углы и знаки мощности по фазам.",
        ],
        keyPoints: [
          "Переворот полярности часто проявляется знаком мощности или неверным балансом фазы.",
          "Смешение фаз токовой и напряженческой цепи искажает мощность даже при правдоподобном токе.",
          "Состояние вторичных цепей влияет на результат не меньше табличного коэффициента.",
        ],
        mistakes: [
          "Считать одинаковые внешне ТТ одинаковыми по коэффициенту.",
          "Менять S1/S2 без зафиксированной диагностической гипотезы и разрешённой работы.",
          "Игнорировать фазовые углы и направление энергии.",
        ],
        safety:
          "Не размыкайте вторичную цепь ТТ при наличии первичного тока; применяйте предусмотренные испытательные блоки и порядок работ.",
        selfCheck: [
          {
            question: "Как проявится перепутанная полярность?",
            answer:
              "Возможны обратный знак активной мощности/энергии, аномальный фазовый баланс и события направления — в зависимости от прибора.",
          },
        ],
        sourceIds: ["pue", "gost-31819-22", "potee-current"],
      }),
      article({
        id: "meter-nameplate",
        title: "Как читать табличку и исполнение счётчика",
        summary:
          "Напряжение, ток, класс точности, постоянная, интерфейсы и знаки соответствия.",
        level: "База",
        readTime: 7,
        tags: ["маркировка", "исполнение", "класс точности"],
        shortAnswer:
          "Название семейства недостаточно. Для работы фиксируют точное исполнение, заводской номер, номинальные величины, класс точности, схему включения, постоянную импульсного выхода, год и предусмотренные интерфейсы.",
        procedure: [
          "Снять читаемый общий кадр и крупный кадр таблички.",
          "Переписать тип/исполнение и заводской номер без сокращений.",
          "Сверить напряжение, ток, частоту, классы и схему с объектом.",
          "По официальному руководству расшифровать опции исполнения.",
          "Проверить, что карточка прибора в системе соответствует физическому устройству.",
        ],
        keyPoints: [
          "5(100) А и 5 А трансформаторного включения — принципиально разные обозначения.",
          "Наличие значка интерфейса не гарантирует его настроенность и доступность.",
          "Класс точности у активной и реактивной энергии может различаться.",
        ],
        mistakes: [
          "Угадывать функции по похожему корпусу.",
          "Путать заводской номер с номером лицевого счёта или штрихкодом партии.",
          "Не фиксировать суффиксы модификации.",
        ],
        selfCheck: [
          {
            question: "Почему важно точное исполнение?",
            answer:
              "Оно определяет схему, диапазоны, интерфейсы, реле и дополнительные функции конкретного прибора.",
          },
        ],
        sourceIds: ["gost-31818", "nartis-i300", "mirtek-docs"],
      }),
      article({
        id: "registers-profiles-events",
        title: "Регистры, профили и журналы событий",
        summary:
          "Какие данные отвечают на вопросы «сколько», «когда» и «что изменилось».",
        level: "Практика",
        readTime: 9,
        tags: ["профиль мощности", "журнал событий", "архив"],
        shortAnswer:
          "Накопительные регистры показывают итог, профиль — значения по интервалам, журнал событий — изменения состояния и параметров. Диагноз строят по их общей хронологии с учётом часов прибора.",
        procedure: [
          "Проверить время, часовой пояс и качество синхронизации прибора.",
          "Снять текущие регистры по направлениям и тарифам.",
          "Выгрузить профиль за интервал до и после события.",
          "Выгрузить связанные журналы: питание, вскрытие, магнитное воздействие, реле, параметры, связь.",
          "Построить единую временную шкалу и отметить пробелы данных.",
        ],
        keyPoints: [
          "Событие является сигналом для проверки, а не готовым доказательством причины или вины.",
          "Перевод часов может сместить сопоставление с внешними системами.",
          "Циклический журнал способен перезаписать старые события.",
        ],
        mistakes: [
          "Анализировать только последнее событие.",
          "Считать отсутствие события доказательством отсутствия явления.",
          "Не сохранять исходную выгрузку перед интерпретацией.",
        ],
        selfCheck: [
          {
            question: "Что нужно проверить до сопоставления журналов двух систем?",
            answer:
              "Часы, часовой пояс, синхронизацию и формат временных меток.",
          },
        ],
        sourceIds: ["pp-890", "gost-58940", "nartis-i300"],
      }),
      article({
        id: "relay-and-limitation",
        title: "Реле управления нагрузкой",
        summary:
          "Состояние, команда, фактическое отключение и условия обратного включения — четыре разных вещи.",
        level: "Практика",
        readTime: 8,
        tags: ["реле", "ограничение", "включение"],
        shortAnswer:
          "Прибор может иметь реле с разными алгоритмами и ограничениями. Для диагноза разделяют поступившую команду, внутреннее состояние, положение силового элемента и фактическое наличие напряжения на выходе.",
        procedure: [
          "Установить точное исполнение прибора и наличие реле.",
          "Считать текущий статус, причину отключения и журнал команд/событий.",
          "Проверить применимые пороги, задержки и условия ручного/дистанционного включения.",
          "Измерить вход и выход только разрешённым безопасным способом.",
          "Если команда выполнена, а питания нет — последовательно проверить внешние аппараты и соединения.",
        ],
        keyPoints: [
          "Отображение «включено» в системе может быть командой, квитанцией или телесостоянием — это нужно различать.",
          "Повторное включение иногда требует выполнения условий на месте.",
          "Причина отключения может быть локальной, дистанционной или внешней относительно счётчика.",
        ],
        mistakes: [
          "Многократно отправлять команду без чтения причины.",
          "Считать щелчок реле доказательством питания нагрузки.",
          "Обходить реле или защиту для проверки.",
        ],
        safety:
          "Не шунтируйте реле и не подавайте напряжение обходным путём; проверка выполняется только штатными средствами и в пределах полномочий.",
        selfCheck: [
          {
            question: "Какие четыре состояния нужно разделить?",
            answer:
              "Команду, внутренний статус, фактическое положение силовой цепи и напряжение/питание на выходе.",
          },
        ],
        sourceIds: ["pp-890", "nartis-i300", "potee-current"],
      }),
    ],
  },
  {
    id: "field-work",
    code: "05",
    title: "Полевая работа",
    shortTitle: "Полевая работа",
    timeframe: "Месяцы 1–6",
    outcome: "Выполняю выезд по воспроизводимому алгоритму и оставляю проверяемый результат.",
    description:
      "Осмотр, измерение, общение с абонентом, актирование и передача результата.",
    color: "#063F66",
    ink: "#FFFFFF",
    articles: [
      article({
        id: "field-workflow",
        title: "Алгоритм работы на объекте",
        summary:
          "От идентификации объекта до контрольной проверки и передачи результата.",
        level: "Практика",
        readTime: 8,
        tags: ["осмотр", "алгоритм", "контроль"],
        shortAnswer:
          "Надёжный порядок: идентифицировать объект — проверить безопасность — зафиксировать исходное состояние — выполнить разрешённые проверки — сопоставить данные — оформить результат — убедиться, что объект оставлен безопасно.",
        procedure: [
          "Сверить адрес, точку учёта, номер прибора и границу работ.",
          "Оценить внешние опасности, состояние шкафа, проводников и доступа.",
          "Зафиксировать исходные показания, индикацию, пломбы и схему без вмешательства.",
          "Выполнить измерения и чтение данных по утверждённой последовательности.",
          "Сравнить фактическое состояние со схемой, заданием и верхним уровнем.",
          "Оформить отклонения, выполненные действия и требуемое продолжение.",
          "Провести финальный осмотр и доложить о завершении.",
        ],
        keyPoints: [
          "Исходное состояние фиксируют до изменения настроек или коммутации.",
          "Одна контрольная точка должна подтверждаться несколькими согласованными данными.",
          "Незавершённое действие передают с явным статусом и ответственным.",
        ],
        mistakes: [
          "Начинать с перезапуска прибора.",
          "Не сверять заводской номер.",
          "Уезжать без контрольного чтения и финального фото.",
        ],
        safety:
          "При обнаружении повреждения, нагрева, запаха, воды или доступных токоведущих частей прекратите обычный осмотр и организуйте действия по аварийному порядку.",
        selfCheck: [
          {
            question: "Почему сначала фиксируют исходное состояние?",
            answer:
              "Чтобы сохранить хронологию и отличить первоначальный дефект от последствий собственных действий.",
          },
        ],
        sourceIds: ["potee-current", "ptee", "pp-442"],
      }),
      article({
        id: "customer-conversation",
        title: "Разговор с абонентом без конфликта",
        summary:
          "Как собрать факты, объяснить границы проверки и не давать неподтверждённых обещаний.",
        level: "Практика",
        readTime: 6,
        tags: ["абонент", "вопросы", "объяснение"],
        shortAnswer:
          "Разговор строится вокруг наблюдаемых фактов: когда началось, что именно не работает, что изменилось, какие аппараты срабатывали. Технический вывод сообщают только после проверки, а сроки и решения — в пределах полномочий.",
        procedure: [
          "Представиться и коротко назвать цель визита.",
          "Спросить время начала, повторяемость, затронутые нагрузки и действия до появления проблемы.",
          "Повторить услышанное нейтральными словами и отделить жалобу от гипотезы.",
          "Объяснить, какие проверки будут выполнены и что находится вне границ работы.",
          "По итогам назвать подтверждённые факты, дальнейший маршрут заявки и меры безопасности.",
        ],
        keyPoints: [
          "Фраза абонента — источник контекста, но не измерение.",
          "Обвинение во вмешательстве недопустимо без установленной процедуры и доказательств.",
          "Необходимо бережно обращаться с персональными данными и доступом в помещение.",
        ],
        mistakes: [
          "Спорить с первым описанием проблемы.",
          "Обещать замену, перерасчёт или срок вне своих полномочий.",
          "Использовать внутренние сокращения без объяснения.",
        ],
        selfCheck: [
          {
            question: "Как сообщить предварительный вывод?",
            answer:
              "Назвать его гипотезой, перечислить подтверждающие и недостающие проверки и не выдавать за окончательный факт.",
          },
        ],
        sourceIds: ["pp-442"],
      }),
      article({
        id: "clamp-measurement",
        title: "Измерение тока клещами",
        summary:
          "Выбор проводника, диапазона, режима и времени для сопоставления со счётчиком.",
        level: "Практика",
        readTime: 8,
        tags: ["токовые клещи", "фаза", "погрешность"],
        shortAnswer:
          "Клещи охватывают один проводник измеряемой цепи. Для сравнения со счётчиком фиксируют фазу, направление, режим нагрузки, время, диапазон и окно усреднения.",
        procedure: [
          "Проверить пригодность клещей, категорию безопасности, диапазон и состояние.",
          "Определить по схеме нужный проводник и безопасную точку доступа.",
          "Обнулить прибор, если это требуется его руководством.",
          "Охватить один проводник полностью и закрыть магнитопровод.",
          "Снять значения по фазам в сопоставимый момент и записать условия.",
          "Сравнить с мгновенными значениями счётчика с учётом обновления и погрешностей.",
        ],
        keyPoints: [
          "Охват фазы и нейтрали вместе показывает результирующий/утечечный ток, а не ток нагрузки.",
          "Положение проводника в губках и внешние поля могут влиять на малые токи.",
          "Сравнение должно учитывать коэффициент ТТ и точку измерения.",
        ],
        mistakes: [
          "Снимать фазы последовательно при быстро меняющейся нагрузке и считать их одномоментными.",
          "Не записывать диапазон и модель прибора.",
          "Подтягивать или перемещать проводник клещами.",
        ],
        safety:
          "Не вводите руки и прибор в опасную зону без предусмотренной защиты, расстояний и права выполнения измерения.",
        selfCheck: [
          {
            question: "Что покажут клещи вокруг фазы и нейтрали одной нагрузки?",
            answer:
              "В идеальном случае близкий к нулю результирующий ток; это уже другой вид измерения, не фазный ток нагрузки.",
          },
        ],
        sourceIds: ["potee-current", "metrology-law"],
      }),
      article({
        id: "work-result",
        title: "Как оформить результат выезда",
        summary:
          "Факт, измерение, вывод, действие и незавершённая задача — пять отдельных частей.",
        level: "Практика",
        readTime: 7,
        tags: ["акт", "отчёт", "передача"],
        shortAnswer:
          "Запись должна позволить другому специалисту восстановить ход работы без устного пояснения. Она содержит идентификаторы, исходное состояние, проверяемые данные, вывод с уровнем уверенности, выполненные действия и следующий шаг.",
        procedure: [
          "Указать объект, точку учёта, прибор, дату, время и состав исполнителей.",
          "Описать исходное состояние и основание выезда.",
          "Привести измерения с единицами, фазами, режимом и средствами измерений.",
          "Приложить фотографии и выгрузки с понятными подписями.",
          "Разделить подтверждённую причину, рабочую гипотезу и неподтверждённые версии.",
          "Назначить статус: устранено, требуется дополнительная работа, передано, опасное состояние.",
        ],
        keyPoints: [
          "Формулировка должна быть нейтральной и проверяемой.",
          "Исправление записи выполняют с сохранением истории по локальному порядку.",
          "Ссылки на файлы и номера заявок важнее формулировки «фото приложены».",
        ],
        mistakes: [
          "Писать «всё нормально» без критериев.",
          "Смешивать данные разных точек учёта.",
          "Не указывать, что осталось невыполненным.",
        ],
        selfCheck: [
          {
            question: "Что делает вывод проверяемым?",
            answer:
              "Связь с конкретными наблюдениями, измерениями, схемой и источником критериев.",
          },
        ],
        sourceIds: ["personnel-current", "pp-442"],
      }),
      article({
        id: "stop-and-escalate",
        title: "Когда остановиться и передать задачу",
        summary:
          "Красные флаги: неизвестная схема, опасное состояние, нехватка допуска, инструмента или данных.",
        level: "Практика",
        readTime: 6,
        tags: ["стоп-работа", "эскалация", "опасность"],
        shortAnswer:
          "Остановка — правильный технический результат, если продолжение требует догадки или создаёт опасность. Важно не просто уйти, а безопасно обозначить состояние и передать конкретную информацию ответственному.",
        procedure: [
          "Прекратить действие и не менять состояние без необходимости безопасности.",
          "Удалиться из опасной зоны и предупредить находящихся рядом.",
          "Зафиксировать объект, симптом, условия и уже выполненные действия.",
          "Связаться с ответственным лицом по установленной цепочке.",
          "Передать, какая компетенция, форма работы, материал или отключение требуется.",
        ],
        keyPoints: [
          "Нехватка времени не является основанием сокращать защитные меры.",
          "Неизвестная схема — самостоятельный диагностический риск.",
          "Передача должна включать остаточный риск и фактическое состояние оборудования.",
        ],
        mistakes: [
          "Продолжать «только одно измерение».",
          "Оставить открытую дверцу, снятое ограждение или неясное состояние.",
          "Передать задачу сообщением без подтверждения получения при опасном состоянии.",
        ],
        safety:
          "При угрозе жизни и пожара действуйте по аварийному порядку организации и вызывайте экстренные службы, не ожидая обычного согласования.",
        selfCheck: [
          {
            question: "Что нужно передать вместе с проблемой?",
            answer:
              "Точное место, фактическое состояние, риск, выполненные действия и необходимый следующий ресурс/полномочие.",
          },
        ],
        sourceIds: ["potee-current", "fire-rules"],
      }),
      ...legalMeterReplacementArticles,
    ],
  },
  {
    id: "network-survey",
    code: "06",
    title: "Обследование ТП и сети 0,4 кВ",
    shortTitle: "Обследование сети",
    timeframe: "Месяцы 2–6",
    outcome: "Собираю полную и связную модель ТП, фидеров, опор и точек учёта.",
    description:
      "Подготовка, паспорт ТП, трассировка фидеров, геопозиция, фото и контроль полноты.",
    color: "#5B93B5",
    ink: "#FFFFFF",
    articles: [
      article({
        id: "survey-preparation",
        title: "Подготовка обследования",
        summary:
          "Задание, схема, маршрут, доступ, приложение, резервные копии и критерии готовности.",
        level: "Практика",
        readTime: 7,
        tags: ["обследование", "маршрут", "подготовка"],
        shortAnswer:
          "До выезда нужно знать границы обследования и требуемый выходной результат: перечень объектов, схема связей, обязательные поля, фото, координаты и формат передачи.",
        procedure: [
          "Сверить идентификатор ТП и границы фидеров по заданию.",
          "Загрузить актуальную исходную схему и список известных точек учёта.",
          "Проверить разрешения приложения, GPS, заряд, свободную память и дату/время.",
          "Разбить маршрут по фидерам, не смешивая сбор разных ветвей.",
          "Подготовить резервный офлайн-шаблон и порядок ежедневного сохранения.",
        ],
        keyPoints: [
          "Исходная схема — гипотеза для проверки, а не безусловная истина.",
          "Критерии обязательных полей согласуют до выезда.",
          "Резервная копия должна включать данные и исходные фотографии.",
        ],
        mistakes: [
          "Начать с ближайшей опоры без определения фидера.",
          "Обновлять приложение или прошивку непосредственно перед выездом без проверки.",
          "Хранить единственную копию на одном телефоне.",
        ],
        safety:
          "План маршрута учитывает дорожную обстановку, погоду, доступность объектов и запрет приближаться к повреждённым элементам сети.",
        selfCheck: [
          {
            question: "Какой главный выход обследования?",
            answer:
              "Проверяемая связная модель объектов и их связей с полным набором обязательных атрибутов, фото и координат.",
          },
        ],
        sourceIds: ["ptee", "potee-current"],
      }),
      article({
        id: "substation-passport",
        title: "Паспорт трансформаторной подстанции",
        summary:
          "Какие сущности и связи фиксировать, чтобы паспорт помогал эксплуатации, а не был анкетой ради анкеты.",
        level: "Практика",
        readTime: 8,
        tags: ["паспорт ТП", "трансформатор", "РУ-0,4 кВ"],
        shortAnswer:
          "Паспорт связывает идентификацию ТП, трансформаторы, РУ, секции шин, аппараты, измерительные цепи и отходящие фидеры. Значение каждого поля должно подтверждаться табличкой, схемой или измерением.",
        procedure: [
          "Зафиксировать идентификатор, наименование, координаты и общий вид ТП.",
          "Снять таблички трансформаторов и основного оборудования.",
          "Описать секции, вводы, аппараты и отходящие фидеры в принятой модели.",
          "Привязать приборы учёта и ТТ к соответствующим цепям.",
          "Сопоставить диспетчерские обозначения, надписи на месте и информационную систему.",
          "Отметить отсутствующие, лишние и нечитаемые идентификаторы.",
        ],
        keyPoints: [
          "Одинаковые названия фидеров без уникального контекста создают ошибки связи.",
          "Фотография таблички не заменяет структурированное поле, но подтверждает его.",
          "Расхождение фиксируют как расхождение, не выбирая удобную версию без доказательств.",
        ],
        mistakes: [
          "Смешивать данные двух трансформаторов или секций.",
          "Заполнять номиналы по памяти.",
          "Не фиксировать фактические надписи на аппаратах.",
        ],
        safety:
          "Осмотр оборудования выполняют с соблюдением разрешённых расстояний и без открытия ограждений/ячеек вне задания.",
        selfCheck: [
          {
            question: "Что подтверждает поле паспорта?",
            answer:
              "Идентифицируемый первичный источник: табличка, утверждённая схема, допустимое измерение или документированная запись.",
          },
        ],
        sourceIds: ["ptee", "pue"],
      }),
      article({
        id: "feeder-tracing",
        title: "Трассировка фидера 0,4 кВ",
        summary:
          "Как последовательно связать аппарат в ТП, линию, опоры, ответвления и точки учёта.",
        level: "Практика",
        readTime: 9,
        tags: ["фидер", "0,4 кВ", "опоры"],
        shortAnswer:
          "Трассировку ведут от однозначно идентифицированного начала по непрерывной цепочке. Каждая развилка должна иметь родительский объект, направление, координату и фото привязки.",
        procedure: [
          "Начать с маркированного отходящего аппарата и зафиксировать его связь с фидером.",
          "Следовать по линии, присваивая объектам устойчивые номера в порядке маршрута.",
          "На каждой развилке создать отдельные ветви и записать точку разделения.",
          "Привязать вводы и точки учёта к конкретной опоре/ветви.",
          "Сверить конечные точки с исходной схемой и списком абонентов.",
          "Повторно проверить места пересечения и визуально неоднозначные участки.",
        ],
        keyPoints: [
          "Географическая близость не доказывает электрическую связь.",
          "Фаза точки учёта и принадлежность фидеру — разные атрибуты.",
          "Воздушные пересечения, совместный подвес и кабельные вставки требуют отдельной фиксации.",
        ],
        mistakes: [
          "Переключаться между фидерами без отметки.",
          "Привязывать дом к ближайшей, а не фактической опоре.",
          "Удалять «лишний» объект до проверки причины расхождения.",
        ],
        safety:
          "Не приближайтесь к оборванным проводам и не пытайтесь физически проследить цепь в недоступной или опасной зоне.",
        selfCheck: [
          {
            question: "Доказывает ли ближайшая опора питание дома?",
            answer:
              "Нет. Нужна фактическая трассировка ответвления или другое подтверждение связи.",
          },
        ],
        sourceIds: ["pue", "potee-current"],
      }),
      article({
        id: "meter-point-survey",
        title: "Опора, домовладение и точка учёта",
        summary:
          "Какие идентификаторы и связи нужны, чтобы не создать дубликат или «висящий» прибор.",
        level: "Практика",
        readTime: 7,
        tags: ["точка учёта", "домовладение", "прибор"],
        shortAnswer:
          "Точка учёта связывает физический прибор, место установки, объект потребления, питающий фидер и фазу/схему. Один совпавший адрес или номер не является достаточной идентификацией.",
        procedure: [
          "Зафиксировать адрес и устойчивый идентификатор объекта потребления.",
          "Считать заводской номер, тип, исполнение и место установки прибора.",
          "Определить связанный ввод, опору, ветвь и фидер.",
          "Записать фазность, схему, наличие ИСУЭ и доступность опроса.",
          "Проверить дубликаты номера и расхождения с исходным реестром.",
        ],
        keyPoints: [
          "У одного адреса может быть несколько точек учёта.",
          "Заводской номер считывают с прибора и подтверждают фото.",
          "Замена прибора требует сохранения связи старого и нового состояния в истории.",
        ],
        mistakes: [
          "Создавать новую карточку при каждом несовпадении адреса.",
          "Путать лицевой счёт, номер ПУ и номер объекта.",
          "Пропускать неопросный прибор как «не относящийся к ИСУЭ».",
        ],
        selfCheck: [
          {
            question: "Какие три связи обязательны для точки учёта?",
            answer:
              "С физическим прибором, объектом потребления и электрическим источником/фидером.",
          },
        ],
        sourceIds: ["pp-442", "pp-890"],
      }),
      article({
        id: "gps-and-photo",
        title: "Координаты и фотофиксация",
        summary:
          "Как получить воспроизводимую геопривязку и доказательные кадры.",
        level: "Практика",
        readTime: 6,
        tags: ["GPS", "фото", "геопривязка"],
        shortAnswer:
          "Координата записывается вместе с точностью и типом объекта, а фотосерия показывает общий контекст, идентификатор и деталь. Геометка снимка не заменяет структурированную координату.",
        procedure: [
          "Дождаться устойчивой геопозиции в безопасной точке рядом с объектом.",
          "Записать широту, долготу, оценку точности и время.",
          "Сделать общий кадр с окружением и подходом к объекту.",
          "Снять идентификатор/табличку перпендикулярно и читаемо.",
          "Снять отклонение с масштабом и контекстом, не касаясь оборудования.",
          "Проверить привязку кадров к правильной карточке до перехода к следующему объекту.",
        ],
        keyPoints: [
          "Под кронами, у стен и в плотной застройке точность ухудшается.",
          "Координату ТП, опоры и точки учёта нельзя автоматически считать одной.",
          "Фото не должно раскрывать лишние персональные данные.",
        ],
        mistakes: [
          "Сохранять координату из движущегося автомобиля.",
          "Делать только крупный план дефекта.",
          "Переносить фото между карточками по памяти вечером.",
        ],
        selfCheck: [
          {
            question: "Почему нужна оценка точности GPS?",
            answer:
              "Без неё нельзя понять, является смещение реальным положением объекта или ошибкой геопозиционирования.",
          },
        ],
        sourceIds: ["personnel-current"],
      }),
    ],
  },
  {
    id: "diagnostics",
    code: "07",
    title: "Практическая диагностика",
    shortTitle: "Диагностика",
    timeframe: "Месяцы 3–12",
    outcome: "Иду от симптома к доказанной причине и не подменяю проверку предположением.",
    description:
      "Расхождения измерений, отсутствие питания, перекос, ошибки схемы, события и признаки вмешательства.",
    color: "#005A9B",
    ink: "#FFFFFF",
    articles: [
      article({
        id: "meter-vs-clamps",
        title: "Счётчик показывает ток, отличный от клещей",
        summary:
          "Диагностическая лестница: время, фаза, точка, коэффициент, метод и схема.",
        level: "Практика",
        readTime: 9,
        tags: ["расхождение", "токовые клещи", "счётчик"],
        shortAnswer:
          "Сначала докажите сопоставимость измерений. Только после проверки времени, фазы, точки, коэффициента, усреднения и прибора переходите к гипотезам о схеме или неисправности.",
        procedure: [
          "Зафиксировать мгновенные значения счётчика и клещей максимально одновременно.",
          "Сверить фазу и физический проводник.",
          "Проверить, первичное или вторичное значение показывает счётчик и применён ли Ктт.",
          "Учесть диапазон, погрешность и окно обновления обоих приборов.",
          "Сравнить все фазы, мощность, углы и направление энергии.",
          "Проверить токовые цепи и настройки по разрешённой процедуре.",
        ],
        keyPoints: [
          "Разница при малом токе может быть значима относительно показания, но находиться в абсолютной погрешности.",
          "Меняющаяся нагрузка делает последовательные измерения несопоставимыми.",
          "Неверное фазное соответствие может оставить ток правдоподобным, но исказить мощность.",
        ],
        mistakes: [
          "Сразу признавать неисправным счётчик.",
          "Подгонять Ктт, чтобы числа совпали.",
          "Игнорировать направление и знак.",
        ],
        safety:
          "Не вскрывайте измерительные цепи и пломбируемые элементы вне оформленной работы.",
        selfCheck: [
          {
            question: "Каковы первые три проверки?",
            answer:
              "Одновременность, одна и та же фаза/точка и одинаковый масштаб с учётом коэффициента.",
          },
        ],
        sourceIds: ["gost-31818", "metrology-law", "pue"],
      }),
      article({
        id: "relay-on-no-voltage",
        title: "Реле включено, а напряжения у потребителя нет",
        summary:
          "Как разделить состояние счётчика, выходную цепь, аппарат защиты, ввод и внутреннюю сеть.",
        level: "Практика",
        readTime: 9,
        tags: ["нет напряжения", "реле", "ввод"],
        shortAnswer:
          "Статус реле подтверждает лишь один участок цепочки. Нужно локализовать границу исчезновения напряжения: вход счётчика → выход → внешний аппарат → линия/ввод → вводной аппарат потребителя.",
        procedure: [
          "Уточнить, что именно не питается и когда возникло состояние.",
          "Проверить журнал и причину последнего отключения/включения реле.",
          "Подтвердить входное напряжение на доступной разрешённой точке.",
          "Подтвердить фактическое состояние выхода счётчика.",
          "Последовательно проверить внешние аппараты и соединения до границы ответственности.",
          "Зафиксировать точку, после которой напряжение отсутствует, и передать нужной стороне.",
        ],
        keyPoints: [
          "Команда «включить» не равна подтверждённому замыканию контакта.",
          "Напряжение без нагрузки может сохраняться через высокоомные/паразитные цепи.",
          "Граница балансовой принадлежности и граница разрешённой работы должны быть известны.",
        ],
        mistakes: [
          "Повторять дистанционную команду без диагностики.",
          "Вмешиваться во внутреннюю сеть потребителя.",
          "Шунтировать аппарат или реле.",
        ],
        safety:
          "Не подавайте питание обходным путём. Повреждённые соединения могут нагреваться и создавать пожарный риск.",
        selfCheck: [
          {
            question: "Какой результат диагностики достаточен для передачи?",
            answer:
              "Точно локализованная граница: на какой точке напряжение ещё есть и на следующей уже отсутствует, при указанных условиях.",
          },
        ],
        sourceIds: ["nartis-i300", "potee-current", "pp-442"],
      }),
      article({
        id: "phase-imbalance",
        title: "Перекос фаз и отклонение напряжения",
        summary:
          "Как отличить неравномерную нагрузку от дефекта нейтрали, контакта или питающей сети.",
        level: "Практика",
        readTime: 9,
        tags: ["перекос фаз", "нейтраль", "качество напряжения"],
        shortAnswer:
          "Оцените фазные напряжения и токи в один момент, затем их изменение при нагрузке. Неравномерные токи могут быть нормальным следствием распределения однофазных нагрузок; опасные встречные изменения фазных напряжений указывают на необходимость проверки нейтрали и соединений.",
        procedure: [
          "Снять U фаза–N и при необходимости линейные U в одной точке и одном режиме.",
          "Снять токи фаз и нейтрали сопоставимо по времени.",
          "Сравнить данные на источнике, точке учёта и границе потребителя в пределах полномочий.",
          "Проверить историю качества напряжения и событий прибора.",
          "Оценить зависимость отклонения от включения нагрузки.",
          "Локализовать участок и организовать проверку соединений.",
        ],
        keyPoints: [
          "Термин «перекос» без чисел недостаточен.",
          "Плохой контакт нейтрали способен давать разнонаправленные изменения фазных напряжений.",
          "Причина может находиться как в сети, так и на вводе/внутри объекта.",
        ],
        mistakes: [
          "Сравнивать только токи.",
          "Перераспределять нагрузку до проверки нейтрали.",
          "Использовать бытовой индикатор вместо количественного измерения.",
        ],
        safety:
          "При резких отклонениях, нагреве или признаках повреждения организуйте отключение по установленному порядку; не касайтесь металлических корпусов без оценки опасности.",
        selfCheck: [
          {
            question: "Какая пара данных нужна минимум?",
            answer:
              "Одновременные фазные напряжения и фазные токи, дополненные режимом нагрузки и точкой измерения.",
          },
        ],
        sourceIds: ["pue", "pp-890", "potee-current"],
      }),
      article({
        id: "wrong-metering-scheme",
        title: "Признаки ошибки схемы учёта",
        summary:
          "Фазные несоответствия, обратное направление, пропавший канал и неверный коэффициент.",
        level: "Уверенная работа",
        readTime: 10,
        tags: ["ошибка схемы", "векторная диаграмма", "направление"],
        shortAnswer:
          "Ошибку схемы подтверждают согласованным набором: фактическая трассировка цепей, токи и напряжения по фазам, углы/векторная диаграмма, знаки мощности, коэффициенты и журналы изменений.",
        procedure: [
          "Зафиксировать точную схему и исполнения ТТ/счётчика.",
          "Снять U, I, P, Q, cos φ и углы по фазам в устойчивом режиме.",
          "Сопоставить напряженческие и токовые каналы.",
          "Проверить полярность ТТ и направление потока.",
          "Сверить коэффициенты прибора, системы и расчёта.",
          "После разрешённого исправления повторить полный контроль и баланс.",
        ],
        keyPoints: [
          "Одна аномалия может иметь несколько причин.",
          "Векторная диаграмма полезна только при понимании принятой системой системы отсчёта.",
          "Исправление конфигурации должно оставлять аудит: кто, когда, основание, старое и новое значение.",
        ],
        mistakes: [
          "Менять несколько параметров одновременно.",
          "Исправлять коэффициент вместо физической схемы.",
          "Не сохранять состояние до изменения.",
        ],
        safety:
          "Физическую проверку цепей выполняют только по оформленной работе; программная доступность параметра не означает право его менять.",
        selfCheck: [
          {
            question: "Почему меняют по одному параметру?",
            answer:
              "Чтобы установить причинную связь, сохранить управляемость и иметь возможность корректного отката.",
          },
        ],
        sourceIds: ["gost-31818", "gost-31819-22", "pue"],
      }),
      article({
        id: "event-chronology",
        title: "Диагностика по хронологии событий",
        summary:
          "Как собрать единую временную линию из счётчика, системы, заявок и действий бригады.",
        level: "Уверенная работа",
        readTime: 8,
        tags: ["хронология", "журнал", "причина"],
        shortAnswer:
          "Причина ищется не по самому яркому событию, а по порядку: что изменилось первым, какие следствия появились затем и какие независимые данные это подтверждают.",
        procedure: [
          "Зафиксировать временные настройки всех источников.",
          "Экспортировать исходные события и профили без фильтрации.",
          "Добавить команды верхнего уровня, заявки, отключения и действия бригады.",
          "Нормализовать время и отметить источники каждой записи.",
          "Разделить первичные события, следствия и совпадения.",
          "Сформировать проверяемую гипотезу и список недостающих данных.",
        ],
        keyPoints: [
          "Время приёма сообщения сервером и время события в приборе могут различаться.",
          "Разрыв связи скрывает события до следующего опроса.",
          "Корреляция во времени не всегда означает причинность.",
        ],
        mistakes: [
          "Удалять «шумные» записи до сохранения оригинала.",
          "Смешивать локальное и московское время.",
          "Описывать причину словами «скорее всего» без плана проверки.",
        ],
        selfCheck: [
          {
            question: "Что означает событие, пришедшее на сервер позже аварии?",
            answer:
              "Только время доставки; нужно отдельно смотреть внутреннюю временную метку прибора и состояние связи.",
          },
        ],
        sourceIds: ["gost-58940", "pp-890", "nartis-i300"],
      }),
    ],
  },
  {
    id: "smart-metering",
    code: "08",
    title: "ИСУЭ и АСКУЭ",
    shortTitle: "ИСУЭ и АСКУЭ",
    timeframe: "Месяцы 4–12",
    outcome: "Понимаю путь данных и локализую отказ от прибора до серверной системы.",
    description:
      "Архитектура, СПОДЭС, каналы связи, опрос, баланс, потери и информационная безопасность.",
    color: "#68A9CF",
    ink: "#082B43",
    articles: [
      article({
        id: "isue-vs-askue",
        title: "ИСУЭ и АСКУЭ: термины и границы",
        summary:
          "Чем интеллектуальная система отличается от автоматизированного коммерческого учёта в рабочем разговоре.",
        level: "База",
        readTime: 7,
        tags: ["ИСУЭ", "АСКУЭ", "термины"],
        shortAnswer:
          "АСКУЭ — распространённое название автоматизированной системы коммерческого учёта. ИСУЭ в актуальном регулировании связано с установленным набором функций, информационным обменом и участниками рынка. В конкретной организации названия подсистем нужно сверять с архитектурой.",
        procedure: [
          "Определить юридический и технический контекст употребления термина.",
          "Нарисовать границы: ПУ, коммуникации, УСПД/шлюзы, серверы, интерфейсы пользователей и внешние системы.",
          "Указать владельца и ответственность каждого уровня.",
          "Сопоставить функции с требованиями и проектной документацией.",
          "Использовать одно значение термина во всём инциденте/документе.",
        ],
        keyPoints: [
          "Название продукта не доказывает выполнение всех функций интеллектуальной системы.",
          "Коммерческий расчёт и техническая телеметрия могут использовать разные контуры данных.",
          "Граница системы определяет, где искать журнал и владельца проблемы.",
        ],
        mistakes: [
          "Называть ИСУЭ только счётчиком.",
          "Смешивать данные расчётной системы и оперативного опроса.",
          "Искать отказ без схемы владения компонентами.",
        ],
        selfCheck: [
          {
            question: "Почему важно определить границу системы?",
            answer:
              "Чтобы понимать маршрут данных, ответственность, источник эталонной записи и место диагностики.",
          },
        ],
        sourceIds: ["law-522", "pp-890", "gost-71331"],
      }),
      article({
        id: "data-path",
        title: "Путь данных от счётчика до рабочего места",
        summary:
          "Уровни, на которых измерение может быть создано, преобразовано, передано, сохранено или отображено.",
        level: "Практика",
        readTime: 8,
        tags: ["архитектура", "УСПД", "сервер"],
        shortAnswer:
          "Данные рождаются в измерительном модуле, получают идентификатор и время, считываются каналом, проходят через шлюз/УСПД, сохраняются на сервере и отображаются приложением. На каждом переходе есть свой журнал и тип отказа.",
        procedure: [
          "Записать источник данных и уникальный идентификатор прибора.",
          "Определить локальный интерфейс и коммуникационный модуль.",
          "Определить промежуточные узлы и протоколы.",
          "Найти время последнего успешного чтения на каждом уровне.",
          "Сравнить необработанное значение, серверную запись и отображение.",
          "Локализовать первый переход, где данные перестают совпадать или поступать.",
        ],
        keyPoints: [
          "«Нет данных в интерфейсе» не означает, что счётчик их не сохранил.",
          "Преобразование единиц и коэффициентов может происходить после считывания.",
          "Кэш интерфейса способен показывать устаревшее состояние.",
        ],
        mistakes: [
          "Перезапускать все уровни одновременно.",
          "Проверять только доступность IP/сети.",
          "Не различать событие, архив и текущий срез.",
        ],
        selfCheck: [
          {
            question: "Где искать первый полезный признак отказа?",
            answer:
              "На границе между последним уровнем с корректными данными и первым уровнем без них.",
          },
        ],
        sourceIds: ["gost-71331", "gost-58940", "pp-890"],
      }),
      article({
        id: "communication-channels",
        title: "RS-485, PLC, радиоканал и сотовая связь",
        summary:
          "Что проверять в физической среде, интерфейсе и настройках каждого канала.",
        level: "Практика",
        readTime: 10,
        tags: ["RS-485", "PLC", "GSM/LTE"],
        shortAnswer:
          "Канал диагностируют слоями: питание и физическая среда → интерфейс и адресация → сеанс/протокол → прикладной запрос → серверная обработка. У разных технологий отличаются помехи и топология, но логика локализации едина.",
        procedure: [
          "Проверить питание и состояние коммуникационного модуля.",
          "Установить технологию, топологию и ожидаемый маршрут.",
          "Для проводного канала проверить соединения, полярность, терминацию и параметры; для радио/сотового — уровень/качество сигнала и регистрацию.",
          "Проверить адрес, скорость, формат, профиль доступа и время.",
          "Выполнить разрешённый диагностический запрос и сохранить журнал.",
          "Сравнить с исправным узлом того же исполнения.",
        ],
        keyPoints: [
          "Высокий уровень сигнала не гарантирует успешный обмен.",
          "PLC зависит от состояния и помех в силовой сети.",
          "RS-485 чувствителен к топологии, общему проводу, полярности и согласованию.",
        ],
        mistakes: [
          "Менять все параметры связи одновременно.",
          "Считать ping полноценной проверкой прикладного протокола.",
          "Публиковать SIM, ключи или пароли в отчёте.",
        ],
        safety:
          "Не подключайте адаптер к неизвестным клеммам по внешнему сходству; используйте схему конкретного исполнения и гальваническую защиту, предусмотренную производителем.",
        selfCheck: [
          {
            question: "Почему хороший RSSI не гарантирует опрос?",
            answer:
              "Он описывает лишь часть радиосреды; остаются регистрация, сеть передачи, сеанс, профиль доступа, протокол и сервер.",
          },
        ],
        sourceIds: ["gost-71331", "gost-58940", "nartis-i300"],
      }),
      article({
        id: "spodes",
        title: "СПОДЭС, DLMS/COSEM и модель данных",
        summary:
          "Зачем нужны стандартизованные объекты, идентификаторы и профили обмена.",
        level: "Уверенная работа",
        readTime: 10,
        tags: ["СПОДЭС", "DLMS/COSEM", "OBIS"],
        shortAnswer:
          "Стандартизованная модель описывает, как именуются объекты данных, какие атрибуты и методы доступны и как строится обмен. Она помогает совместимости, но конкретный набор функций зависит от профиля и исполнения прибора.",
        procedure: [
          "Определить версию и профиль информационной модели устройства.",
          "Сопоставить требуемую величину с объектом/OBIS и единицей.",
          "Проверить класс интерфейса, атрибут, селективный доступ и профиль безопасности.",
          "Сравнить карту производителя со стандартной моделью.",
          "Документировать отклонения и особенности реализации.",
        ],
        keyPoints: [
          "Одинаковый OBIS должен интерпретироваться вместе с классом объекта и контекстом.",
          "Наличие объекта не означает право чтения данным профилем.",
          "Настройки безопасности — часть совместимости, а не внешнее дополнение.",
        ],
        mistakes: [
          "Подбирать код по похожему названию.",
          "Игнорировать единицу и скейлер.",
          "Использовать технологические учётные данные вне защищённого контура.",
        ],
        selfCheck: [
          {
            question: "Что кроме OBIS нужно проверить?",
            answer:
              "Класс объекта, атрибут, единицу/скейлер, профиль доступа и версию модели.",
          },
        ],
        sourceIds: ["gost-58940", "gost-71331"],
      }),
      article({
        id: "polling-completeness",
        title: "Полнота опроса и приоритет выезда",
        summary:
          "Как отличить единичный пропуск от устойчивой системной проблемы.",
        level: "Практика",
        readTime: 8,
        tags: ["опрос", "доступность", "приоритет"],
        shortAnswer:
          "Оценивают не только процент опрошенных приборов, но и длительность, регулярность, тип отсутствующих данных, общность маршрута и влияние на расчёт/эксплуатацию.",
        procedure: [
          "Определить ожидаемый состав приборов и расписание опроса.",
          "Разделить текущие, интервальные, суточные и событийные данные.",
          "Построить длительность последнего успешного обмена по каждому узлу.",
          "Сгруппировать отказы по ТП, каналу, оператору, прошивке и времени.",
          "Проверить общие узлы и массовые изменения.",
          "Назначить выезд там, где удалённая диагностика исчерпана и эффект значим.",
        ],
        keyPoints: [
          "Средний процент может скрывать небольшой набор хронически недоступных приборов.",
          "Массовый одновременный отказ чаще указывает на общий компонент.",
          "Архив может восстановиться после связи, но критичные события могли быть перезаписаны.",
        ],
        mistakes: [
          "Выезжать на каждый единичный пропуск.",
          "Считать успешное соединение успешным чтением всех архивов.",
          "Не учитывать новые/выведенные из эксплуатации точки.",
        ],
        selfCheck: [
          {
            question: "Что важнее одного процента доступности?",
            answer:
              "Распределение длительности и причин отказов, тип пропущенных данных и влияние на процесс.",
          },
        ],
        sourceIds: ["gost-71331", "pp-890"],
      }),
      article({
        id: "balances-losses",
        title: "Баланс и поиск потерь",
        summary:
          "Как сравнивать отпуск и потребление на одном интервале, границе и масштабе.",
        level: "Уверенная работа",
        readTime: 10,
        tags: ["баланс", "потери", "небаланс"],
        shortAnswer:
          "Баланс строят на одной топологии, временном интервале, направлении, единицах и коэффициентах. До поиска безучётного потребления исключают неполноту данных, ошибки времени, схемы, коэффициентов и состава точек.",
        procedure: [
          "Зафиксировать границу баланса и однолинейную схему.",
          "Собрать входную энергию и все выходные точки за одинаковый интервал.",
          "Проверить полноту, качество, направления и коэффициенты.",
          "Учесть технические потери по принятой методике.",
          "Локализовать небаланс по фидерам, времени и изменениям состава.",
          "Проверять гипотезы от данных и схемы к выезду.",
        ],
        keyPoints: [
          "Небаланс — сигнал, а не доказательство нарушения.",
          "Смена прибора внутри интервала требует корректной склейки данных.",
          "Профиль помогает связать рост небаланса с конкретным временем и режимом.",
        ],
        mistakes: [
          "Сравнивать суточные данные с разными границами суток.",
          "Игнорировать неопросные точки.",
          "Начинать с обвинения абонента.",
        ],
        selfCheck: [
          {
            question: "Что исключают до версии о безучётном потреблении?",
            answer:
              "Ошибки топологии, времени, полноты, коэффициентов, направления, замен и технических потерь.",
          },
        ],
        sourceIds: ["pp-442", "gost-71331", "gost-58940"],
      }),
      article({
        id: "metering-cybersecurity",
        title: "Безопасная работа с доступом и конфигурацией",
        summary:
          "Учётные записи, ключи, журналы, обновления и принцип минимальных полномочий.",
        level: "Уверенная работа",
        readTime: 8,
        tags: ["кибербезопасность", "пароль", "конфигурация"],
        shortAnswer:
          "Доступ к прибору и системе должен быть персональным, минимально необходимым и журналируемым. Пароли, ключи, SIM-данные и технологические параметры не размещают в общей базе знаний или фотоотчёте.",
        procedure: [
          "Использовать только выданную персональную учётную запись и утверждённое ПО.",
          "Проверить целевой объект и сохранить конфигурацию до изменения.",
          "Менять один параметр по оформленному основанию.",
          "Зафиксировать автора, время, старое/новое значение и результат проверки.",
          "Хранить секреты только в утверждённом защищённом хранилище.",
          "При подозрении на компрометацию прекратить использование и сообщить ответственному.",
        ],
        keyPoints: [
          "Общий пароль лишает журнал изменений доказательной силы.",
          "Заводская учётная запись не должна становиться неформальным постоянным доступом.",
          "Обновление прошивки — управляемое изменение с проверкой совместимости и планом восстановления.",
        ],
        mistakes: [
          "Отправлять пароль в мессенджере или акте.",
          "Использовать найденный в интернете сервисный код.",
          "Обновлять прибор на объекте без резервной копии и согласования.",
        ],
        safety:
          "База намеренно не публикует пароли, способы обхода защиты и инструкции по несанкционированному изменению учёта.",
        selfCheck: [
          {
            question: "Почему нельзя использовать общий пароль бригады?",
            answer:
              "Невозможно надёжно установить автора действия, отозвать доступ одного человека и обеспечить минимальные полномочия.",
          },
        ],
        sourceIds: ["gost-71331", "gost-58940", "pp-890"],
      }),
    ],
  },
  {
    id: "equipment",
    code: "09",
    title: "Оборудование и программы",
    shortTitle: "Оборудование",
    timeframe: "По мере допуска",
    outcome: "Работаю с точным исполнением прибора и только по официальной документации.",
    description:
      "НАРТИС И-300, РиМ 384, МИРТЕК, адаптеры, программное обеспечение и конфигурации.",
    color: "#D1D3D4",
    ink: "#0A1720",
    articles: [
      article({
        id: "nartis-i300-card",
        title: "НАРТИС-И300: карта семейства",
        summary:
          "Исполнения, измерения, журналы, интерфейсы, реле и порядок безопасной идентификации.",
        level: "Практика",
        readTime: 9,
        tags: ["НАРТИС-И300", "СПОДЭС", "реле"],
        shortAnswer:
          "И300 — семейство трёхфазных интеллектуальных счётчиков; возможности зависят от кода исполнения. Официальная страница указывает соответствие требованиям ПП № 890 и СПОДЭС, поддержку профилей/событий и набор опциональных интерфейсов и реле.",
        procedure: [
          "Считать полный код исполнения и заводской номер.",
          "По официальной документации определить схему, ток, интерфейсы и опции.",
          "Зафиксировать время, регистры, мгновенные значения и состояние реле.",
          "Снять необходимые журналы до перезапуска или изменения.",
          "Подключаться только к предназначенному интерфейсу утверждённым адаптером.",
          "После работы проверить связь, время и неизменность неплановых параметров.",
        ],
        keyPoints: [
          "В обозначениях семейства могут кодироваться интерфейсы, реле, измерение качества и электронные пломбы.",
          "Наличие функции зависит от конкретной модификации.",
          "Руководство и версия ПО должны соответствовать прибору.",
        ],
        mistakes: [
          "Переносить схему подключения с похожего исполнения.",
          "Очищать журнал до выгрузки.",
          "Считать отсутствие данных признаком поломки без проверки профиля доступа.",
        ],
        safety:
          "Не вводите неизвестные сервисные команды и не изменяйте параметры, влияющие на коммерческий учёт, без оформленного основания и резервной копии.",
        selfCheck: [
          {
            question: "С чего начинается любая работа с И300?",
            answer:
              "С точной идентификации исполнения и выбора соответствующей официальной документации.",
          },
        ],
        sourceIds: ["nartis-i300", "nartis-support", "pp-890"],
      }),
      article({
        id: "rim-384-card",
        title: "РиМ 384: область применения и диагностика",
        summary:
          "Почему высоковольтное исполнение нельзя рассматривать как обычный счётчик 0,4 кВ.",
        level: "Уверенная работа",
        readTime: 9,
        tags: ["РиМ 384", "6/10 кВ", "RF"],
        shortAnswer:
          "РиМ 384 — семейство высоковольтных счётчиков прямого включения раздельной конструкции для трёхфазных трёхпроводных сетей 6/10 кВ с изолированной нейтралью. Точная модификация определяет максимальный ток и коммуникации.",
        procedure: [
          "Сверить объект, класс напряжения и точное обозначение исполнения.",
          "Изучить руководство и схему конкретной модификации до выезда.",
          "Проверить комплект штатных компонентов и канал RF/сотовой связи удалённо.",
          "Собрать журналы и параметры без приближения к высоковольтной части.",
          "Физические работы выполнять только специализированным допущенным персоналом по оформленной работе.",
        ],
        keyPoints: [
          "Официально заявлены варианты RF433 с GSM/GPRS или LTE в зависимости от исполнения.",
          "Раздельная конструкция и высокое напряжение определяют особые требования к монтажу и обслуживанию.",
          "Диагностика связи не даёт права доступа к высоковольтной части.",
        ],
        mistakes: [
          "Использовать инструкцию для другой серии РиМ.",
          "Считать проблему радиообмена основанием для приближения к первичному модулю.",
          "Публиковать параметры защищённого доступа.",
        ],
        safety:
          "Работы в электроустановках 6/10 кВ требуют соответствующей группы, роли, формы работы и подготовки места; эта статья не является инструкцией по монтажу.",
        selfCheck: [
          {
            question: "Какой первый фильтр применимости?",
            answer:
              "Точное исполнение, класс напряжения, схема сети и официальное руководство на него.",
          },
        ],
        sourceIds: ["rim-384", "potee-current"],
      }),
      article({
        id: "mirtek-card",
        title: "МИРТЕК: как выбирать документацию",
        summary:
          "Поиск руководства по серии, полному исполнению и версии, а не по внешнему виду.",
        level: "Практика",
        readTime: 6,
        tags: ["МИРТЕК", "руководство", "маркировка"],
        shortAnswer:
          "У МИРТЕК есть разные серии и исполнения. Расшифровку номера, клемм, интерфейсов и индикации берут из документации производителя на конкретный тип, а не из неофициальной таблицы без версии.",
        procedure: [
          "Снять полное обозначение, заводской номер и год.",
          "Найти серию в официальном разделе документации.",
          "Сопоставить исполнение, схему и версию руководства.",
          "Проверить назначение экранов, интерфейсов и событий.",
          "Сохранить ссылку/версию документа в карточке объекта.",
        ],
        keyPoints: [
          "Формат заводского номера может меняться между сериями.",
          "Прошивка и конфигурация влияют на доступные пункты.",
          "Документация производителя приоритетнее форумной расшифровки.",
        ],
        mistakes: [
          "Определять год только по двум цифрам без подтверждения.",
          "Использовать распиновку похожего корпуса.",
          "Сохранять локальный PDF без названия и версии.",
        ],
        selfCheck: [
          {
            question: "Что нужно для выбора руководства?",
            answer:
              "Полное обозначение типа/исполнения, а при наличии — версия аппаратуры и ПО.",
          },
        ],
        sourceIds: ["mirtek-docs", "gost-31818"],
      }),
      article({
        id: "laptop-adapters",
        title: "Ноутбук, адаптеры и COM-порты",
        summary:
          "Воспроизводимая подготовка драйверов, кабелей, портов и журналов сеанса.",
        level: "Практика",
        readTime: 7,
        tags: ["ноутбук", "адаптер", "COM-порт"],
        shortAnswer:
          "Рабочий комплект проверяют на стенде до выезда: утверждённая версия ПО, драйвер, распознанный адаптер, известный исправный кабель, настройки интерфейса и тестовый обмен.",
        procedure: [
          "Записать модели адаптеров и назначение каждого кабеля.",
          "Установить ПО и драйверы из официального/корпоративного источника.",
          "Проверить порт, скорость и обмен на тестовом устройстве.",
          "Отключить автоматические обновления, способные нарушить выезд, по политике организации.",
          "Подготовить журналирование и папку исходных выгрузок.",
          "После подключения сверить идентификатор прибора до чтения или изменения.",
        ],
        keyPoints: [
          "Номер COM-порта может измениться после подключения к другому USB-разъёму.",
          "Кабели с одинаковым разъёмом могут иметь разную распиновку и гальваническую развязку.",
          "Административные права не должны использоваться постоянно без необходимости.",
        ],
        mistakes: [
          "Скачивать драйвер с случайного сайта на объекте.",
          "Пробовать кабели по форме разъёма.",
          "Не сохранять лог неудачного сеанса.",
        ],
        safety:
          "Подключайте кабель только к обозначенному производителем интерфейсу; неизвестный потенциал может повредить оборудование и создать опасность.",
        selfCheck: [
          {
            question: "Как доказать готовность комплекта?",
            answer:
              "Успешным тестовым обменом с известным устройством и записанной конфигурацией до выезда.",
          },
        ],
        sourceIds: ["nartis-support", "rim-384", "mirtek-docs"],
      }),
      article({
        id: "configuration-change",
        title: "Безопасное изменение конфигурации",
        summary:
          "Основание, резервная копия, одно изменение, контроль и аудит.",
        level: "Уверенная работа",
        readTime: 8,
        tags: ["конфигурация", "резервная копия", "аудит"],
        shortAnswer:
          "Любое изменение, способное повлиять на учёт, связь или управление нагрузкой, выполняют по оформленному основанию. До изменения сохраняют исходное состояние; после — проверяют весь затронутый путь данных.",
        procedure: [
          "Подтвердить заявку, полномочие и точный целевой прибор.",
          "Считать текущую конфигурацию, время и журналы.",
          "Сохранить резервную копию с датой и идентификатором.",
          "Изменить один согласованный параметр.",
          "Перечитать значение и выполнить функциональный контроль.",
          "Зафиксировать автора, время, основание, старое/новое значение и результат.",
        ],
        keyPoints: [
          "Успешная запись параметра не доказывает работоспособность функции.",
          "Изменение времени влияет на профили и журналы.",
          "Откат должен быть спланирован до начала.",
        ],
        mistakes: [
          "Загружать конфигурацию от похожего прибора целиком.",
          "Не проверять тарифы, коэффициенты и часы после обновления.",
          "Хранить резервную копию без заводского номера.",
        ],
        safety:
          "Не используйте неофициальные пароли и обходы защиты; при отказе авторизации решайте доступ через владельца системы.",
        selfCheck: [
          {
            question: "Почему резервная копия делается до чтения инструкции по откату?",
            answer:
              "План восстановления и исходные данные нужны до любого изменения, иначе обратимость не гарантирована.",
          },
        ],
        sourceIds: ["gost-71331", "gost-58940", "nartis-support"],
      }),
      ...equipmentArticlesV6,
      ...equipmentArticlesV7,
      ...equipmentArticlesV8,
      ...nartisArticles,
      ...manualArticles,
    ],
  },
  {
    id: "qualified-worker",
    code: "10",
    title: "Квалифицированный работник",
    shortTitle: "Квалификация",
    timeframe: "После освоения программы",
    outcome: "Самостоятельно решаю типовые задачи, объясняю решения и развиваю систему.",
    description:
      "Матрица компетенций, план развития, сложная диагностика, качество, наставничество и переход к инженерной роли.",
    color: "#0B2F49",
    ink: "#FFFFFF",
    articles: [
      article({
        id: "competency-matrix",
        title: "Матрица квалифицированного работника",
        summary:
          "Что значит «умею»: знаю, выполняю под наблюдением, выполняю самостоятельно, обучаю и улучшаю.",
        level: "Уверенная работа",
        readTime: 8,
        tags: ["компетенции", "оценка", "квалификация"],
        shortAnswer:
          "Квалификация подтверждается наблюдаемыми действиями и результатами, а не только стажем. Для каждой компетенции фиксируют уровень самостоятельности, условия, доказательство и дату подтверждения.",
        procedure: [
          "Разделить компетенции на безопасность, схемы, измерения, приборы, связь, данные и коммуникацию.",
          "Для каждой определить четыре уровня: объясняю; выполняю под контролем; выполняю самостоятельно; диагностирую/обучаю.",
          "Назначить практическое доказательство: задача, тест, отчёт или наблюдение наставника.",
          "Отметить ограничения по группе, роли и оборудованию.",
          "Пересматривать матрицу после обучения, инцидента или изменения технологии.",
        ],
        keyPoints: [
          "Самостоятельность по одной модели счётчика не переносится автоматически на другую.",
          "Безопасная остановка при неизвестности — признак компетентности.",
          "Умение объяснить критерий решения выявляет пробелы лучше заученного алгоритма.",
        ],
        mistakes: [
          "Ставить отметку «знает» без практического критерия.",
          "Оценивать только скорость.",
          "Скрывать ограничения из-за ожидания универсальности.",
        ],
        selfCheck: [
          {
            question: "Какое доказательство сильнее: стаж или повторяемый результат?",
            answer:
              "Повторяемый безопасный результат в определённых условиях, подтверждённый наблюдением и данными.",
          },
        ],
        sourceIds: [
          "professional-standard",
          "personnel-current",
          "potee-current",
        ],
      }),
      article({
        id: "development-roadmap",
        title: "План развития на 30, 90, 180 и 365 дней",
        summary:
          "Ориентиры обучения без подмены официальной программы и допуска календарём.",
        level: "Старт",
        readTime: 8,
        tags: ["план развития", "30 дней", "365 дней"],
        shortAnswer:
          "Сроки — ориентиры для планирования, а не автоматический допуск. 30 дней: безопасность и маршрут работы; 90: типовые схемы и приборы; 180: самостоятельная полевая диагностика; 365: системная диагностика, качество и передача опыта.",
        procedure: [
          "На 30 дней назначить обязательные правила, инструктажи, терминологию и работу с наставником.",
          "На 90 дней — чтение схем, измерения, типовые ПУ и оформление результатов.",
          "На 180 дней — обследование, локализацию отказов и работу с журналами/профилями.",
          "На 365 дней — баланс, массовые отказы, анализ причин, наставничество и проект улучшения.",
          "Каждый этап завершать практической проверкой и обратной связью.",
        ],
        keyPoints: [
          "Фактический темп зависит от должности, категории персонала и возможностей практики.",
          "Пробел по безопасности блокирует переход, даже если технические задачи выполняются быстро.",
          "План должен включать повторение и разбор реальных случаев.",
        ],
        mistakes: [
          "Собирать только сертификаты.",
          "Откладывать практику до окончания всей теории.",
          "Не выделять время на разбор ошибок.",
        ],
        selfCheck: [
          {
            question: "Является ли 365-й день автоматическим признаком квалификации?",
            answer:
              "Нет. Квалификацию подтверждают выполненные требования, знания и практические результаты.",
          },
        ],
        sourceIds: ["professional-standard", "personnel-current"],
      }),
      article({
        id: "diagnostic-ladder",
        title: "Диагностическая лестница: ПУ → канал → узел → сервер",
        summary:
          "Универсальная схема локализации сложного отказа с минимальным числом изменений.",
        level: "Уверенная работа",
        readTime: 9,
        tags: ["системная диагностика", "локализация", "ИСУЭ"],
        shortAnswer:
          "Идите по пути данных и ищите первую нарушенную границу. На каждом уровне фиксируйте вход, выход, время и журнал; не меняйте следующий уровень, пока не доказано состояние предыдущего.",
        procedure: [
          "Сформулировать точный симптом и ожидаемое состояние.",
          "Проверить наличие данных и часов в приборе.",
          "Проверить локальный интерфейс/модем и прикладной обмен.",
          "Проверить промежуточный узел и маршрут передачи.",
          "Проверить приём, обработку и хранение на сервере.",
          "Проверить API/интерфейс отображения и кэш.",
          "Внести одно изменение и повторить путь контроля.",
        ],
        keyPoints: [
          "Массовость и синхронность сужают круг общих компонентов.",
          "Исправность нижнего уровня не гарантирует корректность преобразования выше.",
          "Отрицательный тест полезен, если известны критерий и точка наблюдения.",
        ],
        mistakes: [
          "Перезапускать всю цепочку.",
          "Проверять только транспорт, не читая прикладной объект.",
          "Не сохранять времена последнего успеха.",
        ],
        selfCheck: [
          {
            question: "Что такое первая нарушенная граница?",
            answer:
              "Переход от последнего компонента с подтверждённо корректным входом/выходом к первому компоненту, где критерий уже не выполняется.",
          },
        ],
        sourceIds: [
          "professional-standard",
          "gost-71331",
          "gost-58940",
        ],
      }),
      article({
        id: "root-cause-analysis",
        title: "Разбор причины, а не только устранение симптома",
        summary:
          "Факты, механизм, способ обнаружения, системная причина и предотвращение повторения.",
        level: "Уверенная работа",
        readTime: 9,
        tags: ["причина", "инцидент", "улучшение"],
        shortAnswer:
          "Хороший разбор отвечает не только «что сломалось», но и почему защита процесса не обнаружила или не предотвратила это раньше. Действия делят на восстановление, предотвращение повторения и улучшение обнаружения.",
        procedure: [
          "Сохранить исходные данные и построить подтверждённую хронологию.",
          "Описать технический механизм отказа.",
          "Выяснить условия, позволившие механизму возникнуть.",
          "Проверить, почему контроль не обнаружил отклонение раньше.",
          "Назначить действия с ответственным, сроком и критерием результата.",
          "Проверить эффективность после внедрения.",
        ],
        keyPoints: [
          "«Ошибка человека» обычно не является достаточной конечной причиной.",
          "Мера «провести инструктаж» должна соответствовать установленному пробелу знаний.",
          "Изменение системы нужно проверять на побочные риски.",
        ],
        mistakes: [
          "Искать виновного вместо механизма.",
          "Делать вывод без исходных журналов.",
          "Закрывать действие без измеримого критерия.",
        ],
        selfCheck: [
          {
            question: "Какие три типа действий нужны после разбора?",
            answer:
              "Восстановить работу, предотвратить повторение и улучшить раннее обнаружение.",
          },
        ],
        sourceIds: [
          "professional-standard",
          "personnel-current",
          "gost-71331",
        ],
      }),
      article({
        id: "mentoring",
        title: "Как передавать опыт новичку",
        summary:
          "Показ, совместное выполнение, самостоятельная попытка, разбор и подтверждение.",
        level: "Уверенная работа",
        readTime: 7,
        tags: ["наставничество", "обучение", "обратная связь"],
        shortAnswer:
          "Наставник не просто показывает последовательность, а объясняет цель, опасности, критерии и точки остановки. Самостоятельность подтверждается наблюдаемой практикой, а не фразой «вроде понял».",
        procedure: [
          "Описать результат, исходные условия и риски задачи.",
          "Показать действие вслух, объясняя каждое решение.",
          "Выполнить задачу вместе, задавая контрольные вопросы.",
          "Дать ученику выполнить её в разрешённых условиях под наблюдением.",
          "Разобрать отклонения без сокрытия и унижения.",
          "Зафиксировать подтверждённый уровень и следующий шаг.",
        ],
        keyPoints: [
          "Обучаемый должен уметь назвать критерий остановки.",
          "Один успешный случай не доказывает устойчивый навык.",
          "Наставник не расширяет формальный допуск ученика.",
        ],
        mistakes: [
          "Выполнять всю работу самому ради скорости.",
          "Проверять память, а не решение новой ситуации.",
          "Не давать обратную связь сразу после задачи.",
        ],
        selfCheck: [
          {
            question: "Как проверить понимание лучше вопроса «понял?»",
            answer:
              "Попросить объяснить цель, риски и выполнить вариант задачи с новыми исходными данными.",
          },
        ],
        sourceIds: ["personnel-current"],
      }),
    ],
  },
];

export const allArticles = stages.flatMap((stage) =>
  stage.articles.map((item) => ({ ...item, stage })),
);

export const sourceById = new Map(sources.map((source) => [source.id, source]));

export const quickSearches = [
  "первый день",
  "допуск",
  "нет напряжения",
  "CE805M RS-485",
  "CE308 6144",
  "СПОДЭС PUSH",
  "Д101 Bluetooth",
  "НАРТИС ПУЛЬТ BLE",
  "замена ПУ ЮЛ",
  "РиМ 384 RF1 RF2",
  "SM160 топология RFPLC",
  "КВАНТ F1 F2 прямой опрос",
  "IRZ RUH2 Port Forwarding",
  "Меркурий 221 COM-порт",
  "Меркурий GPRS нет регистрации",
  "Милур 307S журнал 512",
  "инструментальная проверка ВАФ",
  "ПНР нет опроса УСПД",
  "CE805M PLC RS-485",
  "CE208 55454-13",
  "НАРТИС И100 86199-22",
  "НАРТИС И300 86200-22",
  "Милур SPLIT GSM оптопорт",
  "Энергомера CE DLMS профиль",
  "ZigBee Telegesis PAN ID",
  "ТЕЛЕОФИС прозрачный канал",
  "НАРТИС ZB белый список",
  "SM160 Link F1 F2 модемный пул",
  "КВАНТ GSM две SIM",
  "Info 42",
  "ПП 890",
];
