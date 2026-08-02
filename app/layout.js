import { Quicksand, Nunito, Caveat } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-quicksand",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-caveat",
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
      className={`${quicksand.variable} ${nunito.variable} ${caveat.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text font-body antialiased">
        {children}
      </body>
    </html>
  );
}
