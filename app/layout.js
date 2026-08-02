import { Quicksand, Baloo_2 } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-quicksand",
});

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-baloo",
});

export const metadata = {
  title: "Naja — Handmade 3D-Printed Lamps",
  description:
    "Warm, made-to-order 3D-printed lamps, delivered across Algeria with cash on delivery.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${baloo.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text font-body antialiased">
        {children}
      </body>
    </html>
  );
}
