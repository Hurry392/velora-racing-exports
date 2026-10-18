import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Velora Racing Exports | Motorsport Apparel", description: "Racing apparel and motorsport gear for teams and distributors worldwide." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
