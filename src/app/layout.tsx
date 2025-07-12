import type { Metadata } from 'next';
import '../styles/global.css';
import Navbar from '../app/components/Navbar';
import Footer from './components/Footer';

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
        < Footer/>
      </body>
    </html>
  );
}