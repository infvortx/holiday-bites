import "../styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="primary">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
