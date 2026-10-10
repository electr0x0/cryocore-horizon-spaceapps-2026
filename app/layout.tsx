import type { Metadata } from 'next';
import './globals.css';
import './demo-features.css';
export const metadata: Metadata = { title: 'SAR Atlas · See change. Understand Earth.', description: 'A simulated satellite intelligence experience for NASA Space Apps Challenge 2026 — Dancing with the SARs. Explore floods, river erosion, and wetlands in Bangladesh.' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
