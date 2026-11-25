import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VinhUni AI Campus",
  description: "An independent student research prototype for academic planning.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
