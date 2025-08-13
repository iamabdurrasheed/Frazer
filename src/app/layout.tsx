import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frazer BMT - Premium Industrial & Building Materials",
  description: "Leading supplier of HVAC, valves, electrical, plumbing and industrial materials in UAE",
  icons: {
    icon: [
      { url: '/frazer-logo.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: '/frazer-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
                <Navigation />
                <main className="w-full">
                  {children}
                </main>
                <Footer />
              </div>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
