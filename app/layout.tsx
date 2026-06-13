import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { ThemeProvider } from '@/components/theme-provider'
// import { Navbar } from '@/components/navbar'

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MarkVerde — Markdown Notes, Live & Beautiful",
  description:
    "A fast, modern markdown note-taking app with live preview, auto-save, search, and export. Write in markdown, see it render instantly.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MarkVerde",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1c0e" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        {/* <ThemeProvider> */}
        <div className="flex min-h-screen flex-col">
          {/* <Navbar /> */}
          <div className="flex flex-1 flex-col">{children}</div>
        </div>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
