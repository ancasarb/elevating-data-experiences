import "./globals.css";

import type { Metadata } from "next";
import Link from "next/link";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "pixel on canvas",
  description: "ancasarb portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-50">
          <div className="max-w-screen-xl px-4 py-3 mx-auto">
            <div className="flex items-center">
              <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-900 hover:underline"
                    aria-current="page"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="text-gray-900 hover:underline"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="contact"
                    className="text-gray-900 hover:underline"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
