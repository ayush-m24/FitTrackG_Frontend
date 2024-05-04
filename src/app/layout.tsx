import Navbar from '@/components/Navbar/Navbar'
import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: 'FitTrack',
  description: 'Fitness tracking app',
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
       <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <title>FitTrack</title>
        <meta name="description" content="Fitness tracking app" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FFFFFF" />
      </Head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <ToastContainer/>
      </body>
    </html>
  )
}

