import '../../globals.css';
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import {Roboto} from 'next/font/google';


const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: "Dundas Weight Loss Clinic",
  description:
    "The Dundas Weight Loss Clinic is a local weight loss clinic that provides personalized and professional guidance to weight loss.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
    <body className="bg-gray-50">
      <Navbar />
       {children}
      <Footer />
    </body>
    </html>
  );
}
