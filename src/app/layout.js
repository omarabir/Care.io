import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Care.xyz - Baby Sitting & Elderly Care Service",
  description:
    "নির্ভরযোগ্য এবং trusted care service provider। শিশু, বৃদ্ধ এবং অসুস্থ ব্যক্তিদের জন্য সেরা caregiving service।",
  keywords:
    "baby sitting, elderly care, sick people care, caregiving service bangladesh",
  openGraph: {
    title: "Care.xyz - Baby Sitting & Elderly Care Service",
    description: "নির্ভরযোগ্য এবং trusted care service provider",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviderWrapper>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
