import type { Metadata } from 'next';
import '../global.css';
import Navbar from '../components/Navbar.tsx';

export const metadata: Metadata = {
  title: 'Real-Time AI Product Demos',
  description: 'Experience AI-driven product demos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <Navbar />
        {children}
      </body>
    </html>
  );
}