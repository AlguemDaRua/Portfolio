import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Azam Usman | Software Developer",
  description: "Portfólio profissional de Azam Usman, especialista em desenvolvimento web e mobile. Transformando ideias em realidade digital.",
  keywords: ["Desenvolvedor Web", "Flutter", "Java", "Python", "Golang", "Portfólio", "Moçambique", "Software Developer"],
  authors: [{ name: "Azam Usman" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "Azam Usman | Software Developer",
    description: "Portfólio profissional - Desenvolvimento Web & Mobile",
    siteName: "Azam Usman Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Azam Usman | Software Developer",
    description: "Portfólio profissional - Desenvolvimento Web & Mobile",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={`${poppins.variable} ${montserrat.variable} font-sans`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedTheme = localStorage.getItem('theme');
                  var isDark = storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
