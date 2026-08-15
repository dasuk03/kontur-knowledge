import type { Metadata } from "next";
import "@fontsource-variable/roboto-condensed";
import "./globals.css";

export const metadata: Metadata = {
  title: "КОНТУР — от первого дня до квалифицированного работника",
  description:
    "Последовательная база знаний электромонтёра с расширенным поиском по статьям и документам: адаптация, электробезопасность, приборы учёта, обследование сетей, диагностика, ИСУЭ и профессиональное развитие.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
